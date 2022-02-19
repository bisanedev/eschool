import 'package:flutter/material.dart';
import '../components/widget/header_bars.dart';
import '../components/paint/curve_painter.dart';
import '../components/form/input_password.dart';
import '../components/form/input_button.dart';
import '../globals.dart' as globals;


class PasswordScreen extends StatefulWidget {
  final String? userToken; 
  const PasswordScreen({Key? key,this.userToken}) : super(key: key); 
    @override
  _PasswordScreen createState() => _PasswordScreen();
} 

class _PasswordScreen extends State<PasswordScreen> {  

  final curpassword = TextEditingController();
  final newpassword = TextEditingController();
  final repassword = TextEditingController();
  bool isLoading = false;

  @override
  void initState() {        
    super.initState();        
  }   

  @override
  Widget build(BuildContext context) {

    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    final headerTitle = Stack(
      children: [
        SizedBox(          
          height: 180,
          width: width,
          child: CustomPaint(
            painter: CurvePainter(),
          ),
        ),        
        SizedBox(
          height: 180,
          width: width,          
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const<Widget>[
              Padding(
                padding: EdgeInsets.only(left: 30),
                child: Text("Ganti password",style:TextStyle(fontSize: 25,color: Colors.white,fontWeight: FontWeight.bold))
              ),              
              Padding(
                padding: EdgeInsets.only(left: 30),
                child: Text("Silahkan untuk menganti kata sandi anda",style: TextStyle(fontSize: 13,color: Colors.white)),
              )              
            ],
          ),
        )         

      ],
    );

    return Scaffold(
      appBar: HeaderBars(
        textBack:"Profil",          
        onBack:() { Navigator.pop(context);}
      ),
      body: Container(
        width: width,
        height: height,
        color: Colors.white,
        child: Column(
          children: [
            headerTitle,
            Expanded(
              child: Center(
                child: ListView(
                  shrinkWrap: true,
                  padding: const EdgeInsets.only(left: 24.0, right: 24.0),
                  children: <Widget>[
                    InputPassword(label:"Password saat ini",errorMessage: "password error",placeholder:"Password dipakai saat ini",controller: curpassword),
                    const SizedBox(height: 10.0),
                    InputPassword(label:"Password baru",errorMessage: "password error",placeholder:"kombinasi password baru disini",controller: newpassword),
                    const SizedBox(height: 10.0),
                    InputPassword(label:"Ketik ulang password baru",errorMessage: "password error",placeholder:"konfirmasi kombinasi password baru",controller: repassword),
                    const SizedBox(height: 15.0),
                    InputButton(label:"Perbarui password",color: globals.baseColor, isLoading:isLoading,onPressed: () => {updatePassword()})                  
                  ],
                ),
              )
            )
          ],
        ),
      ),
    );
  }
  /*--- Script here ---*/
  void updatePassword() {
    setState(() {
      isLoading = !isLoading;
    });    
  }

  /* --- find string eror ---*/
  bool checkContains(String? pesan,String cari){
    RegExp exp = RegExp( "\\b" + cari + "\\b", caseSensitive: false, ); 
    bool containe = exp.hasMatch(pesan ?? "null");
    return containe;
  }
  //----

  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}

