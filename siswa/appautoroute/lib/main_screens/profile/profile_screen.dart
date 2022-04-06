import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../../routes.gr.dart';
import '../../globals.dart' as globals;
import '../../components/models/user_model.dart';
import '../../components/paint/profile_painter.dart';

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

  final logoutButton = Positioned(
    top:20,
    right: 10,
    child: InkWell(
      onTap: () => showDialog<String> (
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
      ),
      child: Container(
        padding: const EdgeInsets.all(5.0),
        decoration: const BoxDecoration(
          color:Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(50)),       
        ),
        child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,       
        children:[
          const Icon(Icons.power_settings_new,color: Color(0xFFFF0000),size: 20.0),
          const SizedBox(width: 2),          
          Text("Logout",style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.normal,fontSize:14)),
        ],
      ),
      ),
    ),
  );

  final passwordButton = Positioned(
    top:20,
    right: 90,
    child: InkWell(
      onTap: () => router.push(PasswordRouter(userToken: userToken)),
      child: Container(
        padding: const EdgeInsets.all(5.0),
        decoration: const BoxDecoration(
          color:Colors.white,
          borderRadius:  BorderRadius.all(Radius.circular(50)),       
        ),
        child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,       
        children:[
          Icon(Icons.lock,color: globals.baseColor,size: 20.0),
          const SizedBox(width: 2),          
          Text("Ganti password",style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.normal,fontSize:14)),
        ],
      ),
      ),
    ),
  );

  final fotoProfil = Positioned(
    top:height/5,    
    child:Container(
      height: height*0.342,
      padding: const EdgeInsets.all(5.0),
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
      child: Image.network(userImageUrl()),
    ),
  );

  final namaSiswa = Container(
    margin: const EdgeInsets.symmetric(horizontal: 20.0),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Nama :",style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.normal,fontSize:14)),
        Text("${userData?.nama}",overflow: TextOverflow.ellipsis,style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.bold,fontSize:18)),
      ],
    ),
  );

  final userName = Container(
    margin: const EdgeInsets.symmetric(horizontal: 20.0),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Nomor Induk Siswa Nasional (NISN) :",style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.normal,fontSize:14)),
        Text("${userData?.username}",overflow: TextOverflow.ellipsis,style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.bold,fontSize:18)),
      ],
    ),
  );

  final kelas = Container(
    margin: const EdgeInsets.symmetric(horizontal: 20.0),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Kelas :",style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.normal,fontSize:14)),
        Text("${userData?.kelas}",overflow: TextOverflow.ellipsis,style: TextStyle(color:globals.fontColor,fontWeight: FontWeight.bold,fontSize:18)),
      ],
    ),
  );

  return Scaffold(      
      body: Container(
        width: width,
        height: height,
        color: Colors.white,
        child: Stack(
          alignment: Alignment.center,
          children: [           
            Column(
              children: [
                SizedBox(          
                  height: height*0.4,
                  width: width,
                  child: CustomPaint(
                    painter: ProfilePainter(),
                  ),
                ),
                const SizedBox( height:40),              
                Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,                    
                    children: [
                      namaSiswa,
                      const SizedBox(height: 10),
                      userName,                      
                      const SizedBox(height: 10),
                      kelas
                    ],
                  )
                )
              ]
            ),
            fotoProfil,
            logoutButton,
            passwordButton
          ],
        ),
      )
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
    router.push(const LoginRouter()); 
  }

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}