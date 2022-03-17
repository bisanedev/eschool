import 'package:flutter/material.dart';

class PasswordScreen extends StatefulWidget {
  final String? userToken;    
  const PasswordScreen({Key? key,this.userToken}) : super(key: key);

  @override
  _PasswordScreen createState() => _PasswordScreen();
}

class _PasswordScreen extends State<PasswordScreen> {

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
            const Text('Hello to password Screen'),
            Text(widget.userToken ?? "meow"),
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