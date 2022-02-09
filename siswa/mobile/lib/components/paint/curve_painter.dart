import 'package:flutter/material.dart';
import '../../globals.dart' as globals;

class CurvePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint();
    paint.color = globals.baseColor;
    paint.style = PaintingStyle.fill; 

    var path = Path();

    path.moveTo(0, size.height * 0.6);
    path.quadraticBezierTo(
        size.width / 2, size.height, size.width, size.height * 0.5);
    path.lineTo(size.width, 0);
    path.lineTo(0, 0);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}