import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
//import 'dart:async';
import '../utils/globals.dart' as globals;
import '../aplikasi/index.dart';
import '../pencapaian/index.dart';
import '../profile/index.dart';
import './coba.dart';

class BaseScreen extends StatefulWidget {          
  @override  
  _BaseScreen createState() => _BaseScreen();
}

class _BaseScreen extends State<BaseScreen> {
  int _selectedIndex = 0;  

  @override  
  void initState() {        
    super.initState();   
    // cekAuthenticated
    checkIfAuthenticated().then((success) {
        if (!success) {    
          Navigator.pushReplacementNamed(context, '/login');
        }
    });   
  }  

  List<GlobalKey<NavigatorState>> _navigatorKeys = [
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>()
  ];

  Widget build(BuildContext context) {
    return Scaffold(
        body: Stack(
          children: [
            _buildOffstageNavigator(0),
            _buildOffstageNavigator(1),
            _buildOffstageNavigator(2),
          ],
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.apps),
              label: 'Aplikasi',
            ),
             BottomNavigationBarItem(
              icon: Icon(Icons.insights),
              label: 'Pencapaian',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              label: 'Profil',
            ),     
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: globals.BaseColor,
          backgroundColor: Colors.white,
          unselectedItemColor: Colors.grey,
          onTap: _onItemTapped,
        ),
      );
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    }); 
  }

  void _next() {
    Navigator.push(context, MaterialPageRoute(builder: (context) => CobaScreen()));
  }

  Map<String, WidgetBuilder> _routeBuilders(BuildContext context, int index) {
    return {
      '/': (context) {
        return [
          AplikasiScreen(),
          PencapaianScreen(
            onNext: _next,
          ),
          ProfileScreen(),
        ].elementAt(index);
      },
    };
  }

  Widget _buildOffstageNavigator(int index) {
    var routeBuilders = _routeBuilders(context, index);

    return Offstage(
      offstage: _selectedIndex != index,
      child: Navigator(
        key: _navigatorKeys[index],
        onGenerateRoute: (routeSettings) {
          return MaterialPageRoute(
            builder: (context) => routeBuilders[routeSettings.name]!(context),
          );
        },
      ),
    );
  }

}

checkIfAuthenticated() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  //Return bool  
  String? userToken = prefs.getString('userToken') ?? null;  
  if(userToken == null){ 
    return false;
  }
  return true;
}
