-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 03, 2023 at 04:26 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrana`
--

-- --------------------------------------------------------

--
-- Table structure for table `hrana`
--

DROP TABLE IF EXISTS `hrana`;
CREATE TABLE IF NOT EXISTS `hrana` (
  `id_hrane` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(20) COLLATE utf32_bin NOT NULL,
  `tip` int NOT NULL,
  `cena` int NOT NULL,
  `slika` varchar(100) COLLATE utf32_bin NOT NULL,
  PRIMARY KEY (`id_hrane`),
  KEY `tip` (`tip`),
  KEY `tip_2` (`tip`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `hrana`
--

INSERT INTO `hrana` (`id_hrane`, `naziv`, `tip`, `cena`, `slika`) VALUES
(1, 'Kapricoza', 1, 1200, 'https://domacirecepti.net/wp-content/uploads/2012/08/DSCI0031.jpg'),
(2, 'Margarita', 1, 900, 'https://www.11inchpizza.com.au/wp-content/uploads/2018/10/Margherita-pizza.jpg'),
(3, 'Vegetariana', 1, 1600, 'https://kulinarskirecepti.info/wp-content/uploads/2016/10/pizza-vegetariana-156680.jpg'),
(5, 'Belo meso', 3, 870, 'https://stil.kurir.rs/data/images/2017/07/22/14/122495_belo-meso_ls.jpg'),
(6, 'Palacinka slatka', 2, 300, 'https://recepti123.files.wordpress.com/2016/05/palacinke-po-zelji.jpg'),
(7, 'Palacinka slana', 2, 450, 'https://n1info.rs/wp-content/uploads/2019/10/palacinke-288006.jpeg'),
(11, 'Kola', 5, 200, 'https://shop.persu.rs/wp-content/uploads/2022/07/046710_3.webp'),
(12, 'Sprite', 5, 200, 'https://www.magicdrinks.co.uk/wp-content/uploads/Sprite-1.jpg'),
(18, 'Pljeskavica', 3, 650, 'https://www.rakijagrill.com/wp-content/uploads/2021/06/Serbian-Burger-Pljeskavica.jpg'),
(19, 'Fanta', 5, 200, 'https://d3el976p2k4mvu.cloudfront.net/medias/sys_master/h23/h80/9019770961950.jpg'),
(20, 'Sendvic sunka', 4, 350, 'https://www.dijamant.rs/wp-content/uploads/2016/03/pizza-sendvic-820x490.jpg'),
(21, 'Sendvic kulen', 4, 520, 'https://liberopizza.com/wp-content/uploads/2019/11/sendvic-kulen2.jpg'),
(23, 'Polonara', 1, 12334, 'pica.jpg'),
(24, 'Test', 4, 1234, 'palacinka.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `isplata`
--

DROP TABLE IF EXISTS `isplata`;
CREATE TABLE IF NOT EXISTS `isplata` (
  `zaposlen_id` tinyint DEFAULT NULL,
  `satnica` decimal(10,0) DEFAULT NULL,
  `plata` decimal(10,0) DEFAULT NULL,
  `provizija` decimal(10,0) DEFAULT NULL,
  `broj_prodaja` tinyint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `isplata`
--

INSERT INTO `isplata` (`zaposlen_id`, `satnica`, `plata`, `provizija`, `broj_prodaja`) VALUES
(NULL, '10', NULL, NULL, NULL),
(NULL, '20', NULL, NULL, NULL),
(NULL, '30', NULL, NULL, NULL),
(NULL, '40', NULL, NULL, NULL),
(NULL, NULL, '10000', NULL, NULL),
(NULL, NULL, '20000', NULL, NULL),
(NULL, NULL, '30000', NULL, NULL),
(NULL, NULL, '40000', NULL, NULL),
(NULL, NULL, NULL, '15000', 3),
(NULL, NULL, NULL, '25000', 2),
(NULL, NULL, NULL, '20000', 6),
(NULL, NULL, NULL, NULL, NULL),
(NULL, NULL, NULL, '14000', 4);

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
CREATE TABLE IF NOT EXISTS `kategorija` (
  `id_kat` int NOT NULL,
  `naziv_kat` varchar(15) COLLATE utf32_bin NOT NULL,
  UNIQUE KEY `id_kat` (`id_kat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`id_kat`, `naziv_kat`) VALUES
(1, 'pice'),
(2, 'palacinke'),
(3, 'rostilj'),
(4, 'sendvici'),
(5, 'piće');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

