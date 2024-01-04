-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2023 at 11:03 AM
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
-- Database: `springboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add classroom', 7, 'add_classroom'),
(26, 'Can change classroom', 7, 'change_classroom'),
(27, 'Can delete classroom', 7, 'delete_classroom'),
(28, 'Can view classroom', 7, 'view_classroom'),
(29, 'Can add group', 8, 'add_group'),
(30, 'Can change group', 8, 'change_group'),
(31, 'Can delete group', 8, 'delete_group'),
(32, 'Can view group', 8, 'view_group'),
(33, 'Can add project', 9, 'add_project'),
(34, 'Can change project', 9, 'change_project'),
(35, 'Can delete project', 9, 'delete_project'),
(36, 'Can view project', 9, 'view_project'),
(37, 'Can add teacher', 10, 'add_teacher'),
(38, 'Can change teacher', 10, 'change_teacher'),
(39, 'Can delete teacher', 10, 'delete_teacher'),
(40, 'Can view teacher', 10, 'view_teacher'),
(41, 'Can add student', 11, 'add_student'),
(42, 'Can change student', 11, 'change_student'),
(43, 'Can delete student', 11, 'delete_student'),
(44, 'Can view student', 11, 'view_student'),
(45, 'Can add project board', 12, 'add_projectboard'),
(46, 'Can change project board', 12, 'change_projectboard'),
(47, 'Can delete project board', 12, 'delete_projectboard'),
(48, 'Can view project board', 12, 'view_projectboard'),
(49, 'Can add template', 13, 'add_template'),
(50, 'Can change template', 13, 'change_template'),
(51, 'Can delete template', 13, 'delete_template'),
(52, 'Can view template', 13, 'view_template'),
(53, 'Can add admin', 14, 'add_admin'),
(54, 'Can change admin', 14, 'change_admin'),
(55, 'Can delete admin', 14, 'delete_admin'),
(56, 'Can view admin', 14, 'view_admin');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(14, 'springboard_api', 'admin'),
(7, 'springboard_api', 'classroom'),
(8, 'springboard_api', 'group'),
(9, 'springboard_api', 'project'),
(12, 'springboard_api', 'projectboard'),
(11, 'springboard_api', 'student'),
(10, 'springboard_api', 'teacher'),
(13, 'springboard_api', 'template');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-08-16 14:15:36.880579'),
(2, 'auth', '0001_initial', '2023-08-16 14:15:37.213756'),
(3, 'admin', '0001_initial', '2023-08-16 14:15:37.291191'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-08-16 14:15:37.298714'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-08-16 14:15:37.305724'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-08-16 14:15:37.368312'),
(7, 'auth', '0002_alter_permission_name_max_length', '2023-08-16 14:15:37.422428'),
(8, 'auth', '0003_alter_user_email_max_length', '2023-08-16 14:15:37.448449'),
(9, 'auth', '0004_alter_user_username_opts', '2023-08-16 14:15:37.456380'),
(10, 'auth', '0005_alter_user_last_login_null', '2023-08-16 14:15:37.484483'),
(11, 'auth', '0006_require_contenttypes_0002', '2023-08-16 14:15:37.487000'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2023-08-16 14:15:37.497533'),
(13, 'auth', '0008_alter_user_username_max_length', '2023-08-16 14:15:37.525065'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2023-08-16 14:15:37.544495'),
(15, 'auth', '0010_alter_group_name_max_length', '2023-08-16 14:15:37.566915'),
(16, 'auth', '0011_update_proxy_permissions', '2023-08-16 14:15:37.575495'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2023-08-16 14:15:37.601411'),
(18, 'sessions', '0001_initial', '2023-08-16 14:15:37.634049'),
(19, 'springboard_api', '0001_initial', '2023-08-16 14:15:37.843174'),
(20, 'springboard_api', '0002_remove_group_project_fk_project_group_fk', '2023-09-25 14:06:22.694653'),
(21, 'springboard_api', '0003_remove_projectboard_boardtype_projectboard_title', '2023-09-25 15:23:56.852197'),
(22, 'springboard_api', '0004_alter_projectboard_title', '2023-09-27 03:14:45.522904'),
(25, 'springboard_api', '0005_template', '2023-09-28 13:58:16.129629'),
(26, 'springboard_api', '0006_projectboard_feedback_projectboard_recommendation_and_more', '2023-10-07 06:15:40.013119'),
(27, 'springboard_api', '0007_student_is_staff_teacher_is_staff', '2023-10-18 03:10:33.796104'),
(28, 'springboard_api', '0008_student_email_student_last_login_student_password_and_more', '2023-10-18 03:10:33.920302'),
(29, 'springboard_api', '0009_teacher_last_login_alter_teacher_email_and_more', '2023-10-18 03:10:34.023481'),
(30, 'springboard_api', '0010_template_ispublic', '2023-10-18 03:10:34.046759'),
(31, 'springboard_api', '0011_alter_projectboard_deleted_at', '2023-10-18 03:10:34.110096'),
(32, 'springboard_api', '0012_alter_template_deleted_at', '2023-10-18 03:10:34.166236'),
(33, 'springboard_api', '0013_project_ispublic_project_score', '2023-10-18 03:10:34.213701'),
(34, 'springboard_api', '0014_alter_project_score', '2023-10-18 03:10:34.270402'),
(35, 'springboard_api', '0015_rename_ispublic_project_isactive_and_more', '2023-11-04 12:17:14.853872'),
(36, 'springboard_api', '0016_admin', '2023-11-05 14:59:05.769829'),
(37, 'springboard_api', '0017_remove_template_teacher_fk', '2023-11-05 14:59:06.391883'),
(38, 'springboard_api', '0018_project_reason_projectboard_templateid', '2023-11-05 14:59:06.431269'),
(39, 'springboard_api', '0019_projectboard_boardid', '2023-11-07 14:38:25.066701'),
(40, 'springboard_api', '0020_project_description', '2023-11-07 14:38:25.088250'),
(41, 'springboard_api', '0021_alter_project_name', '2023-12-18 11:39:10.589582'),
(42, 'springboard_api', '0022_alter_admin_deleted_at_alter_student_deleted_at_and_more', '2023-12-22 02:33:10.272978');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_admin`
--

CREATE TABLE `springboard_api_admin` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_admin`
--

INSERT INTO `springboard_api_admin` (`id`, `password`, `last_login`, `firstname`, `lastname`, `email`, `is_staff`, `created_at`, `deleted_at`) VALUES
(1, 'pbkdf2_sha256$600000$hULWB0HvmKwpcd4iV8kPVS$qEdH1cr2rLbgJ2hDdXhdsAd1BZiq7ITSb5exMiQql8g=', NULL, 'Admin', '123', 'admin@gmail.com', 0, '2023-11-09 22:08:00.000000', '2023-11-30 22:08:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_classroom`
--

CREATE TABLE `springboard_api_classroom` (
  `id` bigint(20) NOT NULL,
  `class_code` varchar(6) NOT NULL,
  `class_name` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) NOT NULL,
  `teacher_fk_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_classroom`
--

