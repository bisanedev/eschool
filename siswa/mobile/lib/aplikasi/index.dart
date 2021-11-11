import 'package:flutter/material.dart';
import '../../widget/tombol.dart';
import '../../widget/custom_bars.dart';
import '../../utils/globals.dart' as globals;
import '../screens/coba.dart';



class AplikasiScreen extends StatelessWidget { 
  //final Function? onNext;
  const AplikasiScreen({Key? key}) : super(key: key);    

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomBars(title:"Aplikasi"),
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
    );
  }
}