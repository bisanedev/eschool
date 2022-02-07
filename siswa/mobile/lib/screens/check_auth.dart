import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';

class CheckAuth extends StatefulWidget {  
  const CheckAuth({Key? key}) : super(key: key);  
  @override
  _CheckAuth createState() => _CheckAuth();
}

class _CheckAuth  extends State<CheckAuth> {
  @override
  void initState() {
      super.initState();
      // The delay fixes it
      Future.delayed(const Duration(seconds: 2)).then((_) {
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
        child: const CircularProgressIndicator(),
        color: Colors.white,
        alignment: Alignment.center,
    );
  }
}

checkIfAuthenticated() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();  
  String? userToken = prefs.getString('userToken') ?? "";  
  if(userToken == ""){ 
    return false;
  }      
  return true;
}