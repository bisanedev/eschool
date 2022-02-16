import 'package:flutter/material.dart';

class InputButton extends StatelessWidget {
  const InputButton(
      {required this.label,
      this.color,
      this.iconData,
      required this.onPressed,
      this.padding = const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      Key? key})
      : super(key: key);
  final String? label;
  final Color? color;
  final IconData? iconData;
  final Function onPressed;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: onPressed as void Function()?,
      icon: Icon(iconData),
      label: Text(label ?? "kosong",style:TextStyle(fontSize: 18,color: Colors.white,fontWeight: FontWeight.bold)),
      style: ElevatedButton.styleFrom(primary: color, padding: padding),
    );
  }
}