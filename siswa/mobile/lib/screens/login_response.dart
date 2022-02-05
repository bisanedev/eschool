class LoginResponse {
  bool? status;
  Message? message;
  String? pesanError;

  LoginResponse({this.status, this.message , this.pesanError});

  LoginResponse.fromJson(Map<String, dynamic> json) {
    status = json['status'];    
    message = json['message'] != null ? new Message.fromJson(json['message']) : null;    
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['status'] = this.status;    
    if (this.message != null) {
      data['message'] = this.message!.toJson();
    }
    return data;
  }
}

class Message {
  User? user;
  String? token;

  Message({this.user, this.token});

  Message.fromJson(Map<String, dynamic> json) {
    user = json['user'] != null ? new User.fromJson(json['user']) : null;
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.user != null) {
      data['user'] = this.user!.toJson();
    }
    data['token'] = this.token;
    return data;
  }
}

class User {
  String? nama;
  String? username;
  String? jenis;
  bool? foto;
  String? kelas;
  String? noAbsens;

  User(
      {this.nama,
      this.username,
      this.jenis,
      this.foto,
      this.kelas,
      this.noAbsens});

  User.fromJson(Map<String, dynamic> json) {
    nama = json['nama'];
    username = json['username'];
    jenis = json['jenis'];
    foto = json['foto'];
    kelas = json['kelas'];
    noAbsens = json['no_absens'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['nama'] = this.nama;
    data['username'] = this.username;
    data['jenis'] = this.jenis;
    data['foto'] = this.foto;
    data['kelas'] = this.kelas;
    data['no_absens'] = this.noAbsens;
    return data;
  }
}