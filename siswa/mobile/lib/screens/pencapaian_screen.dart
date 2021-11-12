import 'package:flutter/material.dart';

class PencapaianScreen extends StatelessWidget {
  final String? userToken;    
  const PencapaianScreen({Key? key,this.userToken}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welcome to Pencapaian Screen'),
      ),
      body: Center(
        child: Column(
          children: [
            Text('Hello to Aplikasi Screen'),
            Text(userToken ?? "meow")
          ]
        ),
      ),
    );
  }
}