-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: sunapee.cs.dartmouth.edu    Database: KitchenNightmares_sp20
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.22-MariaDB

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
-- Table structure for table `Foods`
--

DROP TABLE IF EXISTS `Foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Foods` (
  `FoodID` int(11) NOT NULL AUTO_INCREMENT,
  `FoodName` varchar(45) DEFAULT NULL,
  `FoodPrice` double DEFAULT NULL,
  `RestaurantID` int(11) DEFAULT NULL,
  `OnMenu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`FoodID`),
  KEY `fk_Foods_Restaurants1` (`RestaurantID`),
  CONSTRAINT `fk_Foods_Restaurants1` FOREIGN KEY (`RestaurantID`) REFERENCES `Restaurants` (`RestaurantID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Foods`
--

LOCK TABLES `Foods` WRITE;
/*!40000 ALTER TABLE `Foods` DISABLE KEYS */;
INSERT INTO `Foods` VALUES (1,'Hop Fries',3.5,1,0),(2,'Hop Burger',8,1,1),(3,'Bob Marley',10,1,1),(5,'Overpriced Fruit Cup',6.5,1,1),(6,'Foco Breakfast',5.25,2,1),(7,'Foco Lunch',7.75,2,1),(8,'Foco Dinner',10,2,1),(9,'badfood',10,2,0),(10,'Tuna Melt',8.45,1,1),(11,'Cookie',2.5,1,0),(12,'Chocolate Chip Cookie',2.5,1,0),(13,'Mozzarella Sticks',5.5,1,1),(14,'Grilled Cheese',6.5,1,1),(15,'Soda',1.5,1,1),(16,'Tea',1,1,1),(17,'Sweet Potato Fries',4,1,1),(18,'Patty Melt',6,1,0),(19,'Stir Fry',8.5,3,1),(20,'Omelette',7,3,1),(21,'Soup',5.5,3,1),(22,'Smoothie',5.5,3,1),(23,'Salad',6.75,3,1),(24,'Sushi',12,3,1),(25,'Choffee',3.75,4,1),(26,'Iced Tea',1.75,4,1),(27,'Iced Coffee',2,4,1),(28,'Chocolate Crossaint',5,4,1),(29,'Apple',1,4,1),(30,'Tofu Salad',7.75,4,1),(31,'Caesar Salad',7.75,4,1),(32,'Chai Latte',3.5,4,1),(33,'Cappuccino',3.5,4,1),(34,'Pink Drink',3,5,1),(35,'Iced Coffee',3.5,5,1),(36,'Fruit',1.5,5,1),(37,'Soup',4.5,5,1),(38,'Cookie',3.5,5,1),(39,'Cake',5.5,5,1),(40,'Panini',7.75,5,1),(41,'Crackers',5.5,5,1),(42,'Chips',5.5,5,1),(43,'Soda',2,5,1),(44,'Water',1.5,5,1),(45,'Spinach Dip',10,7,1),(46,'Burger',15,7,1),(47,'Truffle Fries',9,7,1),(48,'Nachos',13,7,1),(49,'Tomato Rigatoni',11,7,1),(50,'Chicken Carbonara',16,7,1),(51,'Pepperoni Pizza',14,7,1),(52,'Carrot Cake',8,7,1),(53,'Milkshakes',7,7,1),(54,'Spring Rolls',6.5,6,1),(55,'Veggie Dumpling',7.5,6,1),(56,'Chicken Satay',7.5,6,1),(57,'Tom Yum',5.45,6,1),(58,'Larb',11.45,6,1),(59,'Cashew Delight',12.45,6,1),(60,'Red Curry',13.45,6,1),(61,'Green Curry',13.45,6,1),(62,'Basil Fried Rice',12.45,6,1),(63,'Pad Thai',12.45,6,1),(64,'Pad See Ew',12.45,6,1),(65,'Mango Sticky Rice',7.5,6,1),(66,'Hanover Inn Burger',17,8,1),(67,'Chicken Sandwich',13,8,1),(68,'BLT',13,8,1),(69,'Short Rib Tacos',17,8,1),(70,'Cookies',9,8,1),(71,'Chicken Pot Pie',15,8,1),(72,'Yogurt Parfait',10,8,1),(73,'French Toast',15,8,1),(74,'Vegetarian Omelet',17,8,1),(75,'Buttermilk Pancakes',14,8,1),(76,'Egg Roll',2.25,9,1),(77,'Scallion Pancakes',5.95,9,1),(78,'Wonton Soup',4.95,9,1),(79,'Pork Eggplant',11.95,9,1),(80,'String Bean',10.5,9,1),(81,'Kungpao Chicken',11.95,9,1),(82,'Fried Rice',8.95,9,1),(83,'Lo Mein',9,9,1),(84,'General Tso\'s Chicken',14,9,1),(85,'California Roll',5.5,9,1),(86,'Roasted Pork Bun',4.95,9,1),(87,'Egg and Tomato',9.95,9,1),(88,'MeatZZa',12,10,1),(89,'Cheese',10,10,1),(90,'Vegetable',10,10,1),(91,'Deluxe',14,10,1),(92,'Chicken Wing',9,10,1),(93,'Carbonara',11,10,1),(94,'Bread Twist',7.5,10,1),(95,'Cheese Bread',7.5,10,1),(96,'Lava Cake',5.5,10,1),(97,'Cinnamon Bread',5.5,10,1),(98,'Chicken Queso',7.75,1,1);
/*!40000 ALTER TABLE `Foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurants`
--

DROP TABLE IF EXISTS `Restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restaurants` (
  `RestaurantID` int(11) NOT NULL AUTO_INCREMENT,
  `RestaurantName` varchar(45) DEFAULT NULL,
  `OwnerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`RestaurantID`),
  KEY `fk_Restaurants_Users` (`OwnerID`),
  CONSTRAINT `fk_Restaurants_Users` FOREIGN KEY (`OwnerID`) REFERENCES `Users` (`UserID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurants`
--

LOCK TABLES `Restaurants` WRITE;
/*!40000 ALTER TABLE `Restaurants` DISABLE KEYS */;
INSERT INTO `Restaurants` VALUES (1,'Courtyard Cafe',2),(2,'Foco',3),(3,'Collis Cafe',2),(4,'KAF',2),(5,'Novack Cafe',2),(6,'Tuk Tuk',6),(7,'Mollys',7),(8,'Pine',8),(9,'Han Fusion',9),(10,'Dominos',10);
/*!40000 ALTER TABLE `Restaurants` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`KitchenNightmares_sp20`@`%`*/ /*!50003 TRIGGER `KitchenNightmares_sp20`.`Restaurants_BEFORE_DELETE` BEFORE DELETE ON `Restaurants` FOR EACH ROW
BEGIN
	update `KitchenNightmares_sp20`.Foods set OnMenu = false
	where RestaurantID = `KitchenNightmares_sp20`.`Restaurants_BEFORE_DELETE`.RestaurantID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `TransactionID` int(11) NOT NULL AUTO_INCREMENT,
  `TransactionDate` date DEFAULT NULL,
  `TransactionCategory` varchar(45) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FoodID` int(11) DEFAULT NULL,
  `TransactionPrice` double DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `fk_Meals_Users1` (`UserID`),
  KEY `fk_Meals_Foods1` (`FoodID`),
  CONSTRAINT `fk_Meals_Foods1` FOREIGN KEY (`FoodID`) REFERENCES `Foods` (`FoodID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meals_Users1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `MealCategory` CHECK (`TransactionCategory` = 'Breakfast' or `TransactionCategory` = 'Lunch' or `TransactionCategory` = 'Dinner' or `TransactionCategory` = 'Late Night')
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES (6,'2020-05-24','Dinner',1,3,10),(7,'2020-05-24','Lunch',1,7,7.75),(8,'2020-05-24','Lunch',2,7,7.75),(9,'2020-05-24','Dinner',2,8,10),(10,'2020-05-24','Late Night',1,9,10),(11,'2015-11-16','Late Night',1,7,7.75),(14,'2019-01-01','Breakfast',1,5,6.5),(16,'2020-05-27','Lunch',4,3,10),(18,'2020-05-27','Breakfast',5,13,5),(19,'2020-05-26','Lunch',5,14,6.5),(20,'2020-05-26','Dinner',5,5,6.5),(22,'2020-05-18','Dinner',4,17,4.5),(23,'2020-05-25','Lunch',4,64,12.45),(24,'2020-05-25','Dinner',4,21,5.5),(25,'2020-05-20','Dinner',4,8,10),(26,'2020-05-26','Dinner',4,2,8.5),(27,'2020-05-18','Dinner',4,2,8.5),(28,'2020-05-12','Dinner',4,2,8.5),(29,'2020-05-13','Dinner',4,2,8.5),(30,'2020-05-14','Dinner',4,2,8.5),(31,'2020-05-11','Dinner',4,59,12.45),(32,'2020-05-12','Dinner',4,59,12.45),(33,'2020-05-15','Dinner',4,59,12.45),(34,'2020-05-04','Breakfast',4,6,5.25),(35,'2020-05-05','Breakfast',4,5,6.5),(36,'2020-05-28','Dinner',4,46,15),(38,'2020-05-12','Lunch',4,68,13),(39,'2020-05-28','Lunch',4,29,1);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`KitchenNightmares_sp20`@`%`*/ /*!50003 TRIGGER `KitchenNightmares_sp20`.`Transactions_BEFORE_INSERT` BEFORE INSERT ON `Transactions` FOR EACH ROW
BEGIN
    set new.TransactionPrice = (select FoodPrice
							from Foods f
							where f.FoodID = new.FoodID);
	update Users set TotalExpenditures = TotalExpenditures + (select FoodPrice
							from Foods f
							where f.FoodID = new.FoodID)
	where UserID = new.UserID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`KitchenNightmares_sp20`@`%`*/ /*!50003 TRIGGER `KitchenNightmares_sp20`.`Transactions_BEFORE_UPDATE` BEFORE UPDATE ON `Transactions` FOR EACH ROW
BEGIN
    set new.TransactionPrice = (select FoodPrice
							from Foods f
							where f.FoodID = new.FoodID);
	update Users set TotalExpenditures = TotalExpenditures - (select FoodPrice
							from Foods f
							where f.FoodID = old.FoodID) + (select FoodPrice
							from Foods f
							where f.FoodID = new.FoodID)
	where UserID = new.UserID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`KitchenNightmares_sp20`@`%`*/ /*!50003 TRIGGER `KitchenNightmares_sp20`.`Transactions_BEFORE_DELETE` BEFORE DELETE ON `Transactions` FOR EACH ROW
BEGIN
	update Users set TotalExpenditures = TotalExpenditures - (select FoodPrice
							from Foods f
							where f.FoodID = old.FoodID)
	where UserID = old.UserID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `MiddleInitial` varchar(1) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `HashedPassword` varchar(100) NOT NULL,
  `TotalExpenditures` double DEFAULT NULL,
  `Username` varchar(45) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'test','T','tester','$2b$10$N/.Mc1La3.yNnJbnQWyQi.Simi89PXPkC4sywFJCvrQiQo7Bpn85u',42,'testUser'),(2,'DDS','','Admin','$2b$10$gIMQ4wZ5L/mDSsoV91UWWOOGeTC9PVuKC5dUjkfMuFyQ6aRsHbch6',17.5,'DDS'),(3,'Foco','','Admin','$2b$10$e5DV6DvoeLGjVuIBIeHvBuUq3pNDndPcH9oDeJgMHKsMenzhimApS',0,'FocoAdmin'),(4,'celina','','tala','$2b$10$W9b0IxcI/SsY1j1dBzFQ9.SNmvw/OQA08D9Eh8RQ4nt27o2iESlhu',163.05,'celina'),(5,'Tom','','Jackson','$2b$10$RkdMShGbHsoCcDbzAmNuzOo0KvaLaUbTRvAz34hGZ48z5QwApcqSS',18,'tom'),(6,'Tuktuk','','Admin','$2b$10$tECOTi4AtQBComWorw/5Heq0aBki2/6OHUeXlvTiAsS1QUhQN6G1S',0,'tuktuk'),(7,'Molly','','Admin','$2b$10$qzEJ70fbkKU89eUK3/mDuuQ3r3cLv4u1XnbBo/ZrcKnxlamKfE4PC',0,'mollys'),(8,'Pine','','Admin','$2b$10$3Xb5SHeOzvGTTH8CSTx2TuwBfUC5zKRNV2Mn.ZLNJxKCT9yMMm62C',0,'Pine'),(9,'HanFusion','','Admin','$2b$10$xwR0ga9hZp9//zdwAQ1ywOcQXL0TOXObvD/luIiCF.5BPLTi705m6',0,'HanFusion'),(10,'Dominos','','Admin','$2b$10$/hkmdNrbVAFgHv8EPQ.2TOeypA64pCUnT28YkiF/PPcghUpMJv/dm',0,'dominos');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 19:42:22
