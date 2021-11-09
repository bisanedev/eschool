import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';


class AplikasiScreen extends StatefulWidget {          
  @override
  _Apps createState() => _Apps();
}

class _Apps extends State<AplikasiScreen> { 
  int _selectedIndex = 0;    
  String title = "Absensi";  

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

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: const Center(
          child: Text('Hello World'),
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
