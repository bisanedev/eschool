import 'package:flutter/material.dart';

class CobaScreen extends StatelessWidget {
  final String? userToken; 
  const CobaScreen({Key? key,this.userToken}) : super(key: key);  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Screen Coba',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Coba Header'),
        ),
        body: Center(
          child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children:[
            ElevatedButton(onPressed: () { Navigator.pop(context);}, child: Text('Go back!')),
            Text(userToken?? "meow")
          ]
        ),
        ),
      ),
    );
  }
}