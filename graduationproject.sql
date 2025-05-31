-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 31 May 2025, 13:59:08
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `graduationproject`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1747911620),
('356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1747911620;', 1747911620),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'i:1;', 1747593304),
('da4b9237bacccdf19c0760cab7aec4a8359010b0:timer', 'i:1747593304;', 1747593304),
('livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3', 'i:1;', 1748587878),
('livewire-rate-limiter:a17961fa74e9275d529f489537f179c05d50c2f3:timer', 'i:1748587878;', 1748587878),
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:17:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:15:\"Kullanıcı Sil\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:24:\"Kullanıcı Görüntüle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:10:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:20:\"Kullanıcı Düzenle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:10:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:16:\"Kullanıcı Ekle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:10:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:9:\"Talep Sil\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:11:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;i:10;i:12;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:10:\"Talep Ekle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:12:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;i:5;i:6;i:6;i:7;i:7;i:8;i:8;i:9;i:9;i:10;i:10;i:11;i:11;i:12;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:12:\"Talep Onayla\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:11:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;i:10;i:12;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:14:\"Talep Düzenle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:12:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;i:5;i:6;i:6;i:7;i:7;i:8;i:8;i:9;i:9;i:10;i:10;i:11;i:11;i:12;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:18:\"Talep Görüntüle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:11:{i:0;i:1;i:1;i:3;i:2;i:4;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:10;i:9;i:11;i:10;i:12;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:8:\"Rol Ekle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:7:\"Rol Sil\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:16:\"Rol Görüntüle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:12:\"Rol Düzenle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:10:\"İzin Ekle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:14:\"İzin Düzenle\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:10:\"İzin Sİl\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:13:\"İzin Göster\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:12:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:27:\"Fen İşleri Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:32:\"Temizlik İşleri Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:22:\"Zabıta Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:6;s:1:\"b\";s:39:\"Çevre Koruma ve Kontrol Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:5;a:3:{s:1:\"a\";i:7;s:1:\"b\";s:31:\"Sosyal Hizmetler Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:6;a:3:{s:1:\"a\";i:8;s:1:\"b\";s:41:\"Kültür ve Sosyal İşler Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:7;a:3:{s:1:\"a\";i:9;s:1:\"b\";s:29:\"Mali Hizmetler Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:8;a:3:{s:1:\"a\";i:10;s:1:\"b\";s:32:\"Park ve Bahçeler Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:9;a:3:{s:1:\"a\";i:11;s:1:\"b\";s:32:\"Sağlık İşleri Müdürlüğü\";s:1:\"c\";s:3:\"web\";}i:10;a:3:{s:1:\"a\";i:12;s:1:\"b\";s:6:\"Diğer\";s:1:\"c\";s:3:\"web\";}i:11;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:9:\"Vatandaş\";s:1:\"c\";s:3:\"web\";}}}', 1748645955);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `complaint`
--

