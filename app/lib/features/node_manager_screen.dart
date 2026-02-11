import 'package:flutter/material.dart';
import '../core/models/mohnster.dart';
import '../core/engine/node_integration.dart';

/// ESP32 Node Manager — Provision, monitor, and manage game nodes
class NodeManagerScreen extends StatefulWidget {
  const NodeManagerScreen({super.key});

  @override
  State<NodeManagerScreen> createState() => _NodeManagerScreenState();
}

class _NodeManagerScreenState extends State<NodeManagerScreen> {
  // Demo nodes for UI development
  final List<GameNode> _nodes = [
    GameNode(
      nodeId: 'mohn_a1b2c3d4',
      ownerId: 'demo_user',
      linkedMohnsterId: 'mohnster_flame_01',
      status: NodeGameStatus.hibernating,
      lastHeartbeat: DateTime.now().subtract(const Duration(minutes: 3)),
      totalXpGenerated: 432,
      isOnline: true,
      wifiSsid: 'Home_WiFi_5G',
      signalStrength: -45,
      firmwareVersion: '1.0.0',
    ),
    GameNode(
      nodeId: 'mohn_e5f6g7h8',
      ownerId: 'demo_user',
      status: NodeGameStatus.idle,
      lastHeartbeat: DateTime.now().subtract(const Duration(hours: 2)),
      isOnline: false,
      firmwareVersion: '1.0.0',
    ),
  ];

