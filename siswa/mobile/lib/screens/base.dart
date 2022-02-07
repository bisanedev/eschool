import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../globals.dart' as globals;
import '../aplikasi/aplikasi_screen.dart';
import '../prestasi/prestasi_screen.dart';
import '../profile/profile_screen.dart';
import '../components/models/user_model.dart';
//import './coba.dart';
import 'dart:convert';

class BaseScreen extends StatefulWidget {
  const BaseScreen({Key? key}) : super(key: key);           
  @override  
  _BaseScreen createState() => _BaseScreen();
}

class _BaseScreen extends State<BaseScreen> {
  int _selectedIndex = 0;
  String? userToken;
  UserData? userData;

  @override  
  void initState() {        
    super.initState();
    getToken();            
  }

  final List<GlobalKey<NavigatorState>> _navigatorKeys = [
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>(),
    GlobalKey<NavigatorState>()
  ];

  Widget build(BuildContext context) {

    return Scaffold(
        body: Stack(
          children: [
            _createOffstageNavigator(0),
            _createOffstageNavigator(1),
            _createOffstageNavigator(2),
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
              label: 'Prestasi',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              label: "Profil",
            ),     
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: globals.baseColor,
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

  Map<String, WidgetBuilder> _routeBuilders(BuildContext context, int index) {
    return {
      '/': (context) {
        return [
          AplikasiScreen(userToken: userToken),
          PrestasiScreen(userToken: userToken),
          ProfileScreen(
            userToken: userToken,
            userData: userData,
            logOut: logOut,
          ),
        ].elementAt(index);
      },
    };
  }

  Widget _createOffstageNavigator(int index) {
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

  void getToken() async {
    print("udah tau pertama login keluar error => Unexpected end of JSON input");
    SharedPreferences prefs = await SharedPreferences.getInstance(); 
      Map<String, dynamic> userMap = jsonDecode(prefs.getString('userData') ?? "");
      setState((){      
        userToken = prefs.getString('userToken') ?? '';
        userData = UserData.fromJson(userMap); 
    });
  }

  void logOut() async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();           
    await prefs.clear();
    Navigator.pushReplacementNamed(context, '/login');   
  }

  // void _next() {
  //   Navigator.push(context, MaterialPageRoute(builder: (context) => const CobaScreen()));
  // }


/* ---  end script ---*/
}
