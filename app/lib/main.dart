import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'mohnster_arena_screen.dart';
import 'portfolio_screen.dart';
import 'scanner_screen.dart';
import 'social_screen.dart';
import 'features/egg_incubator_screen.dart';
import 'features/node_manager_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const MohnstersApp());
}

class MohnstersApp extends StatefulWidget {
  const MohnstersApp({super.key});

  @override
  State<MohnstersApp> createState() => _MohnstersAppState();
}

class _MohnstersAppState extends State<MohnstersApp> {
  int _selectedIndex = 0;

  static final List<Widget> _screens = <Widget>[
    const PortfolioScreen(),
    const ScannerScreen(),
    const EggIncubatorScreen(),
    const MohnsterArenaScreen(),
    const NodeManagerScreen(),
    const SocialScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MohnSters',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF6366F1),
        scaffoldBackgroundColor: const Color(0xFF0B0E14),
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFF6366F1),
          secondary: const Color(0xFF10B981),
          surface: const Color(0xFF1A1D27),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF1A1D27),
          elevation: 0,
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Color(0xFF1A1D27),
          selectedItemColor: Color(0xFF6366F1),
          unselectedItemColor: Colors.grey,
          type: BottomNavigationBarType.fixed,
          selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
          unselectedLabelStyle: TextStyle(fontSize: 10),
        ),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: Colors.white),
          bodyMedium: TextStyle(color: Colors.white70),
          headlineMedium: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: IndexedStack(
          index: _selectedIndex,
          children: _screens,
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.catching_pokemon),
              label: 'Collection',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.camera_alt),
              label: 'Scan',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.egg),
              label: 'Eggs',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sports_esports),
              label: 'Arena',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.memory),
              label: 'Nodes',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.people),
              label: 'Social',
            ),
          ],
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}
