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