INSERT INTO `springboard_api_classroom` (`id`, `class_code`, `class_name`, `created_at`, `deleted_at`, `teacher_fk_id`) VALUES
(1, 'Abc1', 'Class F1', '2023-09-24 22:24:21.000000', '0000-00-00 00:00:00.000000', 3),
(2, 'Abc2', 'Class F2', '2023-09-24 22:24:21.000000', '0000-00-00 00:00:00.000000', 3),
(3, 'Abc3', 'Class F3', '2023-09-24 22:24:21.000000', '0000-00-00 00:00:00.000000', 1),
(4, 'Abc3', 'Class #1', '2023-09-24 22:24:21.000000', '0000-00-00 00:00:00.000000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_group`
--

CREATE TABLE `springboard_api_group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) NOT NULL,
  `classroom_fk_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_group`
--

INSERT INTO `springboard_api_group` (`id`, `name`, `created_at`, `deleted_at`, `classroom_fk_id`) VALUES
(1, 'Techy 1', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 1),
(2, 'Techy 2', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 4),
(3, 'Techy 3', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 4),
(4, 'Techy 1.2', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 2),
(5, 'Techy 1.1', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 4),
(6, 'Team Bobskie', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 1),
(7, 'Team Innovation', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 1),
(8, 'Team CompSci', '2023-09-25 22:12:23.000000', '0000-00-00 00:00:00.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_project`
--

CREATE TABLE `springboard_api_project` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `group_fk_id` bigint(20) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `score` double NOT NULL,
  `reason` longtext NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_project`
--

INSERT INTO `springboard_api_project` (`id`, `name`, `created_at`, `group_fk_id`, `isActive`, `score`, `reason`, `description`) VALUES
(9, 'EcoHub Connect', '2023-11-09 14:20:33.209000', 6, 1, 41.3, 'None', 'EcoHub Connect aims to create a centralized platform that connects eco-conscious consumers with local sustainable businesses. The platform will feature a user-friendly interface where consumers can discover and support businesses committed to environmentally friendly practices. Businesses can showcase their eco-friendly initiatives, products, and services, fostering a community dedicated to sustainable living. The project not only promotes environmentally responsible choices but also supports local economies and fosters a sense of community among like-minded individuals.'),
(13, 'SmartHomeHub', '2023-11-09 22:34:02.905000', 1, 0, 32.44999999999999, 'None', 'The SmartHomeHub project aims to develop an intelligent and interconnected home automation system.'),
(14, 'QuantumMind', '2023-11-09 22:34:28.889000', 1, 1, 36.4, 'None', 'The he QuantumMind project is an ambitious venture focused on the intersection of quantum computing and artificial intelligence.'),
(16, 'Tourit', '2023-11-10 03:04:54.255000', 6, 0, 38.900000000000006, '', 'This project is about the different routes and tourist spots in Cebu which help local and foreign tourist in an app.'),
(17, 'Adaptive Learning in coding', '2023-11-10 05:32:45.076000', 8, 1, 36.300000000000004, 'None', 'This projects seeks to help and enhance the coding experience of the students.'),
(21, 'EcoCharge', '2023-11-10 06:29:14.778000', 7, 0, 7.700000000000001, 'The project is discontinued because the other project is more detailed and because of time constrains.', 'EcoCharge is a venture aimed at creating sustainable charging solutions for electronic devices using renewable energy sources. Our goal is to reduce the carbon footprint associated with charging devices while providing a reliable and efficient solution for consumers.'),
(22, 'Testing Proj 1', '2023-11-19 09:49:58.774000', 8, 0, 8, '', 'Test desc'),
(25, 'qwqeqwrqw', '2023-11-19 09:53:04.451000', 8, 0, 0, '', 'vsdvdsvsdv'),
(31, 'charlette projet', '2023-11-19 09:55:26.739000', 7, 1, 0, 'None', 'ecwd'),
(32, 'Test proj', '2023-11-19 10:07:49.929000', 2, 0, 35.699999999999996, '', '1'),
(33, 'Tourit Project', '2023-12-17 03:52:07.787000', 1, 0, 0, 'NOne', 'This project help local and foreign tourist.'),
(34, '12', '2023-12-20 04:13:40.102000', 2, 0, 0, '', '12'),
(35, '1223', '2023-12-20 04:13:46.973000', 2, 0, 0, '', '12');

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_projectboard`
--

CREATE TABLE `springboard_api_projectboard` (
  `id` bigint(20) NOT NULL,
  `content` longtext NOT NULL,
  `novelty` int(11) NOT NULL,
  `capability` int(11) NOT NULL,
  `technical_feasibility` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `project_fk_id` bigint(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `feedback` longtext NOT NULL,
  `recommendation` longtext NOT NULL,
  `references` longtext NOT NULL,
  `templateId` int(11) NOT NULL,
  `boardId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_projectboard`
--

INSERT INTO `springboard_api_projectboard` (`id`, `content`, `novelty`, `capability`, `technical_feasibility`, `created_at`, `deleted_at`, `project_fk_id`, `title`, `feedback`, `recommendation`, `references`, `templateId`, `boardId`) VALUES
(55, '<p><strong style=\"color: var(--tw-prose-bold);\">Focus Area:</strong> Sustainable Agriculture</p><p><strong style=\"color: var(--tw-prose-bold);\">End User:</strong><strong> </strong>Small-scale farmers and environmentally conscious consumers</p><p><strong style=\"color: var(--tw-prose-bold);\">Knowledge:</strong> Understanding of sustainable farming practices, market trends in sustainable agriculture, and consumer preferences for eco-friendly products.</p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Problem Statement:</strong><strong> </strong>Small-scale farmers face challenges in accessing markets for their sustainable produce, while consumers lack a convenient platform to discover and purchase such products, hindering the growth of the sustainable agriculture sector.</p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">How-Might-We:</strong></p><p><em>Action:</em> Connect</p><p><em>Subject:</em> Small-scale farmers</p><p><em>Outcome:</em> Streamline the marketing and distribution process for sustainable agricultural products, making them easily accessible to consumers.</p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Elevator Pitch:</strong></p><p><strong>\"EcoHarvest empowers small-scale farmers by connecting them with eco-conscious consumers. We streamline the marketing and distribution of sustainably grown produce, providing consumers with easy access to ethically sourced, farm-fresh products. Join us in cultivating a sustainable future, one harvest at a time.\"</strong></p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">References:</strong></p><ul><li><span style=\"color: rgba(41,100,170,var(--tw-text-opacity));\">Sustainable Agriculture Practices</span></li><li><span style=\"color: rgba(41,100,170,var(--tw-text-opacity));\">Market Trends in Sustainable Agriculture</span></li><li><span style=\"color: rgba(41,100,170,var(--tw-text-opacity));\">Consumer Preferences for Eco-friendly Products</span></li></ul><p><br></p>', 8, 9, 9, '2023-11-09 15:09:47.845477', NULL, 9, 'Ideating a New Venture', 'The elevator pitch could be further refined to better capture the attention of potential customers. Additionally, more research into consumer preferences and market trends in sustainable agriculture could be conducted in order to strengthen the business model.', 'EcoHarvest provides a unique solution to the issue of connecting small-scale farmers to environmentally conscious consumers. The idea is technically feasible and has the capability to revolutionize the sustainable agriculture sector.', 'https://www.sare.org/Learning-Center/Sustainable-Agriculture-Practices, https://www.sustainability.com/topics/sustainable-agriculture', 11, 1),
(56, '<p><span style=\"color: var(--tw-prose-bold);\">End User:</span> Eco-conscious Consumers</p><p><br></p><p><span style=\"color: var(--tw-prose-bold);\">User Story:</span></p><p><span style=\"color: var(--tw-prose-bold);\">User Story Title:</span> \"From Consumer to Eco-Advocate\"</p><p><br></p><p><span style=\"color: var(--tw-prose-bold);\">PHASES:</span></p><p><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span></p><ol><li>Discover eco-friendly products.</li><li>Make informed purchasing decisions.</li><li>Contribute to sustainable practices.</li></ol><p><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span></p><ol><li>Search for sustainable products online.</li><li>Read product labels and reviews.</li><li>Make a purchase decision.</li></ol><p><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span></p><ol><li>Search: 3</li><li>Read: 2</li><li>Decide: 4</li></ol><p><br></p><p><span style=\"color: var(--tw-prose-bold);\">FOCUSED STEPS:</span></p><ol><li><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span> Implement a personalized recommendation system based on user preferences and values.</li></ol><p>        Leverage machine learning algorithms to analyze user behavior and preferences.</p><ol><li><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span> Machine learning algorithms, data analytics tools, and a user-friendly app interface.</li><li><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span> Increase in user satisfaction and engagement by 20%, as reflected in longer app sessions and higher conversion rates.</li></ol><p><br></p>', 9, 9, 8, '2023-11-09 15:13:21.516905', NULL, 9, 'User Story Map', 'To increase user engagement, it is important to have a user-friendly app interface. Data analytics tools can be used to track user behavior and preferences.', 'Implementing a personalized recommendation system based on user preferences and values would improve user satisfaction and engagement. Leveraging machine learning algorithms to analyze user behavior and preferences could help to optimize user experience.', 'https://www.uxmatters.com/mt/archives/2018/08/building-user-stories-for-ux-design.php, https://uxplanet.org/how-to-write-user-stories-for-ux-design-f7c8d6b8e0d7', 12, 2),
(57, '<p><strong style=\"color: var(--tw-prose-bold);\">Idea or Technology:</strong></p><p>	AI-Powered Predictive Maintenance for Manufacturing Equipment</p><p><strong style=\"color: var(--tw-prose-bold);\">Industry or Similar Category:</strong></p><p>	Manufacturing and Industrial Automation</p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Applicable Industries:</strong></p><ol><li>Automotive Manufacturing</li><li>Aerospace Manufacturing</li><li>Electronics Manufacturing</li><li>Chemical Processing</li><li>Pharmaceutical Production</li></ol><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Market Segment Level 1:</strong></p><p><br></p><p>	Manufacturing Plant Managers and Operations Directors</p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Target Audience:</strong></p><ol><li>Automotive Plant Managers</li><li>Aerospace Operations Directors</li><li>Electronics Manufacturing Plant Managers</li><li>Chemical Processing Facility Managers</li><li>Pharmaceutical Production Operations Directors</li></ol><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">End User:</strong></p><p>	Operations and Maintenance teams in manufacturing plants who aim to minimize downtime, reduce maintenance costs, and enhance overall equipment efficiency.</p><p><br></p>', 8, 9, 8, '2023-11-09 15:18:37.703936', NULL, 9, 'Industries & Market Segments', 'The AI-Powered Predictive Maintenance for Manufacturing Equipment is a highly innovative technology with high technical feasibility and capability. However, its implementation requires extensive research and development.', 'AI-Powered Predictive Maintenance for Manufacturing Equipment has the potential to revolutionize the manufacturing and industrial automation industry. It can help operations and maintenance teams in manufacturing plants to minimize downtime, reduce maintenance costs, and enhance overall equipment efficiency.', 'https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/how-ai-will-transform-the-manufacturing-industry#, https://www.gartner.com/en/information-technology/insights/ai-in-manufacturing-the-future-is-now', 13, 3),
(62, '<p>Primary Market Research Preparation</p><p><br></p><p><strong>Proper Mindset:</strong></p><p><em>Approach with an inquisitive mindset, avoiding assumptions and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</em></p><p><br></p><p><strong>Fill out all highlighted fields in yellow before submitting.</strong></p><p><br></p><ol><li>Profile(s) of the people you want to engage with:</li><li>Identify the top 2 end user segments, gathering preliminary information.</li></ol><p><br></p><p><span style=\"color: var(--tw-prose-bold);\">1. Profile(s) of the people you want to engage with.</span></p><p>I want to talk to people who are into gaming and love spending time online. They\'re the cool tech-savvy crowd who always have the latest gadgets.</p><p><span style=\"color: var(--tw-prose-bold);\">2. Identify the top 2 end user segments, gathering preliminary information.</span></p><p><span style=\"color: var(--tw-prose-bold);\">Top 1 End User Segment:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Firstname:</span> Alex</p><p><span style=\"color: var(--tw-prose-bold);\">Background:</span> College student majoring in computer science. Loves gaming, spends weekends coding, and is always on the lookout for tech solutions that make life easier.</p><p><span style=\"color: var(--tw-prose-bold);\">Top 2 End User Segment:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Firstname:</span> Mia</p><p><span style=\"color: var(--tw-prose-bold);\">Background:</span> Young professional working in a tech startup. Balancing work and social life, she values efficient solutions that save time and make her daily tasks smoother.</p><p><span style=\"color: var(--tw-prose-bold);\">Experts:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Firstname:</span> Max</p><p><span style=\"color: var(--tw-prose-bold);\">Background:</span> Works as a game developer. Has inside knowledge of the gaming industry, understands the pain points, and is always excited about tech innovations.</p><p><span style=\"color: var(--tw-prose-bold);\">Lead Customers:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Size of Market (# of End Users in the country):</span> Around a gazillion (just kidding, but it\'s a lot!)</p><ul><li><span style=\"color: var(--tw-prose-bold);\">Competition/Alternatives:</span> There\'s a bunch of gaming apps and tech solutions out there, but not many focus on making the user experience super smooth. Some big players are already in the game, but they don\'t have that special touch we\'re thinking of adding.</li></ul>', 8, 10, 9, '2023-11-09 21:44:46.739311', NULL, 9, 'PMR Preparation', 'Consider the competitive landscape and look for ways to stand out from the competition. ', 'Focus on making the user experience as smooth as possible, and leverage existing technologies to cut development time. ', 'https://www.accenture.com/us-en/insight-primary-market-research-guide; https://www.qualtrics.com/experience-management/research/primary-market-research/', 14, 4),
(63, '<p>End User Segment:</p><p><br></p><p>Primary Segment: B2C (Business-to-Consumer)</p><p>Demographics (B2C):</p><p><br></p><p>Age Bracket: 25-35</p><p>Sex Assigned at Birth: Doesn\'t matter</p><p>Income Range: Enough for avocado toast on weekends</p><p>Occupation: Professional meme scroller</p><p>Relationship Status: \"It\'s complicated\" with Netflix</p><p>Education: Enough to spell \'entrepreneurship\'</p><p>Religion: Believes in the Church of Wi-Fi</p><p>Address: Somewhere between Reality and Dreamland</p><p>Psychographics:</p><p><br></p><p>Digital/Social Media Presence: On all platforms but only for memes</p><p>Hobbies: Procrastination Olympics gold medalist</p><p>Interests: Cats, pizza, and conspiracy theories about time travel</p><p>Affiliations/Clubs/Organizations: Founder of the \"Napping Enthusiasts Club\"</p><p>Favorite sources for news and information: Twitter memes and conspiracy theory YouTube channels</p><p>Usage: Phones glued to hands, 24/7</p><p>Priorities:</p><p><br></p><p>Priority 1: Ensuring a steady supply of snacks</p><p>Priority 2: Developing an algorithm for the perfect playlist for napping</p>', 8, 7, 5, '2023-11-09 21:47:20.601452', NULL, 9, 'End User Profile', 'Consider expanding the target demographic to include other age brackets and sex assigned at birth. ', 'Develop an algorithm for the perfect playlist for napping and create a steady supply of snacks to meet the needs of the target audience. ', 'https://www.forbes.com/sites/forbescommunicationscouncil/2018/10/25/tips-for-targeting-your-audience-effectively/#3f7c9a2520f2, https://www.inc.com/larry-kim/how-to-define-your-target-audience-in-3-steps.html', 15, 5),
(73, '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p><p><br></p>', 8, 8, 8, '2023-11-09 22:39:32.265327', NULL, 14, 'Ideating a New Venture', 'The venture should ensure that the problem statement is clearly defined in order to identify the venture\'s key objectives. Additionally, the venture should consider relevant information and expertise needed for the venture in order to maximize the venture\'s potential. ', 'This venture should consider the target audience and user group in order to provide a unique value proposition. Additionally, the venture should ensure that the desired outcome is achievable in order to maximize the venture\'s success. ', 'https://www.investopedia.com/terms/v/value-proposition.asp, https://www.investopedia.com/terms/p/problem-statement.asp', 11, 10),
(74, '<p>Primary Market Research Preparation</p><p><br></p><p><strong>Proper Mindset:</strong></p><p><em>Approach with an inquisitive mindset, avoiding assumptions and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</em></p><p><br></p><p><strong>Fill out all highlighted fields in yellow before submitting.</strong></p><p><br></p><ol><li>Profile(s) of the people you want to engage with:</li><li>Identify the top 2 end user segments, gathering preliminary information.</li></ol><p><br></p><p><strong>Top 1 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Top 2 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Experts:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Lead Customers:</strong></p><p>Size of Market (# of End Users in the country).</p><p>Competition/Alternatives (include competition available globally).</p><p><br></p><p><br></p><p><strong>Row Definitions:</strong></p><p><br></p><ul><li><em>Top End User Segment: T</em>he top 2 end user segments from End User Ranking.</li><li><em>20 End Users:</em> Individuals using the product, not the economic buyer. List users in the company or organization.</li><li><em>Background related to the product or solution: </em>One sentence describing the user\'s background and their ability to provide insights.</li><li><em>Expert: </em>Subject matter experts with reliable insights on the addressed problem and envisioned technology.</li><li><em>Lead Customers:</em> Influential customers whose purchase would set a precedent.</li><li>Size of Market (# of End Users): Estimate the number of end users.</li><li><em>Competition/Alternatives:</em> Identify competition and alternatives from the end user\'s perspective.</li></ul>', 8, 9, 8, '2023-11-09 22:39:57.874501', NULL, 14, 'PMR Preparation', 'It is important to ensure that all highlighted fields are filled out before submitting and that all row definitions are clearly understood. ', 'Gathering preliminary information on the top two end user segments and engaging with experts and lead customers to gain insights into customer needs and the competitive landscape is essential for primary market research preparation. Additionally, it is important to approach with an inquisitive mindset, avoiding assumptions and advocating ideas. ', 'https://www.forbes.com/sites/forbescommunicationscouncil/2018/02/15/the-importance-of-primary-market-research/#7a9f5e4f1d1e, https://www.forbes.com/sites/forbesagencycouncil/2018/06/25/the-importance-of-market-research-for-your-business/#5a9c8e9f4f3c.', 14, 11),
(75, '<p>End User Segment:</p><p><span style=\"color: var(--tw-prose-bold);\">B2B Segment</span></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Age Bracket: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Sex Assigned at Birth: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Income Range: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Occupation: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Relationship Status: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Education: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Religion: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Address: N/A (B2B)</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Industry: Technology and Research</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Number of Employees: Medium to Large Enterprises</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Industry Served: Quantum Computing, Artificial Intelligence, Technology Innovation</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Technology Involved: Quantum Computing, Artificial Intelligence</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Address: Global, with a focus on technology hubs</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Psychographics:</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Digital/Social Media Presence: High, active on professional networking platforms.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Hobbies: Technology enthusiasts, engaged in STEM-related activities.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Interests: Cutting-edge technologies, quantum computing, artificial intelligence.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Affiliations/Clubs/Organizations: Members of professional organizations related to technology and research.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Favorite sources for news and information: Scientific journals, technology publications, reputable online forums.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Usage: Regular users of advanced technologies in their respective industries.</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Priorities:</strong></p><p><strong style=\"color: var(--tw-prose-bold);\">Priority 1: Advancements in Quantum Computing and Artificial Intelligence.</strong></p><ul><li class=\"ql-indent-1\"><strong style=\"color: var(--tw-prose-bold);\">Priority 2: Collaboration and networking within the global technology and research community.</strong></li></ul>', 8, 9, 9, '2023-11-09 22:41:27.145224', NULL, 14, 'End User Profile', 'Consider expanding the demographic scope to include B2C segments to increase market reach. Develop a comprehensive understanding of the target industry to gain insights into potential customer needs and preferences. ', 'Focus on collaborations and networking with the global technology and research community to develop advancements in quantum computing and artificial intelligence. Leverage existing technology platforms to increase the reach of the B2B segment. ', 'https://www.forbes.com/sites/bernardmarr/2018/03/14/the-amazing-promise-of-quantum-computing/#7a0d3f3a5f9d https://www.forbes.com/sites/bernardmarr/2018/03/14/the-amazing-promise-of-quantum-computing/#7a0d3f3a5f9d', 15, 12),
(77, '<p><span style=\"color: var(--tw-prose-bold);\">Idea or Tech Stuff:</span></p><p><strong>Like, imagine this super cool app with Augmented Reality magic for travel vibes!</strong></p><p><span style=\"color: var(--tw-prose-bold);\">Industry or Similar Category:</span></p><p><strong>It\'s totally for the Travel and Explore Squad!</strong></p><p><span style=\"color: var(--tw-prose-bold);\">Specify the industry or a related category where your idea or tech is applicable:</span></p><ol><li>Jetsetter Tech</li><li>Augmented Reality Awesomeness</li><li>Wanderlust Services</li><li>Phone Apps Extravaganza</li><li>User Experience for the Win!</li></ol><p><span style=\"color: var(--tw-prose-bold);\">Market Segment Level 1:</span></p><p><strong>Gotta know who\'s gonna rock this, right?</strong></p><ol><li>Solo Adventure Seekers</li><li>Crew Leaders for Group Escapades</li><li>Travel Planner Gurus</li><li>Hype Squads at Tourism Spots</li><li>Geeks who Love Tech Adventures</li></ol><p><span style=\"color: var(--tw-prose-bold);\">End User:</span></p><p><strong>Think about who\'s gonna high-five you for this epic idea!</strong></p><ol><li>Travel Addicts wanting epic adventures</li><li>Organizers of Epic Group Trips</li><li>Agents making Travel Dreams come true</li><li>Locals wanting to show off their turf</li><li>Tech Nerds who want travel to be as cool as gaming!</li></ol><p><br></p>', 8, 8, 7, '2023-11-10 01:23:36.568790', NULL, 13, 'Industries & Market Segments', 'The idea is novel and technically feasible, but it\'s important to consider the user experience and how to make the app as engaging and user friendly as possible. ', 'Consider the scalability of the app and how it can be integrated with existing travel and explore services. Additionally, brainstorm ways to monetize the app. ', 'https://www.thinkwithgoogle.com/marketing-strategies/augmented-reality/  https://www.forbes.com/sites/forbesbusinessdevelopmentcouncil/2018/11/19/how-augmented-reality-is-revolutionizing-the-travel-industry/#7a7d9e6a7a2e', 13, 14),
(79, '<p><span style=\"color: var(--tw-prose-bold);\">Proper Mindset:</span></p><p>Okay, so going into this like, totally ready to soak up all the cool info without sticking to any boring ideas. Gotta be all about that learning vibe and be open to finding out new stuff about what our peeps really want.</p><p><span style=\"color: var(--tw-prose-bold);\">Profile(s) of the People You Want to Chat With:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Top 1 End User Segment:</span></p><ol><li><span style=\"color: var(--tw-prose-bold);\">20 End Users:</span></li><li class=\"ql-indent-1\">Smith, Emma</li><li class=\"ql-indent-1\">Patel, Raj</li><li class=\"ql-indent-1\">Rodriguez, Maria</li><li class=\"ql-indent-1\">Kim, Joon</li><li class=\"ql-indent-1\">Tanaka, Yuki</li><li class=\"ql-indent-1\">Garcia, Carlos</li><li class=\"ql-indent-1\">Nguyen, Linh</li><li class=\"ql-indent-1\">Müller, Franz</li><li class=\"ql-indent-1\">Chen, Mei</li><li class=\"ql-indent-1\">Ahmed, Fatima</li><li><span style=\"color: var(--tw-prose-bold);\">Background related to the product or solution:</span> These are the peeps who are all about saving the planet with sustainable travel and are basically pros at tech stuff. They travel a bunch and love soaking up different cultures.</li><li><span style=\"color: var(--tw-prose-bold);\">Experts:</span></li><li class=\"ql-indent-1\">Johnson, Dr. Emily - She\'s like a superhero of sustainable tourism.</li><li class=\"ql-indent-1\">Park, Prof. Chang - The wizard of Augmented Reality tech.</li><li class=\"ql-indent-1\">Lee, Sarah - She\'s basically the queen of travel tech startups.</li><li class=\"ql-indent-1\">Davis, Chris - The genius behind making apps super easy to use.</li><li class=\"ql-indent-1\">Patel, Dr. Anika - She\'s like a detective but for understanding cultures.</li><li><span style=\"color: var(--tw-prose-bold);\">Background related to the problem, product, or solution:</span> They\'re the superheroes of sustainable tourism, AR tech, travel tech startups, making stuff easy to use, and understanding cultures.</li><li><span style=\"color: var(--tw-prose-bold);\">Lead Customers:</span></li></ol><ul><li class=\"ql-indent-1\">Companies with loads of employees, at least 10,000.</li><li class=\"ql-indent-1\">There are like a million people who could totally use this.</li></ul><ol><li><span style=\"color: var(--tw-prose-bold);\">Competition/Alternatives:</span></li></ol><ul><li class=\"ql-indent-1\">Competitors: Apps that are good for travel but not so much on saving the planet.</li><li class=\"ql-indent-1\">Alternatives: Old-school travel agencies and DIY travel planning, ew.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Top 2 End User Segment:</span></p><ol><li><span style=\"color: var(--tw-prose-bold);\">20 End Users:</span></li><li class=\"ql-indent-1\">Yamamoto, Takeshi</li><li class=\"ql-indent-1\">Patel, Priya</li><li class=\"ql-indent-1\">Smith, Olivia</li><li class=\"ql-indent-1\">Kim, Minho</li><li class=\"ql-indent-1\">Santos, Isabella</li><li class=\"ql-indent-1\">Li, Wei</li><li class=\"ql-indent-1\">Brown, Emily</li><li class=\"ql-indent-1\">Gonzalez, Javier</li><li class=\"ql-indent-1\">Müller, Ingrid</li><li class=\"ql-indent-1\">Wang, Jian</li><li><span style=\"color: var(--tw-prose-bold);\">Background related to the product or solution:</span> These are the solo travelers and group organizers who live for adventure and exploring epic places.</li><li><span style=\"color: var(--tw-prose-bold);\">Experts:</span></li><li class=\"ql-indent-1\">Rodriguez, Dr. Carlos - Adventure guru.</li><li class=\"ql-indent-1\">Chang, Jenny - Solo travel queen.</li><li class=\"ql-indent-1\">Patel, Aarav - The boss at organizing group adventures.</li><li class=\"ql-indent-1\">Kim, Seo-yeon - Knows everything about exploring cultures.</li><li class=\"ql-indent-1\">Tanaka, Hiroshi - Reviews mobile apps like a pro.</li><li><span style=\"color: var(--tw-prose-bold);\">Background related to the problem, product, or solution:</span> They\'re the adventure gurus, solo and group travel maestros, culture explorers, and app reviewers.</li><li><span style=\"color: var(--tw-prose-bold);\">Lead Customers:</span></li></ol><ul><li class=\"ql-indent-1\">Travel agencies all about those adventure tours.</li><li class=\"ql-indent-1\">There are like half a million people who\'d be down for this.</li></ul><ol><li><span style=\"color: var(--tw-prose-bold);\">Competition/Alternatives:</span></li></ol><ul><li class=\"ql-indent-1\">Competitors: Apps that do adventure travel but lack the cool AR stuff.</li><li class=\"ql-indent-1\">Alternatives: Old-school tour agencies and other adventure planning apps.</li></ul><p><br></p>', 8, 8, 8, '2023-11-10 01:34:41.251285', NULL, 13, 'PMR Preparation', 'The data provided is comprehensive and well-structured. However, it may be beneficial to include more detail on the background of the lead customers and the competition/alternatives. ', 'It appears that the data provided is well-suited for a novel product or solution that could be developed to meet the needs of the two end user segments. I recommend further research into the technical feasibility of the product or solution, as well as the capabilities of the competitors and alternatives. ', '\n\nhttps://www.inc.com/john-rampton/how-to-evaluate-the-feasibility-of-a-business-idea.html \n\nhttps://www.thebalancesmb.com/evaluating-capability-of-a-business-idea-2951720', 14, 16),
(80, '<p><span style=\"color: var(--tw-prose-bold);\">End User Segment:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Primary Segment:</span> B2C (Business-to-Consumer)</p><p><span style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Age Bracket:</span> 25-40 (aka the cool adulting squad)</li><li><span style=\"color: var(--tw-prose-bold);\">Sex Assigned at Birth:</span> Literally, whatever vibes you got!</li><li><span style=\"color: var(--tw-prose-bold);\">Income Range:</span> Makin\' around $40,000 - $100,000, you know, adulting money.</li><li><span style=\"color: var(--tw-prose-bold);\">Occupation:</span> Doing cool jobs, freelancers, and creative minds.</li><li><span style=\"color: var(--tw-prose-bold);\">Relationship Status:</span> Either solo adventurers or Instagram\'s official \"In a Relationship.\"</li><li><span style=\"color: var(--tw-prose-bold);\">Education:</span> College smarty-pants or even more school if that\'s your jam.</li><li><span style=\"color: var(--tw-prose-bold);\">Religion:</span> Diverse vibes</li><li><span style=\"color: var(--tw-prose-bold);\">Address:</span> Urban and Suburban - city or chill suburb, whatever floats your boat.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Psychographics:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Digital/Social Media Presence:</span> Insta-famous, TikTok trendsetters, and part of travel forums, obvi.</li><li><span style=\"color: var(--tw-prose-bold);\">Hobbies:</span> Travel addicts, outdoor enthusiasts, and photography wizards.</li><li><span style=\"color: var(--tw-prose-bold);\">Interests:</span> Loving the Earth, tech stuff, and soaking up different cultures.</li><li><span style=\"color: var(--tw-prose-bold);\">Affiliations/Clubs/Organizations:</span> Part of travel squads and eco-friendly crews.</li><li><span style=\"color: var(--tw-prose-bold);\">Favorite sources for news and information:</span> Getting the deets from travel blogs and staying tech-savvy.</li><li><span style=\"color: var(--tw-prose-bold);\">Usage:</span> Living on travel apps and socials for trip planning and sharing epic stories.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Priorities:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Priority 1:</span> All about those sustainable and mind-blowing travel experiences!</li><li><span style=\"color: var(--tw-prose-bold);\">Priority 2:</span> Trip planning that\'s smooth as butter and tech upgrades for next-level adventures.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Industry:</span> Making travel tech look cool</li><li><span style=\"color: var(--tw-prose-bold);\">Number of Employees:</span> From 50 to 500, keeping it small but mighty.</li><li><span style=\"color: var(--tw-prose-bold);\">Industry Served:</span> Helping out travel agencies, tour operators, and eco-warrior tourism groups.</li><li><span style=\"color: var(--tw-prose-bold);\">Technology Involved:</span> Augmented Reality, Artificial Intelligence, and the magic of User Experience Design.</li><li><span style=\"color: var(--tw-prose-bold);\">Address:</span> Hanging out in tech hubs and city centers, where the tech magic happens.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Psychographics:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Digital/Social Media Presence:</span> LinkedIn legends, Twitter trendsetters, and tech forum heroes.</li><li><span style=\"color: var(--tw-prose-bold);\">Hobbies:</span> Keeping up with the latest tech trends and hitting up industry conferences.</li><li><span style=\"color: var(--tw-prose-bold);\">Interests:</span> All about the innovation in travel tech and making travel as eco-friendly as possible.</li><li><span style=\"color: var(--tw-prose-bold);\">Affiliations/Clubs/Organizations:</span> Part of tech and travel industry squads, obviously.</li><li><span style=\"color: var(--tw-prose-bold);\">Favorite sources for news and information:</span> Tech mags, industry reports, and online forums are the go-to.</li><li><span style=\"color: var(--tw-prose-bold);\">Usage:</span> Tech is their everyday sidekick for running the business and staying ahead in the industry.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Priorities:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Priority 1:</span> Bringing in the coolest travel tech that\'s ahead of the game.</li><li><span style=\"color: var(--tw-prose-bold);\">Priority 2:</span> Making travel services super high-tech and friendly to Mother Earth.</li><li class=\"ql-indent-1\"><br></li></ul>', 8, 8, 8, '2023-11-10 01:41:17.461853', NULL, 13, 'End User Profile', 'The data provided is comprehensive and thorough, and it paints a clear picture of the end user segment. However, there could be more specific information regarding the technological capabilities of the B2B customers. ', 'Consider developing a platform that seamlessly integrates the various technologies mentioned in the data, such as Augmented Reality and Artificial Intelligence. Additionally, look into ways to optimize the user experience for both B2C and B2B customers. ', 'https://www.forbes.com/sites/forbestechcouncil/2018/09/13/the-emerging-role-of-augmented-reality-in-the-travel-industry/?sh=3d1e1f2f5b9d, https://www.forbes.com/sites/forbestechcouncil/2018/10/18/how-artificial-intelligence-is-transforming-the-travel-industry/?sh=5c4d3f3f6d2e', 15, 17),
(84, '<p><span style=\"color: var(--tw-prose-bold);\">End User Segment:</span></p><p><span style=\"color: var(--tw-prose-bold);\">Primary Segment:</span> B2C (Business-to-Cute-kids)</p><p><span style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Age Bracket:</span> Super cool kids aged 5-10</li><li><span style=\"color: var(--tw-prose-bold);\">Sex Assigned at Birth:</span> Whatever the storks decided</li><li><span style=\"color: var(--tw-prose-bold);\">Income Range:</span> Depends on how many chores they did</li><li><span style=\"color: var(--tw-prose-bold);\">Occupation:</span> Pro toy testers, part-time superheroes</li><li><span style=\"color: var(--tw-prose-bold);\">Relationship Status:</span> Best friends with their teddy bears</li><li><span style=\"color: var(--tw-prose-bold);\">Education:</span> ABCs, 123s, and coloring inside the lines</li><li><span style=\"color: var(--tw-prose-bold);\">Religion:</span> Believers in the magic of playtime</li><li><span style=\"color: var(--tw-prose-bold);\">Address:</span> Playground Avenue, Toyland</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Psychographics:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Digital/Social Media Presence:</span> YouTube for cartoons, Instagram for their crayon masterpieces</li><li><span style=\"color: var(--tw-prose-bold);\">Hobbies:</span> Building epic LEGO towers, finger painting masterpieces</li><li><span style=\"color: var(--tw-prose-bold);\">Interests:</span> Superheroes, princesses, talking animals</li><li><span style=\"color: var(--tw-prose-bold);\">Affiliations/Clubs/Organizations:</span> The \'Super-Fun Club,\' \'Adventurers of the Backyard\'</li><li><span style=\"color: var(--tw-prose-bold);\">Favorite sources for news and information:</span> The playground grapevine, bedtime stories</li><li><span style=\"color: var(--tw-prose-bold);\">Usage:</span> Non-stop play, occasional naps</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Priorities:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Priority 1:</span> Maximum fun and giggles</li><li><span style=\"color: var(--tw-prose-bold);\">Priority 2:</span> Endless snack supply</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Industry:</span> Toy Manufacturers for Awesome-kidville</li><li><span style=\"color: var(--tw-prose-bold);\">Number of Employees:</span> A bunch of toy-making wizards</li><li><span style=\"color: var(--tw-prose-bold);\">Industry Served:</span> Making the best toys for the coolest kids</li><li><span style=\"color: var(--tw-prose-bold);\">Technology Involved:</span> Cutting-edge fun-tech and imagination boosters</li><li><span style=\"color: var(--tw-prose-bold);\">Address:</span> Whimsical Way, Imagination Land</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Psychographics:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Digital/Social Media Presence:</span> Rockstars on toy review channels, trending on kiddie TikTok</li><li><span style=\"color: var(--tw-prose-bold);\">Hobbies:</span> Creating the next big toy sensation, playtesting new ideas</li><li><span style=\"color: var(--tw-prose-bold);\">Interests:</span> Making kids happy, brainstorming playtime wonders</li><li><span style=\"color: var(--tw-prose-bold);\">Affiliations/Clubs/Organizations:</span> \'Toy Innovators Guild,\' \'Imagination Architects\'</li><li><span style=\"color: var(--tw-prose-bold);\">Favorite sources for news and information:</span> Kid focus groups, colorful dreams</li><li><span style=\"color: var(--tw-prose-bold);\">Usage:</span> Diving into piles of toys, brainstorming in playrooms</li></ul><p><span style=\"color: var(--tw-prose-bold);\">Priorities:</span></p><ul><li><span style=\"color: var(--tw-prose-bold);\">Priority 1:</span> Crafting toys that spark endless joy</li><li><span style=\"color: var(--tw-prose-bold);\">Priority 2:</span> Staying ahead in the game of playtime innovations</li><li class=\"ql-indent-1\"><br></li></ul>', 8, 8, 8, '2023-11-10 02:06:02.719497', NULL, 13, 'End User Profile', 'The data provided offers a clear picture of the target audience and their interests, and the psychographic data provides a great insight into the potential success of the product. However, it is important to consider the need for a well-defined strategy to ensure that the product is developed with the right resources and within the right timeline. ', 'Consider the potential of developing a toy that combines the latest technology with the classic playtime elements to create a unique product. Additionally, focus on creating a toy that is easy to use and appeals to the imagination of the target audience. ', 'https://www.entrepreneur.com/article/238643, https://www.forbes.com/sites/alexkonrad/2018/06/27/how-toy-makers-are-using-tech-to-stay-ahead-in-a-crowded-market/#3a8b8c9f6d6b', 15, 18),
(87, '<p><span style=\"color: var(--tw-prose-bold);\">Idea or technology:</span> Flying Car with Pizza Oven Roof</p><p><span style=\"color: var(--tw-prose-bold);\">Industry or Similar Category:</span> Futuristic Gadgets and Delicious Eats</p><p><span style=\"color: var(--tw-prose-bold);\">Specify the industry or a related category where your idea or technology is applicable-</span></p><ol><li>Hovercraft Wonderworld</li><li>Space-age Kitchen Innovations</li><li>Sci-fi Fast Food Extravaganza</li><li>Extraterrestrial Dining Experiences</li><li>Gravity-Defying Culinary Marvels</li></ol><p><span style=\"color: var(--tw-prose-bold);\">Market Segment Level 1:</span> Flying Enthusiasts and Pizza Aficionados</p><p><span style=\"color: var(--tw-prose-bold);\">Identify the primary market segment or target audience within the chosen industry</span></p><p><strong>2. Anti-Gravity Adventure Seekers</strong></p><ol><li>Pizza Lovers with a Taste for the Galactic</li><li>Sci-fi Buffs and Foodies</li><li>Futuristic Family Pizza Night Crusaders</li></ol><p><span style=\"color: var(--tw-prose-bold);\">End User:</span> Individuals with a Passion for Soaring Heights and Gourmet Pizza</p><ol><li>Gravity-Defying Daredevils</li><li>Celestial Chefs and Pizza Pilots</li><li>Cosmic Connoisseurs of Fusion Cuisine</li><li>Interstellar Families on Pizza Quests</li><li>Extraterrestrial Taste Explorers</li></ol><p><br></p>', 7, 8, 8, '2023-11-10 02:27:33.658348', NULL, 14, 'Industries & Market Segments', '5', '5', 'The data should be more detailed and organized to better explain the concept. Additionally, more references should be provided to back up the claims made. Feedback', 13, 19),
(88, '<p><span style=\"color: var(--tw-prose-bold);\">End User:</span></p><p><strong>Pizza Enthusiasts with a Passion for High-Flying Adventures</strong></p><p><span style=\"color: var(--tw-prose-bold);\">User Story:</span></p><p><span style=\"color: var(--tw-prose-bold);\">User Story Title:</span> \"Pizza Flight Dreams\"</p><p><span style=\"color: var(--tw-prose-bold);\">PHASES:</span></p><p><span style=\"color: var(--tw-prose-bold);\">1. Planning the Pizza Adventure:</span></p><p><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span></p><ul><li>Craving for an out-of-this-world pizza experience.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span></p><ol><li>User browses local pizza joints for the same-old delivery.</li><li>User places a regular pizza order.</li><li>User waits anxiously for the pizza delivery.</li></ol><p><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span></p><ul><li>3</li></ul><p><span style=\"color: var(--tw-prose-bold);\">FOCUSED STEPS:</span></p><p><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span></p><ul><li>Introduce a Pizza Flight Planner app for unique pizza adventures.</li><li>Enable users to customize pizza toppings and select a high-flying pizza delivery option.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span></p><ul><li>Pizza Flight Planner app with augmented reality for customization.</li><li>Drone delivery technology for airborne pizza delivery.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span></p><ul><li>Increased excitement in planning pizza adventures.</li><li>Faster and more dynamic pizza delivery experience.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">2. Pizza Flight Adventure:</span></p><p><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span></p><ul><li>Enjoying pizza at home, same as always.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span></p><ol><li>Regular delivery guy delivers the pizza.</li><li>User opens the pizza box at home.</li><li>User enjoys the pizza while watching TV.</li></ol><p><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span></p><ul><li>4</li></ul><p><span style=\"color: var(--tw-prose-bold);\">FOCUSED STEPS:</span></p><p><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span></p><ul><li>Introduce a Pizza Hover Pod for a unique pizza arrival experience.</li><li>Include a smart pizza box with built-in entertainment features.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span></p><ul><li>Pizza Hover Pod for a dramatic pizza entrance.</li><li>Smart pizza box with a mini-screen for entertainment.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span></p><ul><li>Elevated excitement during pizza arrival.</li><li>Enhanced entertainment value during pizza consumption.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">3. Sharing the Pizza Flight:</span></p><p><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span></p><ul><li>Sharing pizza pics on social media.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span></p><ol><li>User takes regular pizza pics.</li><li>User posts pics on social media with standard captions.</li><li>Friends and followers give regular pizza-related comments.</li></ol><p><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span></p><ul><li>3</li></ul><p><span style=\"color: var(--tw-prose-bold);\">FOCUSED STEPS:</span></p><p><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span></p><ul><li>Introduce an Augmented Reality Pizza Filter for unique photo effects.</li><li>Enable users to share interactive pizza flight experiences on social media.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span></p><ul><li>AR Pizza Filter for creative photo enhancements.</li><li>Social media integration for sharing interactive pizza experiences.</li></ul><p><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span></p><ul><li>Increased engagement and comments on pizza-related posts.</li><li>Trending pizza flight experiences on social media platforms.</li></ul><p><br></p>', 8, 7, 8, '2023-11-10 02:36:52.029341', NULL, 14, 'User Story Map', '5 ', '5 ', 'The data should include more detailed information on the technical feasibility and capability of the project. Additionally, more references should be included to back up the data. ', 12, 20),
(92, '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p><p><br></p>', 7, 7, 8, '2023-11-10 03:05:07.604621', NULL, 16, 'Ideating a New Venture', '5', '5', 'The data should include more information regarding the technical feasibility and capability of the project. It should also include more references to back up the claims.', 11, 24),
(93, '<p><strong>End User</strong>: I think the tourist</p><p><br></p><p><strong>User Story:</strong></p><p><strong>User Story Title:</strong> I dont have an idea</p><p><br></p><p><strong>PHASES:</strong></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span> Identify the current goals or objectives of the user in their journey.</li><li><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span> Break down the user\'s current journey into distinct steps.</li><li><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span> Rate the current user experience at each step, with 5 being the highest and 1 the lowest.</li></ol><p><br></p><p><strong>FOCUSED STEPS:</strong></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span> Outline the innovative changes or solutions proposed for each step to enhance the user experience.</li><li><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span> Specify the technology or tools that will support the proposed innovations.</li><li><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span> Define the measurable outcomes or improvements expected in the user\'s journey.</li></ol>', 8, 8, 9, '2023-11-10 03:07:30.101288', NULL, 16, 'User Story Map', '5 ', '5 ', 'The data provided should include more detailed information regarding the technical feasibility and capability of the project. Additionally, more references should be provided to support the claims made in the data. \n\nFeedback', 12, 25),
(94, '<p>Im tired </p>', 7, 7, 8, '2023-11-10 03:08:40.018658', NULL, 16, 'PMR Preparation', '5 ', '5 ', 'The data should be more specific in terms of its technical feasibility and capability. Feedback', 14, 26);
INSERT INTO `springboard_api_projectboard` (`id`, `content`, `novelty`, `capability`, `technical_feasibility`, `created_at`, `deleted_at`, `project_fk_id`, `title`, `feedback`, `recommendation`, `references`, `templateId`, `boardId`) VALUES
(95, '<p><em>Instructions:</em></p><p><br></p><ul><li>Adapt details based on your business needs.</li><li>Ensure data accuracy for reliable user profiles.</li><li>Include information influencing user engagement.</li><li>Regularly revisit and update profiles for evolving insights.</li></ul><p><br></p><p><br></p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">End User Segment:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Clearly define the primary segment (B2C or B2B).</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Age Bracket</li><li class=\"ql-indent-1\">Sex Assigned at Birth</li><li class=\"ql-indent-1\">Income Range</li><li class=\"ql-indent-1\">Occupation</li><li class=\"ql-indent-1\">Relationship Status</li><li class=\"ql-indent-1\">Education</li><li class=\"ql-indent-1\">Religion</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Industry</li><li class=\"ql-indent-1\">Number of Employees</li><li class=\"ql-indent-1\">Industry Served</li><li class=\"ql-indent-1\">Technology Involved</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Psychographics:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Digital/Social Media Presence</li><li class=\"ql-indent-1\">Hobbies</li><li class=\"ql-indent-1\">Interests</li><li class=\"ql-indent-1\">Affiliations/Clubs/Organizations</li><li class=\"ql-indent-1\">Favorite sources for news and information</li><li class=\"ql-indent-1\">Usage</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Priorities:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Priority 1</li><li class=\"ql-indent-1\">Priority 2</li></ul>', 8, 8, 8, '2023-11-10 03:09:59.719467', NULL, 16, 'End User Profile', '5 ', '5 ', 'https://www.forbes.com/sites/forbescoachescouncil/2018/02/20/how-to-structure-data-for-maximum-insights/#3d8f6b8a7c4b, https://www.kdnuggets.com/2018/05/structure-data-deep-learning.html', 15, 27),
(96, '<p><strong>Idea or technology:</strong></p><p><br></p><p><strong>Industry or Similar Category:</strong></p><p><em>Specify the industry or a related category where your idea or technology is applicable</em>.</p><p><br></p><ol><li>i dont know</li><li>im tired</li><li>gr</li><li><br></li><li><br></li></ol><p><br></p><p><strong>Market Segment Level 1:</strong></p><p><em>Identify the primary market segment or target audience within the chosen industry.</em></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p><p><strong>End User:</strong></p><p><em>Clearly define the end user or customer who will benefit from your idea or technology.</em></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p>', 8, 8, 8, '2023-11-10 03:31:17.848542', NULL, 16, 'Industries & Market Segments', '5 ', '5 ', 'The data could be more organized and presented in a more concise manner. Additionally, the references could be more specific and relevant to the data. ', 13, 28),
(103, '<p>End User: Aspiring and experienced coders, students, and professionals seeking personalized and efficient coding education.</p><p>Knowledge: Understanding of coding languages, learning methodologies, and adaptive learning algorithms.</p><p>Problem Statement: Traditional coding education lacks personalization, making it challenging for individuals with varying learning styles and paces to grasp programming concepts effectively.</p><p>How-Might-We: How might we redesign coding education to adapt to individual learning styles, ensuring a more engaging and effective learning experience for diverse user groups?</p><p>Action: Develop</p><p>Subject: Coding enthusiasts</p><p>Outcome: A personalized and adaptive coding learning platform that caters to individual learning preferences, making coding education more accessible and enjoyable.</p><p>Elevator Pitch: \"Revolutionize your coding journey with our adaptive learning platform. Tailored to your unique learning style, our platform transforms the way you learn to code. No more one-size-fits-all lessons—experience personalized, engaging, and efficient coding education. Unlock your coding potential with us!\"</p>', 7, 6, 6, '2023-11-10 05:33:46.708185', NULL, 17, 'Ideating a New Venture', '5', '5', 'The data should be more clearly structured and organized for better readability. It should also include more detailed information to provide a better understanding of the topic.', 11, 32),
(104, '<p>End User: Coding enthusiasts, students, and professionals seeking personalized and adaptive coding education.</p><p>User Story:</p><p>User Story Title: \"Navigating Personalized Coding Mastery\"</p><p>PHASES:</p><ol><li><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span></li></ol><ul><li class=\"ql-indent-1\">The user aims to acquire coding skills through online learning platforms.</li><li class=\"ql-indent-1\">The user seeks a personalized and efficient learning experience.</li></ul><ol><li><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span></li><li><strong>a. User registers on a coding education platform.</strong></li><li><strong>b. User navigates through available courses.</strong></li><li><strong>c. User starts a selected course.</strong></li><li><strong>d. User engages with course content.</strong></li><li><strong>e. User assesses progress through quizzes or exercises.</strong></li><li><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span></li><li><strong>a. 3</strong></li><li><strong>b. 2</strong></li><li><strong>c. 3</strong></li><li><strong>d. 4</strong></li><li><strong>e. 3</strong></li></ol><p>FOCUSED STEPS:</p><ol><li><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span></li><li><strong>a. Implement a user-friendly onboarding process with a preference quiz to understand learning styles.</strong></li><li><strong>b. Introduce a smart course recommendation system based on the user\'s preferences and goals.</strong></li><li><strong>c. Develop an interactive course introduction module highlighting the practical applications of the upcoming learning.</strong></li><li><strong>d. Integrate adaptive learning algorithms that tailor content difficulty based on the user\'s performance and pace.</strong></li><li><strong>e. Provide real-time feedback during quizzes and exercises, along with additional resources for improvement.</strong></li><li><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span></li><li><strong>a. Machine learning algorithms for preference analysis.</strong></li><li><strong>b. Recommendation engine powered by AI.</strong></li><li><strong>c. Interactive multimedia content and augmented reality for practical demonstrations.</strong></li><li><strong>d. Adaptive learning platforms utilizing AI and data analytics.</strong></li><li><strong>e. Gamification elements and AI-driven feedback systems.</strong></li><li><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span></li><li><strong>a. Increase in user satisfaction and engagement during onboarding.</strong></li><li><strong>b. Improved course completion rates and user feedback.</strong></li><li><strong>c. Higher retention rates due to engaging introductory modules.</strong></li><li><strong>d. Enhanced user progression and comprehension, leading to increased course completion.</strong></li><li><strong>e. Higher quiz success rates and improved performance metrics, indicating effective personalized learning.</strong></li><li><br></li></ol>', 7, 7, 8, '2023-11-10 05:35:17.513777', NULL, 17, 'User Story Map', '5 ', '5 ', 'The data can be improved by providing more detailed information on the technical feasibility and capability of the project. Additionally, more references can be added to the data to give it more credibility. ', 12, 33),
(105, '<p>Idea or technology: AI-Powered Health Monitoring Wearable</p><p><br></p><p>Industry or Similar Category: Healthcare Technology</p><p><br></p><p>Market Segment Level 1: Individuals with chronic health conditions and seniors.</p><p><br></p><p>End User: Patients with chronic illnesses, such as diabetes or hypertension, and seniors who require continuous health monitoring for early detection and prevention of health issues.</p>', 6, 7, 8, '2023-11-10 05:50:54.960341', NULL, 17, 'Industries & Market Segments', 'The data should include more information on the technical feasibility and capability of the project.', '5', 'The data lacks effort and is not presented in a structured manner.', 13, 34),
(106, '<p>**Primary Market Research Preparation**</p><p><br></p><p>**Proper Mindset:**</p><p>Approach with an inquisitive mindset, avoiding assumptions, and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</p><p><br></p><p>Fill out all highlighted fields in yellow before submitting.</p><p><br></p><p>**Profile(s) of the people you want to engage with: Identify the top 2 end user segments, gathering preliminary information.**</p><p><br></p><p>**Top 1 End User Segment:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Smith, Emily - Healthcare professional specializing in chronic disease management.</p><p><br></p><p>**Top 2 End User Segment:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Patel, Raj - Senior citizen actively managing multiple health conditions.</p><p><br></p><p>**Experts:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Johnson, Dr. Sarah - Renowned physician in the field of digital health.</p><p><br></p><p>**Lead Customers:**</p><p><br></p><p>- **Size of Market (# of End Users in the country):** Approximately 30 million potential end users in the target country.</p><p>- **Competition/Alternatives (include competition available globally):**&nbsp;</p><p>&nbsp;- Competitors: Health monitoring wearables from major tech companies.</p><p>&nbsp;- Alternatives: Traditional healthcare methods, periodic check-ups.</p><p><br></p><p>**Row Definitions:**</p><p><br></p><p>- **Top End User Segment:** The top 2 end user segments from End User Ranking.</p><p>- **20 End Users:** Individuals using the product, not the economic buyer. List users in the company or organization.</p><p>- **Background related to the product or solution:** One sentence describing the user\'s background and their ability to provide insights.</p><p>- **Expert:** Subject matter experts with reliable insights on the addressed problem and envisioned technology.</p><p>- **Lead Customers:** Influential customers whose purchase would set a precedent.</p><p>- **Size of Market (# of End Users):** Estimate the number of end users.</p><ul><li>- **Competition/Alternatives:** Identify competition and alternatives from the end user\'s perspective.</li></ul>', 8, 9, 7, '2023-11-10 05:52:55.520232', NULL, 17, 'PMR Preparation', '5 ', '5 ', 'The data should be more structured and organized in order to make it easier to read and understand. The data should also include more detailed information and examples to illustrate the points being made. ', 14, 35),
(108, '<p>**Primary Market Research Preparation**</p><p><br></p><p>**Proper Mindset:**</p><p>Approach with an inquisitive mindset, avoiding assumptions, and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</p><p><br></p><p>Fill out all highlighted fields in yellow before submitting.</p><p><br></p><p>**Profile(s) of the people you want to engage with: Identify the top 2 end user segments, gathering preliminary information.**</p><p><br></p><p>**Top 1 End User Segment:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Smith, Emily - Healthcare professional specializing in chronic disease management.</p><p><br></p><p>**Top 2 End User Segment:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Patel, Raj - Senior citizen actively managing multiple health conditions.</p><p><br></p><p>**Experts:**</p><p><br></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>1. Johnson, Dr. Sarah - Renowned physician in the field of digital health.</p><p><br></p><p>**Lead Customers:**</p><p><br></p><p>- **Size of Market (# of End Users in the country):** Approximately 30 million potential end users in the target country.</p><p>- **Competition/Alternatives (include competition available globally):**&nbsp;</p><p>&nbsp;- Competitors: Health monitoring wearables from major tech companies.</p><p>&nbsp;- Alternatives: Traditional healthcare methods, periodic check-ups.</p><p><br></p><p>**Row Definitions:**</p><p><br></p><p>- **Top End User Segment:** The top 2 end user segments from End User Ranking.</p><p>- **20 End Users:** Individuals using the product, not the economic buyer. List users in the company or organization.</p><p>- **Background related to the product or solution:** One sentence describing the user\'s background and their ability to provide insights.</p><p>- **Expert:** Subject matter experts with reliable insights on the addressed problem and envisioned technology.</p><p>- **Lead Customers:** Influential customers whose purchase would set a precedent.</p><p>- **Size of Market (# of End Users):** Estimate the number of end users.</p><p><br></p><ul><li>- **Competition/Alternatives:** Identify competition and alternatives from the end user\'s perspective.</li></ul>', 8, 8, 8, '2023-11-10 05:59:12.185830', NULL, 17, 'PMR Preparation', 'The data is well structured and provides a clear overview of the primary market research preparation. The highlighted fields in yellow are also helpful in ensuring that all the necessary information is provided.', 'The data provided is comprehensive and provides a good overview of the primary market research preparation. However, it could be improved by providing more detailed information on the competition and alternatives available.', 'https://www.investopedia.com/terms/p/primary-market-research.asp, https://www.entrepreneur.com/article/247545', 14, 35),
(109, '<p>**Instructions:**</p><p><br></p><p>- Adapt details based on your business needs.</p><p>- Ensure data accuracy for reliable user profiles.</p><p>- Include information influencing user engagement.</p><p>- Regularly revisit and update profiles for evolving insights.</p><p><br></p><p>**End User Segment:**</p><p><br></p><p>Clearly define the primary segment (B2C or B2B).</p><p><br></p><p>**Demographics (B2C):**</p><p><br></p><p>- **Age Bracket:** 25-35</p><p>- **Sex Assigned at Birth:** Male</p><p>- **Income Range:** $50,000 - $75,000</p><p>- **Occupation:** Software Engineer</p><p>- **Relationship Status:** Single</p><p>- **Education:** Bachelor\'s Degree</p><p>- **Religion:** Not specified</p><p>- **Address:** Urban areas, tech-centric neighborhoods</p><p><br></p><p>**Demographics (B2B):**</p><p><br></p><p>- **Industry:** Information Technology</p><p>- **Number of Employees:** 100-500</p><p>- **Industry Served:** Software Development</p><p>- **Technology Involved:** Cloud Computing Solutions</p><p>- **Address:** Central Business District</p><p><br></p><p>**Psychographics:**</p><p><br></p><p>- **Digital/Social Media Presence:** Active on LinkedIn, Twitter, and GitHub</p><p>- **Hobbies:** Coding, Open Source Contributions</p><p>- **Interests:** Artificial Intelligence, Blockchain</p><p>- **Affiliations/Clubs/Organizations:** Member of local coding meetups, Hackathon participant</p><p>- **Favorite sources for news and information:** TechCrunch, GitHub trending</p><p>- **Usage:** Heavy user of coding platforms and forums for learning and collaboration</p><p><br></p><p>**Priorities:**</p><p><br></p><p>- **Priority 1:** Continuous learning and skill improvement</p><ul><li class=\"ql-indent-1\">- **Priority 2:** Access to cutting-edge technologies and tools for software development</li></ul>', 8, 8, 7, '2023-11-10 06:00:07.190830', NULL, 17, 'End User Profile', 'The data is well-structured and provides a good overview of the project. However, more evidence of the project\'s capability could be provided to further strengthen the data.', 'The data could be improved by providing more detailed information on the technical aspects of the project and by providing more evidence of the capability of the project.', 'https://www.forbes.com/sites/forbestechcouncil/2018/02/13/how-to-evaluate-the-novelty-of-a-technical-idea/#3a8f9f3f7f3b, https://www.forbes.com/sites/forbesbusinessdevelopmentcouncil/2018/10/17/how-to-evaluate-the-technical-feasibility-of-an-idea/#3f9f2f7f3b3a', 15, 36),
(115, '<p><strong>Focus Area:</strong> Renewable Energy Solutions for Electronic Device Charging</p><p><strong>End User:</strong> Tech-savvy consumers and environmentally conscious individuals.</p><p><strong>Knowledge:</strong> Expertise in renewable energy technologies, battery storage, and consumer electronics.</p><p><strong>Problem Statement:</strong> The environmental impact of conventional device charging methods, contributing to increased carbon emissions and unsustainable energy consumption.</p><p><strong>How-Might-We:</strong> Redesign the device charging experience to minimize environmental impact.</p><p><strong>Action:</strong> Develop, implement, and promote sustainable charging solutions.</p><p><strong>Subject:</strong> Environmentally conscious consumers.</p><p><strong>Outcome:</strong> An eco-friendly, reliable, and efficient charging experience.</p><p><strong>Elevator Pitch:</strong> \"EcoCharge pioneers sustainable charging, tackling the environmental toll of device power-ups. By leveraging renewable energy, we offer tech enthusiasts a guilt-free, reliable charging solution. Join us in reshaping device charging for a greener, more sustainable future.\"</p>', 8, 8, 7, '2023-11-10 06:29:36.132676', NULL, 21, 'Ideating a New Venture', 'The data is presented in a concise manner which allows for quick understanding of the data. However, the structure of the data could be improved to make it easier to parse.', 'The data could benefit from additional research to further explore the capability of the data. Additionally, the data could be presented in a more organized manner to make it easier to understand.', 'https://www.forbes.com/sites/bernardmarr/2018/09/10/big-data-what-it-is-and-why-it-matters/#7f1f2f4f3e19; https://www.datasciencecentral.com/profiles/blogs/what-is-the-difference-between-big-data-and-data-science', 11, 41),
(116, '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p><p><br></p>', 6, 7, 8, '2023-11-19 10:08:29.309704', NULL, 32, 'Ideating a New Venture', '5', '5', 'The data could benefit from more detailed information on the novelty and technical feasibility of the project, as well as more references to back up the claims. \nFeedback', 11, 42),
(117, '<p><strong>End User</strong>: [Define the target user or customer for your venture]</p><p><br></p><p><strong>User Story:</strong></p><p><strong>User Story Title:</strong> [Give a title that succinctly describes the user\'s journey]</p><p><br></p><p><strong>PHASES:</strong></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span> Identify the current goals or objectives of the user in their journey.</li><li><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span> Break down the user\'s current journey into distinct steps.</li><li><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span> Rate the current user experience at each step, with 5 being the highest and 1 the lowest.</li></ol><p><br></p><p><strong>FOCUSED STEPS:</strong></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span> Outline the innovative changes or solutions proposed for each step to enhance the user experience.</li><li><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span> Specify the technology or tools that will support the proposed innovations.</li><li><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span> Define the measurable outcomes or improvements expected in the user\'s journey.</li></ol>', 5, 5, 5, '2023-11-19 10:08:44.291511', NULL, 32, 'User Story Map', 'The data lacks effort and organization, making it difficult to understand. It could benefit from more details and examples. ', 'The data should be more detailed and organized in order to provide a better understanding of the topic. It should also include more information and examples. ', 'https://www.mindtools.com/pages/article/organizing-your-data.htm, https://www.wikihow.com/Organize-Data-for-Analysis', 12, 43),
(118, '<p><strong>Idea or technology:</strong></p><p><br></p><p><strong>Industry or Similar Category:</strong></p><p><em>Specify the industry or a related category where your idea or technology is applicable</em>.</p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p><p><strong>Market Segment Level 1:</strong></p><p><em>Identify the primary market segment or target audience within the chosen industry.</em></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p><p><strong>End User:</strong></p><p><em>Clearly define the end user or customer who will benefit from your idea or technology.</em></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p>', 8, 8, 8, '2023-11-19 10:08:54.896132', NULL, 32, 'Industries & Market Segments', '5 ', '5 ', 'Provide more information about the data\'s capability, such as its capacity for data storage and speed. Feedback', 13, 44),
(119, '<p>Primary Market Research Preparation</p><p><br></p><p><strong>Proper Mindset:</strong></p><p><em>Approach with an inquisitive mindset, avoiding assumptions and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</em></p><p><br></p><p><strong>Fill out all highlighted fields in yellow before submitting.</strong></p><p><br></p><ol><li>Profile(s) of the people you want to engage with:</li><li>Identify the top 2 end user segments, gathering preliminary information.</li></ol><p><br></p><p><strong>Top 1 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Top 2 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Experts:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Lead Customers:</strong></p><p>Size of Market (# of End Users in the country).</p><p>Competition/Alternatives (include competition available globally).</p><p><br></p><p><br></p><p><strong>Row Definitions:</strong></p><p><br></p><ul><li><em>Top End User Segment: T</em>he top 2 end user segments from End User Ranking.</li><li><em>20 End Users:</em> Individuals using the product, not the economic buyer. List users in the company or organization.</li><li><em>Background related to the product or solution: </em>One sentence describing the user\'s background and their ability to provide insights.</li><li><em>Expert: </em>Subject matter experts with reliable insights on the addressed problem and envisioned technology.</li><li><em>Lead Customers:</em> Influential customers whose purchase would set a precedent.</li><li>Size of Market (# of End Users): Estimate the number of end users.</li><li><em>Competition/Alternatives:</em> Identify competition and alternatives from the end user\'s perspective.</li></ul>', 7, 9, 8, '2023-11-19 10:09:05.477025', NULL, 32, 'PMR Preparation', '5', '5', 'The data should include more specific details about the technical feasibility and capability of the topic. Additionally, the data should include more references and feedback from other sources.', 14, 45),
(120, '<p><em>Instructions:</em></p><p><br></p><ul><li>Adapt details based on your business needs.</li><li>Ensure data accuracy for reliable user profiles.</li><li>Include information influencing user engagement.</li><li>Regularly revisit and update profiles for evolving insights.</li></ul><p><br></p><p><br></p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">End User Segment:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Clearly define the primary segment (B2C or B2B).</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Age Bracket</li><li class=\"ql-indent-1\">Sex Assigned at Birth</li><li class=\"ql-indent-1\">Income Range</li><li class=\"ql-indent-1\">Occupation</li><li class=\"ql-indent-1\">Relationship Status</li><li class=\"ql-indent-1\">Education</li><li class=\"ql-indent-1\">Religion</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Industry</li><li class=\"ql-indent-1\">Number of Employees</li><li class=\"ql-indent-1\">Industry Served</li><li class=\"ql-indent-1\">Technology Involved</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Psychographics:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Digital/Social Media Presence</li><li class=\"ql-indent-1\">Hobbies</li><li class=\"ql-indent-1\">Interests</li><li class=\"ql-indent-1\">Affiliations/Clubs/Organizations</li><li class=\"ql-indent-1\">Favorite sources for news and information</li><li class=\"ql-indent-1\">Usage</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Priorities:</strong></p><p><br></p><ul><li class=\"ql-indent-1\">Priority 1</li><li class=\"ql-indent-1\">Priority 2</li></ul>', 7, 9, 8, '2023-11-19 10:09:15.581079', NULL, 32, 'End User Profile', '5', '5', 'The data could be improved by including more detailed information about the technical feasibility and capability.', 15, 46),
(129, '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p>', 8, 8, 9, '2023-12-17 03:57:33.935952', NULL, 14, 'Ideating a New Venture', '5', '5', 'The data has a good composition and effort, but could be more detailed in some areas. For example, the problem statement could be more specific and the elevator pitch could be more concise.', 11, 10),
(130, '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p>', 3, 5, 5, '2023-12-17 04:00:15.180280', NULL, 14, 'Ideating a New Venture', '5', '5', 'The data provides a clear focus area and end user, but could be improved by providing more detailed information on the knowledge and problem statement. The How-Might-We section lacks a clear action verb and outcome, which should be specified in order to provide a more comprehensive view of the venture.', 11, 10),
(131, '<p><strong>Idea Title: MindSync</strong></p><p style=\"text-align: start\"><strong>Concept:</strong> MindSync is a revolutionary platform that combines the power of artificial intelligence and human creativity to generate truly unique and personalized content. The platform aims to enhance various aspects of personal and professional life by offering customized solutions through a seamless integration of AI and human input.</p><p style=\"text-align: start\"><strong>Features:</strong></p><ol><li><p><strong>Personalized Learning:</strong></p><ul><li><p>MindSync analyzes users\' learning patterns, preferences, and goals using advanced AI algorithms.</p></li><li><p>It creates personalized learning experiences by combining curated content with interactive elements, adapting in real-time to the user\'s progress.</p></li></ul></li><li><p><strong>Creative Collaborations:</strong></p><ul><li><p>MindSync provides a platform for collaborative content creation, bringing together AI-generated suggestions and human creativity.</p></li><li><p>Users can work with AI algorithms to brainstorm ideas, refine content, and produce high-quality outputs across various mediums such as writing, design, and multimedia.</p></li></ul></li><li><p><strong>Virtual Personal Assistant:</strong></p><ul><li><p>MindSync acts as a virtual personal assistant, learning from user interactions and proactively suggesting solutions, scheduling tasks, and automating routine activities.</p></li><li><p>It adapts to user preferences and provides a truly personalized and efficient assistant experience.</p></li></ul></li><li><p><strong>Mental Well-being Enhancement:</strong></p><ul><li><p>MindSync incorporates mental health tracking and analysis features, identifying patterns in user behavior that may indicate stress or burnout.</p></li><li><p>The platform offers personalized suggestions for relaxation, mindfulness exercises, and encourages users to take breaks when needed.</p></li></ul></li><li><p><strong>Smart Content Curation:</strong></p><ul><li><p>MindSync employs AI algorithms to curate content from various sources based on the user\'s interests, preferences, and current trends.</p></li><li><p>The platform continuously refines recommendations, ensuring a dynamic and engaging content discovery experience.</p></li></ul></li><li><p><strong>Data Privacy and Security:</strong></p><ul><li><p>MindSync prioritizes user data privacy and security, employing advanced encryption and decentralized storage solutions.</p></li><li><p>Users have full control over their data and can customize the level of AI involvement in their personal and professional activities.</p></li></ul></li></ol><p style=\"text-align: start\"><strong>Benefits:</strong></p><ul><li><p><strong>Time Efficiency:</strong> MindSync streamlines tasks and learning processes, saving users time and effort.</p></li><li><p><strong>Enhanced Creativity:</strong> The collaboration between AI and human creativity results in novel and innovative solutions.</p></li><li><p><strong>Personalized Experience:</strong> Users receive tailored recommendations and solutions based on their unique preferences and goals.</p></li><li><p><strong>Improved Mental Well-being:</strong> MindSync contributes to users\' mental well-being by promoting balance and self-care.</p></li></ul><p style=\"text-align: start\"><strong>Target Audience:</strong> MindSync is designed for individuals seeking personalized and efficient solutions in various aspects of their personal and professional lives, including learning, creativity, productivity, and mental well-being.</p><p style=\"text-align: start\">This innovative platform aims to redefine how individuals interact with technology, fostering a harmonious relationship between artificial intelligence and human creativity for a more fulfilling and enriched experience</p>', 0, 0, 0, '2023-12-18 12:32:46.914918', NULL, 22, 'Ideating a New Venture - Modified', 's', 's', 's', 11, 0),
(132, '<p><strong>Idea Title: MindSync</strong></p><p><strong>Concept:</strong> MindSync is a revolutionary platform that combines the power of artificial intelligence and human creativity to generate truly unique and personalized content. The platform aims to enhance various aspects of personal and professional life by offering customized solutions through a seamless integration of AI and human input.</p><p><strong>Features:</strong></p><p><br></p><ol><li><strong>Personalized Learning:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync analyzes users\' learning patterns, preferences, and goals using advanced AI algorithms.</li><li class=\"ql-indent-1\">It creates personalized learning experiences by combining curated content with interactive elements, adapting in real-time to the user\'s progress.</li></ul><ol><li><strong>Creative Collaborations:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync provides a platform for collaborative content creation, bringing together AI-generated suggestions and human creativity.</li><li class=\"ql-indent-1\">Users can work with AI algorithms to brainstorm ideas, refine content, and produce high-quality outputs across various mediums such as writing, design, and multimedia.</li></ul><ol><li><strong>Virtual Personal Assistant:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync acts as a virtual personal assistant, learning from user interactions and proactively suggesting solutions, scheduling tasks, and automating routine activities.</li><li class=\"ql-indent-1\">It adapts to user preferences and provides a truly personalized and efficient assistant experience.</li></ul><ol><li><strong>Mental Well-being Enhancement:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync incorporates mental health tracking and analysis features, identifying patterns in user behavior that may indicate stress or burnout.</li><li class=\"ql-indent-1\">The platform offers personalized suggestions for relaxation, mindfulness exercises, and encourages users to take breaks when needed.</li></ul><ol><li><strong>Smart Content Curation:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync employs AI algorithms to curate content from various sources based on the user\'s interests, preferences, and current trends.</li><li class=\"ql-indent-1\">The platform continuously refines recommendations, ensuring a dynamic and engaging content discovery experience.</li></ul><ol><li><strong>Data Privacy and Security:</strong></li></ol><ul><li class=\"ql-indent-1\">MindSync prioritizes user data privacy and security, employing advanced encryption and decentralized storage solutions.</li><li class=\"ql-indent-1\">Users have full control over their data and can customize the level of AI involvement in their personal and professional activities.</li></ul><p><strong>Benefits:</strong></p><p><br></p><ul><li><strong>Time Efficiency:</strong> MindSync streamlines tasks and learning processes, saving users time and effort.</li><li><strong>Enhanced Creativity:</strong> The collaboration between AI and human creativity results in novel and innovative solutions.</li><li><strong>Personalized Experience:</strong> Users receive tailored recommendations and solutions based on their unique preferences and goals.</li><li><strong>Improved Mental Well-being:</strong> MindSync contributes to users\' mental well-being by promoting balance and self-care.</li></ul><p><strong>Target Audience:</strong> MindSync is designed for individuals seeking personalized and efficient solutions in various aspects of their personal and professional lives, including learning, creativity, productivity, and mental well-being.</p><p>This innovative platform aims to redefine how individuals interact with technology, fostering a harmonious relationship between artificial intelligence and human creativity for a more fulfilling and enriched experience</p>', 8, 8, 8, '2023-12-18 12:42:00.873125', NULL, 22, 'Ideating a New Venture - Modified', 'The data is well-structured and provides a comprehensive overview of the concept, features, and benefits of MindSync. The language is concise and the descriptions are clear and easy to understand. The data could be further improved by providing more concrete examples of how the platform can be used in practice.', 'The data provides a clear and comprehensive overview of the concept, features, benefits, and target audience of MindSync. The composition is well-structured and the language is precise and concise. The data could be further improved by providing more concrete examples of how MindSync can be used in practice.', '\"https://www.forbes.com/sites/bernardmarr/2018/04/18/what-is-artificial-intelligence-the-3-main-types-of-ai/#3c8e9c7f4b91, https://www.theguardian.com/technology/2017/apr/13/artificial-intelligence-ai-human-collaboration-future-work\"', 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_student`
--

CREATE TABLE `springboard_api_student` (
  `id` bigint(20) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `group_fk_id` bigint(20) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `email` varchar(254) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_student`
--

INSERT INTO `springboard_api_student` (`id`, `firstname`, `lastname`, `created_at`, `deleted_at`, `group_fk_id`, `is_staff`, `email`, `last_login`, `password`) VALUES
(1, 'Katherin Claire', 'Munar', '2023-10-18 11:14:00.000000', '2024-04-27 11:14:00.000000', 1, 0, 'kathy@gmail.com', NULL, 'pbkdf2_sha256$600000$uU1RwYtywi85RRcUPThDGg$IAOxil2cl4USOfhmzTVuSA4fPDmRZXzFEyiXBRCUeyA='),
(2, 'Daphne', 'Bodomo', '2023-11-09 10:49:00.000000', '2023-11-30 10:49:00.000000', 2, 0, 'daphne@gmail.com', NULL, 'pbkdf2_sha256$600000$6XDBmykZFAbpP89rmdRGh2$9BXLE1bcdx9ShON/R8WROEtV1GFSTycqJpUtXFeQFSA='),
(3, 'Katherin Claire', 'Munar', '2023-11-09 22:14:00.000000', '2023-11-30 22:15:00.000000', 6, 0, 'munar@gmail.com', NULL, 'pbkdf2_sha256$600000$pLSb6OwKUA54mqXHGFuzkf$m85eI/ZsPACGxOVgGHxfwgsxC62zdZV+qSB9yTloQZI='),
(4, 'Charlette', 'Tulod', '2023-11-09 22:14:00.000000', '2023-11-30 22:15:00.000000', 7, 0, 'tulod@gmail.com', NULL, 'pbkdf2_sha256$600000$7JifEIvxjc53eITkrQMU6B$LBypDdlZ2vGJmkK4sh8zWLVmIEIZnxlkSw/jOiJ7+Lo='),
(5, 'Bob Kyle', 'Rosales', '2023-11-09 22:14:00.000000', '2023-11-30 22:15:00.000000', 8, 0, 'rosales@gmail.com', NULL, 'pbkdf2_sha256$600000$NRzL1Adu6VNw5UXHAgqzmV$NHk1pQiUlEqjop2olVHdTCeGJZe5zwWGqhxYeGkh4JM=');

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_teacher`
--

CREATE TABLE `springboard_api_teacher` (
  `id` bigint(20) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_teacher`
--

INSERT INTO `springboard_api_teacher` (`id`, `firstname`, `lastname`, `created_at`, `deleted_at`, `is_staff`, `email`, `password`, `last_login`) VALUES
(1, 'Sample', 'Sample', '2023-09-24 22:20:51.000000', '0000-00-00 00:00:00.000000', 1, '', '', NULL),
(2, 'Melissa', 'Mirambel', '2023-10-18 12:13:00.000000', '2024-10-18 12:13:00.000000', 1, 'melissa@gmail.com', 'pbkdf2_sha256$600000$KPGgE8QyJriePEO4P1yAJm$S1P6cq22/w4QWWIoX/w4r/rUHMhBoS8bsizxgDEtyPE=', NULL),
(3, 'Maria Luisa', 'Bodomo', '2023-11-09 22:17:00.000000', '2023-11-09 22:17:00.000000', 1, 'bodomo@gmail.com', 'pbkdf2_sha256$600000$d5Ecw82enx5l6NVAmQZX1G$JcclWg5guVYlLNTai+nokbe4VGDjyBYBz4mNC8oIs2o=', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `springboard_api_template`
--

CREATE TABLE `springboard_api_template` (
  `id` bigint(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `rules` longtext NOT NULL,
  `description` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `springboard_api_template`
--

INSERT INTO `springboard_api_template` (`id`, `title`, `content`, `rules`, `description`, `created_at`, `deleted_at`, `isActive`) VALUES
(11, 'Ideating a New Venture - Modified', '<p><strong>Focus Area: </strong>[Specify the industry or sector you\'re exploring]</p><p><strong>End User:</strong> [Identify the target audience or user group for your venture]</p><p><strong>Knowledge:</strong> [List any relevant information or expertise needed for this venture]</p><p><br></p><p><strong>Problem Statement:</strong> [Clearly define the problem or challenge your venture aims to address]</p><p><br></p><p><strong>How-Might-We:</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><ol><li>Action: [Choose a specific action verb like redesign, encourage, improve, solve, etc.]</li><li>Subject: [Specify the target audience or group, e.g., millennials, sales managers, retirees, students, etc.]</li><li>Outcome: [Describe the desired outcome or experience, such as frictionless, affordable, fun, engaging, etc.]</li></ol><p><br></p><p><br></p><p><strong>Elevator Pitch:</strong></p><p>Craft a concise elevator pitch (75-80 words) that highlights the unique value proposition of your venture, addressing the identified problem and showcasing the desired outcome.</p><p><br></p><p><strong>References:</strong></p><p>Paste relevant links or sources that support your ideation process.</p>', '<ol><li>Be creative: Think outside the box and explore innovative solutions.</li><li>Stay focused: Ensure your ideation aligns with the specified focus area and end user.</li><li>Collaboration is key: Encourage teamwork and diverse perspectives during the ideation process.</li><li>Research-backed: Base your ideas on reliable knowledge and data, referring to the provided references.</li><li>Concise communication: Clearly articulate your How-Might-We statements and elevator pitch within the given word limits.</li><li>Problem-centric: Keep the problem statement at the forefront, addressing real-world challenges.</li><li>Feasibility check: Consider the feasibility and practicality of your ideas within the chosen industry or sector.</li><li>Iterative process: Be open to refining and iterating on your ideas based on feedback and further insights.</li><li>User-centric: Prioritize the needs and preferences of the end user in your ideation.</li><li>Future-oriented: Think about the long-term impact and sustainability of your venture.</li></ol><p><br></p><p><strong>Evaluation Criteria: An AI will assess each input based on three key factors—novelty, capability, and technical feasibility. </strong></p><p><strong>Novelty evaluates the originality of the idea, capability assesses its potential impact, and technical feasibility gauges its practical implementation. </strong></p><p><br></p><p><strong>Ensure your input demonstrates a balance of innovation, effectiveness, and realistic execution to receive a comprehensive evaluation.</strong></p>', 'This template guides the ideation of a new venture, prompting problem-focused creativity with How-Might-We statements and an elevator pitch.', '2023-11-09 14:40:18.225085', NULL, 1),
(12, 'User Story Map', '<p><strong>End User</strong>: [Define the target user or customer for your venture]</p><p><br></p><p><strong>User Story:</strong></p><p><strong>User Story Title:</strong> [Give a title that succinctly describes the user\'s journey]</p><p><br></p><p><strong>PHASES:</strong></p><p><br></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">GOALS (PRESENT):</span> Identify the current goals or objectives of the user in their journey.</li><li><span style=\"color: var(--tw-prose-bold);\">STEPS (PRESENT):</span> Break down the user\'s current journey into distinct steps.</li><li><span style=\"color: var(--tw-prose-bold);\">OVERALL USER EXPERIENCE (1-5):</span> Rate the current user experience at each step, with 5 being the highest and 1 the lowest.</li></ol><p><br></p><p><strong>FOCUSED STEPS:</strong></p><p><br></p><p><br></p><ol><li><span style=\"color: var(--tw-prose-bold);\">PROPOSED INNOVATION:</span> Outline the innovative changes or solutions proposed for each step to enhance the user experience.</li><li><span style=\"color: var(--tw-prose-bold);\">SUPPORTING TECHNOLOGY:</span> Specify the technology or tools that will support the proposed innovations.</li><li><span style=\"color: var(--tw-prose-bold);\">MEASURABLE OUTCOME:</span> Define the measurable outcomes or improvements expected in the user\'s journey.</li></ol>', '<ol><li>Clearly Define End User: Clearly articulate the characteristics and needs of the end user to ensure a user-centric approach.</li><li>Comprehensive User Story: Provide a detailed and comprehensive user story, covering goals, steps, and the overall user experience.</li><li>Realistic Ratings: When assessing the overall user experience, provide ratings that accurately reflect the current situation.</li><li>Innovative Solutions: Propose creative and innovative solutions for each step to enhance the user journey.</li><li>Technology Alignment: Ensure that the supporting technology aligns with and enhances the proposed innovations.</li><li>Measurable Outcomes: Clearly outline measurable outcomes to gauge the success of the proposed changes in the user journey.</li><li>User-Centric Focus: Keep the end user at the center of the user story map, prioritizing their needs and preferences throughout the phases.</li></ol><p><br></p><p><strong>Evaluation Criteria</strong>: <strong>The AI will assess each input based on three key factors—novelty, capability, and technical feasibility. Novelty evaluates the originality of the idea, capability assesses its potential impact, and technical feasibility gauges its practical implementation.</strong></p><p><br></p><p><strong>﻿ Ensure your input demonstrates a balance of innovation, effectiveness, and realistic execution to receive a comprehensive evaluation.</strong></p>', 'This template elevate user experience by evaluating, innovating, and aligning technology, with rules prioritizing user-centric solutions.', '2023-11-09 14:47:35.451769', NULL, 1),
(13, 'Industries & Market Segments', '<p><strong>Idea or technology:</strong></p><p><br></p><p><strong>Industry or Similar Category:</strong></p><p><em>Specify the industry or a related category where your idea or technology is applicable</em>.</p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p><p><strong>Market Segment Level 1:</strong></p><p><em>Identify the primary market segment or target audience within the chosen industry.</em></p><p><br></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol><p><br></p><p><strong>End User:</strong></p><p><em>Clearly define the end user or customer who will benefit from your idea or technology.</em></p><p><br></p><p><br></p><p><br></p><ol><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li></ol>', '<ol><li>Clearly Define Idea or Technology: Provide a concise description of your idea or technology to ensure clarity.</li><li>Industry Identification: Clearly specify the industry or a similar category where your idea or technology is applicable.</li><li>Market Segment Level 1: Identify the primary market segment or target audience for your idea within the chosen industry.</li><li>End User: Clearly define the end user or customer who will benefit from your idea or technology.</li><li>Comprehensive Understanding: Ensure a comprehensive understanding of how your idea fits into the industry, addresses a specific market segment, and meets the needs of the end user.</li></ol><p><br></p><p><br></p><p><strong>Evaluation Criteria: The AI will assess each input based on three key factors—novelty, capability, and technical feasibility. Novelty evaluates the originality of the idea, capability assesses its potential impact, and technical feasibility gauges its practical implementation. </strong></p><p><br></p><p><strong>﻿Ensure your input demonstrates a balance of innovation, effectiveness, and realistic execution to receive a comprehensive evaluation.</strong></p>', 'This template refine ideas for specific industries by specifying technologies, market segments, and end users with clarity and precision.', '2023-11-09 14:54:21.542421', NULL, 1),
(14, 'PMR Preparation', '<p>Primary Market Research Preparation</p><p><br></p><p><strong>Proper Mindset:</strong></p><p><em>Approach with an inquisitive mindset, avoiding assumptions and advocating ideas. Embrace the learning process to discover unknown aspects of customer needs, potentially revising end-user segment definitions.</em></p><p><br></p><p><strong>Fill out all highlighted fields in yellow before submitting.</strong></p><p><br></p><p><br></p><ol><li>Profile(s) of the people you want to engage with:</li><li>Identify the top 2 end user segments, gathering preliminary information.</li></ol><p><br></p><p><strong>Top 1 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Top 2 End User Segment:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Experts:</strong></p><p>(Lastname, Firstname) Background related to the problem, product, or solution.</p><p>[Complete information for 1-10 individuals]</p><p><br></p><p><strong>Lead Customers:</strong></p><p>Size of Market (# of End Users in the country).</p><p>Competition/Alternatives (include competition available globally).</p><p><br></p><p><br></p><p><strong>Row Definitions:</strong></p><p><br></p><p><br></p><ul><li><em>Top End User Segment: T</em>he top 2 end user segments from End User Ranking.</li><li><em>20 End Users:</em> Individuals using the product, not the economic buyer. List users in the company or organization.</li><li><em>Background related to the product or solution: </em>One sentence describing the user\'s background and their ability to provide insights.</li><li><em>Expert: </em>Subject matter experts with reliable insights on the addressed problem and envisioned technology.</li><li><em>Lead Customers:</em> Influential customers whose purchase would set a precedent.</li><li>Size of Market (# of End Users): Estimate the number of end users.</li><li><em>Competition/Alternatives:</em> Identify competition and alternatives from the end user\'s perspective.</li></ul>', '<ol><li>Inquisitive Mindset: Maintain a curious approach, avoiding assumptions, and prioritize learning from customers during primary research.</li><li>Thorough Data Collection: Complete all highlighted fields in yellow to ensure comprehensive information for analysis.</li><li>End User Profiling: Clearly define the top two end user segments, providing background details for individuals in each segment.</li><li>Expert and Lead Customer Identification: List subject matter experts and influential lead customers, indicating their role and relevance.</li><li>Market Size Estimation: Provide an estimation of the market size in terms of end users, considering a relevant range (e.g., 10s, 100s, 1Ks, etc.).</li><li>Competition and Alternatives: Identify competitors and alternatives from the end user\'s perspective, including the \"do nothing\" option.</li><li>Partner Recognition: Acknowledge important partners or distributors crucial to fitting into the end user\'s workflow or business processes.</li><li>Clarity and Conciseness: Ensure that all responses are clear, concise, and contribute to a holistic understanding of the market landscape.</li><li>Continuous Review: Regularly revisit and update the collected information to reflect evolving market dynamics and insights.</li><li>Compliance: Adhere to the provided guidelines for a comprehensive and effective primary market research preparation.</li></ol><p><br></p><p><strong>Evaluation Criteria: The AI will assess each input based on three key factors—novelty, capability, and technical feasibility. Novelty evaluates the originality of the idea, capability assesses its potential impact, and technical feasibility gauges its practical implementation. </strong></p><p><br></p><p><strong>﻿Ensure your input demonstrates a balance of innovation, effectiveness, and realistic execution to receive a comprehensive evaluation.</strong></p>', 'This template Prepare for primary market research: Identify key end user segments, experts, lead customers, and vital partners for a comprehensive.', '2023-11-09 14:59:50.605503', NULL, 1),
(15, 'End User Profile', '<p><em>Instructions:</em></p><ul><li>Adapt details based on your business needs.</li><li>Ensure data accuracy for reliable user profiles.</li><li>Include information influencing user engagement.</li><li>Regularly revisit and update profiles for evolving insights.</li></ul><p><br></p><p><br></p><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">End User Segment:</strong></p><ul><li class=\"ql-indent-1\">Clearly define the primary segment (B2C or B2B).</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2C):</strong></p><ul><li class=\"ql-indent-1\">Age Bracket</li><li class=\"ql-indent-1\">Sex Assigned at Birth</li><li class=\"ql-indent-1\">Income Range</li><li class=\"ql-indent-1\">Occupation</li><li class=\"ql-indent-1\">Relationship Status</li><li class=\"ql-indent-1\">Education</li><li class=\"ql-indent-1\">Religion</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Demographics (B2B):</strong></p><ul><li class=\"ql-indent-1\">Industry</li><li class=\"ql-indent-1\">Number of Employees</li><li class=\"ql-indent-1\">Industry Served</li><li class=\"ql-indent-1\">Technology Involved</li><li class=\"ql-indent-1\">Address</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Psychographics:</strong></p><ul><li class=\"ql-indent-1\">Digital/Social Media Presence</li><li class=\"ql-indent-1\">Hobbies</li><li class=\"ql-indent-1\">Interests</li><li class=\"ql-indent-1\">Affiliations/Clubs/Organizations</li><li class=\"ql-indent-1\">Favorite sources for news and information</li><li class=\"ql-indent-1\">Usage</li></ul><p><br></p><p><strong style=\"color: var(--tw-prose-bold);\">Priorities:</strong></p><ul><li class=\"ql-indent-1\">Priority 1</li><li class=\"ql-indent-1\">Priority 2</li></ul><p><br></p>', '<ol><li>Segment Clarity: Clearly define the end user segment, specifying whether it\'s B2C or B2B.</li><li>Comprehensive Demographics: Provide detailed demographic information relevant to the chosen business model.</li><li>Psychographic Insight: Capture psychographic details, including digital presence, hobbies, interests, affiliations, and preferred information sources.</li><li>Prioritization: Identify and prioritize key factors affecting end user decisions.</li><li>Customization: Adapt the template to include or exclude specific details based on the unique characteristics of your end users.</li><li>Accuracy: Ensure accurate and up-to-date information to construct a reliable end user profile.</li><li>Relevance: Include information that directly influences the user\'s engagement with your product or service.</li><li>Continuous Update: Regularly revisit and update the end user profiles to reflect evolving user behaviors and preferences.</li></ol><p><br></p><p><br></p><p><br></p><p><strong>Evaluation Criteria: The AI will assess each input based on three key factors—novelty, capability, and technical feasibility. Novelty evaluates the originality of the idea, capability assesses its potential impact, and technical feasibility gauges its practical implementation. </strong></p><p><br></p><p><strong><span class=\"ql-cursor\">﻿</span>Ensure your input demonstrates a balance of innovation, effectiveness, and realistic execution to receive a comprehensive evaluation.</strong></p><p><br></p>', 'This template craft detailed end user profiles: Define demographics, psychographics, and priorities for targeted B2B insights, adapting as need.', '2023-11-09 15:04:35.450436', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `springboard_api_admin`
--
ALTER TABLE `springboard_api_admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `springboard_api_classroom`
--
ALTER TABLE `springboard_api_classroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `springboard_api_clas_teacher_fk_id_3fe57988_fk_springboa` (`teacher_fk_id`);

--
-- Indexes for table `springboard_api_group`
--
ALTER TABLE `springboard_api_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `springboard_api_group_name_9dac279f_uniq` (`name`),
  ADD KEY `springboard_api_grou_classroom_fk_id_1c3c770a_fk_springboa` (`classroom_fk_id`);

--
-- Indexes for table `springboard_api_project`
--
ALTER TABLE `springboard_api_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `springboard_api_project_name_e32053ff_uniq` (`name`),
  ADD KEY `springboard_api_proj_group_fk_id_1b009fad_fk_springboa` (`group_fk_id`);

--
-- Indexes for table `springboard_api_projectboard`
--
ALTER TABLE `springboard_api_projectboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `springboard_api_proj_project_fk_id_a1b2f9ce_fk_springboa` (`project_fk_id`);

--
-- Indexes for table `springboard_api_student`
--
ALTER TABLE `springboard_api_student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `springboard_api_stud_group_fk_id_a0fb3d5e_fk_springboa` (`group_fk_id`);

--
-- Indexes for table `springboard_api_teacher`
--
ALTER TABLE `springboard_api_teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `springboard_api_template`
--
ALTER TABLE `springboard_api_template`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `springboard_api_admin`
--
ALTER TABLE `springboard_api_admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `springboard_api_classroom`
--
ALTER TABLE `springboard_api_classroom`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `springboard_api_group`
--
ALTER TABLE `springboard_api_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `springboard_api_project`
--
ALTER TABLE `springboard_api_project`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `springboard_api_projectboard`
--
ALTER TABLE `springboard_api_projectboard`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `springboard_api_student`
--
ALTER TABLE `springboard_api_student`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `springboard_api_teacher`
--
ALTER TABLE `springboard_api_teacher`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `springboard_api_template`
--
ALTER TABLE `springboard_api_template`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `springboard_api_classroom`
--
ALTER TABLE `springboard_api_classroom`
  ADD CONSTRAINT `springboard_api_clas_teacher_fk_id_3fe57988_fk_springboa` FOREIGN KEY (`teacher_fk_id`) REFERENCES `springboard_api_teacher` (`id`);

--
-- Constraints for table `springboard_api_group`
--
ALTER TABLE `springboard_api_group`
  ADD CONSTRAINT `springboard_api_grou_classroom_fk_id_1c3c770a_fk_springboa` FOREIGN KEY (`classroom_fk_id`) REFERENCES `springboard_api_classroom` (`id`);

--
-- Constraints for table `springboard_api_project`
--
ALTER TABLE `springboard_api_project`
  ADD CONSTRAINT `springboard_api_proj_group_fk_id_1b009fad_fk_springboa` FOREIGN KEY (`group_fk_id`) REFERENCES `springboard_api_group` (`id`);

--
-- Constraints for table `springboard_api_projectboard`
--
ALTER TABLE `springboard_api_projectboard`
  ADD CONSTRAINT `springboard_api_proj_project_fk_id_a1b2f9ce_fk_springboa` FOREIGN KEY (`project_fk_id`) REFERENCES `springboard_api_project` (`id`);

--
-- Constraints for table `springboard_api_student`
--
ALTER TABLE `springboard_api_student`
  ADD CONSTRAINT `springboard_api_stud_group_fk_id_a0fb3d5e_fk_springboa` FOREIGN KEY (`group_fk_id`) REFERENCES `springboard_api_group` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
