import 'package:flutter/material.dart';
import './screens/base.dart';
import 'login/login_screen.dart';
import './screens/check_auth.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget{
  const MyApp({Key? key}) : super(key: key); 
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
        '/cek-auth': (context) => const CheckAuth(),
        '/login': (context) => const LoginScreen()       
      },
    );
  }

}