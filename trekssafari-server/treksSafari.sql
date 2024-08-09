-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2023 at 09:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `desertsafari`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `guestname` varchar(100) NOT NULL,
  `nop` int(11) NOT NULL,
  `safariname` text NOT NULL,
  `date` datetime NOT NULL,
  `nationality` text NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `noc` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `totalcost` int(11) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `guestname`, `nop`, `safariname`, `date`, `nationality`, `contact`, `email`, `noc`, `message`, `totalcost`, `role`) VALUES
(13, 'Giselle Callahan', 656, 'Swakopmund City Tours', '2021-03-09 01:35:00', 'Est esse eum sed cum', '513', 'junosubo@mailinator.com', 545, 'Dolore numquam delen', 0, 'guest'),
(15, 'isratech', 4, 'test safari', '2023-07-20 06:45:00', 'canada', '0785488422', 'isratech8@outlook.com', 3, 'anything', 0, 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `email`, `password`, `role`) VALUES
(1, 'nae@gmail.com', '33', 'guest'),
(7, 'naka@gmail.com', 'naka', 'guest'),
(8, 'jose@gmail.com', 'jose', 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  `childCat` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `nop` int(11) NOT NULL,
  `childPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `name`, `price`, `image`, `time`, `childCat`, `description`, `nop`, `childPrice`) VALUES
(18, 'Dolphine Cruises', 1100, '1687061723435.jpg', '8h00-13h00 (incl. pick up from Swakopmund)', 'Child 4-11 years', 'This is a fun-filled morning’s only activity. The boat departs from Walvis Bay Waterfront and cruises past the oyster farms and fishing trawlers in the bay, towards the seal colony at Pelican Point. The cruise returns via Bird Island. A variety of birds such as pelicans, flamingos, cormorant and many more can be seen. Enjoy the antics of feeding the seals and pelicans on board. You will more than likely catch a glimpse of playful dolphins as well as a possible whale or sunfish (Mola Mola). Fresh oysters, sparkling wine and snacks are served before returning to the harbour around midday.', 2, 600),
(20, 'Swakopmund City Tours', 500, '1687061260287.jpg', '9h00-10h30 or 14h00-15h30', 'Child 4-13 years', 'We take a short journey through time. We start with an exploration of Swakopmund’s colourful history, its origins and its well-maintained buildings from the colonial era. We venture into modern day Swakopmund to find out just what Swakopmund is to the local people from all groups of our society. We drive along luxury beachfront homes and travel into the townships looking at property prices, income statistics and living standards. At the end of this 1.5 hour long tour, we take a glance into the future to see how Swakopmund may develop. Swakopmund yesterday, today and tomorrow.', 2, 300),
(21, 'Welwitchia Moon Landscape', 900, '1687062059444.jpg', '8h30-12h30 or 14h00-18h00', 'Child 4-13 years', 'An enlightening journey takes you through the ancient canyons of the Moon Valley, one of the most fascinating areas of the Namib Desert. Let us take you back millions of years to when these badlands were formed. Learn the intrinsic value of the desert flora to the indigenous people who once roamed Southern Africa. Discover the medicinal and nutritional use of desert adapted flora, and delve into the secrets of the Welwitschia mirabilis. We learn about the desert adapted flora and fauna and how they survive under these harsh conditions by unfolding their many hidden secrets. This informative tour also looks into what we call “the future of the Central Namib”, as we inform our guests about planned future industrial activities as well as existing ones in the area, due to the\r\n\r\ngrowth of uranium mining and other related industry. This spectacular area is also home to some wildlife, and we might just spot springbok, ostrich, klipspringer, Swallow-tailed Bee-eater, Karoo Chat and others.', 2, 500),
(22, 'Sand Boarding', 600, '1687062205234.jpg', '9h30-13h30', 'Age limit 15 and above', 'The almost childlike joy of surfing down the sand dunes is quite an experience. There are two different types of sandboarding available, choose between the traditional lie-down boarding and the stand-up boarding using snow boards.\r\n\r\nA polished hardboard and a quick instruction in all you need. The lie-down boarders can reach speeds over 50km/h', 2, 0),
(23, 'Sandwich Harbour Tour', 2420, '1687062683162.jpg', '8h30-17h00', 'Child 4-13 years', 'The full day tour offers pretty much the same as the half day tour, just allowing a little more leisurely pace and more flexibility in the day’s itinerary. This is important to those that want to enter the lagoon area. As the full day tour allows for more time, the guide can\r\n\r\nplan the day better to allow to enter the lagoon area at low tide. Please note that despite this, it may not be possible to enter the lagoon area at all days.', 4, 1125),
(24, 'Quad Biking: ', 850, '1687062591381.jpg', '2 Hours (1 Hour: N$550)', 'No child rates apply', 'We offer Quadbiking not as an extreme sport, but as a fun way to get into the dunes. These guided trips are designed for people without any prior experience of Quadbiking. We offer 1 hour and 2 hour trips all day long. A 3 hour combo trip which includes 2 hours of Quadbiking and one hour of lie-down sandboarding is also available. After a safety briefing, the tour starts off easy to get used to the bikes before we start with an exhilarating passage through the dunes towards the inland.\r\n\r\n· No child rates apply. If a child rides a bike, full rates apply. If a child rides on the back of an adult, 50% rates applies.', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `secName` varchar(100) NOT NULL,
  `contact` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `secName`, `contact`, `email`, `password`, `role`) VALUES
(2, 'Placeat maxime et a', '', 0, 'aba@gmail.com', 'aba1', 'admin'),
(16, 'test', 'guide', 2147483647, 'testguide@gmail.com', '1', 'guide');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
