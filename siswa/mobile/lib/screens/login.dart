import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart';
import 'dart:async';
import 'dart:convert';
import '../utils/globals.dart' as globals;


class LoginScreen extends StatefulWidget {          
  @override
  _LoginScreen createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> { 

  final username = TextEditingController();
  final password = TextEditingController();
  Future<Login>? futureLogin;
  bool _obscureText = true;

  @override  
  void initState() {        
    super.initState();     
  }  

  Widget build(BuildContext context) {

    final usernameInput = TextFormField(
      controller: username,
      keyboardType: TextInputType.text,
      autofocus: false,      
      decoration: InputDecoration(
        hintText: 'Username',
        fillColor: Color(0xfff3f3f3),
        filled: true,
        prefixIcon: Icon(Icons.person),
        contentPadding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: Color.fromRGBO(0, 0, 0, 0.125)),
            borderRadius: BorderRadius.circular(0),
        ),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: Color(0xff0191d7)),
            borderRadius: BorderRadius.circular(0),
        ),     
      ),      
      inputFormatters: [        
        FilteringTextInputFormatter.allow( RegExp(r'^[a-zA-Z0-9@_.]+$')) 
      ],
    );

    final passwordInput = TextFormField(
      controller: password,
      autofocus: false,      
      obscureText: _obscureText,
      decoration: InputDecoration(        
        hintText: 'Password',
        fillColor: Color(0xfff3f3f3), 
        filled: true,
        prefixIcon: Icon(Icons.lock),
        contentPadding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: Color.fromRGBO(0, 0, 0, 0.125)),
            borderRadius: BorderRadius.circular(0),
        ),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: Color(0xff0191d7)),
            borderRadius: BorderRadius.circular(0),
        ),      
        suffixIcon: GestureDetector(
          onTap: () { setState(() { _obscureText = !_obscureText;}); },
          child: Icon( _obscureText ? Icons.visibility : Icons.visibility_off,semanticLabel:_obscureText ? 'show password' : 'hide password'),
        ),
      ),
    );

    final loginButton = Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        borderRadius: BorderRadius.circular(30.0),
        shadowColor: Color(0xff0191d7),
        elevation: 5.0,
        child: MaterialButton(
          minWidth: 200.0,
          height: 48.0,
          onPressed: () async {
            setState(() { futureLogin = postLogin(username.text,password.text);});        
          },
          color: Colors.blue,
          child: Text(
            'Login',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );

    final futureBuilder = FutureBuilder<Login>(
        future: futureLogin,
        builder: (context, snapshot)  {
        if (snapshot.hasData)  {          
        /* --- simpan token ---*/
          if(snapshot.data!.status == true){
            simpanToken(snapshot.data?.message ?? "");
            /* --- Navigate route apps --- */  
            WidgetsBinding.instance?.addPostFrameCallback((_) {                    
              Navigator.pushReplacementNamed(context, '/');
            });
          }else{
            /* --- response ketika salah input ,username & password  ---*/          
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
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[            
            usernameInput,
            SizedBox(height: 8.0),
            passwordInput,
            SizedBox(height: 15.0),
            loginButton,
            if(futureLogin != null) futureBuilder
          ],
        ),
      ),
    );

  }
  /* --- simpan token ---*/
  void simpanToken(String userToken) async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('userToken', userToken);    
  }  
  /* --- fungsi post data ---*/
  Future<Login>? postLogin(String username,String password) async {
    final response = await http.post(
      Uri.http(globals.serverIP, '/api/siswa/auth'),  
      body: <String, String>{
        'username': username,
        'password': password,
        'remember': 'Yes'       
      },     
    );
    return Login.fromJson(jsonDecode(response.body));
  }
  //----
}

/* --- models login --*/
class Login {  
  final String? message;  
  final bool? status;

  Login({this.message,this.status});

  factory Login.fromJson(Map<String,dynamic> json) {
    return Login(      
      message: json['message'] ?? "kosong",
      status: json['status'] ?? false,
    );
  }
}
