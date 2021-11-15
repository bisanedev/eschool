import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../utils/globals.dart' as globals;
import '../widget/custom_bars.dart';
import '../response/profile.dart';

class AkunScreen extends StatefulWidget {  
  final String? userToken; 
  final VoidCallback? logOut; 
  const AkunScreen({Key? key,this.userToken,this.logOut}) : super(key: key);        
  @override
  _AkunScreen createState() => _AkunScreen();
}

class _AkunScreen extends State<AkunScreen> {       
  Future<ProfileResponse>? futureProfile;
  ProfileResponse? userProfile;

  @override
  void initState() {        
    super.initState();
    Future.delayed(Duration(milliseconds: 500)).then((_) {
      setState(() {
        futureProfile = getProfile();  
      }); 
    }); 
        
  }   


  @override
  Widget build(BuildContext context) {

     final futureBuilder = FutureBuilder<ProfileResponse>(
        future: futureProfile,
        builder: (context, snapshot)  {
        if (snapshot.hasData)  {          
        /* --- simpan token ---*/
          if(snapshot.data!.status == true){                              
            return Center(
                  child: Text(snapshot.data?.message?.username ?? "sss"),
            );
          }else{
            /* --- response ketika bad request ---*/          
            return Center(
                child:Text("${snapshot.data?.message}",style: TextStyle(color: Colors.red))
            );  
          }                       
        }
        return Container(
          padding: const EdgeInsets.all(8.0),
          child: Center(
            child: CircularProgressIndicator(),
          )              
        );        
        },
    );  

    return Scaffold(
      appBar: CustomBars(title:"Profil",fontColor: Color(0XFF52d9ac)),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children:[
            Text("hello"),
            if(futureProfile != null) futureBuilder,
            ElevatedButton(onPressed:widget.logOut, child: Text('Logout Pak!')),           
          ]
        ),
      ),
    );
  }
  /*--- Script here ---*/
  Future<ProfileResponse>? getProfile() async {
    final response = await http.get(    
      Uri.http(globals.serverIP, '/api/siswa/profile'),      
      headers:{          
          'Authorization': 'Bearer '+widget.userToken.toString(),          
      }
    );
    return ProfileResponse.fromJson(jsonDecode(response.body));
  }
  /*--- End Script Here ---*/
}