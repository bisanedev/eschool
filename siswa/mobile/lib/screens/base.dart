import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../components/utils/globals.dart' as globals;
import '../aplikasi/aplikasi_screen.dart';
import '../pencapaian/pencapaian_screen.dart';
import '../profile/profile_screen.dart';
import './coba.dart';

class BaseScreen extends StatefulWidget {          
  @override  
  _BaseScreen createState() => _BaseScreen();
}

class _BaseScreen extends State<BaseScreen> {
  int _selectedIndex = 0;
  String? userToken;

  @override  
  void initState() {        
    super.initState();
    getToken();            
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
          items: <BottomNavigationBarItem>[
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
              label: "Profil",
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

  Map<String, WidgetBuilder> _routeBuilders(BuildContext context, int index) {
    return {
      '/': (context) {
        return [
          AplikasiScreen(userToken: userToken),
          PencapaianScreen(userToken: userToken),
          ProfileScreen(
            userToken: userToken,
            logOut: logOut,
          ),
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

  void getToken() async {
     SharedPreferences prefs = await SharedPreferences.getInstance();                
     setState((){
        userToken = prefs.getString('userToken') ?? '';
     });     
  }

  void logOut() async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();           
    await prefs.clear();
    Navigator.pushReplacementNamed(context, '/login');   
  }

  void _next() {
    Navigator.push(context, MaterialPageRoute(builder: (context) => CobaScreen()));
  }


/* ---  end script ---*/
}
