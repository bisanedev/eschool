import 'package:flutter/material.dart';

class UjianScreen extends StatefulWidget {  
  const UjianScreen({Key? key}) : super(key: key);

  @override
  _UjianScreen createState() => _UjianScreen();
}

class _UjianScreen extends State<UjianScreen> {

  @override
  void initState() {        
    super.initState();      
  }

  @override
  Widget build(BuildContext context) {   
    return Scaffold(   
      body: Center(
        child: Column(
          children:<Widget>[
            const Text('Hello to Ujian Screen'),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Go back'),              
            ),         
          ]
        ),
      ),
    );
  }
}