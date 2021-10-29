-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2021 at 05:00 PM
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
-- Table structure for table `kelas_nama`
--

CREATE TABLE `kelas_nama` (
  `id` int(11) NOT NULL,
  `tingkatan_id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas_nama`
--

INSERT INTO `kelas_nama` (`id`, `tingkatan_id`, `nama`) VALUES
(1, 1, '7A'),
(2, 1, '7B'),
(3, 2, '8A'),
(4, 2, '8B'),
(15, 15, '9A');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_tingkatan`
--

CREATE TABLE `kelas_tingkatan` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas_tingkatan`
--

INSERT INTO `kelas_tingkatan` (`id`, `nama`) VALUES
(1, 'Kelas 7'),
(2, 'Kelas 8'),
(15, 'Kelas 9');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` int(11) NOT NULL,
  `nama` varchar(60) NOT NULL,
  `color` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `nama`, `color`) VALUES
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
-- Table structure for table `semester_nama`
--

CREATE TABLE `semester_nama` (
  `id` int(11) NOT NULL,
  `semester_tahun_id` int(11) NOT NULL,
  `semester` int(6) NOT NULL,
  `semester_start` date NOT NULL,
  `semester_end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `semester_nama`
--

INSERT INTO `semester_nama` (`id`, `semester_tahun_id`, `semester`, `semester_start`, `semester_end`) VALUES
(1, 3, 1, '2021-07-01', '2021-12-25'),
(2, 3, 2, '2022-01-01', '2022-07-10');

-- --------------------------------------------------------

--
-- Table structure for table `semester_tahun`
--

CREATE TABLE `semester_tahun` (
  `id` int(11) NOT NULL,
  `nama` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `semester_tahun`
--

INSERT INTO `semester_tahun` (`id`, `nama`) VALUES
(3, 'TA 2021/2022');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `jenis` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `foto` tinyint(1) NOT NULL,
  `kelas_id` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `expired_token` int(11) NOT NULL,
  `unique_token` varchar(15) NOT NULL,
  `device_token` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `jenis` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(300) NOT NULL,
  `foto` tinyint(1) NOT NULL,
  `mapel_id` varchar(300) DEFAULT NULL,
  `superuser` tinyint(1) NOT NULL,
  `expired_token` int(11) DEFAULT NULL,
  `unique_token` varchar(15) NOT NULL,
  `device_token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `jenis`, `username`, `password`, `foto`, `mapel_id`, `superuser`, `expired_token`, `unique_token`, `device_token`) VALUES
(1, 'Administrator', 'pria', 'admin', '$2a$10$uJWzRaqj52lXZGP6yeG0..g6S8EfynirIddkDM3XdmbfGY5x5vrti', 1, '[]', 1, 1667039576, '617bcdd83e069', ''),
(2, 'Marbuah Almakaroni', 'perempuan', 'marbuah', '$2a$12$K/vRFyhWiIwitDqY5fcqQOIZvWGlfplnOJPbkOYuJm8RshDC5V9gG', 1, '[\"1\"]', 1, 1667033990, '617bb80669824', ''),
(15, 'Adhisti Arisha ', 'perempuan', 'adhisti', '$2a$10$F/T0Q2n9I6blfK4YsY9FYO6xQxOOnoYdmLAnlZKnwBUmLCz8Psc7.', 1, '[\"10\"]', 0, NULL, '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kelas_nama`
--
ALTER TABLE `kelas_nama`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tingkatan_id` (`tingkatan_id`);

--
-- Indexes for table `kelas_tingkatan`
--
ALTER TABLE `kelas_tingkatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semester_nama`
--
ALTER TABLE `semester_nama`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester_tahun` (`semester_tahun_id`);

--
-- Indexes for table `semester_tahun`
--
ALTER TABLE `semester_tahun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `kelas_id` (`kelas_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kelas_nama`
--
ALTER TABLE `kelas_nama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `kelas_tingkatan`
--
ALTER TABLE `kelas_tingkatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `semester_nama`
--
ALTER TABLE `semester_nama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `semester_tahun`
--
ALTER TABLE `semester_tahun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kelas_nama`
--
ALTER TABLE `kelas_nama`
  ADD CONSTRAINT `FK_kelas_tingkatan` FOREIGN KEY (`tingkatan_id`) REFERENCES `kelas_tingkatan` (`id`);

--
-- Constraints for table `semester_nama`
--
ALTER TABLE `semester_nama`
  ADD CONSTRAINT `FK_semester_nama_semester_tahun` FOREIGN KEY (`semester_tahun_id`) REFERENCES `semester_tahun` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
