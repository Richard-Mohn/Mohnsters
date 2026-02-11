/// Battle Engine — Auto-battler logic for MohnSter Arena
/// Server-authoritative with client-side prediction for animations
library;

import 'dart:math';
import '../models/mohnster.dart';

/// Element advantage chart (Rock-Paper-Scissors expanded)
/// Returns damage multiplier: 1.5 = super effective, 0.75 = resisted, 1.0 = neutral
double getElementMultiplier(Element attacker, Element defender) {
  const advantages = {
    Element.flame: [Element.nature, Element.crystal],
    Element.nature: [Element.aqua, Element.thunder],
    Element.aqua: [Element.flame, Element.thunder],
    Element.thunder: [Element.aqua],
    Element.shadow: [Element.crystal],
    Element.crystal: [Element.shadow],
  };
  const resistances = {
    Element.flame: [Element.aqua],
    Element.nature: [Element.flame],
    Element.aqua: [Element.nature],
    Element.thunder: [Element.nature],
    Element.shadow: [Element.crystal],
    Element.crystal: [Element.flame],
  };

  if (advantages[attacker]?.contains(defender) ?? false) return 1.5;
  if (resistances[attacker]?.contains(defender) ?? false) return 0.75;
  return 1.0;
}

enum BattleActionType { attack, ability, defend, flee }

class BattleAction {
  final BattleActionType type;
  final String actorId;
  final String? targetId;
  final MohnsterAbility? ability;
  final int damage;
  final double elementMultiplier;
  final bool isCritical;
  final bool missed;
  final String description;

  const BattleAction({
    required this.type,
    required this.actorId,
    this.targetId,
    this.ability,
    this.damage = 0,
    this.elementMultiplier = 1.0,
    this.isCritical = false,
    this.missed = false,
    required this.description,
  });

  Map<String, dynamic> toJson() => {
        'type': type.name,
        'actorId': actorId,
        'targetId': targetId,
        'abilityId': ability?.id,
        'damage': damage,
        'elementMultiplier': elementMultiplier,
        'isCritical': isCritical,
        'missed': missed,
        'description': description,
      };
}

enum BattleOutcome { player1Win, player2Win, draw, disconnected }

class BattleResult {
  final String battleId;
  final String player1Id;
  final String player2Id;
  final BattleOutcome outcome;
  final List<BattleAction> actionLog;
  final int totalTurns;
  final int xpEarned;
  final int pointsEarned;
  final DateTime startedAt;
  final DateTime endedAt;
  final bool wasDisconnect;

  const BattleResult({
    required this.battleId,
    required this.player1Id,
    required this.player2Id,
    required this.outcome,
    required this.actionLog,
    required this.totalTurns,
    required this.xpEarned,
    required this.pointsEarned,
    required this.startedAt,
    required this.endedAt,
    this.wasDisconnect = false,
  });

  Map<String, dynamic> toJson() => {
        'battleId': battleId,
        'player1Id': player1Id,
        'player2Id': player2Id,
        'outcome': outcome.name,
        'actionLog': actionLog.map((a) => a.toJson()).toList(),
        'totalTurns': totalTurns,
        'xpEarned': xpEarned,
        'pointsEarned': pointsEarned,
        'startedAt': startedAt.toIso8601String(),
        'endedAt': endedAt.toIso8601String(),
        'wasDisconnect': wasDisconnect,
      };
}

/// The core auto-battler engine
/// Runs on server (Cloud Function) and locally for previews
class BattleEngine {
  final Random _rng;
  final List<BattleAction> _actionLog = [];

  BattleEngine({int? seed}) : _rng = Random(seed);

