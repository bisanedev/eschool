import 'package:flutter/material.dart';

class PrestasiScreen extends StatefulWidget {  
  const PrestasiScreen({Key? key}) : super(key: key);

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
          children:const <Widget>[
            Text('Hello to Prestasi Screen'),         
          ]
        ),
      ),
    );
  }
}