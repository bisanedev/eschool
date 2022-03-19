import 'package:flutter/material.dart';

import 'package:auto_route/auto_route.dart';
import 'package:get_it/get_it.dart';
import '../routes.gr.dart';

GetIt getIt = GetIt.instance;

class BaseScreen extends StatefulWidget {  
  const BaseScreen({Key? key}) : super(key: key);

  @override
  _BaseScreen createState() => _BaseScreen();
}

class _BaseScreen extends State<BaseScreen> {
  final router = getIt<AppRouter>();
  

  @override
  void initState() {            
    super.initState();         
  }

  @override
  Widget build(BuildContext context) {      
    return AutoTabsScaffold(
        routes: [
          AplikasiRouter(),
          PrestasiRouter(),
          ProfileIndex()
        ],
        bottomNavigationBuilder: (_, tabsRouter) {
          return BottomNavigationBar(
            currentIndex: tabsRouter.activeIndex,
            onTap: tabsRouter.setActiveIndex,
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.apps),
                label: 'Aplikasi',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.insights),
                label: 'Prestasi',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person_outline),
                label: "Profil",
              ),
            ],
          );
        },
    );
  }
}