import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../components/widget/header_bars.dart';
import '../components/paint/curve_painter.dart';
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

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    final headerTitle = Stack(
      children: [
        Container(
          color: Colors.transparent,
          height: 180,
          width: width,
          child: CustomPaint(
            painter: CurvePainter(),
          ),
        ),
        Container(
          height: 180,
          width: width,          
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.only(left: 30),
                child: Text("Ganti password",style: TextStyle(fontSize: 25,color: Colors.white,fontWeight: FontWeight.bold))
              ),
              Padding(
                padding: EdgeInsets.only(left: 30),
                child: Text("Silahkan untuk menganti kata sandi anda",style: TextStyle(fontSize: 13,color: Colors.white)),
              )              
            ],
          ),
        )         

      ],
    );

    return Scaffold(
      appBar: HeaderBars(
        textBack:"Profil",          
        onBack:() { Navigator.pop(context);}
      ),
      body: Container(
        width: width,
        height: height,
        color: Color(0xFFf3f3f3),
        child: Column(
          children: [
            headerTitle,
            Expanded(
              child: Container(
                color: Colors.transparent,
                child: Text("Form Password Disini"),
              )
            )
          ],
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

