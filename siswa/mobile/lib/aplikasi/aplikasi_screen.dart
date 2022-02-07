import 'package:flutter/material.dart';
import '../../components/widget/tombol.dart';
import '../../components/widget/custom_bars.dart';
import '../screens/globals.dart' as globals;
import '../screens/coba.dart';

class AplikasiScreen extends StatelessWidget { 
  final String? userToken;    
  const AplikasiScreen({Key? key,this.userToken}) : super(key: key);    

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomBars(title:"Aplikasi"),
        body: Center(
          child: Column(children: [
            Text('Hello to Aplikasi Screen'),
            SimpleElevatedButton( child: Text("CobaScreen"), color: globals.BaseColor,onPressed:() {
              Navigator.push(context, MaterialPageRoute(
                builder: (context) => CobaScreen(userToken: userToken,)
              ));
            }),
            Text(userToken ?? "hahaha")
          ],),
        ),
    );
  }
}