  /// Run a full auto-battle between two teams
  /// Returns the battle result with full action log
  BattleResult runBattle({
    required String battleId,
    required String player1Id,
    required String player2Id,
    required List<Mohnster> team1,
    required List<Mohnster> team2,
  }) {
    final startedAt = DateTime.now();
    _actionLog.clear();

    // Clone HP pools
    final hp1 = {for (var m in team1) m.id: m.effectiveStats.hp};
    final hp2 = {for (var m in team2) m.id: m.effectiveStats.hp};

    int turnCount = 0;
    const maxTurns = 100; // prevent infinite battles

    while (turnCount < maxTurns) {
      turnCount++;

      // Build initiative order by SPD (all alive creatures)
      final alive1 = team1.where((m) => (hp1[m.id] ?? 0) > 0).toList();
      final alive2 = team2.where((m) => (hp2[m.id] ?? 0) > 0).toList();

      if (alive1.isEmpty || alive2.isEmpty) break;

      final allCombatants = [
        ...alive1.map((m) => _Combatant(m, 1)),
        ...alive2.map((m) => _Combatant(m, 2)),
      ];
      allCombatants.sort(
          (a, b) => b.mohnster.effectiveStats.spd.compareTo(
              a.mohnster.effectiveStats.spd));

      for (final combatant in allCombatants) {
        final attacker = combatant.mohnster;
        final attackerHp =
            combatant.team == 1 ? hp1 : hp2;
        final defenderHp =
            combatant.team == 1 ? hp2 : hp1;

        // Skip if attacker fainted this turn
        if ((attackerHp[attacker.id] ?? 0) <= 0) continue;

        // Pick target — lowest HP enemy
        final enemies =
            combatant.team == 1 ? alive2 : alive1;
        final aliveEnemies =
            enemies.where((e) => (defenderHp[e.id] ?? 0) > 0).toList();
        if (aliveEnemies.isEmpty) break;

        aliveEnemies.sort(
            (a, b) => (defenderHp[a.id] ?? 0).compareTo(
                defenderHp[b.id] ?? 0));
        final target = aliveEnemies.first;

        // Decide: use ability or basic attack
        BattleAction action;
        if (attacker.abilities.isNotEmpty && _rng.nextDouble() < 0.4) {
          final ability = attacker.abilities[
              _rng.nextInt(attacker.abilities.length)];
          action = _executeAbility(attacker, target, ability);
        } else {
          action = _executeBasicAttack(attacker, target);
        }

        _actionLog.add(action);

        // Apply damage
        if (!action.missed) {
          defenderHp[target.id] =
              (defenderHp[target.id] ?? 0) - action.damage;

          if ((defenderHp[target.id] ?? 0) <= 0) {
            defenderHp[target.id] = 0;
            _actionLog.add(BattleAction(
              type: BattleActionType.flee,
              actorId: target.id,
              description:
                  '${target.name} has been digitized! Particles scatter...',
            ));
          }
        }
      }

      // Check win condition after full turn
      final team1Alive = team1.any((m) => (hp1[m.id] ?? 0) > 0);
      final team2Alive = team2.any((m) => (hp2[m.id] ?? 0) > 0);
      if (!team1Alive || !team2Alive) break;
    }

    // Determine outcome
    final team1Alive = team1.any((m) => (hp1[m.id] ?? 0) > 0);
    final team2Alive = team2.any((m) => (hp2[m.id] ?? 0) > 0);

    BattleOutcome outcome;
    if (team1Alive && !team2Alive) {
      outcome = BattleOutcome.player1Win;
    } else if (!team1Alive && team2Alive) {
      outcome = BattleOutcome.player2Win;
    } else {
      outcome = BattleOutcome.draw;
    }

    // Calculate rewards
    final xpEarned = turnCount * 5 +
        (outcome == BattleOutcome.player1Win ? 50 : 0) +
        (outcome == BattleOutcome.player2Win ? 50 : 0);
    final pointsEarned = outcome == BattleOutcome.draw ? 5 : 20;

    return BattleResult(
      battleId: battleId,
      player1Id: player1Id,
      player2Id: player2Id,
      outcome: outcome,
      actionLog: List.unmodifiable(_actionLog),
      totalTurns: turnCount,
      xpEarned: xpEarned,
      pointsEarned: pointsEarned,
      startedAt: startedAt,
      endedAt: DateTime.now(),
    );
  }

