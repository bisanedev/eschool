import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../routes.gr.dart';

GetIt getIt = GetIt.instance;

class LoginScreen extends StatefulWidget {       
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreen createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> {
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
            const Text('Hello to login Screen'),
             ElevatedButton(
              onPressed: () {
                simpanToken("testing");                 
              },
              child: const Text('Login'),              
            ),                     
          ]
        ),
      ),
    );
  }
  // script
  void simpanToken(String userToken) async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('userToken', userToken);    
    router.replace(const BaseRouter(children: [AplikasiRouter()]));
  } 
  
  @override
  void dispose() {    
    super.dispose();
  }
}