import 'package:flutter/material.dart';
import '../../globals.dart' as globals;

class InputPassword extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? errorMessage;
  final TextEditingController? controller;

  const InputPassword({this.label,this.placeholder,this.errorMessage,this.controller,Key? key}): super(key: key);
  @override
  _InputPassword createState() => _InputPassword();
}

class _InputPassword extends State<InputPassword> {  
    
  bool _obscureText = true;

  @override
  void initState() {        
    super.initState();        
  }   

  @override
  Widget build(BuildContext context) {    
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(widget.label ?? "kosong",style:TextStyle(fontSize: 17,color: globals.fontColor,fontWeight: FontWeight.bold)),
        TextFormField(
          controller: widget.controller,
          autofocus: false,      
          obscureText: _obscureText,
          cursorColor: globals.baseColor,          
          decoration: InputDecoration(        
            hintText: widget.placeholder,
            errorText: widget.errorMessage,
            fillColor: const Color(0xfff3f3f3), 
            filled: true,        
            contentPadding: const EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0),
            enabledBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1, color: Color.fromRGBO(0, 0, 0, 0.125)),
                borderRadius: BorderRadius.circular(0),
            ),
            focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(width: 1, color: globals.baseColor),
                borderRadius: BorderRadius.circular(0),
            ), 
            errorBorder:OutlineInputBorder(
              borderSide: const BorderSide(width: 1, color: Colors.red),
              borderRadius: BorderRadius.circular(0),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderSide: const BorderSide(width: 1, color: Colors.red),
              borderRadius: BorderRadius.circular(0),
            ),     
            suffixIcon: GestureDetector(
              onTap: () { setState(() { _obscureText = !_obscureText;}); },
              child: Icon( _obscureText ? Icons.visibility : Icons.visibility_off,semanticLabel:_obscureText ? 'show password' : 'hide password',color: globals.baseColor),
            ),
          ),
        )
      ],
    );
  }
  /*--- Script here ---*/


  @override
  void dispose() {    
    super.dispose();
  }
  /*--- End Script Here ---*/
}