import 'package:flutter/material.dart';
import '../components/widget/header_bars.dart';
import '../components/paint/curve_painter.dart';


class PasswordScreen extends StatefulWidget {
  final String? userToken; 
  const PasswordScreen({Key? key,this.userToken}) : super(key: key); 
    @override
  _PasswordScreen createState() => _PasswordScreen();
} 

class _PasswordScreen extends State<PasswordScreen> {  

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
        Container(
          color: Colors.transparent,
          height: 180,
          width: width,
          child: CustomPaint(
            painter: CurvePainter(),
          ),
        ),        
        Container(
          height: 180,
          width: width,          
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.only(left: 30),
                child: Text("Ganti password",style: TextStyle(fontSize: 25,color: Colors.white,fontWeight: FontWeight.bold))
              ),              
              const Padding(
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
              child: Container(
                color: Colors.transparent,
                child: const Text("Form Password Disini"),
              )
            )
          ],
        ),
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

