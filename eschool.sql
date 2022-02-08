-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2022 at 03:55 AM
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
(7, 2, 9, 1, '&lt;p&gt;Pisang sangat bermanfaat bagi kehidupan manusia. Buah kuning ini mengandung zat yang sangat berguna seperti potasium, potasium, gula dan lainnya. Zat ini sangat bermanfaat dalam tubuh. Sebagai contoh, banyak gula dapat digunakan sebagai sumber energi bagi tubuh. Pisang ditanam di tanah subur dan memiliki sumber air. Pisang tidak hanya mengandung zat-zat bermanfaat, mereka juga menghasilkan hormon endorphin.Hormon-hormon ini memberikan kenyamanan bagi mereka yang mengkonsumsinya. &lt;/p&gt;&lt;p&gt;Kalimat-kalimat sumbang ada dalam kalimat? &lt;/p&gt;', '', '', ''),
(15, 2, 9, 1, '&lt;p&gt;Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it&lt;br/&gt; over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure &lt;br/&gt;Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the &lt;br/&gt;undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &amp;quot;de Finibus Bonorum et Malorum&amp;quot; (The Extremes of Good and Evil) by &lt;br/&gt;Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &amp;quot;Lorem ipsum dolor sit amet..&amp;quot;, comes from a line in section 1.10.32. &lt;/p&gt;', 'pertanyaan.jpg', '\\sum_{n\\mathop=0}^{\\infty}\\sqrt{2}4', 'pertanyaan.mp3');

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
(72, 2, 9, 1, '&lt;p&gt;1. Menyusun berita dengan mempergunakan bahasa yang singkat dan jelas.&lt;br/&gt;2. Pencarian sumber berita (pengamatan langsung, wawancara, bahan berita)&lt;br/&gt;3. Melakukan wawancara yang bersifat informatif untuk memperoleh fakta,&lt;br/&gt;4. Menemukan pokok-pokok dari hasil yang diperoleh wawancara,&lt;br/&gt;5. Penentuan peristiwa atau kejadian suatu perkara&lt;br/&gt;6. Menyunting naskah berita sesuai dengan EYD.&lt;br/&gt;Urutan yang tepat dari langkah-langkah menulis berita adalah…. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (2), (3), (4), (1), (6) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (3), (2), (4), (6), (1) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(1), (2), (3), (5), (4), (6) &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;(5), (2), (3), (6), (4), (1) &lt;/p&gt;\"}]', '[0]'),
(73, 2, 9, 1, '&lt;p&gt;Dibawah yang termasuk kedalam fungsi dari sebuah judul adalah,kecuali … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Untuk Memberi kepadatan isi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Merangkum isi cerita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Menserasikan/mempercantik perwajahan surat kabar &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Melukiskan suasana berita &lt;/p&gt;\"}]', '[0]'),
(74, 2, 9, 1, '&lt;p&gt;Yang termasuk ke dalam jenis softnews adalah ….. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Profil atau kisah kesuksesan seseorang &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Editorial &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Fotografer &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Pencahayaan &lt;/p&gt;\"}]', '[0]'),
(75, 2, 9, 1, '&lt;p&gt;Suatu informasi baru yang diinformasikan melalui koran, majalah, telivisi dan alat-alat media lainnya disebut …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;gosip &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;berita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;iklan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;promosi &lt;/p&gt;\"}]', '[1]'),
(76, 2, 9, 1, '&lt;p&gt;Syarat yang harus dipenuhi dalam penyusunan sebuah berita, kecuali …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;fiksi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;aktual &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;berimbang &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;lengkap &lt;/p&gt;\"}]', '[0]'),
(77, 2, 9, 1, '&lt;p&gt;Perhatikan teks berikut &lt;/p&gt;&lt;p&gt;Butuh dana cepat? Proses cepat cukup memakai BPKB …..&lt;br/&gt;&lt;br/&gt;Pelengkap iklan baris tersebut yang paling tepat adalah.. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Hub. Saprol, Gang Kebo No. 31 &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Telepon Haji Sobirin kapan saja &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Hub. 085809904533 &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Cari alamat berikut. Subur makmur. Bandar Lampung City. 🤓&lt;/p&gt;\"}]', '[2]'),
(78, 2, 9, 1, '&lt;p&gt;Sebuah pesan menarik tentang sebuah produk atau jasa yang ditujukan untuk para khalayak disebut …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;berita &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;iklan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;gosip &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;pameran &lt;/p&gt;\"}]', '[1]'),
(79, 2, 9, 1, '&lt;p&gt;Produk atau jasa agar lebih dikenal oleh banyak masyarakat, merupakan …. dari iklan. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;tujuan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;manfaat &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;kesimpulan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;pesan &lt;/p&gt;\"}]', '[1]'),
(80, 2, 9, 1, '&lt;p&gt;Perhatikan kutipan teks berikut! &lt;/p&gt;&lt;p&gt;Kamarku lumayan luas dan tertata sangat rapi. Di dekat jendela kamarku&lt;br/&gt;terdapat sebuah tempat tidur kayu sengon. Kasur di tempat tidur itu ditutupi seprei dengan motif pelangi. Meja belajar dengan rak buku tersusun sangat rapi di sebelah kiri tempat tidur. [….] Lemari itu memiliki kaca dan berwarna hijau muda.&lt;br/&gt;Kalimat yang tepat untuk melengkapi paragraf deskripsi tersebut adalah…. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Meja rias dan alat-alat kecantikan terletak di sudut kamar. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Aku memiliki beberapa pakaian yang digantung di belakang pintu. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Di lantai kamar terbentang permadani bermotif batik sumatra. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Sebuah lemari pakaian diletakkan di sebelah kanan meja belajar. &lt;/p&gt;\"}]', '[3]'),
(81, 2, 9, 1, '&lt;p&gt;Bacalah dengan cermat! &lt;/p&gt;&lt;p&gt;Tahapan-tahapan menulis yakni sebagai berikut: &lt;/p&gt;&lt;ul&gt;&lt;li&gt;Pertama, tentukan topik. &lt;/li&gt;&lt;li&gt;Kedua,kumpulkan data. &lt;/li&gt;&lt;li&gt;Ketiga, buat kerangka karangannya terlebih dahulu. &lt;/li&gt;&lt;li&gt;Keempat, kembangkan kerangka menjadi tulisan. &lt;/li&gt;&lt;li&gt;Kelima, tentukan judul karangan.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Jenis teks eksposisi diatas adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt; sebab-akibat &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;definisi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;perbandingan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;proses &lt;/p&gt;\"}]', '[3]'),
(82, 2, 9, 1, '&lt;p&gt;Bacalah dengan cermat!&lt;br/&gt;Setiap orang memiliki kesukaan membaca yang berbeda-beda. Hal ini &lt;br/&gt;disebabkan biasanya karena adanya perbedaan umur, jenis kelamin, tingkat&lt;br/&gt; pendidikan, atau profesi yang berbeda. Selain itu juga, bisa juga &lt;br/&gt;disebabkan oleh tujuan membaca yang berbeda. &lt;/p&gt;&lt;p&gt;Hal yang dibicarakan dalam teks tersebut adalah … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Perbedaan setiap orang dalam memilih tempat membaca. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Alasan orang untuk membaca bermacam-macam buku &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Penyebab orang membaca bermacam-macam buku. &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Perbedaan setiap orang dalam memilih bacaan. &lt;/p&gt;\"}]', '[3]'),
(84, 2, 9, 1, '&lt;p&gt;Bacalah puisi berikut! &lt;/p&gt;&lt;p&gt;&lt;em&gt;Wahai sahabat&lt;br/&gt;Untuk selamanya&lt;br/&gt;Kita percaya&lt;br/&gt;Tebarkan arah jangan pernah lelah&lt;br/&gt;Untukmu sahabat &lt;/em&gt;&lt;/p&gt;&lt;p&gt;Tema puisi diatas adalah ….. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;Persahabatan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Permusuhan &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Perdamaian &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;Percintaan &lt;/p&gt;\"}]', '[0]'),
(85, 2, 9, 1, '&lt;p&gt;Bacalah puisi berikut! &lt;/p&gt;&lt;p&gt;&lt;em&gt;Wahai sahabat&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Untuk selamanyaKita percaya&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Tebarkan arah jangan pernah lelah&lt;/em&gt;&lt;/p&gt;&lt;p&gt;&lt;em&gt;Untukmu sahabat &lt;/em&gt; &lt;/p&gt;&lt;p&gt;Suasana yang terbangun didalam puisi diatas adalah … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;sedih &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;emosi &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;gembira &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;penuh semangat &lt;/p&gt;\"}]', '[3]'),
(86, 2, 9, 1, '&lt;p&gt;Tujuan puisi salah satunya adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;menyampaikan pesan atau kritikan yang sifatnya membangun &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;mencari kesenangan pribadi saja &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;luapan hati&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;meberikan kesimpulan masalah &lt;/p&gt;\"}]', '[0]'),
(87, 2, 9, 1, '&lt;p&gt;Berikut ini merupakan jenis-jenis puisi,kecuali …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt; puisi majemuk &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;puisi lama &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;puisi kontemporer &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt; puisi baru &lt;/p&gt;\"}]', '[0]'),
(97, 2, 1, 1, '&lt;p&gt;Berikut yang mana rumus untuk mencari luas dan keliling lingkaran … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt; L = Л x r dan K = 2 x Л x r &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;L = Л x r x r dan K = 2 x Л &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;L = K = 2 x Л x r dan Л x r² &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;L = K = 2 x Л x r dan Л x r² &lt;/p&gt;\"}]', '[2]'),
(98, 2, 1, 1, '&lt;p&gt;Jam dinding bundar memiliki d 28 cm. Maka berapa keliling jam dinding tersebut …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;86 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;88 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;90 Cm  &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;92 Cm &lt;/p&gt;\"}]', '[1]'),
(99, 2, 1, 1, '&lt;p&gt;Diketahui bahwa dari keliling sebuah lingkaran adalah 154 cm. Maka dari jari-jari lingkaran adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;24 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;24,5 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;25 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;25,5 Cm &lt;/p&gt;\"}]', '[1]'),
(100, 2, 1, 1, '&lt;p&gt;Selembarh kertas yang memiliki bentuk lingkaran dengan nilai kelilingnya 616 cm. Maka diameter kertas ini adalah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;28 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;32 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;26 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;22 Cm &lt;/p&gt;\"}]', '[0]'),
(101, 2, 1, 1, '&lt;p&gt;Okta mempunyai hulahop yang kelilingnya 210 cm. Jika dihitung berapa jari-jari dari hulahop Okta …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;33,6 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;30 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;31 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;33,4 Cm &lt;/p&gt;\"}]', '[3]'),
(102, 2, 1, 1, '&lt;p&gt;Luas lingkaran adalah 2,464 cm². Lalu, keliling lingkaran tersebut ialah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;168 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;174 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;176 Cm &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;182 Cm &lt;/p&gt;\"}]', '[2]'),
(103, 2, 1, 1, '&lt;p&gt;Sebuah taman yang berbentuk lingkaran kelilingnya 3.850 m. Maka jika dihitung diameter dari taman tersebut ialah …. &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;1200 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;1.220 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;1.225 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;1.230 m &lt;/p&gt;\"}]', '[1]'),
(104, 2, 1, 1, '&lt;p&gt;Kinanti menjahit taplak meja bentuknya bundar dengan d = 1,4 m. Setelah &lt;br/&gt;selesai jika diukur berapa keliling lingkaran taplak meja tersebut … &lt;/p&gt;', '', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;3,5 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;3,75 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;4,4 m &lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;4.15 m &lt;/p&gt;\"}]', '[2]'),
(106, 2, 9, 1, '&lt;p&gt;test image / audio / math&lt;/p&gt;', 'pertanyaan.jpg', '\\int_0^{\\infty}\\frac{\\differentialD2}{\\differentialD x}2', 'pertanyaan.mp3', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;hollaaa&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;test&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;baong&lt;/p&gt;\"}]', '[0]'),
(107, 2, 9, 1, '&lt;p&gt;asdsadsasadsadas&lt;/p&gt;', 'pertanyaan.jpg', '', 'pertanyaan.mp3', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;ssss&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;wwwww&lt;/p&gt;\"}]', '[1]');

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
  `nama` varchar(200) NOT NULL,
  `mulai` datetime NOT NULL,
  `selesai` datetime NOT NULL,
  `nilai_minimal` varchar(30) NOT NULL,
  `paket_soal` text NOT NULL,
  `kisi_exam` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_exam`
--

INSERT INTO `quiz_exam` (`id`, `user_id`, `tingkatan_id`, `mapel_id`, `semester_id`, `nama`, `mulai`, `selesai`, `nilai_minimal`, `paket_soal`, `kisi_exam`) VALUES
(14, 2, 2, 9, 1, 'Remidial Ujian Semester', '2022-02-03 07:00:00', '2022-02-04 09:30:00', '50', '[\"4\",\"5\"]', ''),
(15, 25, 2, 9, 1, 'Ujian Mid Semester', '2022-01-31 14:46:00', '2022-01-31 15:46:00', '65', '[\"4\",\"5\"]', ''),
(16, 1, 2, 9, 1, 'Ujian Harian ke 1', '2022-02-03 06:03:00', '2022-02-03 07:03:00', '50', '[\"4\",\"5\"]', ''),
(17, 25, 2, 9, 1, 'Ujian Semester', '2022-02-06 14:46:00', '2022-02-06 15:46:00', '65', '[\"4\",\"5\"]', '');

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

--
-- Dumping data for table `quiz_paketsoal`
--

INSERT INTO `quiz_paketsoal` (`id`, `tingkatan_id`, `mapel_id`, `semester_id`, `nama`, `acak_soal`, `bobot_pilihan`, `bobot_essay`, `pilihan_terpilih`, `essay_terpilih`) VALUES
(4, 2, 9, 1, 'Paket A', 1, 80, 20, '[\"72\",\"74\",\"73\",\"76\",\"75\",\"78\",\"80\",\"79\",\"82\",\"81\"]', '[\"15\",\"7\"]'),
(5, 2, 9, 1, 'Paket B', 1, 80, 20, '[\"87\",\"86\",\"107\",\"106\",\"85\",\"80\",\"79\",\"77\",\"78\",\"72\"]', '[\"15\",\"7\"]');

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
(15, 15, 'Kelas 9A'),
(19, 1, 'Kelas 7C'),
(20, 1, 'Kelas 7D'),
(21, 1, 'Kelas 7E'),
(22, 2, 'Kelas 8C'),
(23, 2, 'Kelas 8D'),
(24, 2, 'Kelas 8E'),
(25, 15, 'Kelas 9B'),
(26, 15, 'Kelas 9C'),
(27, 15, 'Kelas 9D'),
(28, 15, 'Kelas 9E');

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
  `nama` varchar(200) NOT NULL,
  `jenis` varchar(5) NOT NULL,
  `username` varchar(60) NOT NULL,
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
(1, 'Adisty Titania', 'p', 'adisty', 1, 1, 1, '$2a$10$pR9ZEuPIIpEgBBMyD8G79uXZplUN5zB39xmlNni//KgajnGEwvW02', 1675770053, '620105452451a', ''),
(2, 'Auristela Allisya Lesham Shaenette Wahono Wahyudi', 'p', 'auristela', 1, 2, 1, '$2a$10$Y.rlT1vKIWPpkb68XsS7ZeJTrw3gJL3nsCIHI5A6.EBMPyIUOZpdW', 1675771488, '62010ae0b7bd8', NULL),
(3, 'Mastah Mandeliman', 'l', 'mandeliman', 1, 1, 19, '$2a$10$eSAZXak6xEZFFFBBS6Y6fuAu1VN4Ac2cHx5gFcYAm/qEQTrTPiQ4u', 1675770538, '6201072a70856', NULL),
(4, 'Moho Man', 'l', 'moho', 1, 2, 19, '$2a$10$Q66RXXyIgvFpCa2V5iFk0uR/2JJZZ15Ls6pkrQtnr8I4GGxTtp2cu', 1675768792, '62010058ccb36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sekolah_users`
--

CREATE TABLE `sekolah_users` (
  `id` int(11) NOT NULL,
  `nama` varchar(200) NOT NULL,
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
(1, 'Administrator', 'l', 'admin', '$2a$10$uJWzRaqj52lXZGP6yeG0..g6S8EfynirIddkDM3XdmbfGY5x5vrti', 1, '[\"9\"]', 1, 1674036384, '61e69120784c0', ''),
(2, 'Marbuah Almakaroni', 'p', 'marbuah', '$2a$12$K/vRFyhWiIwitDqY5fcqQOIZvWGlfplnOJPbkOYuJm8RshDC5V9gG', 1, '[\"9\",\"1\"]', 0, 1674933449, '61f4414942806', ''),
(15, 'Adhisti Arisha ', 'p', 'adhisti', '$2a$10$F/T0Q2n9I6blfK4YsY9FYO6xQxOOnoYdmLAnlZKnwBUmLCz8Psc7.', 1, '[\"3\",\"6\"]', 0, 1674925503, '61f4223f18438', NULL),
(25, 'Meong Ganas', 'p', 'meow', '$2a$12$K/vRFyhWiIwitDqY5fcqQOIZvWGlfplnOJPbkOYuJm8RshDC5V9gG', 1, '[\"9\"]', 0, 1674933449, '61f4414942806', '');

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
  ADD UNIQUE KEY `username` (`username`) USING BTREE,
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
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `quiz_banksoal_pilihan`
--
ALTER TABLE `quiz_banksoal_pilihan`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `quiz_exam`
--
ALTER TABLE `quiz_exam`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `quiz_exam_jawabansiswa`
--
ALTER TABLE `quiz_exam_jawabansiswa`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz_paketsoal`
--
ALTER TABLE `quiz_paketsoal`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sekolah_kelasnama`
--
ALTER TABLE `sekolah_kelasnama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sekolah_users`
--
ALTER TABLE `sekolah_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
  ADD CONSTRAINT `FK_quiz_exam_jawabansiswa_quiz_exam` FOREIGN KEY (`exam_id`) REFERENCES `quiz_exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
