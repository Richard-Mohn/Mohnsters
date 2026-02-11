import 'package:flutter/material.dart';

class MohnsterArenaScreen extends StatelessWidget {
  const MohnsterArenaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.sports_esports, size: 80, color: Colors.deepPurpleAccent),
          const SizedBox(height: 20),
          Text(
            'Mohnster Arena',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: Colors.white),
          ),
          const SizedBox(height: 10),
          Text(
            'Battle your Mohnsters for glory!',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.white70),
          ),
        ],
      ),
    );
  }
}
