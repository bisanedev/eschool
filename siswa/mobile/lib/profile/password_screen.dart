import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../globals.dart' as globals;

class PasswordScreen extends StatefulWidget {
  final String? userToken; 
  const PasswordScreen({Key? key,this.userToken}) : super(key: key); 
    @override
  _PasswordScreen createState() => _PasswordScreen();
} 

class _PasswordScreen extends State<PasswordScreen> {  

  @override
  void initState() {        
    super.initState();        
  }   

  @override
  Widget build(BuildContext context) {
   
    return MaterialApp(      
      home: Scaffold(
        appBar: AppBar(
          title: const Text('password'),
        ),
        body: Center(
          child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children:[
            ElevatedButton(onPressed: () { Navigator.pop(context);}, child: Text('Go back!')),
            Text(widget.userToken?? "meow")
          ]
        ),
        ),
      ),
    );
  }
  /*--- Script here ---*/


  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}