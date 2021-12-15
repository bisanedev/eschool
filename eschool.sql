-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2021 at 06:13 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eschool`
--

-- --------------------------------------------------------

--
-- Table structure for table `quiz_banksoal_essay`
--

CREATE TABLE `quiz_banksoal_essay` (
  `id` int(50) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `pertanyaan_text` text NOT NULL,
  `pertanyaan_images` varchar(30) NOT NULL,
  `pertanyaan_tex` text NOT NULL,
  `pertanyaan_audio` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_banksoal_essay`
--

INSERT INTO `quiz_banksoal_essay` (`id`, `tingkatan_id`, `mapel_id`, `semester_id`, `pertanyaan_text`, `pertanyaan_images`, `pertanyaan_tex`, `pertanyaan_audio`) VALUES
(7, 2, 9, 1, '&lt;p&gt;Pisang sangat bermanfaat bagi kehidupan manusia. Buah kuning ini mengandung zat yang sangat berguna seperti potasium, potasium, gula dan lainnya. Zat ini sangat bermanfaat dalam tubuh. Sebagai contoh, banyak gula dapat digunakan sebagai sumber energi bagi tubuh. Pisang ditanam di tanah subur dan memiliki sumber air. Pisang tidak hanya mengandung zat-zat bermanfaat, mereka juga menghasilkan hormon endorphin.Hormon-hormon ini memberikan kenyamanan bagi mereka yang mengkonsumsinya. &lt;/p&gt;&lt;p&gt;Kalimat-kalimat sumbang ada dalam kalimat? &lt;/p&gt;', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_banksoal_pilihan`
--

CREATE TABLE `quiz_banksoal_pilihan` (
  `id` int(50) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `pertanyaan_text` text NOT NULL,
  `pertanyaan_images` varchar(30) NOT NULL,
  `pertanyaan_tex` text NOT NULL,
  `pertanyaan_audio` varchar(30) NOT NULL,
  `pilihan` text NOT NULL,
  `jawaban` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_banksoal_pilihan`
--

INSERT INTO `quiz_banksoal_pilihan` (`id`, `tingkatan_id`, `mapel_id`, `semester_id`, `pertanyaan_text`, `pertanyaan_images`, `pertanyaan_tex`, `pertanyaan_audio`, `pilihan`, `jawaban`) VALUES
(72, 2, 9, 1, '&lt;p&gt;1. Menyusun berita dengan mempergunakan bahasa yang singkat dan jelas.&lt;br/&gt;2. Pencarian sumber berita (pengamatan langsung, wawancara, bahan berita)&lt;br/&gt;3. Melakukan wawancara yang bersifat informatif untuk memperoleh fakta,&lt;br/&gt;4. Menemukan pokok-pokok dari hasil yang diperoleh wawancara,&lt;br/&gt;5. Penentuan peristiwa atau kejadian suatu perkara&lt;br/&gt;6. Menyunting naskah berita sesuai dengan EYD.&lt;br/&gt;&lt;br/&gt;Urutan yang tepat dari langkah-langkah menulis berita adalah…. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (2), (3), (4), (1), (6) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (3), (2), (4), (6), (1) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(1), (2), (3), (5), (4), (6) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (2), (3), (6), (4), (1) &lt;/p&gt;\"}]', '[0]'),
(73, 2, 9, 1, '&lt;p&gt;Dibawah yang termasuk kedalam fungsi dari sebuah judul adalah,kecuali … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Untuk Memberi kepadatan isi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Merangkum isi cerita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Menserasikan/mempercantik perwajahan surat kabar &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Melukiskan suasana berita &lt;/p&gt;\"}]', '[0]'),
(74, 2, 9, 1, '&lt;p&gt;Yang termasuk ke dalam jenis softnews adalah ….. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Profil atau kisah kesuksesan seseorang &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Editorial &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Fotografer &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Pencahayaan &lt;/p&gt;\"}]', '[0]'),
(75, 2, 9, 1, '&lt;p&gt;Suatu informasi baru yang diinformasikan melalui koran, majalah, telivisi dan alat-alat media lainnya disebut …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;gosip &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;berita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;iklan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;promosi &lt;/p&gt;\"}]', '[1]'),
(76, 2, 9, 1, '&lt;p&gt;Syarat yang harus dipenuhi dalam penyusunan sebuah berita, kecuali …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;fiksi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;aktual &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;berimbang &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;lengkap &lt;/p&gt;\"}]', '[0]'),
(77, 2, 9, 1, '&lt;p&gt;Perhatikan teks berikut &lt;/p&gt;&lt;p&gt;Butuh dana cepat? Proses cepat cukup memakai BPKB …..&lt;br/&gt;&lt;br/&gt;Pelengkap iklan baris tersebut yang paling tepat adalah.. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Hub. Saprol, Gang Kebo No. 31 &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Telepon Haji Sobirin kapan saja &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Hub. 085809904533 &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Cari alamat berikut. Subur makmur. Bandar Lampung City. 🤓&lt;/p&gt;\"}]', '[2]'),
(78, 2, 9, 1, '&lt;p&gt;Sebuah pesan menarik tentang sebuah produk atau jasa yang ditujukan untuk para khalayak disebut …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;berita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;iklan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;gosip &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;pameran &lt;/p&gt;\"}]', '[1]'),
(79, 2, 9, 1, '&lt;p&gt;Produk atau jasa agar lebih dikenal oleh banyak masyarakat, merupakan …. dari iklan. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;tujuan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;manfaat &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;kesimpulan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;pesan &lt;/p&gt;\"}]', '[1]'),
(80, 2, 9, 1, '&lt;p&gt;Perhatikan kutipan teks berikut! &lt;/p&gt;&lt;p&gt;Kamarku lumayan luas dan tertata sangat rapi. Di dekat jendela kamarku&lt;br/&gt;terdapat sebuah tempat tidur kayu sengon. Kasur di tempat tidur itu ditutupi seprei dengan motif pelangi. Meja belajar dengan rak buku tersusun sangat rapi di sebelah kiri tempat tidur. [….] Lemari itu memiliki kaca dan berwarna hijau muda.&lt;br/&gt;Kalimat yang tepat untuk melengkapi paragraf deskripsi tersebut adalah…. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Meja rias dan alat-alat kecantikan terletak di sudut kamar. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Aku memiliki beberapa pakaian yang digantung di belakang pintu. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Di lantai kamar terbentang permadani bermotif batik sumatra. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Sebuah lemari pakaian diletakkan di sebelah kanan meja belajar. &lt;/p&gt;\"}]', '[3]'),
(81, 2, 9, 1, '&lt;p&gt;Bacalah dengan cermat! &lt;/p&gt;&lt;p&gt;Tahapan-tahapan menulis yakni sebagai berikut: &lt;/p&gt;&lt;ul&gt;&lt;li&gt;Pertama, tentukan topik. &lt;/li&gt;&lt;li&gt;Kedua,kumpulkan data. &lt;/li&gt;&lt;li&gt;Ketiga, buat kerangka karangannya terlebih dahulu. &lt;/li&gt;&lt;li&gt;Keempat, kembangkan kerangka menjadi tulisan. &lt;/li&gt;&lt;li&gt;Kelima, tentukan judul karangan.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br/&gt;Jenis teks eksposisi diatas adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt; sebab-akibat &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;definisi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;perbandingan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;proses &lt;/p&gt;\"}]', '[3]'),
(82, 2, 9, 1, '&lt;p&gt;Bacalah dengan cermat!&lt;br/&gt;Setiap orang memiliki kesukaan membaca yang berbeda-beda. Hal ini &lt;br/&gt;disebabkan biasanya karena adanya perbedaan umur, jenis kelamin, tingkat&lt;br/&gt; pendidikan, atau profesi yang berbeda. Selain itu juga, bisa juga &lt;br/&gt;disebabkan oleh tujuan membaca yang berbeda. &lt;/p&gt;&lt;p&gt;Hal yang dibicarakan dalam teks tersebut adalah … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Perbedaan setiap orang dalam memilih tempat membaca. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Alasan orang untuk membaca bermacam-macam buku &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Penyebab orang membaca bermacam-macam buku. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Perbedaan setiap orang dalam memilih bacaan. &lt;/p&gt;\"}]', '[3]'),
(84, 2, 9, 1, '&lt;p&gt;Bacalah puisi berikut! &lt;/p&gt;&lt;p&gt;&lt;em&gt;Wahai sahabat&lt;br/&gt;Untuk selamanya&lt;br/&gt;Kita percaya&lt;br/&gt;Tebarkan arah jangan pernah lelah&lt;br/&gt;Untukmu sahabat &lt;/em&gt;&lt;/p&gt;&lt;p&gt;Tema puisi diatas adalah ….. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Persahabatan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Permusuhan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Perdamaian &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Percintaan &lt;/p&gt;\"}]', '[0]'),
(85, 2, 9, 1, '&lt;p&gt;Bacalah puisi berikut! &lt;/p&gt;&lt;p&gt;&lt;em&gt;Wahai sahabat&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Untuk selamanyaKita percaya&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Tebarkan arah jangan pernah lelah&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Untukmu sahabat &lt;/em&gt; &lt;/p&gt;&lt;p&gt;Suasana yang terbangun didalam puisi diatas adalah … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;sedih &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;emosi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;gembira &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;penuh semangat &lt;/p&gt;\"}]', '[3]'),
(86, 2, 9, 1, '&lt;p&gt;Tujuan puisi salah satunya adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;menyampaikan pesan atau kritikan yang sifatnya membangun &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;mencari kesenangan pribadi saja &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;luapan hati&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;meberikan kesimpulan masalah &lt;/p&gt;\"}]', '[0]'),
(87, 2, 9, 1, '&lt;p&gt;Berikut ini merupakan jenis-jenis puisi,kecuali …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt; puisi majemuk &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;puisi lama &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;puisi kontemporer &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt; puisi baru &lt;/p&gt;\"}]', '[0]');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_exam`
--

CREATE TABLE `quiz_exam` (
  `id` int(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `mulai` datetime NOT NULL,
  `selesai` datetime NOT NULL,
  `paket_soal` varchar(300) NOT NULL,
  `kisi_exam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_exam_jawabansiswa`
--

CREATE TABLE `quiz_exam_jawabansiswa` (
  `id` int(50) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `siswa_id` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `diterbitkan` tinyint(1) NOT NULL,
  `jawaban_pilihan` text NOT NULL,
  `jawaban_essay` text NOT NULL,
  `benar_pilihan` varchar(30) NOT NULL,
  `benar_essay` varchar(30) NOT NULL,
  `nilai_pilihan` varchar(30) NOT NULL,
  `nilai_essay` varchar(30) NOT NULL,
  `nilai_total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_paketsoal`
--

CREATE TABLE `quiz_paketsoal` (
  `id` int(50) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `acak_soal` tinyint(1) NOT NULL,
  `bobot_pilihan` int(11) NOT NULL,
  `bobot_essay` int(11) NOT NULL,
  `pilihan_terpilih` text NOT NULL,
  `essay_terpilih` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_kelasnama`
--

CREATE TABLE `sekolah_kelasnama` (
  `id` int(11) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_kelasnama`
--

INSERT INTO `sekolah_kelasnama` (`id`, `tingkatan_id`, `nama`) VALUES
(1, 1, 'Kelas 7A'),
(2, 1, 'Kelas 7B'),
(3, 2, 'Kelas 8A'),
(4, 2, 'Kelas 8B'),
(15, 15, 'Kelas 9A');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_kelastingkatan`
--

CREATE TABLE `sekolah_kelastingkatan` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_kelastingkatan`
--

INSERT INTO `sekolah_kelastingkatan` (`id`, `nama`) VALUES
(1, 'Kelas 7'),
(2, 'Kelas 8'),
(15, 'Kelas 9');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_mapel`
--

CREATE TABLE `sekolah_mapel` (
  `id` int(11) NOT NULL,
  `nama` varchar(60) NOT NULL,
  `color` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_mapel`
--

INSERT INTO `sekolah_mapel` (`id`, `nama`, `color`) VALUES
(1, 'Matematika', '#426131'),
(2, 'IPA', '#a02ba5'),
(3, 'Fisika', '#5f4d92'),
(6, 'Biologi', '#1047c2'),
(7, 'Kimia', '#1acf5d'),
(8, 'Bahasa Inggris', '#11d2cd'),
(9, 'Bahasa Indonesia', '#9fd211'),
(10, 'Seni dan Prakarya', '#d24811');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_semesternama`
--

CREATE TABLE `sekolah_semesternama` (
  `id` int(11) NOT NULL,
  `semester_tahun_id` int(11) NOT NULL,
  `semester` int(6) NOT NULL,
  `semester_start` date NOT NULL,
  `semester_end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_semesternama`
--

INSERT INTO `sekolah_semesternama` (`id`, `semester_tahun_id`, `semester`, `semester_start`, `semester_end`) VALUES
(1, 3, 1, '2021-07-01', '2021-12-25'),
(2, 3, 2, '2022-01-01', '2022-07-10');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_semestertahun`
--

CREATE TABLE `sekolah_semestertahun` (
  `id` int(11) NOT NULL,
  `nama` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_semestertahun`
--

INSERT INTO `sekolah_semestertahun` (`id`, `nama`) VALUES
(3, 'TA 2021/2022');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_siswa`
--

CREATE TABLE `sekolah_siswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `jenis` varchar(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `foto` tinyint(1) NOT NULL,
  `no_absens` int(11) NOT NULL,
  `kelas_id` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `expired_token` int(11) DEFAULT NULL,
  `unique_token` varchar(15) DEFAULT NULL,
  `device_token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_siswa`
--

INSERT INTO `sekolah_siswa` (`id`, `nama`, `jenis`, `username`, `foto`, `no_absens`, `kelas_id`, `password`, `expired_token`, `unique_token`, `device_token`) VALUES
(1, 'Adisty Titania', 'p', 'adisty', 1, 1, 1, '$2a$10$pR9ZEuPIIpEgBBMyD8G79uXZplUN5zB39xmlNni//KgajnGEwvW02', 1668574465, '619339813f15e', ''),
(2, 'Auristela Allisya Lesham Shaenette', 'p', 'auristela', 1, 2, 1, '$2a$10$Y.rlT1vKIWPpkb68XsS7ZeJTrw3gJL3nsCIHI5A6.EBMPyIUOZpdW', 1668521970, '61926c727dffb', NULL),
(3, 'Mastah Mandeliman', 'l', 'mandeliman', 1, 1, 2, '$2a$10$eSAZXak6xEZFFFBBS6Y6fuAu1VN4Ac2cHx5gFcYAm/qEQTrTPiQ4u', 1668518828, '6192602c9dc12', NULL),
(4, 'Moho Man', 'l', 'moho', 1, 2, 2, '$2a$10$Q66RXXyIgvFpCa2V5iFk0uR/2JJZZ15Ls6pkrQtnr8I4GGxTtp2cu', 1668518919, '619260879ec22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_users`
--

CREATE TABLE `sekolah_users` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `jenis` varchar(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(300) NOT NULL,
  `foto` tinyint(1) NOT NULL,
  `mapel_id` varchar(300) DEFAULT NULL,
  `superuser` tinyint(1) NOT NULL,
  `expired_token` int(11) DEFAULT NULL,
  `unique_token` varchar(15) DEFAULT NULL,
  `device_token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sekolah_users`
--

INSERT INTO `sekolah_users` (`id`, `nama`, `jenis`, `username`, `password`, `foto`, `mapel_id`, `superuser`, `expired_token`, `unique_token`, `device_token`) VALUES
(1, 'Administrator', 'l', 'admin', '$2a$10$uJWzRaqj52lXZGP6yeG0..g6S8EfynirIddkDM3XdmbfGY5x5vrti', 1, '[]', 1, 1669032498, '619a36b2e7ff4', ''),
(2, 'Marbuah Almakaroni', 'p', 'marbuah', '$2a$12$K/vRFyhWiIwitDqY5fcqQOIZvWGlfplnOJPbkOYuJm8RshDC5V9gG', 1, '[\"1\"]', 1, 1637931253, '619f87755924f', ''),
(15, 'Adhisti Arisha ', 'p', 'adhisti', '$2a$10$F/T0Q2n9I6blfK4YsY9FYO6xQxOOnoYdmLAnlZKnwBUmLCz8Psc7.', 1, '[\"3\",\"6\"]', 0, 1668945547, '6198e30be8a32', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quiz_banksoal_essay`
--
ALTER TABLE `quiz_banksoal_essay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`),
  ADD KEY `mapel_id` (`mapel_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `quiz_banksoal_pilihan`
--
ALTER TABLE `quiz_banksoal_pilihan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`),
  ADD KEY `mapel_id` (`mapel_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `quiz_exam`
--
ALTER TABLE `quiz_exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`),
  ADD KEY `mapel_id` (`mapel_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `quiz_exam_jawabansiswa`
--
ALTER TABLE `quiz_exam_jawabansiswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `siswa_id` (`siswa_id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indexes for table `quiz_paketsoal`
--
ALTER TABLE `quiz_paketsoal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`),
  ADD KEY `mapel_id` (`mapel_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `sekolah_kelasnama`
--
ALTER TABLE `sekolah_kelasnama`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`);

--
-- Indexes for table `sekolah_kelastingkatan`
--
ALTER TABLE `sekolah_kelastingkatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sekolah_mapel`
--
ALTER TABLE `sekolah_mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sekolah_semesternama`
--
ALTER TABLE `sekolah_semesternama`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester_tahun` (`semester_tahun_id`);

--
-- Indexes for table `sekolah_semestertahun`
--
ALTER TABLE `sekolah_semestertahun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sekolah_siswa`
--
ALTER TABLE `sekolah_siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `kelas_id` (`kelas_id`);

--
-- Indexes for table `sekolah_users`
--
ALTER TABLE `sekolah_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quiz_banksoal_essay`
--
ALTER TABLE `quiz_banksoal_essay`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `quiz_banksoal_pilihan`
--
ALTER TABLE `quiz_banksoal_pilihan`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `quiz_exam`
--
ALTER TABLE `quiz_exam`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_exam_jawabansiswa`
--
ALTER TABLE `quiz_exam_jawabansiswa`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_paketsoal`
--
ALTER TABLE `quiz_paketsoal`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sekolah_kelasnama`
--
ALTER TABLE `sekolah_kelasnama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sekolah_kelastingkatan`
--
ALTER TABLE `sekolah_kelastingkatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `sekolah_mapel`
--
ALTER TABLE `sekolah_mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sekolah_semesternama`
--
ALTER TABLE `sekolah_semesternama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sekolah_semestertahun`
--
ALTER TABLE `sekolah_semestertahun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sekolah_siswa`
--
ALTER TABLE `sekolah_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sekolah_users`
--
ALTER TABLE `sekolah_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quiz_banksoal_essay`
--
ALTER TABLE `quiz_banksoal_essay`
  ADD CONSTRAINT `FK_quiz_banksoal_essay_sekolah_kelastingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `sekolah_kelastingkatan` (`id`),
  ADD CONSTRAINT `FK_quiz_banksoal_essay_sekolah_mapel` FOREIGN KEY (`mapel_id`) REFERENCES `sekolah_mapel` (`id`),
  ADD CONSTRAINT `FK_quiz_banksoal_essay_sekolah_semesternama` FOREIGN KEY (`semester_id`) REFERENCES `sekolah_semesternama` (`id`);

--
-- Constraints for table `quiz_banksoal_pilihan`
--
ALTER TABLE `quiz_banksoal_pilihan`
  ADD CONSTRAINT `FK_quiz_banksoal_pilihan_sekolah_kelastingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `sekolah_kelastingkatan` (`id`),
  ADD CONSTRAINT `FK_quiz_banksoal_pilihan_sekolah_mapel` FOREIGN KEY (`mapel_id`) REFERENCES `sekolah_mapel` (`id`),
  ADD CONSTRAINT `FK_quiz_banksoal_pilihan_sekolah_semesternama` FOREIGN KEY (`semester_id`) REFERENCES `sekolah_semesternama` (`id`);

--
-- Constraints for table `quiz_exam`
--
ALTER TABLE `quiz_exam`
  ADD CONSTRAINT `FK_quiz_exam_sekolah_kelastingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `sekolah_kelastingkatan` (`id`),
  ADD CONSTRAINT `FK_quiz_exam_sekolah_mapel` FOREIGN KEY (`mapel_id`) REFERENCES `sekolah_mapel` (`id`),
  ADD CONSTRAINT `FK_quiz_exam_sekolah_semesternama` FOREIGN KEY (`semester_id`) REFERENCES `sekolah_semesternama` (`id`),
  ADD CONSTRAINT `FK_quiz_exam_sekolah_users` FOREIGN KEY (`user_id`) REFERENCES `sekolah_users` (`id`);

--
-- Constraints for table `quiz_exam_jawabansiswa`
--
ALTER TABLE `quiz_exam_jawabansiswa`
  ADD CONSTRAINT `FK_quiz_exam_jawabansiswa_quiz_exam` FOREIGN KEY (`exam_id`) REFERENCES `quiz_exam` (`id`),
  ADD CONSTRAINT `FK_quiz_exam_jawabansiswa_quiz_paketsoal` FOREIGN KEY (`paket_id`) REFERENCES `quiz_paketsoal` (`id`),
  ADD CONSTRAINT `FK_quiz_exam_jawabansiswa_sekolah_siswa` FOREIGN KEY (`siswa_id`) REFERENCES `sekolah_siswa` (`id`);

--
-- Constraints for table `quiz_paketsoal`
--
ALTER TABLE `quiz_paketsoal`
  ADD CONSTRAINT `FK_quiz_paketsoal_sekolah_kelastingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `sekolah_kelastingkatan` (`id`),
  ADD CONSTRAINT `FK_quiz_paketsoal_sekolah_mapel` FOREIGN KEY (`mapel_id`) REFERENCES `sekolah_mapel` (`id`),
  ADD CONSTRAINT `FK_quiz_paketsoal_sekolah_semesternama` FOREIGN KEY (`semester_id`) REFERENCES `sekolah_semesternama` (`id`);

--
-- Constraints for table `sekolah_kelasnama`
--
ALTER TABLE `sekolah_kelasnama`
  ADD CONSTRAINT `FK_kelas_tingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `sekolah_kelastingkatan` (`id`);

--
-- Constraints for table `sekolah_semesternama`
--
ALTER TABLE `sekolah_semesternama`
  ADD CONSTRAINT `FK_semester_nama_semester_tahun` FOREIGN KEY (`semester_tahun_id`) REFERENCES `sekolah_semestertahun` (`id`);

--
-- Constraints for table `sekolah_siswa`
--
ALTER TABLE `sekolah_siswa`
  ADD CONSTRAINT `FK_siswa_kelas_nama` FOREIGN KEY (`kelas_id`) REFERENCES `sekolah_kelasnama` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
