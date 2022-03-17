import 'package:auto_route/auto_route.dart';
import './guard.dart';
import 'main_screens/base.dart';
import 'main_screens/aplikasi/aplikasi_screen.dart';
import 'main_screens/login/login_screen.dart';
import 'main_screens/prestasi/prestasi_screen.dart';
import 'main_screens/profile/profile_screen.dart';
import 'main_screens/profile/password_screen.dart';
import 'aplikasi/ujian.dart';

@AdaptiveAutoRouter(
  replaceInRouteName: 'Page,Route',
  routes: <AutoRoute>[
    AutoRoute(path: "/login",name: "LoginRouter",page: LoginScreen),
    AutoRoute(
      path: "/",
      name: "BaseRouter",
      page: BaseScreen,
      guards: [CheckIfAuthenticated],
      initial: true,
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
          name: "ProfileRouter",
          page: EmptyRouterPage,          
          children: [
            AutoRoute(
              path: '',              
              page: ProfileScreen,                  
            ),
            AutoRoute(
              path: "password",
              name: "PasswordRouter",
              page: PasswordScreen,    
            ),
          ]
        ),     
      ]
    ),
    AutoRoute(path: "/ujian",name: "UjianRouter",page: UjianScreen,guards: [CheckIfAuthenticated]),
  ],
)
class $AppRouter {}