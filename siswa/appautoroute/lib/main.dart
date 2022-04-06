import 'package:flutter/material.dart';
import 'package:auto_route/auto_route.dart';
import 'package:get_it/get_it.dart';
import './routes.gr.dart';
import './guard.dart';

GetIt getIt = GetIt.instance;
void main() {
  getIt.registerSingleton<AppRouter>(AppRouter(checkIfAuthenticated:CheckIfAuthenticated()));
  runApp(const MyApp());
}

class MyApp extends StatefulWidget{
  const MyApp({Key? key}) : super(key: key); 
  @override   
  _MyAppState createState() => _MyAppState();  
}

class _MyAppState  extends State<MyApp> {  
  
  @override
  void initState() {
    super.initState();   
  }

  @override
  Widget build(BuildContext context) {
    final router = getIt<AppRouter>();  
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'eSchool Siswa',      
      routerDelegate: AutoRouterDelegate(router),        
      routeInformationParser: router.defaultRouteParser(includePrefixMatches: true),
      theme: ThemeData(      
        primarySwatch: Colors.green,        
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: 'TitilliumWeb',                    
      ),
    );
  }
  
  @override
  void dispose() {    
    super.dispose();
  }

}