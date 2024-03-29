import 'package:auto_route/auto_route.dart';
import 'package:flutter/widgets.dart';
import './guard.dart';
import 'main_screens/base.dart';
import 'main_screens/aplikasi/aplikasi_screen.dart';
import 'main_screens/login/login_screen.dart';
import 'main_screens/prestasi/prestasi_screen.dart';
import 'main_screens/profile/profile_screen.dart';
import 'main_screens/profile/password_screen.dart';
import 'main_screens/profile/foto_screen.dart';
import 'aplikasi/ujian.dart';

@AdaptiveAutoRouter(
  replaceInRouteName: 'Page,Route',
  routes: <AutoRoute>[
    AutoRoute(path: "/login",name: "LoginRouter",page: LoginScreen),
    AutoRoute(
      path: "/",
      name: "BaseRouter",
      page: BaseScreen,   
      initial: true,
       guards: [CheckIfAuthenticated],
      children:[
        AutoRoute(
          path: "aplikasi",
          name: "AplikasiRouter",         
          page: AplikasiScreen         
        ),
        AutoRoute(
          path: "prestasi",
          name: "PrestasiRouter",           
          page: PrestasiScreen
        ),
        AutoRoute(
          path: "profile", 
          name: "ProfileIndex",                 
          page: EmptyRouterPage,          
          children: [
            AutoRoute(
              path: '',
              name: "ProfileRouter",                                          
              page: ProfileScreen,                         
            ),
            AutoRoute(
              path: "password",
              name: "PasswordRouter",
              page: PasswordScreen                                       
            ),
            AutoRoute(
              path: "foto",
              name: "FotoRouter",
              page: FotoScreen,    
            ),
          ]
        ),
        RedirectRoute(path: '*', redirectTo: '/')     
      ]
    ),
    AutoRoute(path: "/ujian",name: "UjianRouter",page: UjianScreen,guards: [CheckIfAuthenticated]),
  ],
)
class $AppRouter {}

class EmptyRouterPage extends AutoRouter {
  const EmptyRouterPage({Key? key}) : super(key: key);
}