DROP TABLE IF EXISTS `komentar`;
CREATE TABLE IF NOT EXISTS `komentar` (
  `id_kom` int NOT NULL AUTO_INCREMENT,
  `text` text COLLATE utf32_bin NOT NULL,
  `ocena` int NOT NULL,
  `id_kor` int NOT NULL,
  `id_pro` int NOT NULL,
  PRIMARY KEY (`id_kom`),
  KEY `id_kor` (`id_kor`),
  KEY `id_pro` (`id_pro`),
  KEY `id_kor_2` (`id_kor`),
  KEY `id_pro_2` (`id_pro`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`id_kom`, `text`, `ocena`, `id_kor`, `id_pro`) VALUES
(15, 'Odlicno!', 4, 2, 3),
(16, 'Super je!', 5, 10, 3),
(17, 'Odlicna pica !', 5, 2, 2),
(18, 'Prepreceno je bilo!', 2, 2, 5),
(19, 'Nije lose!', 4, 2, 5),
(20, 'Komentar', 4, 1, 3),
(21, 'Odlicno!', 5, 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `id_korisnika` int NOT NULL AUTO_INCREMENT,
  `username` varchar(15) COLLATE utf32_bin NOT NULL,
  `sifra` varchar(15) COLLATE utf32_bin NOT NULL,
  `mejl` varchar(30) COLLATE utf32_bin NOT NULL,
  `naselje` int NOT NULL,
  `ulica` varchar(30) COLLATE utf32_bin NOT NULL,
  `telefon` varchar(20) COLLATE utf32_bin NOT NULL,
  `rola` int NOT NULL,
  PRIMARY KEY (`id_korisnika`),
  KEY `rola` (`rola`),
  KEY `naselje` (`naselje`),
  KEY `rola_2` (`rola`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id_korisnika`, `username`, `sifra`, `mejl`, `naselje`, `ulica`, `telefon`, `rola`) VALUES
(1, 'admin', '1234', 'admin@admin.com', 1, 'Nemanje Nedovica', '605429384', 1),
(2, 'kroki', '1234', 'kroki@gmail.com', 4, 'Miloja Djaka', '0605429384', 0),
(5, 'nikola', '1234', 'dzoni@gmail.com', 2, 'Steve Knicanina', '0605429384', 0),
(9, 'adja', '1234', 'adja@gmail.com', 3, 'Milana Ilica', '0655362177', 0),
(10, 'duca', '1234', 'duca@gmail.com', 4, 'Atinska', '0655362177', 0);

-- --------------------------------------------------------

--
-- Table structure for table `korpa`
--

DROP TABLE IF EXISTS `korpa`;
CREATE TABLE IF NOT EXISTS `korpa` (
  `id_artikal` int NOT NULL,
  `naziv` varchar(10) COLLATE utf32_bin NOT NULL,
  `cena` int NOT NULL,
  `slika` varchar(100) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL,
  `id_korisnika` int NOT NULL,
  KEY `id_artikal` (`id_artikal`),
  KEY `id_korisnika` (`id_korisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- --------------------------------------------------------

--
-- Table structure for table `naselje`
--

DROP TABLE IF EXISTS `naselje`;
CREATE TABLE IF NOT EXISTS `naselje` (
  `id_naselja` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(15) COLLATE utf32_bin NOT NULL,
  PRIMARY KEY (`id_naselja`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `naselje`
--

INSERT INTO `naselje` (`id_naselja`, `naziv`) VALUES
(1, 'erdoglija'),
(2, 'bagremar'),
(3, 'aerodrom'),
(4, 'bubanj');

-- --------------------------------------------------------

--
-- Table structure for table `rola`
--

DROP TABLE IF EXISTS `rola`;
CREATE TABLE IF NOT EXISTS `rola` (
  `id` int NOT NULL,
  `naziv` varchar(20) COLLATE utf32_bin NOT NULL,
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `rola`
--

INSERT INTO `rola` (`id`, `naziv`) VALUES
(0, 'korisnik'),
(1, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `sadrzi`
--

DROP TABLE IF EXISTS `sadrzi`;
CREATE TABLE IF NOT EXISTS `sadrzi` (
  `id_trans` int NOT NULL,
  `id_proizvod` int NOT NULL,
  `id_korisnika` int NOT NULL,
  KEY `id_trans` (`id_trans`),
  KEY `id_proizvod` (`id_proizvod`),
  KEY `id_korisnika` (`id_korisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

-- --------------------------------------------------------

--
-- Table structure for table `transakcija`
--

DROP TABLE IF EXISTS `transakcija`;
CREATE TABLE IF NOT EXISTS `transakcija` (
  `id_trans` int NOT NULL AUTO_INCREMENT,
  `cena` int NOT NULL,
  `placanje` int NOT NULL,
  `tekst` varchar(50) COLLATE utf32_bin NOT NULL,
  `datum` varchar(50) COLLATE utf32_bin NOT NULL,
  `id_kor` int NOT NULL,
  PRIMARY KEY (`id_trans`),
  KEY `id_kor` (`id_kor`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `transakcija`
--

INSERT INTO `transakcija` (`id_trans`, `cena`, `placanje`, `tekst`, `datum`, `id_kor`) VALUES
(31, 1100, 0, 'Majonez preko!', '11/3/2023, 2:27:08 PM', 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hrana`
--
ALTER TABLE `hrana`
  ADD CONSTRAINT `hrana_ibfk_1` FOREIGN KEY (`tip`) REFERENCES `kategorija` (`id_kat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`id_kor`) REFERENCES `korisnik` (`id_korisnika`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`id_pro`) REFERENCES `hrana` (`id_hrane`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD CONSTRAINT `korisnik_ibfk_1` FOREIGN KEY (`naselje`) REFERENCES `naselje` (`id_naselja`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `korpa`
--
ALTER TABLE `korpa`
  ADD CONSTRAINT `korpa_ibfk_1` FOREIGN KEY (`id_korisnika`) REFERENCES `korisnik` (`id_korisnika`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `korpa_ibfk_2` FOREIGN KEY (`id_artikal`) REFERENCES `hrana` (`id_hrane`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rola`
--
ALTER TABLE `rola`
  ADD CONSTRAINT `rola_ibfk_1` FOREIGN KEY (`id`) REFERENCES `korisnik` (`rola`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sadrzi`
--
ALTER TABLE `sadrzi`
  ADD CONSTRAINT `sadrzi_ibfk_1` FOREIGN KEY (`id_trans`) REFERENCES `transakcija` (`id_trans`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sadrzi_ibfk_3` FOREIGN KEY (`id_proizvod`) REFERENCES `hrana` (`id_hrane`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sadrzi_ibfk_4` FOREIGN KEY (`id_korisnika`) REFERENCES `transakcija` (`id_kor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transakcija`
--
ALTER TABLE `transakcija`
  ADD CONSTRAINT `transakcija_ibfk_1` FOREIGN KEY (`id_kor`) REFERENCES `korisnik` (`id_korisnika`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
