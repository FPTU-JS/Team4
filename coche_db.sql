-- ============================================================
-- phpMyAdmin SQL Dump — PHIÊN BẢN CẬP NHẬT
-- Cơ sở dữ liệu: coche_db
-- Cập nhật: Thêm cột dietary_preferences, bổ sung Món Chay & Tráng Miệng
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ============================================================
-- Bảng: bookings
-- ============================================================
CREATE TABLE `bookings` (
  `booking_id` bigint(20) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `booking_time` datetime NOT NULL,
  `guest_count` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bookings` (`booking_id`, `customer_id`, `restaurant_id`, `booking_time`, `guest_count`, `note`, `status`, `created_at`) VALUES
(1,  5,  1, '2026-03-10 18:30:00', 2, 'Gia đình cần bàn yên tĩnh, gần cửa sổ.',                   'Confirmed', '2026-03-08 13:41:48'),
(2,  6,  3, '2026-03-12 20:00:00', 4, 'Tổ chức sinh nhật bạn, vui lòng chuẩn bị sẵn ghế em bé.',  'Pending',   '2026-03-08 13:41:48'),
(3,  2,  2, '2026-03-15 15:00:00', 2, 'Hẹn đối tác công việc.',                                     'Confirmed', '2026-03-08 13:41:48'),
(4, 10,  5, '2026-03-20 19:00:00', 2, 'Kỷ niệm ngày cưới, mong nhà hàng set up hoa hồng.',         'Confirmed', '2026-03-08 13:43:02'),
(5, 12,  6, '2026-03-21 11:30:00', 3, 'Ăn trưa văn phòng, cần lên món nhanh.',                     'Pending',   '2026-03-08 13:43:02'),
(6, 13,  7, '2026-03-25 18:00:00', 4, 'Bố trí bàn gần khu vực lấy đồ ăn.',                        'Confirmed', '2026-03-08 13:44:06'),
(7, 14,  8, '2026-03-26 15:00:00', 2, 'Hẹn hò uống trà chiều.',                                    'Pending',   '2026-03-08 13:44:06'),
(8, 15,  1, '2026-03-27 12:00:00', 6, 'Ăn trưa công ty, xuất hóa đơn đỏ.',                        'Confirmed', '2026-03-08 13:44:06'),
(9, 16,  7, '2026-03-28 19:30:00', 2, 'Không ăn cay.',                                              'Cancelled', '2026-03-08 13:44:06');

-- ============================================================
-- Bảng: categories
-- ============================================================
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(1,  'Món chay',      'Các món ăn thanh đạm, tốt cho sức khỏe'),
(2,  'Đồ uống',       'Trà sữa, sinh tố, nước ép'),
(3,  'Món mặn',       'Các món ăn chính đậm đà hương vị truyền thống'),
(4,  'Ăn vặt',        'Snack và các món ăn nhẹ nhâm nhi lúc rảnh rỗi'),
(5,  'Tráng miệng',   'Bánh ngọt, chè, kem mát lạnh giúp thanh lọc vị giác'),
(6,  'Fast Food',     'Đồ ăn nhanh tiện lợi, bùng nổ vị giác'),
(7,  'Món Nhật',      'Sushi, sashimi, và các món ăn mang đậm tinh hoa ẩm thực Nhật Bản'),
(8,  'Healthy',       'Salad và các món ăn eat-clean giúp giữ dáng, đẹp da'),
(9,  'Món nướng BBQ', 'Thịt nướng xèo xèo, thơm nức mũi'),
(10, 'Bánh ngọt',     'Phần thưởng ngọt ngào cho những ngày mỏi mệt');

-- ============================================================
-- Bảng: ingredients
-- ============================================================
CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ingredients` (`ingredient_id`, `name`, `unit`) VALUES
(1,  'Gạo tấm',             'kg'),
(2,  'Sườn heo non',        'kg'),
(3,  'Trà đen nguyên lá',   'gram'),
(4,  'Sữa đặc Ngôi Sao',    'ml'),
(5,  'Trân châu đen',       'kg'),
(6,  'Ốc hương biển',       'kg'),
(7,  'Sả tươi',             'gram'),
(8,  'Khoai tây Mỹ',        'kg'),
(9,  'Bột mì cao cấp',      'kg'),
(10, 'Phô mai Mozzarella',  'kg'),
(11, 'Cá hồi Na Uy',        'kg'),
(12, 'Rong biển khô',       'gram'),
(13, 'Xà lách Romaine',     'kg'),
(14, 'Cà chua bi',          'kg'),
(15, 'Ức gà phi lê',        'kg'),
-- Nguyên liệu mới cho món chay & tráng miệng
(16, 'Đậu hũ non',          'kg'),
(17, 'Nấm đông cô',         'gram'),
(18, 'Bún tươi',            'kg'),
(19, 'Nấm hương khô',       'gram'),
(20, 'Hạt quinoa',          'kg'),
(21, 'Dầu oliu',            'ml'),
(22, 'Nấm truffle',         'gram'),
(23, 'Bánh phở tươi',       'kg'),
(24, 'Đậu xanh',            'kg'),
(25, 'Đậu đỏ',              'kg'),
(26, 'Nước cốt dừa',        'ml'),
(27, 'Bột matcha Nhật',     'gram'),
(28, 'Mochi',               'kg'),
(29, 'Trứng gà',            'quả'),
(30, 'Sữa tươi không đường','ml'),
(31, 'Thạch sương sáo',     'kg'),
(32, 'Nước dừa tươi',       'ml');

-- ============================================================
-- Bảng: products  (có thêm cột dietary_preferences)
-- ============================================================
CREATE TABLE `products` (
  `product_id`           int(11) NOT NULL,
  `restaurant_id`        int(11) NOT NULL,
  `category_id`          int(11) DEFAULT NULL,
  `name`                 varchar(100) NOT NULL,
  `price`                double NOT NULL,
  `description`          text DEFAULT NULL,
  `image_url`            text DEFAULT NULL,
  `status`               varchar(20) DEFAULT 'Available',
  `calories`             int(11) DEFAULT NULL,
  `cooking_time`         int(11) DEFAULT NULL,
  `is_ai_recommended`    bit(1) DEFAULT NULL,
  `rating`               double DEFAULT NULL,
  `tags`                 varchar(255) DEFAULT NULL,
  `dietary_preferences`  SET('Gluten-Free','Dairy-Free','Nut-Free','Vegan') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products`
  (`product_id`,`restaurant_id`,`category_id`,`name`,`price`,`description`,`image_url`,
   `status`,`calories`,`cooking_time`,`is_ai_recommended`,`rating`,`tags`,`dietary_preferences`)
VALUES
-- ---- Dữ liệu gốc ----
(1,  1, 3, 'Cơm Tấm Sườn Nướng',        50000, 'Sườn nướng than hoa thơm lừng, ăn kèm mỡ hành.',
 'https://images.unsplash.com/photo-1555126634-323283e090fa',
 'Available', 650, 15, NULL, NULL, 'cơm tấm, sườn nướng, vietnamese', NULL),

(2,  1, 3, 'Cơm Tấm Đặc Biệt',          75000, 'Sườn dày, bì giòn, chả trứng, thêm quả trứng ốp la béo ngậy.',
 'https://images.unsplash.com/photo-1615486171448-4fbab8dfbf03',
 'Available', 850, 20, NULL, NULL, 'cơm tấm, đặc biệt, sườn bì chả', NULL),

(3,  2, 2, 'Trà Sữa Trân Châu',          35000, 'Trà sữa truyền thống ngọt thanh cùng trân châu dai dai.',
 'https://images.unsplash.com/photo-1558855567-1a488ee27e9f',
 'Available', 350,  5, NULL, NULL, 'trà sữa, trân châu, sweet', NULL),

(4,  2, 2, 'Trà Đào Cam Sả',             40000, 'Thức uống thanh mát giải nhiệt tuyệt vời cho mùa hè.',
 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
 'Available', 150,  5, NULL, NULL, 'trà đào, cam sả, fresh', 'Vegan,Dairy-Free,Gluten-Free,Nut-Free'),

(5,  3, 3, 'Ốc Hương Xào Bơ Tỏi',      120000, 'Ốc hương size to, ngập trong sốt bơ tỏi thơm lừng béo ngậy.',
 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
 'Available', 450, 25, NULL, NULL, 'ốc hương, bơ tỏi, seafood', 'Gluten-Free'),

(6,  3, 4, 'Khoai Tây Chiên Lắc Phô Mai', 35000, 'Khoai chiên giòn rụm, áo lớp phô mai mặn ngọt cực cuốn.',
 'https://images.unsplash.com/photo-1576107232684-1279f390859f',
 'Available', 500, 10, NULL, NULL, 'khoai tây chiên, phô mai, snack', 'Vegan'),

(7,  4, 6, 'Pizza Hải Sản Pesto',        150000, 'Tôm, mực tươi roi rói quyện cùng sốt pesto húng quế.',
 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
 'Available', 900, 20, NULL, NULL, 'pizza, hải sản, pesto', NULL),

(8,  4, 6, 'Pizza Pepperoni',            120000, 'Xúc xích bò cay nhẹ, ngập ngụa phô mai nướng vàng ươm.',
 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
 'Available', 1100, 18, NULL, NULL, 'pizza, pepperoni, cheese', NULL),

(9,  5, 7, 'Sashimi Cá Hồi',            180000, '5 lát cá hồi dày cộp, béo ngậy tan trong miệng.',
 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
 'Available', 300, 10, NULL, NULL, 'sashimi, cá hồi, japanese', 'Dairy-Free,Gluten-Free'),

(10, 5, 7, 'Cơm Cuộn Cali',              90000, 'Cơm cuộn bơ sáp, dưa leo giòn và thanh cua thượng hạng.',
 'https://images.unsplash.com/photo-1553621042-f6e147245754',
 'Available', 400, 15, NULL, NULL, 'sushi, cali, roll', 'Dairy-Free'),

(11, 6, 8, 'Salad Ức Gà Áp Chảo',        75000, 'Ức gà mềm mọng nước, rau xà lách giòn rụm kèm sốt mè rang.',
 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
 'Available', 350, 15, NULL, NULL, 'salad, ức gà, healthy', 'Dairy-Free,Gluten-Free'),

(12, 6, 2, 'Nước Ép Cần Tây Táo',        45000, 'Thức uống detox thanh lọc cơ thể, nạp năng lượng ngày mới.',
 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
 'Available', 120,  5, NULL, NULL, 'nước ép, detox, fresh', 'Vegan,Dairy-Free,Gluten-Free,Nut-Free'),

(13, 7, 9, 'Thịt Ba Chỉ Bò Mỹ',         150000, 'Ba chỉ bò Mỹ nướng than hoa mềm ngọt.',
 'https://images.unsplash.com/photo-1544025162-d76694265947',
 'Available', 800, 25, NULL, NULL, 'bbq, bò mỹ, nướng', 'Dairy-Free,Gluten-Free'),

(14, 7, 9, 'Dẻ Sườn Bò Sốt Mật Ong',   180000, 'Dẻ sườn tẩm ướp mật ong rừng đậm vị.',
 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
 'Available', 950, 30, NULL, NULL, 'bbq, dẻ sườn, mật ong', 'Dairy-Free,Gluten-Free'),

(15, 8, 10, 'Bánh Tiramisu Ý',            65000, 'Cốt bánh cà phê đắng nhẹ, kem béo ngậy.',
 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d',
 'Available', 450, 10, NULL, NULL, 'tiramisu, cake, dessert', NULL),

(16, 8, 10, 'Cheesecake Dâu Tây',         70000, 'Bánh phô mai dâu tây chua chua ngọt ngọt.',
 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
 'Available', 400, 10, NULL, NULL, 'cheesecake, strawberry, sweet', NULL),

(17, 1, 3, 'Cơm Tấm Sườn Chả',           60000, 'Cơm tấm sườn nướng kèm chả trứng hấp truyền thống.',
 'https://images.unsplash.com/photo-1635359489568-d0554c004d3c',
 'Available', 750, 18, NULL, NULL, 'cơm tấm, sườn chả, vietnamese', NULL),

(18, 2, 2, 'Hồng Trà Macchiato',          45000, 'Hồng trà đậm vị phủ lớp kem macchiato mặn béo.',
 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907',
 'Available', 250,  5, NULL, NULL, 'hồng trà, macchiato, drink', NULL),

(19, 1, 3, 'Bún Bò Huế',                  65000, 'Bún bò chuẩn vị Huế, nước dùng đậm đà thơm mùi sả ruốc.',
 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
 'Available', 600, 15, b'1', 4.8, 'bún bò, huế, noodle', 'Dairy-Free,Gluten-Free'),

(20, 2, 2, 'Trà Vải Nhiệt Đới',           45000, 'Trà lài kết hợp trái vải ngâm ngọt thanh, giải nhiệt tuyệt đỉnh.',
 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
 'Available', 180,  5, b'0', 4.6, 'trà vải, tropical, drink', 'Vegan,Dairy-Free,Gluten-Free,Nut-Free'),

(21, 4, 6, 'Mỳ Ý Sốt Bò Băm',           110000, 'Mỳ Ý sợi dai ngon quyện cùng sốt cà chua thịt bò băm (Bolognese).',
 'https://images.unsplash.com/photo-1621996311210-2a132eb6546c',
 'Available', 700, 20, b'1', 4.7, 'mỳ ý, pasta, bò băm', NULL),

(22, 5, 7, 'Sushi Lươn Nhật',            150000, 'Cơm cuộn lươn nướng sốt Teriyaki đậm đà.',
 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
 'Available', 450, 15, b'1', 4.9, 'sushi, lươn, unagi', 'Dairy-Free'),

(23, 6, 8, 'Salad Bơ Cá Hồi',            95000, 'Cá hồi áp chảo cùng bơ sáp béo ngậy, sốt dầu giấm balsamic.',
 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
 'Available', 380, 12, b'1', 4.8, 'salad, cá hồi, avocado', 'Dairy-Free,Gluten-Free'),

-- ---- Món Chay mới (category_id = 1) ----
(24, 1, 1, 'Cơm Chay Thập Cẩm',          45000,
 'Cơm trắng dẻo ăn kèm đậu hũ chiên vàng, nấm đông cô, rau củ xào nhẹ.',
 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
 'Available', 480, 15, b'0', 4.5, 'cơm chay, đậu hũ, vegan', 'Vegan,Dairy-Free,Gluten-Free'),

(25, 3, 1, 'Bún Chay Nấm Hương',          55000,
 'Bún tươi chan nước dùng nấm thơm ngọt, thêm đậu phụ chiên và rau sống.',
 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d',
 'Available', 400, 20, b'0', 4.4, 'bún chay, nấm hương, vegan', 'Vegan,Dairy-Free,Gluten-Free'),

(26, 6, 1, 'Salad Chay Quinoa & Rau Củ',  75000,
 'Hạt quinoa giàu đạm, rau củ hữu cơ tươi, sốt chanh dầu oliu thanh mát.',
 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
 'Available', 320, 10, b'1', 4.7, 'salad chay, quinoa, healthy', 'Vegan,Dairy-Free,Gluten-Free,Nut-Free'),

(27, 1, 1, 'Phở Chay Nấm Truffle',        80000,
 'Nước dùng hầm từ củ quả, thêm nấm truffle thơm lừng, bánh phở trắng mềm.',
 'https://images.unsplash.com/photo-1555126634-323283e090fa',
 'Available', 390, 20, b'1', 4.6, 'phở chay, nấm truffle, vegan', 'Vegan,Dairy-Free'),

-- ---- Tráng Miệng mới (category_id = 5) ----
(28, 2, 5, 'Chè Ba Màu Sài Gòn',          35000,
 'Đậu xanh, đậu đỏ, thạch pandan chan nước cốt dừa béo ngậy, đá bào mát lạnh.',
 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
 'Available', 380, 10, b'0', 4.6, 'chè, ba màu, dessert', 'Vegan,Dairy-Free,Gluten-Free'),

(29, 8, 5, 'Kem Matcha Đá Bào Nhật',       65000,
 'Đá bào mịn tưới syrup matcha đắng nhẹ, thêm viên mochi dai và đậu đỏ.',
 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
 'Available', 290,  5, b'1', 4.8, 'kem matcha, kakigori, dessert', 'Vegan,Dairy-Free,Gluten-Free'),

(30, 8, 5, 'Bánh Flan Caramel Mềm',        45000,
 'Flan hấp trứng sữa mịn như lụa, caramel đắng nhẹ tan chảy trên đầu lưỡi.',
 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d',
 'Available', 310, 30, b'0', 4.7, 'flan, caramel, dessert', NULL),

(31, 2, 5, 'Sương Sáo Nước Dừa',           30000,
 'Thạch sương sáo đen mát lạnh chan nước dừa tươi ngọt thanh, thêm trân châu.',
 'https://images.unsplash.com/photo-1558855567-1a488ee27e9f',
 'Available', 180,  5, b'0', 4.4, 'sương sáo, nước dừa, dessert', 'Vegan,Dairy-Free,Gluten-Free');

-- ============================================================
-- Bảng: recipes
-- ============================================================
CREATE TABLE `recipes` (
  `recipe_id`     bigint(20) NOT NULL,
  `product_id`    int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity`      float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `recipes` (`recipe_id`, `product_id`, `ingredient_id`, `quantity`) VALUES
-- Dữ liệu gốc
(1,  1,  1, 0.20),   -- Cơm Tấm Sườn Nướng: gạo tấm
(2,  1,  2, 0.15),   -- Cơm Tấm Sườn Nướng: sườn heo
(3,  3,  3, 50),     -- Trà Sữa Trân Châu: trà đen
(4,  3,  4, 30),     -- Trà Sữa Trân Châu: sữa đặc
(5,  3,  5, 0.10),   -- Trà Sữa Trân Châu: trân châu
(6,  5,  6, 0.30),   -- Ốc Hương: ốc hương
(7,  5,  7, 50),     -- Ốc Hương: sả
(8,  6,  8, 0.20),   -- Khoai Tây Chiên: khoai tây
(9,  8,  9, 0.20),   -- Pizza Pepperoni: bột mì
(10, 8, 10, 0.15),   -- Pizza Pepperoni: phô mai
(11, 9, 11, 0.20),   -- Sashimi Cá Hồi: cá hồi
(12, 10, 12, 10),    -- Cơm Cuộn Cali: rong biển
(13, 11, 13, 0.15),  -- Salad Ức Gà: xà lách
(14, 11, 14, 0.05),  -- Salad Ức Gà: cà chua bi
(15, 11, 15, 0.15),  -- Salad Ức Gà: ức gà
-- Recipes mới cho Món Chay
(16, 24, 16, 0.20),  -- Cơm Chay Thập Cẩm: đậu hũ non
(17, 24,  1, 0.20),  -- Cơm Chay Thập Cẩm: gạo tấm
(18, 24, 17, 30),    -- Cơm Chay Thập Cẩm: nấm đông cô
(19, 25, 18, 0.20),  -- Bún Chay Nấm Hương: bún tươi
(20, 25, 19, 20),    -- Bún Chay Nấm Hương: nấm hương khô
(21, 25, 16, 0.15),  -- Bún Chay Nấm Hương: đậu hũ
(22, 26, 20, 0.10),  -- Salad Chay Quinoa: hạt quinoa
(23, 26, 13, 0.15),  -- Salad Chay Quinoa: xà lách
(24, 26, 21, 20),    -- Salad Chay Quinoa: dầu oliu
(25, 27, 22, 10),    -- Phở Chay Nấm Truffle: nấm truffle
(26, 27, 23, 0.20),  -- Phở Chay Nấm Truffle: bánh phở
-- Recipes mới cho Tráng Miệng
(27, 28, 24, 0.10),  -- Chè Ba Màu: đậu xanh
(28, 28, 25, 0.10),  -- Chè Ba Màu: đậu đỏ
(29, 28, 26, 50),    -- Chè Ba Màu: nước cốt dừa
(30, 29, 27, 20),    -- Kem Matcha: bột matcha
(31, 29, 28, 0.05),  -- Kem Matcha: mochi
(32, 30, 29,  2),    -- Bánh Flan: trứng gà
(33, 30, 30, 100),   -- Bánh Flan: sữa tươi
(34, 31, 31, 0.15),  -- Sương Sáo: thạch sương sáo
(35, 31, 32, 150),   -- Sương Sáo: nước dừa tươi
(36, 31,  5, 0.05);  -- Sương Sáo: trân châu

-- ============================================================
-- Bảng: restaurants
-- ============================================================
CREATE TABLE `restaurants` (
  `restaurant_id` int(11) NOT NULL,
  `owner_id`      int(11) NOT NULL,
  `name`          varchar(100) NOT NULL,
  `address`       text NOT NULL,
  `phone`         varchar(15) NOT NULL,
  `description`   text DEFAULT NULL,
  `logo_url`      text DEFAULT NULL,
  `rating`        double DEFAULT NULL,
  `is_active`     tinyint(1) DEFAULT 1,
  `status`        varchar(20) DEFAULT 'Open',
  `created_at`    datetime DEFAULT current_timestamp(),
  `latitude`      double DEFAULT NULL,
  `longitude`     double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `restaurants` (`restaurant_id`,`owner_id`,`name`,`address`,`phone`,`description`,`logo_url`,`rating`,`is_active`,`status`,`created_at`,`latitude`,`longitude`) VALUES
(1, 3, 'Cơm Tấm Bụi Sài Gòn',    '123 Nguyễn Trãi, Q1, TP.HCM',          '0911222333', 'Cơm tấm sườn bì chả ngon nức tiếng, chuẩn vị miền Nam.',              NULL, 4.8, 1, 'Open', '2026-03-08 13:41:48', NULL, NULL),
(2, 4, 'Trà Sữa Feeling Tea',     '456 Lê Lợi, Q1, TP.HCM',               '0988777666', 'Đủ loại trà sữa trân châu, không gian chill thư giãn.',                NULL, 4.5, 1, 'Open', '2026-03-08 13:41:48', NULL, NULL),
(3, 3, 'Quán Ốc Đêm',             '789 Bùi Viện, Q1, TP.HCM',             '0933444555', 'Hải sản tươi sống, ốc các loại chế biến siêu ngon.',                  NULL, 4.2, 1, 'Open', '2026-03-08 13:41:48', NULL, NULL),
(4, 8, 'Pizza Phô Mai Ngập Tràn', '12 Thảo Điền, Q2, TP.HCM',             '0909090909', 'Pizza đế mỏng nướng củi, phô mai kéo sợi siêu ngon.',                 NULL, 4.6, 1, 'Open', '2026-03-08 13:43:02', NULL, NULL),
(5, 9, 'Sushi Hoa Anh Đào',       '34 Lê Thánh Tôn, Q1, TP.HCM',          '0808080808', 'Cá hồi tươi sống nhập khẩu mỗi ngày, không gian đậm chất Nhật.',     NULL, 4.9, 1, 'Open', '2026-03-08 13:43:02', NULL, NULL),
(6, 8, 'Salad Tươi Mát',          '56 Phan Xích Long, Phú Nhuận, TP.HCM', '0707070707', 'Rau củ hữu cơ chuẩn VietGAP, sốt tự làm healthy.',                    NULL, 4.3, 1, 'Open', '2026-03-08 13:43:02', NULL, NULL),
(7, 3, 'Gogi House BBQ',          '11 Sư Vạn Hạnh, Q10, TP.HCM',          '0901010101', 'Thịt nướng Hàn Quốc thượng hạng, nước sốt đậm đà.',                   NULL, 4.7, 1, 'Open', '2026-03-08 13:44:06', NULL, NULL),
(8, 4, 'Tiệm Bánh Của Mây',       '22 Nguyễn Huệ, Q1, TP.HCM',            '0902020202', 'Bánh kem tươi, tiramisu mềm mịn tan chảy.',                           NULL, 4.8, 1, 'Open', '2026-03-08 13:44:06', NULL, NULL);

-- ============================================================
-- Bảng: orders
-- ============================================================
CREATE TABLE `orders` (
  `order_id`        int(11) NOT NULL,
  `customer_id`     int(11) NOT NULL,
  `restaurant_id`   int(11) NOT NULL,
  `voucher_id`      int(11) DEFAULT NULL,
  `total_amount`    double NOT NULL,
  `payment_method`  varchar(50) NOT NULL,
  `payment_status`  varchar(20) DEFAULT 'Unpaid',
  `status`          varchar(20) DEFAULT 'Pending',
  `delivery_address` text NOT NULL,
  `created_at`      datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` (`order_id`,`customer_id`,`restaurant_id`,`voucher_id`,`total_amount`,`payment_method`,`payment_status`,`status`,`delivery_address`,`created_at`) VALUES
(1,  5,  1, 1,    40000, 'CASH',        'Unpaid', 'Pending',    '101 Nguyễn Đình Chiểu, Q3, TP.HCM',        '2026-03-08 13:41:48'),
(2,  6,  2, NULL, 75000, 'MOMO',        'Paid',   'Completed',  '202 Pasteur, Q3, TP.HCM',                  '2026-03-08 13:41:48'),
(3,  7,  3, 3,   124000, 'CREDIT_CARD', 'Paid',   'Processing', '303 Võ Văn Tần, Q3, TP.HCM',               '2026-03-08 13:41:48'),
(4, 10,  4, NULL,150000, 'CASH',        'Unpaid', 'Pending',    '111 Lý Tự Trọng, Q1, TP.HCM',              '2026-03-08 13:43:02'),
(5, 11,  5, 1,   170000, 'CREDIT_CARD', 'Paid',   'Completed',  '222 Lê Thánh Tôn, Q1, TP.HCM',             '2026-03-08 13:43:02'),
(6, 12,  6, 2,    60000, 'MOMO',        'Paid',   'Delivered',  '333 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',  '2026-03-08 13:43:02'),
(7,  2,  4, NULL,270000, 'CASH',        'Paid',   'Completed',  '444 Nguyễn Thị Minh Khai, Q3, TP.HCM',     '2026-03-08 13:43:02'),
(8,  6,  5, 3,   216000, 'ZALOPAY',     'Paid',   'Processing', '555 Trần Hưng Đạo, Q5, TP.HCM',            '2026-03-08 13:43:02'),
(9, 13,  7, 1,   320000, 'CREDIT_CARD', 'Paid',   'Completed',  '12A Lê Lợi, Q1, TP.HCM',                  '2026-03-08 13:44:06'),
(10,14,  8, NULL,135000, 'MOMO',        'Paid',   'Completed',  '34B Nguyễn Huệ, Q1, TP.HCM',               '2026-03-08 13:44:06'),
(11,15,  1, NULL, 60000, 'CASH',        'Unpaid', 'Pending',    '56C Pasteur, Q3, TP.HCM',                  '2026-03-08 13:44:06'),
(12,16,  2, 2,    30000, 'ZALOPAY',     'Paid',   'Delivered',  '78D CMT8, Q10, TP.HCM',                    '2026-03-08 13:44:06'),
(13,17,  7, NULL,330000, 'CASH',        'Paid',   'Completed',  '90E Sư Vạn Hạnh, Q10, TP.HCM',             '2026-03-08 13:44:06'),
(14,13,  8, 3,   112000, 'CREDIT_CARD', 'Paid',   'Completed',  '12A Lê Lợi, Q1, TP.HCM',                  '2026-03-08 13:44:06'),
(15, 5,  1, NULL,110000, 'MOMO',        'Paid',   'Processing', '101 Nguyễn Đình Chiểu, Q3, TP.HCM',        '2026-03-08 13:44:06'),
(16, 6,  4, 1,   260000, 'CREDIT_CARD', 'Paid',   'Completed',  '202 Pasteur, Q3, TP.HCM',                  '2026-03-08 13:44:06'),
(17, 7,  5, NULL,270000, 'CASH',        'Unpaid', 'Pending',    '303 Võ Văn Tần, Q3, TP.HCM',               '2026-03-08 13:44:06'),
(18,10,  6, NULL,120000, 'ZALOPAY',     'Paid',   'Completed',  '111 Lý Tự Trọng, Q1, TP.HCM',              '2026-03-08 13:44:06'),
(19,11,  7, 2,   165000, 'CASH',        'Paid',   'Completed',  '222 Lê Thánh Tôn, Q1, TP.HCM',             '2026-03-08 13:44:06'),
(20,12,  8, NULL, 65000, 'MOMO',        'Paid',   'Delivered',  '333 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',  '2026-03-08 13:44:06');

-- ============================================================
-- Bảng: orderdetails
-- ============================================================
CREATE TABLE `orderdetails` (
  `detail_id`          bigint(20) NOT NULL,
  `order_id`           int(11) NOT NULL,
  `product_id`         int(11) NOT NULL,
  `quantity`           int(11) NOT NULL,
  `price_at_purchase`  double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orderdetails` (`detail_id`,`order_id`,`product_id`,`quantity`,`price_at_purchase`) VALUES
(1,  1,  1, 1, 50000),
(2,  2,  3, 1, 35000),
(3,  2,  4, 1, 40000),
(4,  3,  5, 1,120000),
(5,  3,  6, 1, 35000),
(6,  4,  7, 1,150000),
(7,  5,  9, 1,180000),
(8,  6, 11, 1, 75000),
(9,  7,  7, 1,150000),
(10, 7,  8, 1,120000),
(11, 8,  9, 1,180000),
(12, 8, 10, 1, 90000),
(13, 9, 13, 1,150000),
(14, 9, 14, 1,180000),
(15,10, 15, 1, 65000),
(16,10, 16, 1, 70000),
(17,11, 17, 1, 60000),
(18,12, 18, 1, 45000),
(19,13, 13, 1,150000),
(20,13, 14, 1,180000),
(21,14, 15, 2, 65000),
(22,15,  1, 1, 50000),
(23,15, 17, 1, 60000),
(24,16,  7, 1,150000),
(25,16,  8, 1,120000),
(26,17,  9, 1,180000),
(27,17, 10, 1, 90000),
(28,18, 11, 1, 75000),
(29,18, 12, 1, 45000),
(30,19, 14, 1,180000),
(31,20, 15, 1, 65000);

-- ============================================================
-- Bảng: users
-- ============================================================
CREATE TABLE `users` (
  `user_id`       int(11) NOT NULL,
  `full_name`     varchar(100) NOT NULL,
  `username`      varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email`         varchar(100) NOT NULL,
  `phone`         varchar(15) DEFAULT NULL,
  `avatar_url`    text DEFAULT NULL,
  `dob`           date DEFAULT NULL,
  `role`          varchar(20) DEFAULT NULL,
  `streak`        int(11) DEFAULT 0,
  `status`        varchar(20) DEFAULT 'Active',
  `created_at`    datetime DEFAULT current_timestamp(),
  `updated_at`    datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `auth_provider` enum('facebook','google','local') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`user_id`,`full_name`,`username`,`password_hash`,`email`,`phone`,`avatar_url`,`dob`,`role`,`streak`,`status`,`created_at`,`updated_at`,`auth_provider`) VALUES
(1,  'Admin CO-CHE',      'admin',      'hashed_password_here', 'admin@coche.com',      NULL,           NULL, NULL, 'ADMIN',    0, 'Active', '2026-02-21 16:59:26', '2026-02-21 16:59:26', NULL),
(2,  'Nguyen Anh Duong',  'duongna',    'hashed_password_here', 'duongna@coche.com',    NULL,           NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-02-21 16:59:26', '2026-02-21 16:59:26', NULL),
(3,  'Trần Văn Chủ',      'chutran',    'hashed_pw_owner1',     'chutran@coche.com',    '0901111111',   NULL, NULL, 'OWNER',    0, 'Active', '2026-03-08 13:41:48', '2026-03-08 13:41:48', NULL),
(4,  'Lê Thị Bếp',        'beple',      'hashed_pw_owner2',     'beple@coche.com',      '0902222222',   NULL, NULL, 'OWNER',    0, 'Active', '2026-03-08 13:41:48', '2026-03-08 13:41:48', NULL),
(5,  'Phạm Quốc Khách',   'khachpham',  'hashed_pw_cus1',       'khachpham@gmail.com',  '0903333333',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:41:48', '2026-03-08 13:41:48', NULL),
(6,  'Hoàng Mai',          'maihoang',   'hashed_pw_cus2',       'maihoang@gmail.com',   '0904444444',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:41:48', '2026-03-08 13:41:48', NULL),
(7,  'Ngô Tất Tố',         'tatto',      'hashed_pw_cus3',       'tatto@gmail.com',      '0905555555',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:41:48', '2026-03-08 13:41:48', NULL),
(8,  'Lý Phô Mai',         'phomaily',   'hashed_pw_owner3',     'phomai@coche.com',     '0912121212',   NULL, NULL, 'OWNER',    0, 'Active', '2026-03-08 13:43:01', '2026-03-08 13:43:01', NULL),
(9,  'Trịnh Sushi',        'sushitrinh', 'hashed_pw_owner4',     'sushi@coche.com',      '0934343434',   NULL, NULL, 'OWNER',    0, 'Active', '2026-03-08 13:43:01', '2026-03-08 13:43:01', NULL),
(10, 'Đinh Mập',           'mapdinh',    'hashed_pw_cus4',       'map@gmail.com',        '0956565656',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:43:01', '2026-03-08 13:43:01', NULL),
(11, 'Vũ Gầy',             'gayvu',      'hashed_pw_cus5',       'gay@gmail.com',        '0978787878',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:43:01', '2026-03-08 13:43:01', NULL),
(12, 'Bùi Thon',           'thonbui',    'hashed_pw_cus6',       'thon@gmail.com',       '0990909090',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:43:01', '2026-03-08 13:43:01', NULL),
(13, 'Đào Thị Mận',        'mandao',     'hashed_pw_cus7',       'man@gmail.com',        '0911112222',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:44:06', '2026-03-08 13:44:06', NULL),
(14, 'Lê Trọng Tấn',       'tanle',      'hashed_pw_cus8',       'tan@gmail.com',        '0933334444',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:44:06', '2026-03-08 13:44:06', NULL),
(15, 'Hồ Ngọc Hà',         'haho',       'hashed_pw_cus9',       'ha@gmail.com',         '0955556666',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:44:06', '2026-03-08 13:44:06', NULL),
(16, 'Cao Thái Sơn',       'soncao',     'hashed_pw_cus10',      'son@gmail.com',        '0977778888',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:44:06', '2026-03-08 13:44:06', NULL),
(17, 'Bùi Anh Tuấn',       'tuanbui',    'hashed_pw_cus11',      'tuan@gmail.com',       '0999990000',   NULL, NULL, 'CUSTOMER', 0, 'Active', '2026-03-08 13:44:06', '2026-03-08 13:44:06', NULL);

-- ============================================================
-- Bảng: vouchers
-- ============================================================
CREATE TABLE `vouchers` (
  `voucher_id`    int(11) NOT NULL,
  `code`          varchar(20) NOT NULL,
  `discount_value` double NOT NULL,
  `type`          varchar(20) NOT NULL,
  `min_order_val` double DEFAULT NULL,
  `valid_from`    datetime NOT NULL,
  `valid_to`      datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `vouchers` (`voucher_id`,`code`,`discount_value`,`type`,`min_order_val`,`valid_from`,`valid_to`) VALUES
(1, 'WELCOME10', 10000, 'FIXED',    50000, '2025-01-01 00:00:00', '2026-12-31 23:59:59'),
(2, 'FREESHIP',  15000, 'FIXED',   100000, '2025-01-01 00:00:00', '2026-12-31 23:59:59'),
(3, 'SALE20',       20, 'PERCENT', 150000, '2025-01-01 00:00:00', '2026-12-31 23:59:59');

-- ============================================================
-- Bảng: reviews
-- ============================================================
CREATE TABLE `reviews` (
  `review_id`   bigint(20) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `product_id`  int(11) DEFAULT NULL,
  `rating`      int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment`     text DEFAULT NULL,
  `created_at`  datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reviews` (`review_id`,`customer_id`,`restaurant_id`,`product_id`,`rating`,`comment`,`created_at`) VALUES
(1,  5,  1,  1, 5, 'Sườn nướng rất vừa miệng, cơm tơi xốp, giá hợp lý!',                                  '2026-03-08 13:41:48'),
(2,  6,  2,  3, 4, 'Trà sữa ngon nhưng hơi ngọt so với khẩu vị của mình, trân châu dai ngon.',             '2026-03-08 13:41:48'),
(3,  7,  3,  5, 5, 'Ốc siêu tươi, sốt bơ tỏi xuất sắc, chấm bánh mì cực kì cuốn!',                       '2026-03-08 13:41:48'),
(4, 11,  5,  9, 5, 'Cá hồi tươi rói, cắt lát dày dặn ăn cực kì đã miệng. Sẽ quay lại!',                  '2026-03-08 13:43:02'),
(5, 12,  6, 11, 4, 'Salad ngon, ức gà không bị khô nhưng sốt hơi ít một xíu.',                             '2026-03-08 13:43:02'),
(6,  2,  4,  7, 5, 'Đế pizza mỏng giòn, hải sản tươi, phô mai ngập tràn siêu thích.',                     '2026-03-08 13:43:02'),
(7, 13,  7, 13, 5, 'Thịt bò Mỹ nướng lên thơm xỉu, sốt chấm ngon tuyệt cú mèo!',                         '2026-03-08 13:44:06'),
(8, 14,  8, 15, 5, 'Tiramisu chuẩn vị Ý, không bị quá ngọt, kem mascarpone xịn sò.',                      '2026-03-08 13:44:06'),
(9, 15,  1, 17, 4, 'Cơm tấm ngon, chả trứng bùi bùi nhưng không gian quán hơi nóng.',                     '2026-03-08 13:44:06'),
(10,16,  2, 18, 5, 'Hồng trà macchiato béo ngậy, uống một ngụm là tỉnh cả người.',                         '2026-03-08 13:44:06'),
(11,17,  7, 14, 4, 'Dẻ sườn mềm ngon, nhưng quán đông quá đợi lên món hơi lâu.',                          '2026-03-08 13:44:06'),
(12,13,  8, 16, 5, 'Cheesecake dâu tây mềm mịn, chua ngọt hài hòa, must try nha!',                        '2026-03-08 13:44:06'),
(13, 5,  1,  1, 4, 'Sườn vẫn ngon như mọi khi, mong quán mở rộng thêm chi nhánh.',                        '2026-03-08 13:44:06'),
(14, 6,  4,  8, 5, 'Pizza viền phô mai xịn, nhân nhiều, shipper giao hàng nhanh.',                         '2026-03-08 13:44:06'),
-- Reviews mới cho sản phẩm mới
(15, 2,  1, 24, 5, 'Cơm chay mà ăn no căng, đậu hũ chiên vàng ươm, nấm thơm lừng. Tuyệt!',               '2026-03-09 10:00:00'),
(16,10,  3, 25, 4, 'Bún chay thanh mát, nước dùng nấm ngọt tự nhiên, mình sẽ order thêm.',                '2026-03-09 11:00:00'),
(17,11,  6, 26, 5, 'Salad quinoa lạ miệng, ăn no mà không nặng bụng, hợp cho dân ăn clean.',              '2026-03-09 12:00:00'),
(18,12,  1, 27, 5, 'Phở chay nấm truffle sang chảnh, nước dùng ngọt thanh, giá hơi cao nhưng xứng đáng.','2026-03-09 13:00:00'),
(19, 5,  2, 28, 5, 'Chè ba màu chuẩn vị Sài Gòn, nước cốt dừa béo ngậy, đá bào mát lịm.',               '2026-03-09 14:00:00'),
(20,14,  8, 29, 5, 'Kem matcha đá bào đẹp mắt, mochi dai dai, vị matcha Nhật đậm đà. Love it!',           '2026-03-09 15:00:00'),
(21,16,  8, 30, 4, 'Bánh flan mịn mà, caramel không bị đắng gắt, nhưng ước gì phần lớn hơn một chút.',   '2026-03-09 16:00:00'),
(22, 7,  2, 31, 4, 'Sương sáo nước dừa giải nhiệt cực đỉnh, giá rẻ, uống mấy ly cũng được.',             '2026-03-09 17:00:00');

-- ============================================================
-- Bảng: wishlists
-- ============================================================
CREATE TABLE `wishlists` (
  `wishlist_id` bigint(20) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id`  int(11) NOT NULL,
  `added_at`    datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `wishlists` (`wishlist_id`,`customer_id`,`product_id`,`added_at`) VALUES
(1,  5,  2, '2026-03-08 13:41:48'),
(2,  6,  5, '2026-03-08 13:41:48'),
(3,  7,  4, '2026-03-08 13:41:48'),
(4,  2,  1, '2026-03-08 13:41:48'),
(5, 10,  8, '2026-03-08 13:43:02'),
(6, 11, 10, '2026-03-08 13:43:02'),
(7, 12, 12, '2026-03-08 13:43:02'),
(8,  2,  9, '2026-03-08 13:43:02'),
(9, 13, 14, '2026-03-08 13:44:06'),
(10,14, 16, '2026-03-08 13:44:06'),
(11,15, 17, '2026-03-08 13:44:06'),
(12,16, 18, '2026-03-08 13:44:06'),
(13,17, 13, '2026-03-08 13:44:06'),
(14, 5, 15, '2026-03-08 13:44:06'),
-- Wishlists mới cho sản phẩm mới
(15, 2, 26, '2026-03-09 10:00:00'),
(16, 7, 28, '2026-03-09 10:00:00'),
(17,10, 29, '2026-03-09 10:00:00'),
(18,11, 24, '2026-03-09 10:00:00'),
(19,12, 27, '2026-03-09 10:00:00'),
(20,16, 30, '2026-03-09 10:00:00');

-- ============================================================
-- Bảng: verificationtokens (cấu trúc, không có data)
-- ============================================================
CREATE TABLE `verificationtokens` (
  `token_id`     bigint(20) NOT NULL,
  `user_id`      int(11) NOT NULL,
  `token_string` varchar(255) NOT NULL,
  `type`         varchar(50) NOT NULL,
  `expires_at`   datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- PRIMARY KEYS & INDEXES
-- ============================================================
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`);

ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `voucher_id` (`voucher_id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD KEY `owner_id` (`owner_id`);

ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `verificationtokens`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucher_id`),
  ADD UNIQUE KEY `code` (`code`);

ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

-- ============================================================
-- AUTO_INCREMENT
-- ============================================================
ALTER TABLE `bookings`           MODIFY `booking_id`  bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE `categories`         MODIFY `category_id` int(11)    NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE `ingredients`        MODIFY `ingredient_id` int(11)  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
ALTER TABLE `orderdetails`       MODIFY `detail_id`   bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
ALTER TABLE `orders`             MODIFY `order_id`    int(11)    NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
ALTER TABLE `products`           MODIFY `product_id`  int(11)    NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
ALTER TABLE `recipes`            MODIFY `recipe_id`   bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
ALTER TABLE `restaurants`        MODIFY `restaurant_id` int(11)  NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `reviews`            MODIFY `review_id`   bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
ALTER TABLE `users`              MODIFY `user_id`     int(11)    NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
ALTER TABLE `verificationtokens` MODIFY `token_id`    bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `vouchers`           MODIFY `voucher_id`  int(11)    NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `wishlists`          MODIFY `wishlist_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

-- ============================================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================================
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`)   REFERENCES `users`       (`user_id`)       ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE;

ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`)   REFERENCES `orders`   (`order_id`)   ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`)   REFERENCES `users`       (`user_id`)       ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`voucher_id`)    REFERENCES `vouchers`    (`voucher_id`)    ON DELETE SET NULL;

ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`)   REFERENCES `categories`  (`category_id`)   ON DELETE SET NULL;

ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`product_id`)    REFERENCES `products`    (`product_id`)    ON DELETE CASCADE,
  ADD CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE;

ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`)   REFERENCES `users`       (`user_id`)       ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`product_id`)    REFERENCES `products`    (`product_id`)    ON DELETE CASCADE;

ALTER TABLE `verificationtokens`
  ADD CONSTRAINT `verificationtokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users`    (`user_id`)    ON DELETE CASCADE,
  ADD CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product_id`)  REFERENCES `products` (`product_id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