  /// Handle disconnect — the other player wins, particles scatter
  BattleResult handleDisconnect({
    required String battleId,
    required String player1Id,
    required String player2Id,
    required String disconnectedPlayerId,
    required DateTime startedAt,
  }) {
    final isP1Disconnect = disconnectedPlayerId == player1Id;
    return BattleResult(
      battleId: battleId,
      player1Id: player1Id,
      player2Id: player2Id,
      outcome:
          isP1Disconnect ? BattleOutcome.player2Win : BattleOutcome.player1Win,
      actionLog: [
        BattleAction(
          type: BattleActionType.flee,
          actorId: disconnectedPlayerId,
          description:
              'Connection lost! Character digitizes into small particles and disappears...',
        ),
        BattleAction(
          type: BattleActionType.defend,
          actorId: isP1Disconnect ? player2Id : player1Id,
          description:
              'Particles coalesce into an orb and are absorbed! Bonus points earned.',
        ),
      ],
      totalTurns: 0,
      xpEarned: 25,
      pointsEarned: 30, // disconnect bonus for winner
      startedAt: startedAt,
      endedAt: DateTime.now(),
      wasDisconnect: true,
    );
  }

  BattleAction _executeBasicAttack(Mohnster attacker, Mohnster target) {
    final stats = attacker.effectiveStats;
    final targetStats = target.effectiveStats;
    final elementMult = getElementMultiplier(attacker.element, target.element);
    final isCritical = _rng.nextDouble() < 0.1;
    final critMult = isCritical ? 1.5 : 1.0;
    final missChance = 0.05;
    final missed = _rng.nextDouble() < missChance;

    final baseDamage = ((stats.atk * 2.0 / targetStats.def) *
            elementMult *
            critMult *
            (0.85 + _rng.nextDouble() * 0.3))
        .round()
        .clamp(1, 9999);

    return BattleAction(
      type: BattleActionType.attack,
      actorId: attacker.id,
      targetId: target.id,
      damage: missed ? 0 : baseDamage,
      elementMultiplier: elementMult,
      isCritical: isCritical,
      missed: missed,
      description: missed
          ? '${attacker.name} attacks but misses!'
          : '${attacker.name} strikes ${target.name} for $baseDamage damage!${isCritical ? ' CRITICAL HIT!' : ''}${elementMult > 1.0 ? ' Super effective!' : elementMult < 1.0 ? ' Not very effective...' : ''}',
    );
  }

  BattleAction _executeAbility(
      Mohnster attacker, Mohnster target, MohnsterAbility ability) {
    final stats = attacker.effectiveStats;
    final targetStats = target.effectiveStats;
    final elementMult =
        getElementMultiplier(ability.element, target.element);
    final isCritical = _rng.nextDouble() < 0.08;
    final critMult = isCritical ? 1.75 : 1.0;
    final missed = _rng.nextDouble() > ability.accuracy;

    final baseDamage = ((ability.power + stats.sp) *
            elementMult *
            critMult /
            (targetStats.def * 0.5) *
            (0.9 + _rng.nextDouble() * 0.2))
        .round()
        .clamp(1, 9999);

    return BattleAction(
      type: BattleActionType.ability,
      actorId: attacker.id,
      targetId: target.id,
      ability: ability,
      damage: missed ? 0 : baseDamage,
      elementMultiplier: elementMult,
      isCritical: isCritical,
      missed: missed,
      description: missed
          ? '${attacker.name} uses ${ability.name} but it misses!'
          : '${attacker.name} uses ${ability.name} on ${target.name} for $baseDamage damage!${isCritical ? ' CRITICAL!' : ''}',
    );
  }
}

class _Combatant {
  final Mohnster mohnster;
  final int team;
  _Combatant(this.mohnster, this.team);
}
