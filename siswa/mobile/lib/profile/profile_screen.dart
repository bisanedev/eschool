import 'package:flutter/material.dart';
import '../globals.dart' as globals;
import '../../components/models/user_model.dart';
import '../screens/coba.dart';

class ProfileScreen extends StatefulWidget {  
  final String? userToken; 
  final UserData? userData;
  final VoidCallback? logOut; 
  const ProfileScreen({Key? key,this.userToken,this.userData,this.logOut}) : super(key: key);        
  @override
  _ProfileScreen createState() => _ProfileScreen();
}

class _ProfileScreen extends State<ProfileScreen> {         

  @override
  void initState() {        
    super.initState();          
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
          color: Colors.grey.withOpacity(0.6),
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
                  padding: EdgeInsets.only(bottom: 3.0,top: 3.0,left: 6.0,right: 6.0),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color:Colors.white,             
                    borderRadius: const BorderRadius.all(Radius.circular(2)),             
                  ), 
                  child:  Text("${widget.userData?.noAbsens}",style: const TextStyle(fontSize:14)),
                )
              )

             
            ]            
          ),
          Expanded(
            child:Padding(
              padding: const EdgeInsets.all(5.0),
              child:Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("${widget.userData?.nama}",overflow: TextOverflow.ellipsis,style: const TextStyle(fontWeight: FontWeight.bold,fontSize:18)),
                  Text("${widget.userData?.kelas}",style: const TextStyle(color:Colors.grey,fontSize:16))
                ],
              ),
            )
         
          )                  
        ],
      ),
    )
  );

  final headerTitle = Container(                  
    color: globals.baseColor,
    width: double.infinity,
    height: double.infinity,
    child: const Padding(
      padding: EdgeInsets.all(20.0),
      child: Align(
        alignment: Alignment.topCenter,
        child: Text("PROFIL",style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize:20)),
      )
    )  
  );

  final bodyMenu = Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      ElevatedButton(onPressed:() {
              Navigator.push(context, MaterialPageRoute(
                builder: (context) => CobaScreen(userToken: widget.userToken,)
              ));
      }, child: const Text('Ganti foto profil')),
      const SizedBox(height: 10.0),  
      ElevatedButton(onPressed:() {
              Navigator.push(context, MaterialPageRoute(
                builder: (context) => CobaScreen(userToken: widget.userToken,)
              ));
      }, child: const Text('Ganti password')),
      const SizedBox(height: 10.0),  
      ElevatedButton(onPressed:widget.logOut, child: const Text('Logout Pak!')),      
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
                  color: Colors.white,
                  width: double.infinity,
                  height: double.infinity,
                  child: bodyMenu,
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
    String userName = widget.userData?.username ?? "kosong";
    String cewek = '${globals.protokol}${globals.serverIP}/assets/images/cewek.png';
    String cowok = '${globals.protokol}${globals.serverIP}/assets/images/cowok.png';
    bool hasFoto = widget.userData?.foto ?? false;
    String jenis = widget.userData?.jenis ?? "p";
    if(hasFoto){
      return '${globals.protokol}${globals.serverIP}/data/siswa/$userName.jpg?nocache=$noCacheProfile++;';
    }else if( jenis == "l"){
        return cowok;      
    }else {
      return cewek;
    }        
  }

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}