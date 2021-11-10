import 'package:flutter/material.dart';
import '../../widget/tombol.dart';
import '../../utils/globals.dart' as globals;
import '../coba.dart';


class AplikasiScreen extends StatelessWidget { 
  //final Function? onNext;
  const AplikasiScreen({Key? key}) : super(key: key);    

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Aplikasi Screen',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Aplikasi Screen'),
        ),
        body: Center(
          child: Column(children: [
            Text('Hello to Aplikasi Screen'),
            SimpleElevatedButton( child: Text("CobaScreen"), color: globals.BaseColor,onPressed:() {
              Navigator.push(context, MaterialPageRoute(
                builder: (context) => CobaScreen()
              ));
            })
          ],),
        ),
      ),
    );
  }
}