import 'package:flutter/material.dart';
import '../../globals.dart' as globals;

class HeaderBars extends StatelessWidget implements PreferredSizeWidget {
  const HeaderBars({ this.onBack,this.textBack,Key? key}) : super(key: key);

  final Function? onBack;      
  final String? textBack;

  @override
  Size get preferredSize => const Size.fromHeight(80);

  @override
  Widget build(BuildContext context) {        
    return Container(      
      height: 80,      
      decoration: BoxDecoration(
        border: Border.all(color: globals.baseColor),
        color: globals.baseColor,
      ),
      child: GestureDetector(
        onTap: onBack as void Function()?,            
        child: Row(
          children: [
          const Icon(Icons.arrow_back_ios_new,color: Colors.white,size: 30.0),
          Text(textBack ?? "kosong",style: const TextStyle(color: Colors.white, fontSize: 15.0 ))
          ]
        ),
      )
    );
  }
}