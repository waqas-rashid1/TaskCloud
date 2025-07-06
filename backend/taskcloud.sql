-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 09:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskcloud`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `priority` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `category`, `deadline`, `completed`, `priority`, `createdAt`, `user_id`) VALUES
('026dc269-49a9-4cd0-8a21-eca113ed929c', 'test1', '', 'work', NULL, 0, 'medium', '2025-07-06 01:07:37', 'bd700349-6c53-474a-b419-4113b7531cc3'),
('1fd95de6-c806-4003-bb27-233742e4c8a9', 'test', 'test descr.', 'work', NULL, 0, 'medium', '2025-07-05 22:15:25', NULL),
('2d232dd8-d02a-45e0-8af5-0c664efacd06', 'test 3', '', 'work', '2025-07-05 23:17:00', 0, 'medium', '2025-07-05 23:16:15', NULL),
('67b459ed-e6b3-4581-a362-b1f4bea89a86', 'test 4', '', 'work', '2025-07-05 23:31:00', 0, 'medium', '2025-07-05 23:30:51', NULL),
('7d9b64e3-21b6-4a87-95cb-d4dd03ce7e9b', 'haha', 'haha2', 'work', NULL, 1, 'medium', '2025-07-06 01:12:55', '9f59014b-1e51-48e8-85aa-a9572570ef9e');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `createdAt`) VALUES
('9f59014b-1e51-48e8-85aa-a9572570ef9e', 'test1@example.com', '$2a$10$GkldjPNHr3KsZ6Xh.DW0B.SZMjacVosuWRMYVZsG/tsOeVv7GzA7C', 'test1', '2025-07-06 01:12:47'),
('bd700349-6c53-474a-b419-4113b7531cc3', 'test@example.com', '$2a$10$.s2Q0piOT5n6iwu7GWQsducmMF7DK1YzCctlpRiEZzowtneW2yxga', 'test', '2025-07-06 01:07:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
