import 'package:flutter/material.dart';


class PencapaianScreen extends StatelessWidget {
  final VoidCallback? onNext;
  const PencapaianScreen({Key? key,this.onNext}) : super(key: key);
  
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
            TextButton( child: Text("CobaScreen"), onPressed:onNext)
          ]
        ),
      ),
    );
  }
}