import 'package:flutter/material.dart';
import '../core/models/mohnster.dart';
import '../core/engine/evolution_system.dart';

/// Character Detail Screen — full MohnSter stats, evolution, abilities
class CharacterDetailScreen extends StatelessWidget {
  final Mohnster mohnster;

  const CharacterDetailScreen({super.key, required this.mohnster});

  @override
  Widget build(BuildContext context) {
    final stats = mohnster.effectiveStats;
    final color = _elementColor(mohnster.element);

    return Scaffold(
      backgroundColor: const Color(0xFF0B0E14),
      body: CustomScrollView(
        slivers: [
          // Hero header with character art placeholder
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: const Color(0xFF1A1D27),
            flexibleSpace: FlexibleSpaceBar(
              title: Text(mohnster.name,
                  style: const TextStyle(fontWeight: FontWeight.bold)),
              background: Container(
                decoration: BoxDecoration(
                  gradient: RadialGradient(
                    center: Alignment.center,
                    radius: 0.8,
                    colors: [
                      color.withValues(alpha: 0.4),
                      const Color(0xFF0B0E14),
                    ],
                  ),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Character art placeholder
                      Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [color, color.withValues(alpha: 0.5)],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: color.withValues(alpha: 0.5),
                              blurRadius: 30,
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            mohnster.element.name[0].toUpperCase(),
                            style: const TextStyle(
                                fontSize: 48,
                                fontWeight: FontWeight.bold,
                                color: Colors.white),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // Rarity + Element badge
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 6),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: Colors.black45,
                          border: Border.all(color: color.withValues(alpha: 0.5)),
                        ),
                        child: Text(
                          '${mohnster.rarity.name.toUpperCase()} · ${mohnster.element.name.toUpperCase()}',
                          style: TextStyle(
                            color: color,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                            letterSpacing: 1.5,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Level & XP
                  _buildLevelSection(),
                  const SizedBox(height: 24),

                  // Stats
                  _buildStatsSection(stats, color),
                  const SizedBox(height: 24),

                  // Battle Record
                  _buildBattleRecord(),
                  const SizedBox(height: 24),

                  // Abilities
                  if (mohnster.abilities.isNotEmpty) ...[
                    _buildAbilitiesSection(color),
                    const SizedBox(height: 24),
                  ],

                  // Evolution Progress
                  _buildEvolutionSection(color),
                  const SizedBox(height: 24),

                  // ESP32 Node Status
                  _buildNodeSection(),
                  const SizedBox(height: 24),

                  // Achievements
                  if (mohnster.achievements.isNotEmpty) ...[
                    _buildAchievementsSection(),
                    const SizedBox(height: 24),
                  ],

                  // Info
                  _buildInfoSection(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLevelSection() {
    final xpProgress =
        mohnster.xpToNextLevel > 0 ? mohnster.xp / mohnster.xpToNextLevel : 0.0;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Level',
                      style: TextStyle(color: Colors.grey, fontSize: 13)),
                  Text('${mohnster.level}',
                      style: const TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                          color: Colors.white)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text('Evolution Stage',
                      style: TextStyle(color: Colors.grey, fontSize: 13)),
                  Text(
                    mohnster.evolutionStage == 0
                        ? 'Base'
                        : mohnster.evolutionStage == 1
                            ? 'Evolved'
                            : 'Mega',
                    style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.deepPurpleAccent),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          // XP bar
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: xpProgress,
              minHeight: 10,
              backgroundColor: Colors.grey[800],
              valueColor:
                  const AlwaysStoppedAnimation(Colors.deepPurpleAccent),
            ),
          ),
          const SizedBox(height: 4),
          Text('${mohnster.xp} / ${mohnster.xpToNextLevel} XP',
              style: TextStyle(color: Colors.grey[500], fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildStatsSection(MohnsterStats stats, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Battle Stats',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          if (mohnster.isSupercharged)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Row(
                children: [
                  const Icon(Icons.bolt, color: Colors.amber, size: 16),
                  Text(' SUPERCHARGED',
                      style: TextStyle(
                          color: Colors.amber,
                          fontSize: 12,
                          fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          const SizedBox(height: 16),
          _buildStatBar('ATK', stats.atk, Colors.redAccent),
          _buildStatBar('DEF', stats.def, Colors.blue),
          _buildStatBar('SPD', stats.spd, Colors.greenAccent),
          _buildStatBar('HP', stats.hp, Colors.pinkAccent),
          _buildStatBar('SP', stats.sp, Colors.purpleAccent),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text('Total Power: ${stats.total}',
                  style: TextStyle(
                      color: color,
                      fontWeight: FontWeight.bold,
                      fontSize: 14)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatBar(String label, int value, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          SizedBox(
              width: 35,
              child: Text(label,
                  style: TextStyle(
                      color: Colors.grey[400], fontWeight: FontWeight.w600))),
          const SizedBox(width: 12),
          Expanded(
            child: Stack(
              children: [
                Container(
                  height: 14,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(7),
                    color: Colors.grey[800],
                  ),
                ),
                FractionallySizedBox(
                  widthFactor: (value / 200).clamp(0.0, 1.0),
                  child: Container(
                    height: 14,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(7),
                      gradient: LinearGradient(
                        colors: [color, color.withValues(alpha: 0.6)],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          SizedBox(
              width: 35,
              child: Text('$value',
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold))),
        ],
      ),
    );
  }

  Widget _buildBattleRecord() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Row(
        children: [
          Expanded(
            child: _buildRecordStat(
                'Wins', '${mohnster.wins}', Colors.greenAccent),
          ),
          Container(width: 1, height: 40, color: Colors.grey[800]),
          Expanded(
            child: _buildRecordStat(
                'Losses', '${mohnster.losses}', Colors.redAccent),
          ),
          Container(width: 1, height: 40, color: Colors.grey[800]),
          Expanded(
            child: _buildRecordStat(
              'Win Rate',
              mohnster.wins + mohnster.losses > 0
                  ? '${(mohnster.wins / (mohnster.wins + mohnster.losses) * 100).round()}%'
                  : 'N/A',
              Colors.amber,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecordStat(String label, String value, Color color) {
    return Column(
      children: [
        Text(value,
            style: TextStyle(
                fontSize: 22, fontWeight: FontWeight.bold, color: color)),
        const SizedBox(height: 4),
        Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
      ],
    );
  }

  Widget _buildAbilitiesSection(Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Abilities',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          const SizedBox(height: 12),
          ...mohnster.abilities.map((ability) => Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: Colors.grey[900],
                ),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        color: _elementColor(ability.element)
                            .withValues(alpha: 0.2),
                      ),
                      child: Center(
                        child: Text(ability.element.name[0].toUpperCase(),
                            style: TextStyle(
                                color: _elementColor(ability.element),
                                fontWeight: FontWeight.bold)),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(ability.name,
                              style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                          Text(ability.description,
                              style: TextStyle(
                                  color: Colors.grey[500], fontSize: 12)),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('PWR ${ability.power}',
                            style: const TextStyle(
                                color: Colors.amber, fontSize: 12)),
                        Text('${(ability.accuracy * 100).round()}% acc',
                            style: TextStyle(
                                color: Colors.grey[500], fontSize: 11)),
                      ],
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildEvolutionSection(Color color) {
    final evolutions = CrossPlatformEvolution.getAvailableEvolutions(
      mohnster: mohnster,
      platformActivity: {},
      currentStreak: 0,
    );

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Evolution Paths',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          const SizedBox(height: 4),
          Text(
              'Use the Mohn Empire to unlock evolutions',
              style: TextStyle(color: Colors.grey[500], fontSize: 13)),
          const SizedBox(height: 16),
          if (evolutions.isEmpty)
            Text(
                'Keep leveling up and using Empire platforms to unlock evolution paths!',
                style: TextStyle(color: Colors.grey[600], fontSize: 13))
          else
            ...evolutions.map((evo) => Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: color.withValues(alpha: 0.3)),
                    color: color.withValues(alpha: 0.05),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.auto_awesome, color: color),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(evo.name,
                                style: TextStyle(
                                    color: color,
                                    fontWeight: FontWeight.bold)),
                            Text(evo.description,
                                style: TextStyle(
                                    color: Colors.grey[500], fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                )),
        ],
      ),
    );
  }

  Widget _buildNodeSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.memory, color: Colors.deepPurpleAccent),
              const SizedBox(width: 8),
              const Text('ESP32 Node',
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white)),
            ],
          ),
          const SizedBox(height: 12),
          if (mohnster.linkedNodeId != null) ...[
            Row(
              children: [
                const Icon(Icons.check_circle,
                    color: Colors.greenAccent, size: 16),
                const SizedBox(width: 8),
                Text('Linked to: ${mohnster.linkedNodeId}',
                    style: const TextStyle(color: Colors.greenAccent)),
              ],
            ),
            if (mohnster.isSupercharged) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.bolt, color: Colors.amber, size: 16),
                  const SizedBox(width: 8),
                  const Text('SUPERCHARGED — AI Arena Active',
                      style: TextStyle(
                          color: Colors.amber, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
            if (mohnster.isHibernating) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.bedtime, color: Colors.blue, size: 16),
                  const SizedBox(width: 8),
                  const Text('Hibernating — Earning Passive XP',
                      style: TextStyle(color: Colors.blue)),
                ],
              ),
            ],
          ] else ...[
            Text('Not linked to any node',
                style: TextStyle(color: Colors.grey[500])),
            const SizedBox(height: 8),
            Text(
                'Link to an ESP32 node to earn passive XP or enter the AI Arena!',
                style: TextStyle(color: Colors.grey[600], fontSize: 13)),
          ],
        ],
      ),
    );
  }

  Widget _buildAchievementsSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Achievements',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: mohnster.achievements
                .map((a) => Chip(
                      label: Text(a,
                          style: const TextStyle(
                              color: Colors.white, fontSize: 12)),
                      backgroundColor: Colors.deepPurple.withValues(alpha: 0.3),
                      side: const BorderSide(color: Colors.deepPurpleAccent),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Info',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          const SizedBox(height: 12),
          _buildInfoRow('Created', _formatDate(mohnster.createdAt)),
          if (mohnster.eggCreatedAt != null)
            _buildInfoRow('Egg Created', _formatDate(mohnster.eggCreatedAt!)),
          if (mohnster.eggType != null)
            _buildInfoRow('Origin', mohnster.eggType!),
          if (mohnster.lastBattleAt != null)
            _buildInfoRow('Last Battle', _formatDate(mohnster.lastBattleAt!)),
          _buildInfoRow('ID', mohnster.id),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(color: Colors.grey[500])),
          Flexible(
            child: Text(value,
                style: const TextStyle(color: Colors.white),
                overflow: TextOverflow.ellipsis),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime dt) {
    return '${dt.month}/${dt.day}/${dt.year}';
  }

  Color _elementColor(Element element) {
    switch (element) {
      case Element.flame:
        return const Color(0xFFFF6B35);
      case Element.aqua:
        return const Color(0xFF00B4D8);
      case Element.nature:
        return const Color(0xFF40916C);
      case Element.thunder:
        return const Color(0xFFFFD60A);
      case Element.shadow:
        return const Color(0xFF9D4EDD);
      case Element.crystal:
        return const Color(0xFFE9ECEF);
    }
  }
}
