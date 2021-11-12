import 'package:flutter/material.dart';
import '../utils/globals.dart' as globals;
import '../widget/custom_bars.dart';

class AkunScreen extends StatefulWidget {  
  final String? userToken;  
  const AkunScreen({Key? key,this.userToken}) : super(key: key);        
  @override
  _AkunScreen createState() => _AkunScreen();
}

class _AkunScreen extends State<AkunScreen> {       

  @override
  void initState() {        
    super.initState();         
  }   


  @override
  Widget build(BuildContext context) {
   

    return Scaffold(
      appBar: CustomBars(title:"hahahah"),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children:[
            Text("hello"),
            Text("Apa Kabar"),
            Text(widget.userToken?? "meow")
          ]
        ),
      ),
    );
  }
  /*--- Script here ---*/

  /*--- End Script Here ---*/
}