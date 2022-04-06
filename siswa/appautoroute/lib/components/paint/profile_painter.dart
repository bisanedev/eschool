import 'package:flutter/material.dart';
import '../../globals.dart' as globals;

class ProfilePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint();
    paint.color = globals.baseColor;
    paint.style = PaintingStyle.fill;

    var path = Path();

    path.moveTo(0, size.height );
    path.quadraticBezierTo(size.height, size.height * 0.9, size.width* 2, size.width * 0.4);
    path.lineTo(size.width, 0);
    path.lineTo(0, 0);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}