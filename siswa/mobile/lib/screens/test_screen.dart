import 'package:flutter/material.dart';
import '../components/form/tombol.dart';

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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(   
      body: Center(
        child: Column(
          children: [
            const Text('Hello to Test Screen'),
            Text(widget.userToken ?? "meow"),
            SimpleElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Go back'),
              color: Colors.green,
            ),
          ]
        ),
      ),
    );
  }
}