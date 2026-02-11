import 'package:flutter/material.dart';
import '../core/models/mohnster.dart';
import '../core/engine/egg_system.dart';

/// Egg Incubator Screen — shows eggs being incubated, hatch animations
class EggIncubatorScreen extends StatefulWidget {
  const EggIncubatorScreen({super.key});

  @override
  State<EggIncubatorScreen> createState() => _EggIncubatorScreenState();
}

class _EggIncubatorScreenState extends State<EggIncubatorScreen>
    with TickerProviderStateMixin {
  // Demo eggs for UI development
  final List<MohnsterEgg> _eggs = [
    MohnsterEgg(
      id: 'egg_demo_1',
      ownerId: 'demo_user',
      type: EggType.cardScan,
      hintElement: Element.flame,
      currentSteps: 35,
      requiredSteps: 50,
      createdAt: DateTime.now().subtract(const Duration(hours: 6)),
    ),
    MohnsterEgg(
      id: 'egg_demo_2',
      ownerId: 'demo_user',
      type: EggType.nodeGenerated,
      hintElement: Element.thunder,
      currentSteps: 100,
      requiredSteps: 144,
      createdAt: DateTime.now().subtract(const Duration(hours: 16)),
      sourceNodeId: 'mohn_abc123',
    ),
    MohnsterEgg(
      id: 'egg_demo_3',
      ownerId: 'demo_user',
      type: EggType.ecosystem,
      hintElement: Element.aqua,
      currentSteps: 100,
      requiredSteps: 100,
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
    ),
  ];

  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B0E14),
      appBar: AppBar(
        title: const Text('Egg Incubator',
            style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF1A1D27),
      ),
      body: _eggs.isEmpty
          ? _buildEmptyState()
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _eggs.length,
              itemBuilder: (context, index) => _buildEggCard(_eggs[index]),
            ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.egg_outlined, size: 100, color: Colors.grey[600]),
          const SizedBox(height: 20),
          Text(
            'No Eggs Yet',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.grey[400],
            ),
          ),
          const SizedBox(height: 10),
          Text(
            'Scan cards, use Empire platforms,\nor link an ESP32 node to earn eggs!',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _buildEggCard(MohnsterEgg egg) {
    final isReady = egg.isReadyToHatch;
    final progress = egg.hatchProgress;
    final color = _elementColor(egg.hintElement);

    return AnimatedBuilder(
      animation: _pulseController,
      builder: (context, child) {
        final scale = isReady ? 1.0 + (_pulseController.value * 0.05) : 1.0;
        return Transform.scale(
          scale: scale,
          child: Container(
            margin: const EdgeInsets.only(bottom: 16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  const Color(0xFF1A1D27),
                  isReady
                      ? color.withValues(alpha: 0.3)
                      : const Color(0xFF1A1D27),
                ],
              ),
              border: Border.all(
                color: isReady ? color : Colors.grey[800]!,
                width: isReady ? 2 : 1,
              ),
              boxShadow: isReady
                  ? [
                      BoxShadow(
                        color: color.withValues(alpha: 0.3),
                        blurRadius: 20,
                        spreadRadius: 2,
                      )
                    ]
                  : null,
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    children: [
                      _buildEggIcon(egg, color),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _eggTypeName(egg.type),
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              egg.hintElement != null
                                  ? '${egg.hintElement!.name.toUpperCase()} Element'
                                  : 'Mystery Element',
                              style: TextStyle(
                                color: color,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (isReady)
                        ElevatedButton(
                          onPressed: () => _hatchEgg(egg),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: color,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text('HATCH!',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Progress bar
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 12,
                      backgroundColor: Colors.grey[800],
                      valueColor: AlwaysStoppedAnimation(
                        isReady ? Colors.greenAccent : color,
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),

                  // Progress text
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '${egg.currentSteps}/${egg.requiredSteps} steps',
                        style: TextStyle(color: Colors.grey[400]),
                      ),
                      Text(
                        isReady
                            ? 'Ready to hatch!'
                            : '${egg.stepsRemaining} steps remaining',
                        style: TextStyle(
                          color: isReady ? Colors.greenAccent : Colors.grey[500],
                          fontWeight:
                              isReady ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                    ],
                  ),

                  // Source info
                  if (egg.sourceNodeId != null) ...[
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(Icons.memory, size: 14, color: Colors.grey[500]),
                        const SizedBox(width: 4),
                        Text(
                          'Generated by Node: ${egg.sourceNodeId}',
                          style: TextStyle(
                              fontSize: 12, color: Colors.grey[500]),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildEggIcon(MohnsterEgg egg, Color color) {
    return Container(
      width: 60,
      height: 70,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            color.withValues(alpha: 0.8),
            color.withValues(alpha: 0.3),
          ],
        ),
      ),
      child: Center(
        child: Text(
          egg.isReadyToHatch ? '🥚✨' : '🥚',
          style: const TextStyle(fontSize: 30),
        ),
      ),
    );
  }

  Color _elementColor(Element? element) {
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
      case null:
        return Colors.grey;
    }
  }

  String _eggTypeName(EggType type) {
    switch (type) {
      case EggType.cardScan:
        return 'Card Scan Egg';
      case EggType.ecosystem:
        return 'Ecosystem Egg';
      case EggType.dnaFusion:
        return 'DNA Fusion Egg';
      case EggType.streak:
        return 'Streak Reward Egg';
      case EggType.tournament:
        return 'Tournament Egg';
      case EggType.nodeGenerated:
        return 'Node-Generated Egg';
      case EggType.mystery:
        return 'Mystery Egg';
    }
  }

  void _hatchEgg(MohnsterEgg egg) {
    final service = EggService();
    final newMohnster = service.hatchEgg(egg);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1A1D27),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('🎉 Egg Hatched!',
            style: TextStyle(color: Colors.white)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  colors: [
                    _elementColor(newMohnster.element).withValues(alpha: 0.3),
                    _elementColor(newMohnster.element).withValues(alpha: 0.1),
                  ],
                ),
              ),
              child: Column(
                children: [
                  Text(
                    newMohnster.name,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${newMohnster.rarity.name.toUpperCase()} · ${newMohnster.element.name.toUpperCase()}',
                    style: TextStyle(
                      color: _elementColor(newMohnster.element),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),
                  _buildStatRow('ATK', newMohnster.baseStats.atk),
                  _buildStatRow('DEF', newMohnster.baseStats.def),
                  _buildStatRow('SPD', newMohnster.baseStats.spd),
                  _buildStatRow('HP', newMohnster.baseStats.hp),
                  _buildStatRow('SP', newMohnster.baseStats.sp),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Awesome!',
                style: TextStyle(color: Colors.deepPurpleAccent)),
          ),
        ],
      ),
    );

    setState(() {
      _eggs.remove(egg);
    });
  }

  Widget _buildStatRow(String label, int value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          SizedBox(width: 40, child: Text(label, style: TextStyle(color: Colors.grey[400]))),
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: value / 140,
                minHeight: 8,
                backgroundColor: Colors.grey[800],
                valueColor: AlwaysStoppedAnimation(
                  value > 100 ? Colors.amber : value > 70 ? Colors.green : Colors.blue,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          SizedBox(
            width: 30,
            child: Text('$value',
                textAlign: TextAlign.right,
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}
