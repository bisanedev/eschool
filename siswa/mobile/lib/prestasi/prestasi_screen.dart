import 'package:flutter/material.dart';

class PrestasiScreen extends StatefulWidget {
  final String? userToken;    
  const PrestasiScreen({Key? key,this.userToken}) : super(key: key);
  @override
  _PrestasiScreen createState() => _PrestasiScreen();
}

class _PrestasiScreen extends State<PrestasiScreen> {

  @override
  void initState() {        
    super.initState();
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