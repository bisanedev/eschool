-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2021 at 11:59 PM
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
  `pertanyaan_audio` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `pertanyaan_audio` varchar(30) NOT NULL,
  `pilihan` text NOT NULL,
  `jawaban` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_banksoal_pilihan`
--

INSERT INTO `quiz_banksoal_pilihan` (`id`, `tingkatan_id`, `mapel_id`, `semester_id`, `pertanyaan_text`, `pertanyaan_images`, `pertanyaan_audio`, `pilihan`, `jawaban`) VALUES
(14, 1, 1, 1, '&lt;p&gt;Diketahui sistem persamaan linear 3x + 4y = 17 dan 4x – 2y = 8. Nilai dari 2x + 3y adalah .... &lt;/p&gt;', '', '', '[{\"type\":\"text\",\"data\":\"&lt;p&gt;8&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;10&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;12&lt;/p&gt;\"},{\"type\":\"text\",\"data\":\"&lt;p&gt;13&lt;/p&gt;\"}]', '[2]');

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
-- Table structure for table `quiz_paketsoal`
--

CREATE TABLE `quiz_paketsoal` (
  `id` int(50) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `mapel_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `acak` tinyint(1) NOT NULL,
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
(1, 'Adisty Titania', 'p', 'adisty', 1, 1, 1, '$2a$10$j4g.KF0zfxqSNAZouFPJHe7bz/VvgrzGOyFilfc.PMiUzY4zwgcEK', 1668574465, '619339813f15e', ''),
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
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_banksoal_pilihan`
--
ALTER TABLE `quiz_banksoal_pilihan`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `quiz_exam`
--
ALTER TABLE `quiz_exam`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_paketsoal`
--
ALTER TABLE `quiz_paketsoal`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

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
