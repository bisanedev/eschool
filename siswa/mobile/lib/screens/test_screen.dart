import 'package:flutter/material.dart';

class TestScreen extends StatefulWidget {
  final String? userToken;    
  const TestScreen({Key? key,this.userToken}) : super(key: key);

  @override
  _TestScreen createState() => _TestScreen();
}

class _TestScreen extends State<TestScreen> {

  @override
  void initState() {        
    super.initState();
    if(mounted){
      print("wow");
    }
    print("Prestasi");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(   
      body: Center(
        child: Column(
          children: [
            const Text('Hello to Aplikasi Screen'),
            Text(widget.userToken ?? "meow")
          ]
        ),
      ),
    );
  }
}