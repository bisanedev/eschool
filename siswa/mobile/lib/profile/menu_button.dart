import 'package:flutter/material.dart';
import '../globals.dart' as globals;

class MenuButton extends StatelessWidget {
  const MenuButton({ this.onPressed,this.iconData,this.textData,this.color,Key? key}) : super(key: key);

  final Function? onPressed;  
  final IconData? iconData;
  final String? textData;
  final Color? color;

  @override
  Widget build(BuildContext context) { 
    double width = MediaQuery.of(context).size.width;   
    return InkWell(
      onTap: onPressed as void Function()?,
      child: Container(        
        height: 54,
        width: width-120,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(5),                           
          boxShadow: [
           BoxShadow(
              color: Colors.grey[300]!,
              blurRadius: 5.0,
              spreadRadius: 0,
              offset: const Offset(0,5),
            ),
          ]
        ),
        child: Row(      
          crossAxisAlignment: CrossAxisAlignment.center,        
          children: [
            Container(
              height: double.maxFinite,
              width: 45,              
              decoration: BoxDecoration(
                color: color,
                borderRadius: const BorderRadius.only(topLeft: Radius.circular(5.0),bottomLeft:Radius.circular(5.0)),
              ),
              child:Icon(
                iconData,
                color: Colors.white,
                size: 24.0,
              ),
            ),            
            Expanded(              
              child:Container(
                alignment: Alignment.center,
                color: const Color(0xfff3f3f3),
                child: Text(textData ?? "kosong",style: TextStyle(fontWeight: FontWeight.bold,color: globals.fontColor,fontSize: 18)),
              )
            )          
          ]
        ),
      ),
    );
  }
}