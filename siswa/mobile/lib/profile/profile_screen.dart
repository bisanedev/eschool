import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../../components/utils/globals.dart' as globals;
import '../../components/widget/custom_bars.dart';
import '../../components/response/profile.dart';

class ProfileScreen extends StatefulWidget {  
  final String? userToken; 
  final VoidCallback? logOut; 
  const ProfileScreen({Key? key,this.userToken,this.logOut}) : super(key: key);        
  @override
  _ProfileScreen createState() => _ProfileScreen();
}

class _ProfileScreen extends State<ProfileScreen> {       
  Future<ProfileResponse>? futureProfile;
  ProfileResponse? userProfile;  

  @override
  void initState() {        
    super.initState();    
    Future.delayed(Duration(milliseconds: 500)).then((_) {       
      setState(() {
          //futureProfile = getProfile();  
      });       
    }); 
        
  }   


  @override
  Widget build(BuildContext context) {

     final futureBuilder = FutureBuilder<ProfileResponse>(
        future: futureProfile,
        builder: (context, snapshot)  {
        if (snapshot.connectionState == ConnectionState.done && snapshot.hasData) {        
        /* --- simpan token ---*/                
          if(snapshot.data?.status == true){                              
            return Center(
                  child: Text(snapshot.data?.message?.nama ?? "sss"),
            );
          }else{            
            /* --- response ketika bad request ---*/          
            return Center(
                child:Text("${snapshot.data?.pesanError}",style: TextStyle(color: Colors.red))
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
    final Map<String, String> queryParameters = <String, String>{
      'nocache': DateTime.now().millisecondsSinceEpoch.toString(),
    };
    final response = await http.get(    
      Uri.http(globals.serverIP, "/api/siswa/profile", queryParameters),      
      headers:{          
          'Authorization': 'Bearer '+widget.userToken.toString(),          
      }
    ); 
    Map<String, dynamic> error = jsonDecode(response.body);
    if (response.statusCode == 200) {
      return ProfileResponse.fromJson(jsonDecode(response.body)); 
    }else{      
      return ProfileResponse(status: false,pesanError: error['message']);
    }         
  } 

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}