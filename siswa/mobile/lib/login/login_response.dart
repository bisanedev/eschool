class LoginResponse {
  bool? status;
  Message? message;
  String? pesanError;

  LoginResponse({this.status, this.message , this.pesanError});

  LoginResponse.fromJson(Map<String, dynamic> json) {
    status = json['status'];    
    message = json['message'] != null ? Message.fromJson(json['message']) : null;    
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['status'] = status;    
    if (message != null) {
      data['message'] = message!.toJson();
    }
    return data;
  }
}

class Message {
  User? user;
  String? token;

  Message({this.user, this.token});

  Message.fromJson(Map<String, dynamic> json) {
    user = json['user'] != null ? User.fromJson(json['user']) : null;
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (user != null) {
      data['user'] = user!.toJson();
    }
    data['token'] = token;
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
    final Map<String, dynamic> data = <String, dynamic>{};
    data['nama'] = nama;
    data['username'] = username;
    data['jenis'] = jenis;
    data['foto'] = foto;
    data['kelas'] = kelas;
    data['no_absens'] = noAbsens;
    return data;
  }
}