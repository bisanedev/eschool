import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart';
import 'dart:async';
import 'dart:convert';
import '../globals.dart' as globals;
import '../components/form/tombol.dart';
import 'login_response.dart';


class LoginScreen extends StatefulWidget {    
  const LoginScreen({Key? key}) : super(key: key);      
  @override
  _LoginScreen createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> {

  final username = TextEditingController();
  final password = TextEditingController();
  Future<LoginResponse>? futureLogin;  
  bool _obscureText = true;
  bool isLoading = false;

  @override  
  void initState() {        
    super.initState();  
  }  

 @override
  Widget build(BuildContext context) {

    final logo = Hero(
      tag: 'Login',
      child: Image.asset('assets/images/logo.png',height: 190,width: 190)
    );

    final usernameInput = TextFormField(
      controller: username,
      keyboardType: TextInputType.text,
      autofocus: false,      
      decoration: InputDecoration(
        hintText: 'Username / NISN',
        fillColor: const Color(0xfff3f3f3),
        filled: true,
        prefixIcon: const Icon(Icons.person),
        contentPadding: const EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
        enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(width: 1, color: Color.fromRGBO(0, 0, 0, 0.125)),
            borderRadius: BorderRadius.circular(0),
        ),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: globals.baseColor),
            borderRadius: BorderRadius.circular(0),
        ),     
      ),      
      inputFormatters: [        
        FilteringTextInputFormatter.allow(RegExp(r'^[a-zA-Z0-9@_.]+$')) 
      ],
    );

    final passwordInput = TextFormField(
      controller: password,
      autofocus: false,      
      obscureText: _obscureText,
      decoration: InputDecoration(        
        hintText: 'Password',
        fillColor: const Color(0xfff3f3f3), 
        filled: true,
        prefixIcon: const Icon(Icons.lock),
        contentPadding: const EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
        enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(width: 1, color: Color.fromRGBO(0, 0, 0, 0.125)),
            borderRadius: BorderRadius.circular(0),
        ),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(width: 1, color: globals.baseColor),
            borderRadius: BorderRadius.circular(0),
        ),      
        suffixIcon: GestureDetector(
          onTap: () { setState(() { _obscureText = !_obscureText;}); },
          child: Icon( _obscureText ? Icons.visibility : Icons.visibility_off,semanticLabel:_obscureText ? 'show password' : 'hide password'),
        ),
      ),
    );

    final loginButton = Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        borderRadius: BorderRadius.circular(30.0),
        shadowColor: globals.baseColor,
        elevation: 5.0,
        child: SimpleElevatedButton( 
          child: isLoading == true ? 
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                  child: CircularProgressIndicator(color: globals.baseColor),
                  height: 18.0,
                  width: 18.0,
              ),
              const SizedBox(width: 10),
              Text("Authentikasi",style:const TextStyle(fontSize: 17,color: Colors.white,fontWeight: FontWeight.bold)),
            ],
          )
          :
          const Text("Authentikasi",style:const TextStyle(fontSize: 17,color: Colors.white,fontWeight: FontWeight.bold)), 
          color: isLoading == true ? globals.baseColor.withOpacity(0.3):globals.baseColor,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          onPressed: () async {
            setState(() {              
              isLoading = true; 
              futureLogin = postLogin(username.text,password.text);
            });
          }
        )
      ),
    );

    final futureBuilder = FutureBuilder<LoginResponse>(
        future: futureLogin,
        builder: (context, snapshot)  {
        if (snapshot.hasError){
          /* --- response ketika koneksi tak terhubung ---*/        
          return const Center(
            child:Text("Jaringan tidak terhubung ke server",style: TextStyle(color: Colors.red))
          );
        }
        else if (snapshot.connectionState == ConnectionState.done && snapshot.hasData) {                       
        /* --- simpan token & userData ---*/        
          if(snapshot.data!.status == true){           
          simpanToken(snapshot.data!.message!.token ?? "");
          simpanUserData(snapshot.data!.message!.user);          
          /* --- Navigate route apps --- */  
            WidgetsBinding.instance!.addPostFrameCallback((_) {                    
              Navigator.pushReplacementNamed(context, '/');
            });
          }else{ 
            /* --- response ketika salah input ,username & password  ---*/                    
            return Center(
                child:Text("${snapshot.data?.pesanError}",style: const TextStyle(color: Colors.red))
            );  
          } 
        }     
        return SizedBox(width: 20,height: 20);        
        },
    );         


    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[
            logo,
            const SizedBox(height: 48.0),            
            usernameInput,
            const SizedBox(height: 8.0),
            passwordInput,
            const SizedBox(height: 15.0),
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
  /* --- simpan userData ---*/
  void simpanUserData(User? userData) async {    
    SharedPreferences prefs = await SharedPreferences.getInstance();    
    prefs.setString('userData', jsonEncode(userData!.toJson()));        
  }   
  /* --- fungsi post data ---*/
  Future<LoginResponse> postLogin(String username,String password) async {
    final response = await http.post(
      Uri.http(globals.serverIP, '/api/siswa/auth'),  
      body: <String, String>{
        'username': username,
        'password': password,
        'remember': 'Yes'       
      },     
    );
    Map<String, dynamic> error = jsonDecode(response.body);
    if (response.statusCode == 200) {
      return LoginResponse.fromJson(jsonDecode(response.body)); 
    }else{
      setState(() { isLoading = false; });
      return LoginResponse(status: false,pesanError: error['message']);
    }       
  }
  //----
}