CREATE TABLE `complaint` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `status_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `complaint`
--

INSERT INTO `complaint` (`id`, `user_id`, `service_id`, `status_id`, `title`, `description`, `photo`, `created_at`, `updated_at`) VALUES
(2, 14, 3, 1, 'Omnis porro dolore quasi repellat vero mollitia.', 'Eveniet voluptatibus maiores corporis quis. Hic quia expedita amet adipisci. Nostrum quam temporibus ut sed excepturi ex quas.', '0', '2025-05-04 06:48:08', '2025-05-18 14:59:22'),
(3, 26, 9, 1, 'Ex minus ab cupiditate nesciunt minus consequatur id ab.', 'Molestiae quis quis dolorum. Distinctio deleniti qui doloremque id. Deserunt quaerat quis eaque rerum cum sunt.', '0', '2025-04-22 17:18:31', '2025-05-18 14:59:22'),
(4, 64, 1, 4, 'Adipisci aut molestias aliquam facilis.', 'Ipsam minus illo saepe veniam eius. Molestias dolores nobis qui ipsum sunt molestias. Magni vitae dolorem delectus officiis nobis.', '0', '2025-05-09 01:25:43', '2025-05-22 07:59:25'),
(10, 81, 9, 5, 'Id earum itaque officiis neque voluptatibus sunt.', 'Sed sapiente veritatis placeat sunt perferendis animi repellendus. Et laudantium necessitatibus sed modi exercitationem nulla id sed.', '0', '2025-05-07 15:35:33', '2025-05-30 03:50:04'),
(11, 91, 2, 1, 'Aut laborum nam et et.', 'Placeat quia quia dolores iste accusamus. Dolores voluptate et quasi unde et molestias. Non sapiente unde saepe a eos.', '0', '2025-05-12 09:41:45', '2025-05-18 14:59:22'),
(12, 21, 1, 1, 'Ea ipsa aut quasi.', 'Ex id quia vel sed vitae dolorem et rem. Maiores autem repellat asperiores nulla omnis.', '0', '2025-05-09 03:37:01', '2025-05-30 05:34:51'),
(13, 62, 9, 1, 'Deserunt corporis ipsa sed nemo ut et id.', 'Est illum aliquid odio aut cupiditate. Molestiae veritatis doloribus ut laboriosam voluptatem veniam numquam deserunt.', '0', '2025-05-02 00:18:45', '2025-05-18 14:59:22'),
(14, 42, 1, 1, 'Distinctio reiciendis velit ut fuga provident et qui.', 'Vero distinctio temporibus quia. Necessitatibus non vel nihil veniam sequi. Omnis quod ipsum dolorem vero minus.', '0', '2025-05-02 15:44:51', '2025-05-18 14:59:22'),
(15, 82, 3, 1, 'Similique aut sit natus quae.', 'Ut fugiat qui quo. Aut asperiores totam et voluptates. Autem ut voluptatem maiores id fugit et molestias.', '0', '2025-05-01 10:30:35', '2025-05-18 14:59:22'),
(16, 100, 2, 1, 'Ut officia recusandae sapiente numquam quam impedit ea eum.', 'Ut vitae suscipit nihil dolor consequuntur quidem. Et veritatis ratione corporis veritatis consequatur.', '0', '2025-05-07 04:52:56', '2025-05-18 14:59:22'),
(17, 43, 10, 1, 'Occaecati atque vel eaque esse quia.', 'Magni modi optio nostrum porro. Eius quis est nihil quod non odio ut ab. Eos consequuntur est odio voluptas aliquid.', '0', '2025-05-11 20:36:20', '2025-05-18 14:59:22'),
(18, 102, 8, 1, 'Voluptatibus quas possimus molestiae ducimus consequatur suscipit.', 'Consequatur et sit consequatur voluptatum nemo recusandae. Architecto nemo earum sed eligendi et quam.', '0', '2025-04-30 02:29:02', '2025-05-18 14:59:22'),
(19, 79, 9, 1, 'Cum quia non omnis voluptatem aperiam sed eaque.', 'Laboriosam repellat suscipit quibusdam dolorem. Odit neque sit cupiditate similique veniam deleniti qui.', '0', '2025-05-12 01:11:00', '2025-05-18 14:59:22'),
(20, 12, 8, 1, 'Non animi dolores vel molestias.', 'Dignissimos error quod voluptatum magni beatae nihil ea. Eius qui architecto eum cum magnam ex. Ea rerum ut accusantium quis quo.', '0', '2025-04-29 06:10:07', '2025-05-18 14:59:22'),
(21, 35, 4, 1, 'Non dignissimos est et expedita adipisci eaque.', 'Saepe illum ratione neque sed. Aut maiores eos repellat sit.', '0', '2025-05-03 16:59:04', '2025-05-18 14:59:22'),
(22, 9, 5, 1, 'Quidem est quia quam ratione fuga expedita.', 'Deleniti necessitatibus animi voluptate fuga illum fugit illo qui. Accusantium quas ut illum dolorem molestiae est perspiciatis. Nostrum possimus numquam esse laudantium deleniti eligendi consequatur.', '0', '2025-05-15 03:59:37', '2025-05-18 14:59:22'),
(23, 19, 3, 1, 'Rerum corrupti nisi voluptatem animi.', 'Non modi quasi voluptas ea. Ea est fuga tenetur autem.', '0', '2025-05-15 07:07:21', '2025-05-18 14:59:22'),
(24, 52, 3, 1, 'Veritatis amet quaerat optio hic repudiandae quis ut.', 'Quaerat consequatur ullam aut natus saepe sint optio. Laboriosam soluta vel aut velit similique.', '0', '2025-05-05 00:39:39', '2025-05-18 14:59:22'),
(25, 90, 6, 1, 'Beatae dolorem voluptas aspernatur.', 'Asperiores eos aperiam suscipit beatae quisquam tempore enim. Blanditiis minima officiis nulla est. Quia sint ipsa quod beatae iure facilis provident.', '0', '2025-05-06 01:15:42', '2025-05-18 14:59:22'),
(26, 55, 2, 1, 'Alias omnis eius dicta ea magni libero est.', 'Distinctio eum fuga quia pariatur. Optio hic ex ea quod suscipit eos sit.', '0', '2025-05-06 02:05:46', '2025-05-18 14:59:22'),
(27, 8, 9, 1, 'Ullam quibusdam saepe sint.', 'Facilis dolor deserunt non ipsa ab. Molestiae officia odio iure qui.', '0', '2025-04-23 13:46:41', '2025-05-18 14:59:22'),
(28, 25, 4, 1, 'Et perferendis ut assumenda.', 'Quos aperiam dolores dolorem exercitationem enim. Omnis hic eveniet temporibus aut cupiditate nulla dignissimos quasi. Autem quis voluptatem harum tempora dolorem minus odit voluptatem.', '0', '2025-04-21 16:13:38', '2025-05-18 14:59:22'),
(29, 98, 7, 1, 'Rerum sed dolor autem voluptas.', 'Officia fugiat dolorum modi voluptatum aliquid. Quia est qui voluptatem enim dolore quia voluptates eum. Qui fugiat quia optio sed non omnis.', '0', '2025-04-18 23:26:57', '2025-05-18 14:59:22'),
(30, 95, 9, 1, 'Adipisci facilis architecto et et esse nam velit molestiae.', 'Beatae mollitia voluptate quidem sapiente. Omnis et eligendi animi velit voluptas. Aut dolorem nemo aliquam autem incidunt laboriosam minima.', '0', '2025-05-03 19:36:29', '2025-05-18 14:59:22'),
(31, 62, 4, 1, 'Doloremque deleniti soluta libero inventore id.', 'Non quos provident voluptatem. Nobis est ut autem dolores sequi quaerat deserunt iusto.', '0', '2025-05-17 23:37:26', '2025-05-18 14:59:22'),
(32, 57, 6, 1, 'Laboriosam qui vero consectetur illum quia consequuntur veritatis.', 'Molestias est aliquam culpa numquam tenetur dolor accusantium necessitatibus. Et temporibus ipsa rem sapiente aperiam laborum.', '0', '2025-04-21 16:40:21', '2025-05-18 14:59:22'),
(33, 6, 2, 1, 'Voluptate suscipit ut asperiores qui deleniti quaerat pariatur.', 'Animi nihil voluptas id voluptas dolore sed. Iure et ipsa placeat ut quae incidunt.', '0', '2025-05-02 16:41:50', '2025-05-18 14:59:22'),
(34, 76, 3, 1, 'Rem qui voluptas a quod sint.', 'Rerum adipisci eum at qui id provident dolores. Aut expedita sit beatae omnis voluptatem omnis.', '0', '2025-05-04 04:31:50', '2025-05-18 14:59:23'),
(35, 45, 3, 1, 'Hic est animi et ullam dolores exercitationem voluptas.', 'Ea aut nihil et voluptatem. Accusamus sit recusandae in qui alias alias.', '0', '2025-05-05 23:02:56', '2025-05-18 14:59:23'),
(36, 16, 7, 1, 'Perspiciatis vel facilis sunt architecto.', 'Qui asperiores ab vel illo provident accusamus earum. Vero nihil natus qui. Saepe voluptatem voluptates illum voluptatibus facilis aliquid.', '0', '2025-05-10 04:01:52', '2025-05-18 14:59:23'),
(37, 69, 2, 1, 'Eius nulla in repellendus qui itaque qui dolorum.', 'Eum quae rerum saepe nisi dolores mollitia adipisci. Consectetur occaecati eius natus repellat eum in. Id magnam error ducimus ut.', '0', '2025-05-03 00:03:39', '2025-05-18 14:59:23'),
(38, 18, 7, 1, 'Eaque nihil pariatur voluptate vero enim.', 'Rerum minima provident libero qui nam. Quas veniam omnis culpa aut ut pariatur. Consequatur eos corporis quasi.', '0', '2025-04-29 22:30:47', '2025-05-18 14:59:23'),
(39, 17, 2, 1, 'Ad in laudantium tempore esse.', 'Voluptatem possimus magni maiores quis facere voluptatibus. Ab qui ut aut voluptates.', '0', '2025-05-01 14:58:53', '2025-05-18 14:59:23'),
(40, 70, 10, 1, 'Corporis illum eum soluta.', 'Deserunt tenetur perferendis fugiat qui. Aspernatur et officia eos totam dolor aperiam. Facere rerum deserunt expedita commodi.', '0', '2025-05-09 01:54:44', '2025-05-18 14:59:23'),
(41, 23, 8, 1, 'Ut earum consequatur veniam dolores nemo.', 'Ut et modi iure. Ad est qui quod sunt sunt recusandae tempore tenetur. Porro accusantium ratione fugiat accusantium et harum non.', '0', '2025-04-18 16:02:39', '2025-05-18 14:59:23'),
(42, 25, 3, 1, 'Qui vel culpa tenetur aut non et.', 'Quod sint voluptate qui et occaecati dolor deserunt. Cupiditate nam alias doloremque ipsum illum. Dolorem tenetur ab eligendi eos qui.', '0', '2025-04-21 05:33:25', '2025-05-18 14:59:23'),
(43, 53, 8, 1, 'Aut voluptatem tenetur ipsa qui aut fugit.', 'Nihil animi doloremque omnis. Cumque voluptatum quaerat quisquam natus. Laborum tempore voluptas enim praesentium.', '0', '2025-05-01 01:40:06', '2025-05-18 14:59:23'),
(44, 50, 5, 1, 'A ut eveniet saepe cumque.', 'Voluptatibus est et placeat animi. Rem qui fuga a ipsum officiis. Maxime cum facilis ut sit voluptas.', '0', '2025-04-19 08:54:18', '2025-05-18 14:59:23'),
(45, 26, 2, 1, 'Et et omnis consequatur non eum.', 'Tenetur et consequatur tempore blanditiis libero. Assumenda quam iste et in aut commodi. Fugiat ut dicta qui voluptatem suscipit velit quidem.', '0', '2025-04-27 14:09:16', '2025-05-18 14:59:23'),
(46, 75, 7, 1, 'Rerum autem ullam molestias aspernatur.', 'Doloremque vero et illum saepe non unde distinctio odit. Perspiciatis labore asperiores rerum aliquid error quas qui. Est et eos et explicabo.', '0', '2025-04-19 11:35:20', '2025-05-18 14:59:23'),
(47, 102, 3, 1, 'Necessitatibus fugiat inventore in est ab atque molestias.', 'Velit consequatur neque deleniti blanditiis corrupti illo. Ducimus expedita suscipit repellendus quasi quia quia ipsam.', '0', '2025-05-06 03:23:38', '2025-05-18 14:59:23'),
(48, 31, 3, 1, 'Reiciendis omnis dolor eveniet.', 'Autem deleniti explicabo et tempora iure ut qui. Nesciunt vitae est tenetur est molestiae est eum nobis.', '0', '2025-04-24 16:19:28', '2025-05-18 14:59:23'),
(49, 65, 3, 1, 'Ipsam asperiores pariatur est.', 'Atque et numquam adipisci voluptatibus. Et optio dicta fugiat minus.', '0', '2025-05-10 09:51:48', '2025-05-18 14:59:23'),
(50, 62, 4, 1, 'Similique doloribus amet numquam non amet rerum.', 'Suscipit natus sit iure ad. Animi qui qui omnis possimus et.', '0', '2025-05-13 14:20:41', '2025-05-18 14:59:23'),
(51, 68, 9, 1, 'Dolorum et qui incidunt.', 'Magnam laborum quam aut aut voluptate atque. Quae voluptas consequatur tenetur non ipsa ipsam.', '0', '2025-04-21 07:51:18', '2025-05-18 14:59:23'),
(52, 63, 7, 1, 'Ex reprehenderit accusamus impedit deleniti ipsum explicabo necessitatibus.', 'Ipsum dicta incidunt iure voluptas ea. Quas dolor ut excepturi saepe natus consequatur corrupti. Saepe magni molestiae vel illo necessitatibus voluptatem.', '0', '2025-04-24 05:25:29', '2025-05-18 14:59:23'),
(53, 38, 9, 1, 'Qui asperiores sint sapiente quis.', 'Magni aut eius explicabo consequatur temporibus sed. Et est eos et iste reiciendis dignissimos neque.', '0', '2025-05-16 10:10:38', '2025-05-18 14:59:23'),
(54, 44, 10, 1, 'Deserunt ab repudiandae eligendi similique enim.', 'Officiis qui architecto accusamus doloribus impedit omnis. Eum dolor optio cumque alias aspernatur officia. Quis ratione temporibus velit nulla quo.', '0', '2025-05-03 19:43:03', '2025-05-18 14:59:23'),
(55, 40, 2, 1, 'Quam qui doloremque veritatis.', 'Et soluta sed repudiandae soluta qui rem ut. Rerum reiciendis amet quia. Vel eos quia voluptatem ex voluptate quisquam.', '0', '2025-05-08 05:18:50', '2025-05-18 14:59:23'),
(56, 60, 10, 1, 'Quidem distinctio aperiam nobis earum adipisci.', 'Molestiae saepe qui hic quisquam totam non. Ut placeat nulla et assumenda aut autem. Incidunt iure et enim nemo molestias fugiat.', '0', '2025-05-03 09:50:54', '2025-05-18 14:59:23'),
(57, 55, 2, 1, 'Mollitia ipsum id modi consequatur deserunt fugit aut.', 'Voluptatibus reiciendis est deleniti in. Ab temporibus odio optio dolores.', '0', '2025-04-25 06:16:46', '2025-05-18 14:59:23'),
(58, 55, 2, 1, 'Ex ad ratione voluptatem.', 'Doloremque asperiores consequatur rem laudantium aut. Nostrum quibusdam sint delectus eum.', '0', '2025-04-19 10:17:15', '2025-05-18 14:59:23'),
(59, 23, 10, 1, 'Modi quam atque qui laudantium atque.', 'Excepturi dolorum velit autem eos. Quibusdam expedita qui aliquid et ab amet deleniti.', '0', '2025-04-23 05:50:50', '2025-05-18 14:59:23'),
(60, 58, 10, 1, 'Eos deserunt praesentium excepturi distinctio.', 'Adipisci sed quo qui numquam et itaque. Ducimus ut repudiandae ab illo dolores.', '0', '2025-05-04 19:04:25', '2025-05-18 14:59:23'),
(61, 20, 6, 1, 'Eveniet iste ut non labore impedit est.', 'Illum quia praesentium alias et. Sit omnis vero voluptatem expedita sunt dolores.', '0', '2025-05-05 04:20:20', '2025-05-18 14:59:23'),
(62, 41, 5, 1, 'Minus possimus deleniti dolorem quod unde veniam placeat.', 'Omnis aut sint consequatur sed. Asperiores quia excepturi dicta qui fuga. Earum pariatur placeat saepe omnis.', '0', '2025-04-20 11:22:15', '2025-05-18 14:59:23'),
(63, 74, 3, 1, 'Totam rerum sit aut nulla odio.', 'Labore qui at amet qui. Inventore dolore est inventore non earum qui repellendus.', '0', '2025-05-15 13:22:30', '2025-05-18 14:59:23'),
(64, 87, 1, 1, 'Saepe minus autem ipsam asperiores consequatur recusandae.', 'Quae aliquam maiores iste. Perspiciatis laborum omnis eveniet.', '0', '2025-05-18 10:47:35', '2025-05-18 14:59:23'),
(65, 60, 4, 1, 'Repellendus ex doloremque nostrum nobis dolorum molestias maiores omnis.', 'Qui blanditiis perferendis dolorem fuga cumque ut aliquam. Consequatur sint non provident cum praesentium cum.', '0', '2025-04-18 19:59:36', '2025-05-18 14:59:23'),
(66, 82, 9, 1, 'Eligendi aut explicabo nihil.', 'Consequatur voluptas corporis rerum. Sunt adipisci fugiat est similique quasi voluptatem beatae.', '0', '2025-05-02 04:50:06', '2025-05-18 14:59:23'),
(67, 87, 1, 1, 'Et ipsum velit voluptates et quaerat distinctio.', 'Autem aperiam veritatis ut dignissimos laudantium aut. Libero qui enim a quia ut aut. Rerum aut quas voluptas repellendus qui hic nisi vel.', '0', '2025-04-20 20:34:22', '2025-05-18 14:59:23'),
(68, 73, 4, 1, 'Quis itaque id magni.', 'Quos excepturi quibusdam optio possimus. Fugit a omnis nam rem. Pariatur ducimus et eaque optio pariatur in aut.', '0', '2025-05-12 08:31:40', '2025-05-18 14:59:23'),
(69, 62, 8, 1, 'Eveniet eos rerum sed rerum iure sint reprehenderit.', 'Maxime eos recusandae occaecati. Quae consequatur deleniti et molestiae consectetur tenetur ex.', '0', '2025-05-02 14:36:47', '2025-05-18 14:59:23'),
(70, 67, 7, 1, 'Officiis incidunt eveniet totam recusandae animi ullam.', 'Voluptatum quibusdam sed iure quae non excepturi est. Est culpa sint voluptas dolor. Impedit consequatur omnis ad ut non adipisci.', '0', '2025-04-28 11:13:47', '2025-05-18 14:59:23'),
(71, 82, 1, 1, 'Tempore non aliquid quis blanditiis similique quas consequuntur.', 'Similique voluptate veniam officia ab et nisi quasi. Est magnam soluta aut.', '0', '2025-05-17 03:03:56', '2025-05-18 14:59:23'),
(72, 15, 7, 1, 'Illo quis minus quisquam sed dolorem soluta commodi.', 'Placeat occaecati et autem quibusdam quis. Omnis ipsa labore velit repudiandae minima nostrum.', '0', '2025-04-29 01:09:19', '2025-05-18 14:59:23'),
(73, 76, 9, 1, 'Adipisci quos fuga repellat nostrum omnis.', 'Aut modi ea delectus voluptas dolorem voluptates. Quasi quisquam nemo magni voluptatem dolor.', '0', '2025-05-15 22:14:31', '2025-05-18 14:59:23'),
(74, 53, 2, 1, 'Voluptatem id porro qui.', 'Qui voluptas possimus qui soluta. Doloremque voluptatum odio quia vel. Beatae labore nobis eveniet blanditiis reprehenderit animi vero ex.', '0', '2025-05-01 16:08:40', '2025-05-18 14:59:23'),
(75, 17, 7, 1, 'Et vel nulla aut veniam.', 'Facere excepturi at voluptatum illum quidem quia harum quo. Nihil nesciunt aliquid nobis voluptatem quo. Consectetur qui reiciendis alias quae.', '0', '2025-05-07 22:14:33', '2025-05-18 14:59:23'),
(76, 97, 5, 1, 'Porro quia quia rem laboriosam sint.', 'Repellendus ipsum iure et quis aut. Cumque consectetur eum aspernatur. Ea dolor voluptas reiciendis voluptates.', '0', '2025-04-24 02:21:35', '2025-05-18 14:59:23'),
(77, 83, 3, 1, 'Reiciendis non molestiae placeat fugit voluptatem culpa voluptas.', 'Quae illum aut modi id neque. Similique unde labore sit cupiditate dolor magnam. Esse ut aut ea.', '0', '2025-04-26 01:08:07', '2025-05-18 14:59:23'),
(78, 28, 1, 1, 'Illum debitis sed voluptas sed totam quidem.', 'Sit et modi dicta temporibus et ut. Ea quibusdam praesentium eos ea impedit. Sunt temporibus autem voluptatem officia rerum quo distinctio.', '0', '2025-05-04 11:09:36', '2025-05-18 14:59:23'),
(79, 53, 2, 1, 'Earum et occaecati facilis praesentium.', 'Ea quasi magni dolor quisquam est quis. Excepturi soluta unde eaque ab.', '0', '2025-05-11 18:54:44', '2025-05-18 14:59:23'),
(80, 91, 10, 1, 'Deserunt voluptatem modi nulla repellat porro.', 'Vel atque tempora nostrum dolores laboriosam adipisci. Quis provident dolores nam adipisci est architecto nulla. Accusamus voluptas sint error explicabo et dolorem facere.', '0', '2025-04-29 03:36:09', '2025-05-18 14:59:23'),
(81, 86, 7, 1, 'Consectetur et est corrupti.', 'Libero corporis illo aut deleniti nulla ullam. Iste velit eaque ad nemo soluta omnis consequatur.', '0', '2025-05-13 16:07:07', '2025-05-18 14:59:23'),
(82, 17, 6, 1, 'Voluptatem doloribus magnam sapiente reiciendis.', 'Numquam doloribus et molestiae ipsam. Odit velit libero harum doloremque aliquam pariatur accusantium.', '0', '2025-05-16 18:50:25', '2025-05-18 14:59:23'),
(83, 56, 2, 1, 'Magni repellendus animi commodi animi sapiente.', 'Eos quo tempora commodi voluptas eligendi labore. Dolores saepe nisi praesentium ipsa consectetur voluptatem earum.', '0', '2025-05-06 04:41:39', '2025-05-18 14:59:23'),
(84, 17, 8, 1, 'Omnis est officia similique doloribus est.', 'Minus et dolor nostrum accusamus dolores qui. Corrupti doloribus adipisci quia occaecati reprehenderit ut. Id et delectus est doloremque nesciunt.', '0', '2025-05-01 22:14:53', '2025-05-18 14:59:23'),
(85, 11, 4, 1, 'Molestiae ullam corrupti at maxime sit sit.', 'Maiores eaque incidunt reprehenderit aut quod facilis. Id labore commodi quam aliquam debitis magnam reiciendis. Nihil qui dolorem soluta et provident suscipit.', '0', '2025-04-30 00:28:55', '2025-05-18 14:59:23'),
(86, 52, 4, 1, 'Quibusdam ducimus enim sint in.', 'Nihil vel accusamus delectus corporis. Velit laborum id ab sint sequi molestiae quia. Sint deserunt omnis animi consequatur omnis.', '0', '2025-05-11 01:07:59', '2025-05-18 14:59:23'),
(87, 53, 5, 1, 'Vel aliquam quia laudantium.', 'Et quod aut qui. In unde rem voluptatem at sit error. Aperiam autem totam amet.', '0', '2025-05-01 01:02:46', '2025-05-18 14:59:23'),
(88, 46, 7, 1, 'Eaque sapiente maiores impedit.', 'Ea porro placeat non ratione animi similique. Numquam ad cum et ea. Rem maxime quo hic pariatur harum deserunt.', '0', '2025-05-18 07:42:39', '2025-05-18 14:59:23'),
(89, 46, 8, 1, 'Veritatis aut tenetur facere eius minus aspernatur maiores.', 'Iure sunt sunt illo qui quas. Quidem incidunt deleniti dignissimos ut soluta perspiciatis. Ex voluptates accusamus vero quae autem iste iusto rem.', '0', '2025-05-08 11:23:05', '2025-05-18 14:59:23'),
(90, 45, 10, 1, 'Similique unde accusantium voluptatum sint voluptatum quidem et.', 'Id non omnis voluptatum ut consequatur asperiores enim. Quam nemo nobis cum commodi aut molestias eligendi. Dolores eaque natus veritatis odio voluptas.', '0', '2025-05-02 13:23:33', '2025-05-18 14:59:23'),
(91, 54, 9, 1, 'Qui labore saepe aut quis.', 'Rerum nihil et officiis porro sapiente eius. Quas officia velit voluptatem magnam pariatur.', '0', '2025-04-28 09:12:00', '2025-05-18 14:59:23'),
(92, 33, 1, 1, 'Accusantium quo rerum assumenda sint pariatur cumque voluptatem.', 'Aut sit quasi eius quia delectus quaerat. Molestiae qui officiis eveniet doloremque et cumque facere.', '0', '2025-05-07 21:18:08', '2025-05-18 14:59:23'),
(93, 79, 4, 1, 'Doloribus mollitia ut ea repudiandae.', 'Minus alias culpa dolores necessitatibus consequuntur perspiciatis ipsam maiores. Amet quis et laudantium aliquam quia. Minima dolores fuga omnis neque dolores sint dolorem est.', '0', '2025-05-18 03:29:10', '2025-05-18 14:59:24'),
(94, 7, 6, 1, 'Laborum deleniti qui facere in aut.', 'Ut nihil veniam voluptatibus saepe odio sunt aut. Aspernatur tempore sunt et eius dignissimos vel nobis facilis. Dolor adipisci nihil veritatis voluptates qui.', '0', '2025-05-14 22:31:47', '2025-05-18 14:59:24'),
(95, 88, 8, 1, 'Eveniet tenetur eveniet quia culpa.', 'Iusto tempora rerum id tempora fugiat molestias. Enim sunt sed aliquid molestias. Sequi neque atque alias.', '0', '2025-05-18 01:46:24', '2025-05-18 14:59:24'),
(96, 38, 4, 1, 'Dolor est numquam earum voluptas perspiciatis aut.', 'Explicabo incidunt perferendis nostrum aspernatur nostrum labore dolores. Repellendus ducimus molestiae sed nihil. Iste atque aut qui fugit sunt quasi.', '0', '2025-05-16 17:05:26', '2025-05-18 14:59:24'),
(97, 44, 5, 1, 'Quibusdam sit vel ullam sit aperiam illo.', 'Consectetur alias officiis asperiores corrupti facilis in non. Qui dolor et nulla et ut quasi corrupti. Molestiae quia quod est voluptas veritatis sint quos.', '0', '2025-04-28 12:47:55', '2025-05-18 14:59:24'),
(98, 58, 1, 1, 'Quaerat eum quas enim.', 'Dolores adipisci fuga autem officia non. Id nihil distinctio eum voluptas est reprehenderit voluptatem. Nobis quia est quod nihil.', '0', '2025-04-19 18:20:20', '2025-05-18 14:59:24'),
(99, 81, 8, 1, 'Commodi ut aut non nulla.', 'Esse sit cum quod ex omnis et cumque. Sequi id temporibus ut voluptates quis quo. Voluptatem fugit ut consequatur dolor doloremque cumque.', '0', '2025-04-24 06:48:11', '2025-05-18 14:59:24'),
(100, 34, 8, 1, 'Et accusantium eum modi ab exercitationem in qui.', 'Soluta ullam id officiis officia sed odit. Culpa tempore eos officiis deserunt eos et cum id.', '0', '2025-05-02 08:05:39', '2025-05-18 14:59:24'),
(101, 2, 4, 4, 'Sokak Lambası Yanmıyor', 'Rahime Hatun Mahllesinde akşam 8 den sonra sokak lambaları yanmıyor', '01JVJ99JWVX6T51N3ATKN7XGTV.jpg', '2025-05-18 15:07:58', '2025-05-18 15:16:29'),
(102, 2, 10, 4, 'Kanalizasyon Patladı', 'Güngören Mahallesinde Kanalizasyon Patladı ACİLL!!!', '01JVJ9D70NDQM8RXJJFJPH14GJ.jpeg', '2025-05-18 15:09:57', '2025-05-18 15:16:57'),
(103, 2, 8, 1, 'Park Yok', 'Yeni Köy Mahallesinde Boş araziye çocuk parkı yapılabilir', '01JVJ9E6XAHKSA020Y6YPD7CP9.jpeg', '2025-05-18 15:10:30', '2025-05-18 15:10:30'),
(104, 2, 2, 5, 'Çöp Konteyneri Yok', 'Etraf Pislik içinde kardeşim bir tane çöp konteyneri Koymak bu kadar zor mu ', '01JVJ9FG34WNADVJNT6QSR3HKN.jpeg', '2025-05-18 15:11:12', '2025-05-18 15:17:37'),
(105, 2, 8, 1, 'Çocuk Parkı', 'Boş Arazi Var buraya Çocuk Parkı İstiyoruz', '01JVJASD5G3EWATFSQCQ5P4VD5.jpeg', '2025-05-18 15:34:05', '2025-05-18 15:34:05'),
(108, 2, 7, 1, 'Ulaşım yavaş oluyor', 'ULAŞIM ÇOK PAHALI ÖĞRENCİ ZORLNAIYOR', 'complaint_photos/H3lcZU9ua8UZYqeBMWZR5VQVxtBH0f9ZpgI4IXzs.jpg', '2025-05-30 07:18:32', '2025-05-30 07:18:32');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(55, '0001_01_01_000000_create_users_table', 1),
(56, '0001_01_01_000001_create_cache_table', 1),
(57, '0001_01_01_000002_create_jobs_table', 1),
(58, '2025_02_14_122857_add_two_factor_columns_to_users_table', 1),
(59, '2025_02_14_122935_create_personal_access_tokens_table', 1),
(60, '2025_02_16_132252_create_permission_tables', 1),
(61, '2025_03_12_112901_status', 1),
(62, '2025_03_12_135444_service', 1),
(63, '2025_03_12_135619_complaint', 1),
(64, '2025_04_20_130001_survey', 1),
(65, '2025_04_20_130238_verifythecomplaint', 1),
(66, '2025_04_20_171514_resultoncomplaint', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(2, 'App\\Models\\User', 7),
(2, 'App\\Models\\User', 8),
(2, 'App\\Models\\User', 9),
(2, 'App\\Models\\User', 10),
(2, 'App\\Models\\User', 11),
(2, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 15),
(2, 'App\\Models\\User', 16),
(2, 'App\\Models\\User', 17),
(2, 'App\\Models\\User', 18),
(2, 'App\\Models\\User', 19),
(2, 'App\\Models\\User', 20),
(2, 'App\\Models\\User', 21),
(2, 'App\\Models\\User', 22),
(2, 'App\\Models\\User', 23),
(2, 'App\\Models\\User', 24),
(2, 'App\\Models\\User', 25),
(2, 'App\\Models\\User', 26),
(2, 'App\\Models\\User', 27),
(2, 'App\\Models\\User', 28),
(2, 'App\\Models\\User', 29),
(2, 'App\\Models\\User', 30),
(2, 'App\\Models\\User', 31),
(2, 'App\\Models\\User', 32),
(2, 'App\\Models\\User', 33),
(2, 'App\\Models\\User', 34),
(2, 'App\\Models\\User', 35),
(2, 'App\\Models\\User', 36),
(2, 'App\\Models\\User', 37),
(2, 'App\\Models\\User', 38),
(2, 'App\\Models\\User', 39),
(2, 'App\\Models\\User', 40),
(2, 'App\\Models\\User', 41),
(2, 'App\\Models\\User', 42),
(2, 'App\\Models\\User', 43),
(2, 'App\\Models\\User', 44),
(2, 'App\\Models\\User', 45),
(2, 'App\\Models\\User', 46),
(2, 'App\\Models\\User', 47),
(2, 'App\\Models\\User', 48),
(2, 'App\\Models\\User', 49),
(2, 'App\\Models\\User', 50),
(2, 'App\\Models\\User', 51),
(2, 'App\\Models\\User', 52),
(2, 'App\\Models\\User', 53),
(2, 'App\\Models\\User', 54),
(2, 'App\\Models\\User', 55),
(2, 'App\\Models\\User', 56),
(2, 'App\\Models\\User', 57),
(2, 'App\\Models\\User', 58),
(2, 'App\\Models\\User', 59),
(2, 'App\\Models\\User', 60),
(2, 'App\\Models\\User', 61),
(2, 'App\\Models\\User', 62),
(2, 'App\\Models\\User', 63),
(2, 'App\\Models\\User', 64),
(2, 'App\\Models\\User', 65),
(2, 'App\\Models\\User', 66),
(2, 'App\\Models\\User', 67),
(2, 'App\\Models\\User', 68),
(2, 'App\\Models\\User', 69),
(2, 'App\\Models\\User', 70),
(2, 'App\\Models\\User', 71),
(2, 'App\\Models\\User', 72),
(2, 'App\\Models\\User', 73),
(2, 'App\\Models\\User', 74),
(2, 'App\\Models\\User', 75),
(2, 'App\\Models\\User', 76),
(2, 'App\\Models\\User', 77),
(2, 'App\\Models\\User', 78),
(2, 'App\\Models\\User', 79),
(2, 'App\\Models\\User', 80),
(2, 'App\\Models\\User', 81),
(2, 'App\\Models\\User', 82),
(2, 'App\\Models\\User', 83),
(2, 'App\\Models\\User', 84),
(2, 'App\\Models\\User', 85),
(2, 'App\\Models\\User', 86),
(2, 'App\\Models\\User', 87),
(2, 'App\\Models\\User', 88),
(2, 'App\\Models\\User', 89),
(2, 'App\\Models\\User', 90),
(2, 'App\\Models\\User', 91),
(2, 'App\\Models\\User', 92),
(2, 'App\\Models\\User', 93),
(2, 'App\\Models\\User', 94),
(2, 'App\\Models\\User', 95),
(2, 'App\\Models\\User', 96),
(2, 'App\\Models\\User', 97),
(2, 'App\\Models\\User', 98),
(2, 'App\\Models\\User', 99),
(2, 'App\\Models\\User', 100),
(2, 'App\\Models\\User', 101),
(2, 'App\\Models\\User', 102),
(2, 'App\\Models\\User', 105),
(2, 'App\\Models\\User', 106),
(3, 'App\\Models\\User', 103),
(4, 'App\\Models\\User', 104);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Kullanıcı Sil', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(2, 'Kullanıcı Görüntüle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(3, 'Kullanıcı Düzenle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(4, 'Kullanıcı Ekle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(5, 'Talep Sil', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(6, 'Talep Ekle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(7, 'Talep Onayla', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(8, 'Talep Düzenle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(9, 'Talep Görüntüle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(10, 'Rol Ekle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(11, 'Rol Sil', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(12, 'Rol Görüntüle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(13, 'Rol Düzenle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(14, 'İzin Ekle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(15, 'İzin Düzenle', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(16, 'İzin Sİl', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(17, 'İzin Göster', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'api-token', '610e7b0f693793a352d821a925990c2126c564b20df7e0f0982ed3a407f27189', '[\"*\"]', '2025-05-18 15:25:18', NULL, '2025-05-18 15:18:02', '2025-05-18 15:25:18'),
(2, 'App\\Models\\User', 105, 'api-token', 'b4310373d6483ece90280575416bb920c2fd332194dfee4f2b9035008dc6b361', '[\"*\"]', '2025-05-18 15:27:33', NULL, '2025-05-18 15:26:06', '2025-05-18 15:27:33'),
(3, 'App\\Models\\User', 106, 'api-token', 'a16fd0df4647a9ffeb32b1a34a72b733e3f8404f057eebdc1c1b11b1f6b39923', '[\"*\"]', '2025-05-18 15:28:16', NULL, '2025-05-18 15:28:08', '2025-05-18 15:28:16'),
(4, 'App\\Models\\User', 107, 'auth_token', 'a83d50c1ec0939f9a7958c172b82ebe3731c207238816816a0cebf5a99a8942c', '[\"*\"]', NULL, NULL, '2025-05-18 15:29:39', '2025-05-18 15:29:39'),
(5, 'App\\Models\\User', 107, 'api-token', '9f90ac59cf5c1469265e27f74563e9291d8c102f521db6accaa53704cf1144c0', '[\"*\"]', '2025-05-18 15:30:04', NULL, '2025-05-18 15:29:54', '2025-05-18 15:30:04'),
(6, 'App\\Models\\User', 2, 'api-token', 'b5adc16fd505dfd96f5d6113787533be25f16c071cf18e671d5c28cbbdaca22d', '[\"*\"]', '2025-05-18 15:45:03', NULL, '2025-05-18 15:32:45', '2025-05-18 15:45:03'),
(7, 'App\\Models\\User', 2, 'api-token', '72d72c33d1d43ba30e8a6b812843a482647b5e1a2513c3a3947926a35f70714d', '[\"*\"]', '2025-05-20 04:17:35', NULL, '2025-05-20 04:16:02', '2025-05-20 04:17:35'),
(8, 'App\\Models\\User', 105, 'api-token', '5ed285b1eea5411561a7e5b0c5d215b2403ae748eb76b122cd3b869ab7c80930', '[\"*\"]', '2025-05-20 05:54:07', NULL, '2025-05-20 04:17:52', '2025-05-20 05:54:07'),
(9, 'App\\Models\\User', 2, 'api-token', '79d400e79a6ae2a5c6860d8f6719ad31aacc0d6faa43db2359e995375403b28e', '[\"*\"]', '2025-05-20 11:25:14', NULL, '2025-05-20 05:54:20', '2025-05-20 11:25:14'),
(10, 'App\\Models\\User', 107, 'api-token', '7c83c0ca4119f45f6ee41a8696fac65b9da767ba6640e9c38046e30afc1a863b', '[\"*\"]', '2025-05-20 11:28:02', NULL, '2025-05-20 11:25:42', '2025-05-20 11:28:02'),
(11, 'App\\Models\\User', 107, 'api-token', 'cabb7b1c9fcf0306f9c0530db2c4a24b4033ced9160a54931a9634152717a986', '[\"*\"]', '2025-05-22 07:57:39', NULL, '2025-05-20 11:28:42', '2025-05-22 07:57:39'),
(12, 'App\\Models\\User', 2, 'api-token', '6a3149a99379ab4230b794c39f0a8bff44292adcd84eb65eadb5813c5799ebeb', '[\"*\"]', '2025-05-22 08:00:05', NULL, '2025-05-22 07:57:51', '2025-05-22 08:00:05'),
(13, 'App\\Models\\User', 2, 'api-token', '79dccd37ef2d2e1bbe468d005cb801148eb7f25a6c428baf848354188047b646', '[\"*\"]', '2025-05-30 02:40:18', NULL, '2025-05-28 08:10:20', '2025-05-30 02:40:18'),
(14, 'App\\Models\\User', 2, 'api-token', 'a11d0fee1c8ad8c466678a6385d6db120be8b43fcfd0317b90f49a9c029fc82c', '[\"*\"]', '2025-05-30 04:49:34', NULL, '2025-05-30 02:40:32', '2025-05-30 04:49:34'),
(15, 'App\\Models\\User', 2, 'api-token', 'dab8cda333e3af82c1e9b576489d40549cdd8f134f0f2c82a6d17da49a7bc49e', '[\"*\"]', '2025-05-30 07:18:32', NULL, '2025-05-30 04:56:35', '2025-05-30 07:18:32');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `resultoncomplaint`
--

CREATE TABLE `resultoncomplaint` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `survey_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(2, 'Vatandaş', 'web', '2025-05-18 14:59:09', '2025-05-18 15:40:54'),
(3, 'Fen İşleri Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(4, 'Temizlik İşleri Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(5, 'Zabıta Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(6, 'Çevre Koruma ve Kontrol Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(7, 'Sosyal Hizmetler Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(8, 'Kültür ve Sosyal İşler Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(9, 'Mali Hizmetler Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(10, 'Park ve Bahçeler Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(11, 'Sağlık İşleri Müdürlüğü', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09'),
(12, 'Diğer', 'web', '2025-05-18 14:59:09', '2025-05-18 14:59:09');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(3, 1),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(4, 1),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(5, 1),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 7),
(5, 8),
(5, 9),
(5, 10),
(5, 11),
(5, 12),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(6, 7),
(6, 8),
(6, 9),
(6, 10),
(6, 11),
(6, 12),
(7, 1),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(7, 10),
(7, 11),
(7, 12),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 6),
(8, 7),
(8, 8),
(8, 9),
(8, 10),
(8, 11),
(8, 12),
(9, 1),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(9, 7),
(9, 8),
(9, 9),
(9, 10),
(9, 11),
(9, 12),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `service`
--

CREATE TABLE `service` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `service`
--

INSERT INTO `service` (`id`, `title`, `count`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Fen İşleri Müdürlüğü', 8, 3, '2025-05-18 14:59:10', '2025-05-30 03:51:43'),
(2, 'Temizlik İşleri Müdürlüğü', 12, 4, '2025-05-18 14:59:10', '2025-05-30 03:51:43'),
(3, 'Zabıta Müdürlüğü', 13, 5, '2025-05-18 14:59:10', '2025-05-30 02:41:30'),
(4, 'Çevre Koruma ve Kontrol Müdürlüğü', 11, 6, '2025-05-18 14:59:10', '2025-05-18 15:07:58'),
(5, 'Sosyal Hizmetler Müdürlüğü', 7, 7, '2025-05-18 14:59:10', '2025-05-18 14:59:24'),
(6, 'Kültür ve Sosyal İşler Müdürlüğü', 5, 8, '2025-05-18 14:59:10', '2025-05-18 14:59:24'),
(7, 'Mali Hizmetler Müdürlüğü', 11, 9, '2025-05-18 14:59:10', '2025-05-30 07:18:32'),
(8, 'Park ve Bahçeler Müdürlüğü', 12, 10, '2025-05-18 14:59:10', '2025-05-30 03:51:43'),
(9, 'Sağlık İşleri Müdürlüğü', 11, 11, '2025-05-18 14:59:10', '2025-05-30 03:51:43'),
(10, 'Diğer', 8, 12, '2025-05-18 14:59:10', '2025-05-30 05:19:04');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('ba6NlnoH1QkHVYTgBPCr53HxrgIXh0nF6jxOG3Nw', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVnVIMWRKQndpZU1LQ1EwVHc4cGlyUEVJTHQ2M2I4aHk3NG15U2x0NiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1748692377);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `status`
--

CREATE TABLE `status` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `status`
--

INSERT INTO `status` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Talebiniz Alındı', '2025-05-18 14:59:10', '2025-05-18 14:59:10'),
(3, 'Talebiniz İşlemde', '2025-05-18 14:59:10', '2025-05-18 14:59:10'),
(4, 'Talebiniz Gerçekleştirildi', '2025-05-18 14:59:10', '2025-05-18 14:59:10'),
(5, 'Talebiniz Reddedildi', '2025-05-18 14:59:10', '2025-05-18 14:59:10');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `survey`
--

CREATE TABLE `survey` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `answer` int(11) NOT NULL DEFAULT 2,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `survey`
--

INSERT INTO `survey` (`id`, `complaint_id`, `user_id`, `answer`, `created_at`, `updated_at`) VALUES
(1, 102, 2, 1, '2025-05-18 15:25:03', '2025-05-18 15:25:03'),
(2, 101, 2, 1, '2025-05-18 15:25:08', '2025-05-18 15:25:08'),
(3, 104, 2, 0, '2025-05-18 15:25:14', '2025-05-18 15:25:14'),
(4, 101, 105, 1, '2025-05-18 15:26:14', '2025-05-18 15:26:14'),
(5, 102, 105, 1, '2025-05-18 15:26:17', '2025-05-18 15:26:17'),
(6, 104, 105, 0, '2025-05-18 15:26:19', '2025-05-18 15:26:19'),
(7, 101, 106, 1, '2025-05-18 15:28:13', '2025-05-18 15:28:13'),
(8, 102, 106, 1, '2025-05-18 15:28:14', '2025-05-18 15:28:14'),
(9, 104, 106, 1, '2025-05-18 15:28:16', '2025-05-18 15:28:16'),
(10, 101, 107, 1, '2025-05-18 15:30:01', '2025-05-18 15:30:01'),
(11, 102, 107, 0, '2025-05-18 15:30:02', '2025-05-18 15:30:02'),
(12, 104, 107, 0, '2025-05-18 15:30:04', '2025-05-18 15:30:04'),
(16, 4, 2, 1, '2025-05-22 08:00:05', '2025-05-22 08:00:05');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tc` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `tc`, `name`, `surname`, `phone`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, '20933834978', 'admin', 'admin', '05445738244', 'admin@gmail.com', NULL, '$2y$12$IN1n83zVdhHSuQymnmL43.blciJkMSEFvF6LzWjc6fnbWGoTpvVE6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-18 14:59:10', '2025-05-18 14:59:10'),
(2, '12345678912', 'Bilal', 'Gökşen', '05425269985', 'bilal@gmail.com', NULL, '$2y$12$xIlkpMochStvWfEijTLhzex1saFenttiKyeaLiDqVBB2JGz8b3nhi', NULL, NULL, NULL, NULL, NULL, '1748431171_profile.jpg', '2025-05-18 14:59:10', '2025-05-28 08:19:31'),
(3, '22154531324', 'Doç. Dr. Esma Elmastaşoğlu', 'Prof. Dr. Ece Tuğlu', '+90 (501) 264 33 94', 'askin15@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'RD8gjZ6l9c', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(4, '11931733548', 'Sinem Kocabıyık', 'Ada Nalbantoğlu', '0 222 579 60 26', 'rakan@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'QcXVbuRXDo', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(5, '48974582417', 'Prof. Dr. Ada Akaydın', 'Armağan Abadan', '0 535 233 91 42', 'ece64@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'PG7fY9BQiQ', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(6, '24142683300', 'Armağan Ayverdi', 'Yağız Balaban', '02122197218', 'fakan@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'JEdTTwLesO', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(7, '25197030636', 'Ege Karaer', 'Toprak Kahveci', '05031223719', 'ruya.uluhan@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Py2cOQKcj8', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(8, '80999682759', 'Burcu Dağdaş', 'Dr. Ali Erçetin', '+90 (216) 275 00 24', 'deniz.erkekli@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'GoYvKqu985', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(9, '70897038300', 'Ebru Tunaboylu', 'Cihan Dalkıran', '+902165677997', 'kakyurek@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'aHgaYGSibI', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(10, '96926300252', 'Dr. Emel Erçetin', 'Emel Dalkıran', '02246126698', 'tuna05@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'kmOlgV9fn8', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(11, '67490813974', 'Aşkın Polat', 'Cem Sezek', '+90 222 896 08 93', 'irem.kavaklioglu@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'KgxXrNuatg', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(12, '53870267000', 'Prof. Dr. Derin Özbey', 'Yağız Doğan', '+90 (557) 861 19 08', 'turker17@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'HdBS306Qwb', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(13, '70615741461', 'İrem Pekkan', 'Prof. Dr. Ece Akaydın', '+90 (535) 542 51 80', 'esma32@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'XR8dedPpgl', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(14, '77472364157', 'Göktürk Dağlaroğlu', 'Doç. Dr. Canberk Karaduman', '0 (224) 176 05 31', 'gorkem.ozdogan@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'NmekCAAN3U', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(15, '73359994596', 'İrem Pekkan', 'Doç. Dr. Ferid Ilıcalı', '05047838070', 'ovelioglu@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'hsded4vXGs', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(16, '24885586666', 'Ada Çetin', 'Burak Avan', '+90 538 546 32 45', 'emel86@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'no11pQXNqq', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(17, '28441374228', 'İrem Demirel', 'Toprak Kıraç', '0 222 598 70 17', 'alyanak.irem@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'dvcT7Ykrbd', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(18, '69089849743', 'Kerem Doğan', 'Prof. Dr. Rüya Karaböcek', '0 (555) 932 34 15', 'tuna.agaoglu@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '806pryOj5z', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(19, '40934481195', 'Dr. Mert Erbay', 'Ada Yılmazer', '+90 547 360 39 15', 'sahnur29@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'e9mCIxWPXO', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(20, '06367359539', 'Esma Keçeci', 'Ada Erez', '0 (537) 924 83 97', 'emel.kocyigit@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'fg78g95mxC', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(21, '74563354448', 'Doç. Dr. Şahnur Sandalcı', 'Görkem Karaduman', '+905361995410', 'sinem69@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Cm6De0xb71', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(22, '34429345057', 'Çağan Elmastaşoğlu', 'Berke Tuğluk', '+902223128188', 'daghan39@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'zrEnMktD8d', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(23, '45474415499', 'Emel Alpuğan', 'Rüya Aybar', '0 216 118 36 56', 'sarp42@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '1ATkQNO2ZW', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(24, '81052554372', 'Bartu Elçiboğa', 'Prof. Dr. Barlas Türkdoğan', '0 (532) 752 51 78', 'asikoglu.burcu@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '0gU0LV5jlj', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(25, '83210305244', 'Sinem Topçuoğlu', 'Emel Denkel', '05498592357', 'yaclan@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'RFSM82sh1U', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(26, '64621216782', 'Ada Kavaklıoğlu', 'Serhan Dalkıran', '0 (212) 476 34 06', 'ege74@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'BwWt1qKkLg', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(27, '96274630002', 'Ada Dizdar', 'Şahnur Özdenak', '05357997169', 'ztugluk@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'EoQt1VIx0e', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(28, '19494700909', 'Göktürk Taşlı', 'Ebru Bakırcıoğlu', '+90 222 070 30 35', 'efe05@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'S47XgZ8ID0', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(29, '04790208768', 'Ece Korol', 'Ümran Çağıran', '0 (222) 635 95 40', 'durak.sinem@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Q49ICW2AKv', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(30, '24772635327', 'Bora Köybaşı', 'Ümran Beşok', '0 224 789 31 33', 'umran.akar@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '9htefgzBLJ', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(31, '83861956114', 'Ebru Sarıoğlu', 'Prof. Dr. Ahmet Limoncuoğlu', '0 554 275 54 05', 'evliyaoglu.emel@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'yAn03fdrzd', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(32, '41263077554', 'Efe Tokgöz', 'Dr. Sinem Okumuş', '0 557 302 80 98', 'ebru.avan@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'eeCTlKi41L', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(33, '36377974346', 'Canberk Akaydın', 'Canberk Kaplangı', '0 (509) 376 29 18', 'burcu.barbarosoglu@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'miEvv43G7t', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(34, '10936134154', 'Rüzgar Karadaş', 'Bora Elmastaşoğlu', '0 216 406 35 57', 'sinem25@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'SfhwZAFYuS', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(35, '46806832944', 'Dr. Kerem Ekici', 'Ada Köybaşı', '02247592323', 'askin62@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'AvVdSQsp9n', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(36, '67783949474', 'Dr. Rüya Bakırcıoğlu', 'Ümran Okumuş', '0 (546) 998 45 67', 'toprak.fahri@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'wku7g6CUDD', NULL, NULL, '2025-05-18 14:59:18', '2025-05-18 14:59:18'),
(37, '87461770161', 'Tuna Kavaklıoğlu', 'Prof. Dr. Ece Balaban', '+90 507 856 79 37', 'tavan@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '8uorkpIK9J', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(38, '52791557046', 'Doç. Dr. Bora Sandalcı', 'Ahmet Özdenak', '02120913285', 'umran.balci@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'LlNhavNKWX', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(39, '80779746817', 'Esma Nalbantoğlu', 'Dağhan Çapanoğlu', '0 216 739 93 40', 'ege.durmaz@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '4a9wy4DIwh', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(40, '90066224790', 'Doç. Dr. Ebru Pektemek', 'Emel Nalbantoğlu', '0 (530) 226 93 77', 'aerginsoy@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'MzvyiCS8hl', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(41, '78360358528', 'Dr. Utku Babacan', 'Ferid Kutlay', '0 (212) 963 01 71', 'turker.egeli@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'MmRk6Q5hl7', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(42, '57325027489', 'Esma Durak', 'İrem Tuğluk', '+905444735529', 'kkucukler@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '3esPF11zIN', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(43, '94704272085', 'Doç. Dr. Ada Yılmazer', 'Emirhan Abadan', '02128465640', 'ece.beserler@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'xeZvNlpCxq', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(44, '45906941491', 'Esma Erdoğan', 'Göktürk Topaloğlu', '0 (224) 386 85 52', 'ebru96@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'WJZQpcvLfM', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(45, '99071515991', 'Dr. Ege Akan', 'Ada Özbir', '+90 216 477 53 95', 'voymen@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'kj3S5wFNxf', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(46, '64702927423', 'Alp Özbey', 'Alp Karadaş', '02163226993', 'ttunaboylu@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'BVNqikhTPH', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(47, '18838451078', 'Ege Demirel', 'Prof. Dr. Rüya Erbulak', '0 222 667 66 82', 'ada.korol@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '1VkAem90Dq', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(48, '90318740261', 'Emel Kumcuoğlu', 'İrem Başoğlu', '+90 (216) 477 23 38', 'cabadan@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '0lp36J1qy7', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(49, '48525141147', 'Doç. Dr. Emel Akay', 'Dr. Rüya Solmaz', '+90 (505) 617 49 40', 'bartu15@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'KindP7MMp5', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(50, '67171079982', 'Baran Çağıran', 'İrem Aşıkoğlu', '02168337530', 'ebru16@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'sso3V0oq0W', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(51, '42926136320', 'Ümran Sepetçi', 'Barlas Ekici', '05535339080', 'aatakol@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'wZpqBk5Yk3', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(52, '52839326359', 'Ümran Tütüncü', 'Ada Atan', '+905037568146', 'sinem.topcuoglu@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'vphaGAyGfN', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(53, '17914263971', 'Burcu Türkdoğan', 'Kağan Tütüncü', '0 224 512 28 18', 'ebru99@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '9G3SW7nDT5', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(54, '83600563236', 'Ebru Paksüt', 'Sarp Durmaz', '0 500 255 42 48', 'ece27@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'eVZde9E5R1', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(55, '48362416786', 'Ece Demirbaş', 'Ada Limoncuoğlu', '+90 535 005 46 28', 'matan@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'M3ghLsJh6N', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(56, '27983113801', 'Dr. Ümran Eliçin', 'Şahnur Alpuğan', '+905575694884', 'pdogan@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'X7iI29490s', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(57, '24235580400', 'Şahnur Tüzün', 'Utku Menemencioğlu', '+90 (212) 494 14 51', 'irem.ozberk@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'mubyqEGlGL', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(58, '39719465738', 'Ebru Erbay', 'Bartu Beşok', '+90 (222) 497 88 32', 'baran95@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '7bH2vNaFf7', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(59, '39385995777', 'Dr. Ece Sözeri', 'Prof. Dr. Ege Özbey', '0 222 510 72 31', 'irem53@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'N8zEEAaAR9', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(60, '33923388204', 'Kutay Aybar', 'Burcu Duygulu', '+90 224 790 53 39', 'puca@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'icwuiVWJHL', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(61, '69023106424', 'Bartu Çapanoğlu', 'Doç. Dr. Kerem Yorulmaz', '+90 212 835 91 67', 'sezek.irem@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'a5efFTpdx6', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(62, '83260880471', 'Berke Aykaç', 'İrem Başoğlu', '0 508 754 65 88', 'ada87@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'HvagA2QmpM', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(63, '85106889838', 'Berkay Paksüt', 'Esma Pekkan', '05346471765', 'baran57@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'tEjZML0SvQ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(64, '29041645700', 'Dr. Alp Kaplangı', 'Şahnur Ağaoğlu', '+90 216 363 42 90', 'arslanoglu.irem@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '6WeT1KmTIm', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(65, '22945026737', 'Emel Akal', 'Ece Oraloğlu', '0 559 628 36 85', 'hpoyrazoglu@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '7WLEmyYPmA', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(66, '17750039093', 'Doç. Dr. Ahmet Durmaz', 'Berkay Eliçin', '0 533 948 84 95', 'tcetin@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Pti0CmW0mP', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(67, '52035081382', 'Sinem Düşenkalkar', 'Ege Çetiner', '+90 212 146 02 78', 'bartu43@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '2c0GxwkrkZ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(68, '34559828629', 'Ece Sepetçi', 'Armağan Yazıcı', '0 222 897 43 34', 'bademci.irem@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'CbVfTH0H34', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(69, '86449145178', 'Rüya Aykaç', 'Canberk Tokatlıoğlu', '05520639744', 'turker81@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'qBHMKdtqTA', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(70, '67083746372', 'Dr. Rüzgar Akay', 'Şahnur Topçuoğlu', '0 547 570 72 81', 'irem65@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'A2c3fF2hZZ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(71, '17007364177', 'Dr. Esma Türkdoğan', 'Mert Karaböcek', '+90 222 686 68 38', 'umran58@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'zwk5CKXBuu', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(72, '67391506178', 'Bartu Kunter', 'Toprak Beşerler', '0 558 527 94 78', 'ozdenak.yigit@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'ZnscL7fMZQ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(73, '21652616108', 'Prof. Dr. Ece Dağlaroğlu', 'İrem Sinanoğlu', '02160809869', 'ebru.gurmen@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'j9mwHDuMPF', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(74, '27475395941', 'Efe Karabulut', 'Çınar Ertürk', '+905449255814', 'irem69@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'tjRxt4pS4C', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(75, '32216024121', 'Dr. Rüya Köybaşı', 'Doç. Dr. Ogün Alyanak', '0 (222) 522 47 95', 'kutay95@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'qMulGVOKqn', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(76, '73787390120', 'Prof. Dr. Burcu Avan', 'Yağız Menemencioğlu', '02249447000', 'esma81@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'pIRNTeb3xp', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(77, '56178754250', 'Meriç Abadan', 'Emir Körmükçü', '+90 (222) 978 32 23', 'yigit.tahincioglu@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'SN7Ys3ANsf', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(78, '33533825817', 'Emir Kulaksızoğlu', 'Burcu Balaban', '+90 (539) 414 02 84', 'akal.ada@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'bPwZQz8m15', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(79, '78499067308', 'Dr. Ada Akbulut', 'Ada Yetkiner', '0 (540) 090 14 48', 'akgul.emel@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'vRZYSGdIby', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(80, '81382136196', 'Dr. Rüzgar Demirel', 'Sinem Yetkiner', '+902240275801', 'qtuzun@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Ggix4rfUtW', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(81, '63420793359', 'Ada Özkök', 'Dr. Ada Ilıcalı', '0 (543) 670 35 30', 'xkavaklioglu@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'SvbqVBOSet', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(82, '49013862115', 'Ece Ekici', 'Prof. Dr. Aşkın Dizdar', '02240927371', 'kakan@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Pk2EnKeomV', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(83, '35893022147', 'Ece Aclan', 'Doç. Dr. Güney Sözeri', '05425113641', 'sinem.tekand@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'bVScgkZsMP', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(84, '02569314542', 'Esma Doğan', 'Çağan Mertoğlu', '0 (508) 300 47 20', 'gokturk87@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'IY2r2Inmux', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(85, '59239665792', 'Esma Mayhoş', 'Emel Tunçeri', '0 (500) 852 76 71', 'cinar47@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'iCkrgoZY0U', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(86, '22280467639', 'Prof. Dr. Cihan Erkekli', 'Alp Akışık', '+90 212 900 62 36', 'askin.akay@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'O9xlSViswC', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(87, '10139642714', 'Dr. Göktürk Pektemek', 'Esma Topaloğlu', '+90 544 233 59 98', 'sbaturalp@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'yIunLvy9h6', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(88, '12536373701', 'Burcu Sarıoğlu', 'Doç. Dr. Ebru Toraman', '+902167130852', 'burak70@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'WxPI81PhSV', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(89, '41082931727', 'Rüya Berberoğlu', 'Doç. Dr. Ebru Yıldızoğlu', '0 224 869 45 96', 'utku96@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Ux91RVaeM2', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(90, '30757485509', 'Doç. Dr. Ada Akar', 'Sinem Aydan', '0 216 922 40 88', 'ruya.egeli@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'bLgma7jaCZ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(91, '65395153814', 'Prof. Dr. Güney Akan', 'Sinem Fahri', '+905452629563', 'aakar@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'Dm3WlCsrMl', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(92, '44762263097', 'Dr. Rüya Erçetin', 'Çınar Tütüncü', '0 (212) 559 73 92', 'atakan93@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'hdIZ099Ned', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(93, '43716283405', 'Emel Korol', 'Doç. Dr. Kağan Akyürek', '+905373903308', 'xtuzun@example.org', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, '3zLe4K0Dbd', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(94, '69029583175', 'Dr. Berk Akay', 'Emel Bolatlı', '+90 (552) 738 97 65', 'utopaloglu@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'm1Bv65OzCi', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(95, '33638817958', 'Alp Gönültaş', 'Sinem Çetin', '02227749480', 'karaduman.ruzgar@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'EilyeP8qsJ', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(96, '50744329391', 'Ege Akşit', 'Ece Baturalp', '+905087599597', 'kagan89@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'vo4WV3cXc1', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(97, '42934148504', 'Armağan Çamdalı', 'Baran Uca', '0 (557) 823 95 71', 'ttasci@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'txLZL5B34Z', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(98, '97854395065', 'Ümran Başoğlu', 'Doç. Dr. Sarp Yıldırım', '+90 547 233 37 28', 'ybicer@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'o6TE0lCH3k', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(99, '95758345370', 'Kutay Kaplangı', 'Ece Aydan', '0 216 323 96 61', 'alpugan.ruya@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'zeLhoQvrn8', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(100, '14022240639', 'Emel Yıldızoğlu', 'Baran Menemencioğlu', '0 553 370 68 58', 'vberberoglu@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'LrYG1Gv8Ss', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(101, '48015184583', 'Ahmet Dalkıran', 'Emel Elçiboğa', '0 (504) 039 76 62', 'rkutlay@example.com', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'ogKn4HrTyD', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(102, '33795386134', 'Sarp Akyürek', 'Bora Yalçın', '0 509 532 67 60', 'cinar18@example.net', '2025-05-18 14:59:18', '$2y$12$FVBWOK51GKqakhfmPqcf..9mEn1RjTOpAWqwje.8D5ll3Wcl1xGs2', NULL, NULL, NULL, 'G6E9lKTyup', NULL, NULL, '2025-05-18 14:59:19', '2025-05-18 14:59:19'),
(103, '12345678978', 'fen', 'işleri', '05428539578', 'fen@gmail.com', NULL, '$2y$12$EiLEbahi9rS0KgkUGzqkaOon84r28VnTfhletuzMU2i8bTjf6mLvu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-18 15:19:42', '2025-05-18 15:19:42'),
(104, '12345678978', 'temizlik', 'işleri', '05478524785', 'temizlik@gmail.com', NULL, '$2y$12$rDdsWSaaGhmadF.KkmWRqeJkQvZ34Jx6kJPDG0MGFtimvXp6WqehO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-18 15:20:09', '2025-05-18 15:20:09'),
(105, '12345678978', 'Nursena', 'Başdoğan', '05438256598', 'nur@gmail.com', NULL, '$2y$12$BTndC4P7Sr8Luj6dKrW6vOggzwBiTIHiKp4ixmVH4FkdGbjJ96Pny', NULL, NULL, NULL, NULL, NULL, '1747592843_profile.jpg', '2025-05-18 15:25:48', '2025-05-18 15:27:23'),
(106, '12345678959', 'Ömer', 'Tunç', '05478524785', 'omer@gmail.com', NULL, '$2y$12$cpaa8pexDsLzPiwp.3BzlOVm8GWmhbh0iscNI92UYtfkERkEnZsF.', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-18 15:27:56', '2025-05-18 15:27:56'),
(107, '20965435975', 'Anastasia', 'Tatiana', '9261234567', 'Anastas@gmail.com', NULL, '$2y$12$wTjtSTPdqmPiMD.fHAukH.pqjEQqfPfMIMsgnmkhcCww4XVxL2Qpq', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-18 15:29:39', '2025-05-18 15:29:39');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `verifythecomplaint`
--

CREATE TABLE `verifythecomplaint` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `complaint_id` bigint(20) UNSIGNED NOT NULL,
  `reason_for_refuse` varchar(255) DEFAULT NULL,
  `reason_for_verify` varchar(255) DEFAULT NULL,
  `complated_photo` varchar(255) DEFAULT NULL,
  `satisfaction` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `verifythecomplaint`
--

INSERT INTO `verifythecomplaint` (`id`, `complaint_id`, `reason_for_refuse`, `reason_for_verify`, `complated_photo`, `satisfaction`, `created_at`, `updated_at`) VALUES
(1, 101, NULL, 'Birimlerimiz olaya hemen müdahale edip çözmüştür', '01JVJ9S5KZBWXEVC4ZAEBYX2W1.jpg', 1, '2025-05-18 15:16:29', '2025-05-18 15:30:01'),
(2, 102, NULL, 'Alt yapı çalışmalarımız Hızla dveam etmektedir.', '01JVJ9T1BTFDTKGM759JVT7ERN.jpeg', 0.75, '2025-05-18 15:16:58', '2025-05-18 15:30:02'),
(3, 104, 'Belediyeye Sağlanan Bütçeden Dolayı Çöp Konteyneri Alacak Paramız yoktur. Anlayışınız için teşekkür ederiz', NULL, NULL, 0.25, '2025-05-18 15:17:37', '2025-05-18 15:30:04'),
(5, 4, NULL, 'şlem Başarıyla Tamamlandı', '01JVVTBR23HCYMZYRMQXR67F40.png', 1, '2025-05-22 07:59:25', '2025-05-22 08:00:05'),
(10, 10, 'Gerçekleştirilemedi', NULL, NULL, 0, '2025-05-30 03:50:04', '2025-05-30 03:50:04'),
(16, 12, NULL, NULL, NULL, 0, '2025-05-30 05:34:51', '2025-05-30 05:34:51');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Tablo için indeksler `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Tablo için indeksler `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `complaint_user_id_foreign` (`user_id`),
  ADD KEY `complaint_service_id_foreign` (`service_id`),
  ADD KEY `complaint_status_id_foreign` (`status_id`);

--
-- Tablo için indeksler `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Tablo için indeksler `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Tablo için indeksler `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Tablo için indeksler `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Tablo için indeksler `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Tablo için indeksler `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Tablo için indeksler `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Tablo için indeksler `resultoncomplaint`
--
ALTER TABLE `resultoncomplaint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resultoncomplaint_complaint_id_foreign` (`complaint_id`),
  ADD KEY `resultoncomplaint_survey_id_foreign` (`survey_id`);

--
-- Tablo için indeksler `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Tablo için indeksler `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Tablo için indeksler `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Tablo için indeksler `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `survey`
--
ALTER TABLE `survey`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_complaint_id_foreign` (`complaint_id`),
  ADD KEY `survey_user_id_foreign` (`user_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Tablo için indeksler `verifythecomplaint`
--
ALTER TABLE `verifythecomplaint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `verifythecomplaint_complaint_id_foreign` (`complaint_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `complaint`
--
ALTER TABLE `complaint`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Tablo için AUTO_INCREMENT değeri `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Tablo için AUTO_INCREMENT değeri `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Tablo için AUTO_INCREMENT değeri `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `resultoncomplaint`
--
ALTER TABLE `resultoncomplaint`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Tablo için AUTO_INCREMENT değeri `service`
--
ALTER TABLE `service`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `status`
--
ALTER TABLE `status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `survey`
--
ALTER TABLE `survey`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- Tablo için AUTO_INCREMENT değeri `verifythecomplaint`
--
ALTER TABLE `verifythecomplaint`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaint_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `complaint_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `complaint_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Tablo kısıtlamaları `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `resultoncomplaint`
--
ALTER TABLE `resultoncomplaint`
  ADD CONSTRAINT `resultoncomplaint_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaint` (`id`),
  ADD CONSTRAINT `resultoncomplaint_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`id`);

--
-- Tablo kısıtlamaları `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `survey`
--
ALTER TABLE `survey`
  ADD CONSTRAINT `survey_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaint` (`id`),
  ADD CONSTRAINT `survey_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Tablo kısıtlamaları `verifythecomplaint`
--
ALTER TABLE `verifythecomplaint`
  ADD CONSTRAINT `verifythecomplaint_complaint_id_foreign` FOREIGN KEY (`complaint_id`) REFERENCES `complaint` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
