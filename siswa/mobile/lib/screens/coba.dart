import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'globals.dart' as globals;

class CobaScreen extends StatefulWidget {
  final String? userToken; 
  const CobaScreen({Key? key,this.userToken}) : super(key: key); 
    @override
  _CobaScreen createState() => _CobaScreen();
} 

class _CobaScreen extends State<CobaScreen> {  
  Future<ResponseCoba>? futureCoba;

  @override
  void initState() {        
    super.initState();    
    Future.delayed(Duration(milliseconds: 500)).then((_) {       
      setState(() {
          futureCoba = getData();  
      });       
    }); 
        
  }   

  @override
  Widget build(BuildContext context) {

    final futureBuilder = FutureBuilder<ResponseCoba>(
        future: futureCoba,
        builder: (context, snapshot)  {
        if (snapshot.connectionState == ConnectionState.done && snapshot.hasData) {        
        /* --- simpan token ---*/                
          if(snapshot.data?.status == true){                              
            return Center(
                  child: Text(snapshot.data?.message?[0]),
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

    return MaterialApp(
      title: 'Welcome to Screen Coba',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Coba Header'),
        ),
        body: Center(
          child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children:[
            ElevatedButton(onPressed: () { Navigator.pop(context);}, child: Text('Go back!')),
            Text(widget.userToken?? "meow")
          ]
        ),
        ),
      ),
    );
  }
  /*--- Script here ---*/
  Future<ResponseCoba>? getData() async {    
    final Map<String, String> queryParameters = <String, String>{
      'nocache': DateTime.now().millisecondsSinceEpoch.toString(),
    };
    final response = await http.get(    
      Uri.http(globals.serverIP, "/api/siswa/test", queryParameters),      
      headers:{          
          'Authorization': 'Bearer '+widget.userToken.toString(),          
      }
    ); 
    Map<String, dynamic> error = jsonDecode(response.body);
    if (response.statusCode == 200) {
      return ResponseCoba.fromJson(jsonDecode(response.body)); 
    }else{      
      return ResponseCoba(status: false,message: error['message']);
    }         
  } 

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}

/* --- models login --*/
class ResponseCoba {  
  final List<dynamic>? message;  
  final bool? status;

  ResponseCoba({this.message,this.status});

  factory ResponseCoba.fromJson(Map<String,dynamic> json) {
    return ResponseCoba(      
      message: json['message'],
      status: json['status'] ?? false,
    );
  }
}