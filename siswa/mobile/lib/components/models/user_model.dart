class UserData {
  String? nama;
  String? username;
  String? jenis;
  bool? foto;
  String? kelas;
  String? noAbsens;

  UserData(
      {this.nama,
      this.username,
      this.jenis,
      this.foto,
      this.kelas,
      this.noAbsens});

  UserData.fromJson(Map<String, dynamic> json) {
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