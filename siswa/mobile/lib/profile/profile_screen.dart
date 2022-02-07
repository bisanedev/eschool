import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import '../../components/utils/globals.dart' as globals;
import '../../components/models/user_model.dart';

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

    return Scaffold(      
      body: Stack(
        alignment: Alignment.center,
        children:<Widget>[
          Container(
            padding: const EdgeInsets.all(16.0),
            color: Colors.white,
            width: width,
            height: height,
            child: Text("tinggi ${height}"),
          ),
          Positioned(
            top: height/4,            
            child: Container(
              height: 180,
              decoration: BoxDecoration(                  
                color:Colors.white,             
                borderRadius: BorderRadius.all(Radius.circular(2)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.6),
                    blurRadius: 5.0,
                    spreadRadius: 0,
                    offset: Offset(0,5),
                  ),
                ],
              ),              
              width: width-60,
              child: Row(                      
                children: [
                  Image.network('http://'+globals.serverIP+'/data/siswa/adisty.jpg'),    
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text("${widget.userData?.nama}"),
                          Text("${widget.userData?.kelas}")
                        ],
                      )
                    )                  
                ],
              ),
            )
          )

        ]
      ),
    );
  }
  /*--- Script here ---*/
 

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}