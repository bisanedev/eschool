import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../../routes.gr.dart';
import '../../globals.dart' as globals;
import '../../components/models/user_model.dart';
import '../../components/models/user_model.dart';
import './menu_button.dart';

GetIt getIt = GetIt.instance;

class ProfileScreen extends StatefulWidget {   
  const ProfileScreen({Key? key}) : super(key: key);        
  @override
  _ProfileScreen createState() => _ProfileScreen();
}

class _ProfileScreen extends State<ProfileScreen> {         

  final router = getIt<AppRouter>();
  String? userToken;
  UserData? userData;

  @override
  void initState() {        
    super.initState(); 
    getToken();         
  }   


  @override
  Widget build(BuildContext context) {

  double width = MediaQuery.of(context).size.width;
  double height = MediaQuery.of(context).size.height;

  final cardProfile = Positioned(
    top: height/4,
    child: Container(
      height: 150,
      decoration: BoxDecoration(
      color:Colors.white,             
      borderRadius: const BorderRadius.all(Radius.circular(2)),
      boxShadow: [
          BoxShadow(
          color: Colors.grey[300]!,
          blurRadius: 5.0,
          spreadRadius: 0,
          offset: const Offset(0,5),
          ),
        ],
      ),              
      width: width-70,
      child: Row(
        children: [
          Stack(
            children:[
              Image.network(userImageUrl()),
              Positioned(
                bottom: 5,
                left: 5,
                child: Container(                  
                  padding: const EdgeInsets.only(bottom: 3.0,top: 3.0,left: 6.0,right: 6.0),
                  alignment: Alignment.center,
                  decoration: const BoxDecoration(
                    color:Colors.white,             
                    borderRadius: BorderRadius.all(Radius.circular(2)),             
                  ), 
                  child:  Text("${userData?.noAbsens}",style: const TextStyle(fontSize:14)),
                )
              )             
            ]            
          ),
          Expanded(
            child:Padding(
              padding: const EdgeInsets.all(8.0),
              child:Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child:Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text("${userData?.nama}",overflow: TextOverflow.ellipsis,style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.bold,fontSize:18)),
                          Text("${userData?.username}",style: const TextStyle(color:Colors.grey,fontSize:16)),
                        ],
                    ),
                  ),
                  Positioned(
                    bottom: 3,
                    right: 3,
                    child: Container(                  
                      padding: const EdgeInsets.only(bottom: 3.0,top: 3.0,left: 6.0,right: 6.0),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: globals.fontColor,             
                        borderRadius: const BorderRadius.all(Radius.circular(2)),             
                      ), 
                      child: Text("${userData?.kelas}",style: const TextStyle(color:Colors.white,fontSize:14)),
                    )
                  )
                ]
              ),
            )         
          )                  
        ],
      ),
    )
  );

  final headerTitle = Stack(
    children: [    
      Container(     
        decoration: BoxDecoration(          
          color: globals.baseColor,
        ),        
        width: double.infinity,
        height: double.infinity,
        child: const Padding(
          padding: EdgeInsets.only(top:40.0),
          child: Align(
            alignment: Alignment.topCenter,
            child: Text("PROFIL",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize:20)),
          )
        )  
      )
    ],
  );

  final bodyMenu = ListView(
    shrinkWrap: true,
    padding: const EdgeInsets.all(20.0),
    children: [
      MenuButton(
        onPressed:() {
          router.navigate(FotoRouter(userToken: userToken));
        },
        color: globals.baseColor,
        iconData: Icons.photo_camera,
        textData: "Ganti foto profil"
      ),  
      const SizedBox(height: 15.0),
      MenuButton(
        onPressed:() {
          router.navigate(PasswordRouter(userToken: userToken));
        },
        color: globals.baseColor,
        iconData: Icons.lock,
        textData: "Ganti password"
      ), 
      const SizedBox(height: 15.0),
      MenuButton(
        onPressed:() {
          showDialog<String>(
                context: context,
                builder: (BuildContext context) => AlertDialog(
                  title: const Text('Logout'),
                  content: const Text('Apakah anda yakin logout ??'),
                  actions: <Widget>[
                    TextButton(
                      onPressed: () => Navigator.pop(context, 'Cancel'),
                      style: ButtonStyle(backgroundColor: MaterialStateProperty.all(const Color(0xFFe9e9ed))),
                      child: Text('Batal',style: TextStyle(color: globals.fontColor)),
                    ),   
                    TextButton(
                      onPressed: logOut,
                      style: ButtonStyle(backgroundColor: MaterialStateProperty.all(const Color(0xFFFF0000))),
                      child: const Text('Logout',style: TextStyle(color: Colors.white)),
                    ),
                  ],
                ),
          );
        },
        color: const Color(0xFFFF0000),
        iconData: Icons.power_settings_new,
        textData: "Logout"
      ),         
    ]
  );

  return Scaffold(      
      body: Stack(
        alignment: Alignment.center,
        children:<Widget>[                 
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Flexible(
                flex: 2,
                child: headerTitle 
              ),
              Flexible(
                flex: 3,
                child: Container(
                  padding: const EdgeInsets.all(8.0),                 
                  color:  Colors.white,
                  width: double.infinity,
                  height: double.infinity,
                  child: Center(child:bodyMenu),
                ),

              )
            ],
          ),
          cardProfile
        ]
      ),
    );
  }
  /*--- Script here ---*/
  String userImageUrl(){
    int noCacheProfile = 0;
    String userName = userData?.username ?? "kosong";
    String cewek = '${globals.protokol}${globals.serverIP}/assets/images/cewek.png';
    String cowok = '${globals.protokol}${globals.serverIP}/assets/images/cowok.png';
    bool hasFoto = userData?.foto ?? false;
    String jenis = userData?.jenis ?? "p";
    if(hasFoto){
      return '${globals.protokol}${globals.serverIP}/data/siswa/$userName.jpg?nocache=$noCacheProfile++;';
    }else if( jenis == "l"){
        return cowok;      
    }else {
      return cewek;
    }        
  }
    
  void getToken() async {       
    SharedPreferences prefs = await SharedPreferences.getInstance();
    Map<String, dynamic> userMap = jsonDecode(prefs.getString('userData') ?? "");
    setState((){      
      userToken = prefs.getString('userToken') ?? '';
      userData = UserData.fromJson(userMap); 
    });           
  }

  void logOut() async {  
    SharedPreferences prefs = await SharedPreferences.getInstance();           
    await prefs.clear();    
    router.navigate(const LoginRouter()); 
  }

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}