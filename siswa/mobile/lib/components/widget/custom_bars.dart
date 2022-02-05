import 'package:flutter/material.dart';

class CustomBars extends StatelessWidget implements PreferredSizeWidget {
      final String? title;   
      final Color? fontColor;   
      final Color? backgroundColor;  
      final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();

      CustomBars({Key? key, @required this.title,this.fontColor,this.backgroundColor}) : super(key: key);      

      @override
      Size get preferredSize => const Size.fromHeight(55);

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          key: _scaffoldKey,
          body: Container( 
            color: backgroundColor,                               
            height: 120,
            child: Stack(
              alignment: Alignment.center,
              fit: StackFit.expand,        
              children: <Widget>[
                Align(
                  alignment: Alignment.center,
                  child:Text(
                    title?? "kosong",
                    style: TextStyle(color: fontColor, fontSize: 20.0 , fontWeight: FontWeight.bold),
                  ),
                )          
              ],
            ),
          ),
        );
      }
    }