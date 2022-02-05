class ProfileResponse {  
  final Message? message; 
  final bool? status;
  final String? pesanError;

  ProfileResponse({this.message,this.status,this.pesanError});

  factory ProfileResponse.fromJson(Map<String,dynamic> json) {
    return ProfileResponse(                  
      message: Message.fromJson(json['message']),    
      status: json['status'] ?? false,
    );
  }
}
/* --- models profile --*/
class Message {  
  final String? nama;  
  final String? jenis;
  final String? username;
  final bool? foto;
  final String? noAbsens;
  final String? kelas;  

  Message({this.nama,this.jenis,this.username,this.foto,this.noAbsens,this.kelas});

  factory Message.fromJson(Map<String,dynamic> json) {
    return Message(      
      nama: json['nama'] ?? "kosong",
      jenis: json['jenis'] ?? "kosong",
      username: json['username'] ?? "kosong",
      foto: json['foto'] ?? false,
      noAbsens: json['no_absens'] ?? "kosong",
      kelas: json['kelas'] ?? "kosong",
    );
  }
}