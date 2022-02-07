import 'package:flutter/material.dart';
import './screens/base.dart';
import 'login/login_screen.dart';
import './screens/check_auth.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget{
  @override   
  _MyAppState createState() => _MyAppState();  
}

class _MyAppState  extends State<MyApp> {  
  
  @override
  void initState() {
    super.initState();    
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'eSchool Siswa',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(      
        primarySwatch: Colors.blue,        
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: 'TitilliumWeb',                
      ),
      initialRoute: '/cek-auth',      
      routes: {
        '/': (context) => BaseScreen(),
        '/cek-auth': (context) => CheckAuth(),
        '/login': (context) => LoginScreen()        
      },
    );
  }

}