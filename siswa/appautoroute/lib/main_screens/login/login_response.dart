class LoginResponse {
  LoginResponse({
    required this.status,
    required this.message,
    required this.pesanError,
  });
  LoginResponse.withoutMessage({
    required this.status,    
    required this.pesanError,
  });
  late final bool status;
  late final Message message;
  late final String pesanError;
  
  LoginResponse.fromJson(Map<String, dynamic> json){
    status = json['status'];
    message = Message.fromJson(json['message']);
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['status'] = status;
    _data['message'] = message.toJson();
    return _data;
  }
}

class Message {
  Message({
    required this.user,
    required this.token,
  });
  late final User user;
  late final String token;
  
  Message.fromJson(Map<String, dynamic> json){
    user = User.fromJson(json['user']);
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['user'] = user.toJson();
    _data['token'] = token;
    return _data;
  }
}

class User {
  User({
    required this.nama,
    required this.username,
    required this.jenis,
    required this.foto,
    required this.kelas,
    required this.noAbsens,
  });
  late final String nama;
  late final String username;
  late final String jenis;
  late final bool foto;
  late final String kelas;
  late final String noAbsens;
  
  User.fromJson(Map<String, dynamic> json){
    nama = json['nama'];
    username = json['username'];
    jenis = json['jenis'];
    foto = json['foto'];
    kelas = json['kelas'];
    noAbsens = json['no_absens'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['nama'] = nama;
    _data['username'] = username;
    _data['jenis'] = jenis;
    _data['foto'] = foto;
    _data['kelas'] = kelas;
    _data['no_absens'] = noAbsens;
    return _data;
  }
}