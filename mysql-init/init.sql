-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food_fare_room`
--

DROP TABLE IF EXISTS `food_fare_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_fare_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime NOT NULL,
  `min_member` int NOT NULL DEFAULT '1',
  `creator_user_id` int DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_451348b231c32b644e1ee8a56de` (`creator_user_id`),
  KEY `FK_ed88e25d980668ac78c28864c41` (`restaurant_id`),
  CONSTRAINT `FK_451348b231c32b644e1ee8a56de` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ed88e25d980668ac78c28864c41` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_fare_room`
--

LOCK TABLES `food_fare_room` WRITE;
/*!40000 ALTER TABLE `food_fare_room` DISABLE KEYS */;
INSERT INTO `food_fare_room` VALUES (1,'2025-07-20 12:00:00',2,1,1),(2,'2025-07-21 18:30:00',3,2,2),(5,'2025-07-20 20:00:00',2,1,1);
/*!40000 ALTER TABLE `food_fare_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_item`
--

DROP TABLE IF EXISTS `food_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_42bb5b9769d4db96f96cf31525f` (`restaurant_id`),
  CONSTRAINT `FK_42bb5b9769d4db96f96cf31525f` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_item`
--

LOCK TABLES `food_item` WRITE;
/*!40000 ALTER TABLE `food_item` DISABLE KEYS */;
INSERT INTO `food_item` VALUES (1,'김치찌개',9000,'https://example.com/kimchi.jpg',1),(2,'떡볶이',5000,'https://example.com/tteokbokki.jpg',2);
/*!40000 ALTER TABLE `food_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_join_user`
--

DROP TABLE IF EXISTS `food_join_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_join_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_confirmation` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `food_fare_room_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8880090537ad1ab3d3c100d4f1d` (`user_id`),
  KEY `FK_e59d44dc4cb982229958b32e7bb` (`food_fare_room_id`),
  CONSTRAINT `FK_8880090537ad1ab3d3c100d4f1d` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e59d44dc4cb982229958b32e7bb` FOREIGN KEY (`food_fare_room_id`) REFERENCES `food_fare_room` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_join_user`
--

LOCK TABLES `food_join_user` WRITE;
/*!40000 ALTER TABLE `food_join_user` DISABLE KEYS */;
INSERT INTO `food_join_user` VALUES (1,0,1,1),(2,1,2,2);
/*!40000 ALTER TABLE `food_join_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_order`
--

DROP TABLE IF EXISTS `food_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL DEFAULT '1',
  `food_item_id` int DEFAULT NULL,
  `food_join_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f475d07290ba4e571593d4f70dd` (`food_item_id`),
  KEY `FK_b18d78aa611d2cdf56c787d8fbb` (`food_join_user_id`),
  CONSTRAINT `FK_b18d78aa611d2cdf56c787d8fbb` FOREIGN KEY (`food_join_user_id`) REFERENCES `food_join_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f475d07290ba4e571593d4f70dd` FOREIGN KEY (`food_item_id`) REFERENCES `food_item` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_order`
--

LOCK TABLES `food_order` WRITE;
/*!40000 ALTER TABLE `food_order` DISABLE KEYS */;
INSERT INTO `food_order` VALUES (1,2,1,1),(2,1,2,2);
/*!40000 ALTER TABLE `food_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_result`
--

DROP TABLE IF EXISTS `food_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `progress` int NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `food_fare_room_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_39f890ac30fb2f9b515e8d5063c` (`food_fare_room_id`),
  CONSTRAINT `FK_39f890ac30fb2f9b515e8d5063c` FOREIGN KEY (`food_fare_room_id`) REFERENCES `food_fare_room` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_result`
--

LOCK TABLES `food_result` WRITE;
/*!40000 ALTER TABLE `food_result` DISABLE KEYS */;
INSERT INTO `food_result` VALUES (1,1,'절반 도착',1),(2,2,'완료됨',2),(3,0,'모집 중',1);
/*!40000 ALTER TABLE `food_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_hours` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_fee` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'맛있는식당','서울특별시 강남구','010-1234-5678','10:00-22:00',3000,'https://example.com/image1.jpg'),(2,'행복한분식','서울특별시 종로구','010-9876-5432','09:00-21:00',2000,'https://example.com/image2.jpg');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_number` int NOT NULL DEFAULT '0',
  `total_discount` int NOT NULL DEFAULT '0',
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1@example.com','홍길동',12345678,1000,'2025-07-01 10:05:00.000000'),(2,'test2@example.com','이몽룡',87654321,2000,'2025-07-02 09:00:00.000000');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-19 19:19:30
