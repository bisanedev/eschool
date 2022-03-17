import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../globals.dart' as globals;
import '../aplikasi/aplikasi_screen.dart';
import '../prestasi/prestasi_screen.dart';
import '../profile/profile_screen.dart';
import '../components/models/user_model.dart';
import './test_screen.dart';
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

  @override
  Widget build(BuildContext context) {

    return Scaffold(
        body: IndexedStack(
          index: _selectedIndex,
          children: [
            AplikasiScreen(userToken: userToken,onNext: _next,),
            PrestasiScreen(userToken: userToken),
            ProfileScreen(
              userToken: userToken,
              userData: userData,
              logOut: logOut,
            ),
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

  void getToken() async {        
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      Map<String, dynamic> userMap = jsonDecode(prefs.getString('userData') ?? "");
      setState((){      
        userToken = prefs.getString('userToken') ?? '';
        userData = UserData.fromJson(userMap); 
      });
    } catch (e) {
      print('Karena Belum Login : '+e.toString());
    }
  }

  void logOut() async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();           
    await prefs.clear();
    Navigator.pushReplacementNamed(context, '/login');   
  }

  void _next() {
    Navigator.push(context, MaterialPageRoute(builder: (context) => const TestScreen()));
  }

  @override
  void dispose() {    
    super.dispose();
  }
/* ---  end script ---*/
}
