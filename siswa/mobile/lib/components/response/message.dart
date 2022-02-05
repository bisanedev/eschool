/* --- models login --*/
class ResponseMessage {  
  final String? message;  
  final bool? status;

  ResponseMessage({this.message,this.status});

  factory ResponseMessage.fromJson(Map<String,dynamic> json) {
    return ResponseMessage(      
      message: json['message'] ?? "kosong",
      status: json['status'] ?? false,
    );
  }
}