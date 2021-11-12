import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';

class CheckAuth extends StatefulWidget {    
  @override
  _CheckAuth createState() => _CheckAuth();
}

class _CheckAuth  extends State<CheckAuth> {
  @override
  void initState() {
      super.initState();
      // The delay fixes it
      Future.delayed(Duration(seconds: 2)).then((_) {
         checkIfAuthenticated().then((success) {
            if (!success) {
              Navigator.pushReplacementNamed(context, '/login');              
            } else {
              Navigator.pushReplacementNamed(context, '/');
            }  
          });
      });
  }

  @override 
  Widget build(BuildContext context) {      
    return Container(
        child: CircularProgressIndicator(),
        color: Colors.white,
        alignment: Alignment.center,
    );
  }
}

checkIfAuthenticated() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();  
  String? userToken = prefs.getString('userToken') ?? null;  
  if(userToken == null){ 
    return false;
  }      
  return true;
}