  int _provisioningStep = -1; // -1 = not provisioning

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B0E14),
      appBar: AppBar(
        title: const Text('ESP32 Nodes',
            style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF1A1D27),
        actions: [
          IconButton(
            icon: const Icon(Icons.add_circle_outline),
            onPressed: _startProvisioning,
            tooltip: 'Add New Node',
          ),
        ],
      ),
      body: _provisioningStep >= 0
          ? _buildProvisioningFlow()
          : _buildNodeList(),
    );
  }

  Widget _buildNodeList() {
    if (_nodes.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.memory, size: 80, color: Colors.grey[600]),
            const SizedBox(height: 20),
            Text('No Nodes Connected',
                style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[400])),
            const SizedBox(height: 10),
            Text('Connect an ESP32 to supercharge\nyour MohnSters!',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey[600])),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _startProvisioning,
              icon: const Icon(Icons.add),
              label: const Text('Add Node'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                padding:
                    const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
              ),
            ),
          ],
        ),
      );
    }

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Supercharge banner
        _buildSuperchargeBanner(),
        const SizedBox(height: 16),
        // Node cards
        ..._nodes.map(_buildNodeCard),
      ],
    );
  }

  Widget _buildSuperchargeBanner() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFF6366F1), Color(0xFF8B5CF6)],
        ),
      ),
      child: Row(
        children: [
          const Icon(Icons.bolt, size: 40, color: Colors.amber),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Supercharge Your MohnSter',
                    style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white)),
                const SizedBox(height: 4),
                Text(
                    'Link an ESP32 to bring your character to life. '
                    'AI battles while connected!',
                    style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.8),
                        fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNodeCard(GameNode node) {
    final isOnline = node.isOnline && !node.isDisconnected;
    final statusColor = isOnline ? Colors.greenAccent : Colors.redAccent;
    final statusText = _statusText(node.status);

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF1A1D27),
        border: Border.all(
          color: isOnline ? Colors.green.withValues(alpha: 0.3) : Colors.grey[800]!,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: statusColor,
                    boxShadow: [
                      BoxShadow(
                        color: statusColor.withValues(alpha: 0.5),
                        blurRadius: 8,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(node.nodeId,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                              fontFamily: 'monospace')),
                      Text(statusText,
                          style: TextStyle(color: statusColor, fontSize: 13)),
                    ],
                  ),
                ),
                _buildNodeMenu(node),
              ],
            ),
            const Divider(color: Color(0xFF2A2D37), height: 24),

            // Stats grid
            Row(
              children: [
                _buildNodeStat('XP Generated', '${node.totalXpGenerated}',
                    Icons.star, Colors.amber),
                _buildNodeStat(
                    'Battles Won',
                    '${node.totalBattlesWon}',
                    Icons.emoji_events,
                    Colors.greenAccent),
                _buildNodeStat('Signal', '${node.signalStrength ?? "--"} dBm',
                    Icons.signal_wifi_4_bar, Colors.blue),
              ],
            ),
            const SizedBox(height: 12),

            // Linked MohnSter
            if (node.hasLinkedMohnster) ...[
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: Colors.deepPurple.withValues(alpha: 0.2),
                  border: Border.all(
                      color: Colors.deepPurple.withValues(alpha: 0.3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.catching_pokemon,
                        color: Colors.deepPurpleAccent, size: 20),
                    const SizedBox(width: 8),
                    Text('Linked: ${node.linkedMohnsterId}',
                        style: const TextStyle(
                            color: Colors.deepPurpleAccent,
                            fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            ] else ...[
              OutlinedButton.icon(
                onPressed: () => _linkMohnster(node),
                icon: const Icon(Icons.link),
                label: const Text('Link a MohnSter'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.deepPurpleAccent,
                  side: const BorderSide(color: Colors.deepPurpleAccent),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ],

            // Mode toggle
            if (node.hasLinkedMohnster) ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: _buildModeButton(
                      'Hibernation',
                      '🌙 Passive XP',
                      node.status == NodeGameStatus.hibernating,
                      () => _setMode(node, NodeGameStatus.hibernating),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _buildModeButton(
                      'Arena',
                      '⚔️ AI Battle',
                      node.status == NodeGameStatus.arenaBattle,
                      () => _setMode(node, NodeGameStatus.arenaBattle),
                    ),
                  ),
                ],
              ),
            ],

            // Last heartbeat
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(Icons.favorite, size: 14, color: Colors.grey[500]),
                const SizedBox(width: 4),
                Text(
                  node.lastHeartbeat != null
                      ? 'Last heartbeat: ${_timeAgo(node.lastHeartbeat!)}'
                      : 'No heartbeat received',
                  style: TextStyle(fontSize: 12, color: Colors.grey[500]),
                ),
                const Spacer(),
                Text('FW v${node.firmwareVersion ?? "unknown"}',
                    style: TextStyle(fontSize: 11, color: Colors.grey[600])),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNodeStat(
      String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Column(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 4),
          Text(value,
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold)),
          Text(label,
              style: TextStyle(color: Colors.grey[500], fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildModeButton(
      String title, String subtitle, bool isActive, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: isActive
              ? Colors.deepPurple.withValues(alpha: 0.3)
              : Colors.grey[900],
          border: Border.all(
            color: isActive ? Colors.deepPurpleAccent : Colors.grey[700]!,
            width: isActive ? 2 : 1,
          ),
        ),
        child: Column(
          children: [
            Text(title,
                style: TextStyle(
                    color: isActive ? Colors.deepPurpleAccent : Colors.grey[400],
                    fontWeight: FontWeight.bold,
                    fontSize: 13)),
            const SizedBox(height: 2),
            Text(subtitle,
                style: TextStyle(
                    color: Colors.grey[500], fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _buildNodeMenu(GameNode node) {
    return PopupMenuButton<String>(
      color: const Color(0xFF1A1D27),
      onSelected: (value) {
        switch (value) {
          case 'unlink':
            _unlinkMohnster(node);
            break;
          case 'restart':
            _restartNode(node);
            break;
          case 'remove':
            _removeNode(node);
            break;
        }
      },
      itemBuilder: (context) => [
        const PopupMenuItem(
            value: 'unlink',
            child: Text('Unlink MohnSter',
                style: TextStyle(color: Colors.white))),
        const PopupMenuItem(
            value: 'restart',
            child:
                Text('Restart Node', style: TextStyle(color: Colors.white))),
        const PopupMenuItem(
            value: 'remove',
            child: Text('Remove Node',
                style: TextStyle(color: Colors.redAccent))),
      ],
    );
  }

  // Provisioning flow
  Widget _buildProvisioningFlow() {
    final steps = NodeProvisioning.provisioningSteps;
    final statusMsg =
        NodeProvisioning.statusMessages[_provisioningStep] ?? 'Working...';

    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Add New ESP32 Node',
              style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white)),
          const SizedBox(height: 8),
          Text(statusMsg,
              style: const TextStyle(
                  color: Colors.deepPurpleAccent, fontSize: 16)),
          const SizedBox(height: 32),

          // Steps list
          ...List.generate(steps.length, (index) {
            final isComplete = index < _provisioningStep;
            final isCurrent = index == _provisioningStep;
            return Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isComplete
                          ? Colors.greenAccent
                          : isCurrent
                              ? Colors.deepPurpleAccent
                              : Colors.grey[800],
                    ),
                    child: Center(
                      child: isComplete
                          ? const Icon(Icons.check, size: 18, color: Colors.black)
                          : Text('${index + 1}',
                              style: TextStyle(
                                  color: isCurrent
                                      ? Colors.white
                                      : Colors.grey[500],
                                  fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      steps[index],
                      style: TextStyle(
                        color: isComplete || isCurrent
                            ? Colors.white
                            : Colors.grey[600],
                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                  ),
                  if (isCurrent)
                    const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor:
                            AlwaysStoppedAnimation(Colors.deepPurpleAccent),
                      ),
                    ),
                ],
              ),
            );
          }),

          const Spacer(),

          // Controls
          Row(
            children: [
              OutlinedButton(
                onPressed: () => setState(() => _provisioningStep = -1),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.grey,
                  side: const BorderSide(color: Colors.grey),
                ),
                child: const Text('Cancel'),
              ),
              const SizedBox(width: 16),
              if (_provisioningStep < steps.length - 1)
                ElevatedButton(
                  onPressed: _nextProvisioningStep,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                  ),
                  child: const Text('Next Step'),
                ),
              if (_provisioningStep >= steps.length - 1)
                ElevatedButton(
                  onPressed: _finishProvisioning,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.greenAccent,
                    foregroundColor: Colors.black,
                  ),
                  child: const Text('Done!'),
                ),
            ],
          ),
        ],
      ),
    );
  }

  void _startProvisioning() {
    setState(() => _provisioningStep = 0);
  }

  void _nextProvisioningStep() {
    setState(() => _provisioningStep++);
  }

  void _finishProvisioning() {
    setState(() {
      _nodes.add(GameNode(
        nodeId: 'mohn_${DateTime.now().millisecondsSinceEpoch.toRadixString(16)}',
        ownerId: 'demo_user',
        status: NodeGameStatus.idle,
        isOnline: true,
        lastHeartbeat: DateTime.now(),
        firmwareVersion: '1.0.0',
      ));
      _provisioningStep = -1;
    });
  }

  void _linkMohnster(GameNode node) {
    // TODO: Show MohnSter picker dialog
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Select a MohnSter to link')),
    );
  }

  void _unlinkMohnster(GameNode node) {
    setState(() {
      final index = _nodes.indexOf(node);
      _nodes[index] = node.copyWith(
        linkedMohnsterId: '',
        status: NodeGameStatus.idle,
      );
    });
  }

  void _setMode(GameNode node, NodeGameStatus mode) {
    setState(() {
      final index = _nodes.indexOf(node);
      _nodes[index] = node.copyWith(status: mode);
    });
  }

  void _restartNode(GameNode node) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Restart signal sent to node')),
    );
  }

  void _removeNode(GameNode node) {
    setState(() => _nodes.remove(node));
  }

  String _statusText(NodeGameStatus status) {
    switch (status) {
      case NodeGameStatus.idle:
        return 'Idle — No MohnSter linked';
      case NodeGameStatus.hibernating:
        return 'Hibernating — Earning passive XP';
      case NodeGameStatus.arenaBattle:
        return 'Arena Mode — AI Fighting!';
      case NodeGameStatus.offline:
        return 'Offline';
      case NodeGameStatus.provisioning:
        return 'Setting up...';
    }
  }

  String _timeAgo(DateTime dt) {
    final diff = DateTime.now().difference(dt);
    if (diff.inMinutes < 1) return 'just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }
}
