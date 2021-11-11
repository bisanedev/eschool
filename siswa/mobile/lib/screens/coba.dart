import 'package:flutter/material.dart';

class CobaScreen extends StatelessWidget {
  const CobaScreen({Key? key}) : super(key: key);  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Screen Coba',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Coba Header'),
        ),
        body: Center(
          child: ElevatedButton(
                  onPressed: () { Navigator.pop(context);},
                  child: Text('Go back!'),
              ),
        ),
      ),
    );
  }
}