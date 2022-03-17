import 'package:flutter/material.dart';
import '../components/form/tombol.dart';
import '../../components/widget/custom_bars.dart';
import '../globals.dart' as globals;

class AplikasiScreen extends StatefulWidget { 
  final String? userToken;    
  final Function? onNext;
  const AplikasiScreen({Key? key,this.userToken,this.onNext}) : super(key: key);
  @override
  _AplikasiScreen createState() => _AplikasiScreen();
}

class _AplikasiScreen extends State<AplikasiScreen> {

  @override
  void initState() {        
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomBars(title:"Aplikasi"),
        body: Center(
          child: Column(children: [
            const Text('Hello to Aplikasi Screen'),
            SimpleElevatedButton( child: const Text("CobaScreen"), color: globals.baseColor,onPressed:widget.onNext),
            Text(widget.userToken ?? "hahaha")
          ],),
        ),
    );
  }
}