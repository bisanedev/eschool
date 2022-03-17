import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import '../../routes.gr.dart';

GetIt getIt = GetIt.instance;

class ProfileScreen extends StatefulWidget {  
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  _ProfileScreen createState() => _ProfileScreen();
}

class _ProfileScreen extends State<ProfileScreen> {
  final router = getIt<AppRouter>();
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
            const Text('Hello to Profile Screen'), 
            ElevatedButton(
              onPressed: () {
                router.navigate(BaseRouter(children: [ProfileRouter( children:[PasswordRouter()])]));
              },
              child: const Text('password'),              
            ),        
          ]
        ),
      ),
    );
  }


}