import 'package:shared_preferences/shared_preferences.dart';
import 'package:auto_route/auto_route.dart';

class CheckIfAuthenticated extends AutoRouteGuard {
  @override
  void onNavigation(NavigationResolver resolver, StackRouter router) async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();    
    //prefs.setString('userToken', "kontol");  
    String? userToken = prefs.getString('userToken') ?? "null";  
    //print(userToken); 
    if(userToken != "null"){    
      resolver.next(true);
    }else{
      router.pushNamed("/login");      
    }
  }
}