import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import '../../routes.gr.dart';

GetIt getIt = GetIt.instance;

class AplikasiScreen extends StatefulWidget {  
  const AplikasiScreen({Key? key}) : super(key: key);

  @override
  _AplikasiScreen createState() => _AplikasiScreen();
}

class _AplikasiScreen extends State<AplikasiScreen> {
  final router = getIt<AppRouter>();

  @override
  void initState() {        
    super.initState(); 
    print("aplikasi");     
  }

  @override
  Widget build(BuildContext context) {   
    return Scaffold(   
      body: Center(
        child: Column(
          children: [
            const Text('Hello to Aplikasi Screen'), 
            ElevatedButton(
              onPressed: () {
                router.navigate(const UjianRouter());
              },
              child: const Text('Ujian'),              
            ),        
          ]
        ),
      ),
    );
  }
}