import 'package:flutter/material.dart';


class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Profile Screen',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Profile Screen'),
        ),
        body: const Center(
          child: Text('Hello to Profile Screen'),
        ),
      ),
    );
  }
}