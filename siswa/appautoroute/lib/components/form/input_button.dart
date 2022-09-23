import 'package:flutter/material.dart';

class InputButton extends StatelessWidget {
  const InputButton({required this.label,this.color,this.isLoading = false,required this.onPressed,this.padding = const EdgeInsets.symmetric(horizontal: 24, vertical: 16),Key? key}): super(key: key);
  final String? label;
  final Color? color;
  final bool? isLoading;
  final Function onPressed;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed as void Function()?,      
      child: isLoading == true ? 
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
                child: CircularProgressIndicator(backgroundColor:Colors.white,valueColor:AlwaysStoppedAnimation<Color>(color ?? Colors.grey)),
                height: 18.0,
                width: 18.0,
            ),            
            const SizedBox(width: 10),
            Text(label ?? "kosong",style:const TextStyle(fontSize: 17,color: Colors.white,fontWeight: FontWeight.bold)),
          ],
        )
        :
        Text(label ?? "kosong",style:const TextStyle(fontSize: 17,color: Colors.white,fontWeight: FontWeight.bold)),
      style: ElevatedButton.styleFrom(backgroundColor: isLoading == true ? color!.withOpacity(0.8):color, padding: padding),
    );
  }
}