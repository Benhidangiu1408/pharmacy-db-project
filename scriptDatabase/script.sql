-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: db-ass.mysql.database.azure.com    Database: warehouse
-- ------------------------------------------------------
-- Server version	8.0.39-azure

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
-- Current Database: `warehouse`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `warehouse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `warehouse`;

--
-- Table structure for table `has_pay_check`
--

DROP TABLE IF EXISTS `has_pay_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_pay_check` (
  `PayCheck_ID` int NOT NULL,
  `Total_Pay_ID` int NOT NULL,
  PRIMARY KEY (`PayCheck_ID`),
  KEY `FK_HasPayCheckTotalPay` (`Total_Pay_ID`),
  CONSTRAINT `FK_HasPayCheck` FOREIGN KEY (`PayCheck_ID`) REFERENCES `pay_check` (`ID`),
  CONSTRAINT `FK_HasPayCheckTotalPay` FOREIGN KEY (`Total_Pay_ID`) REFERENCES `total_pay` (`ID`),
  CONSTRAINT `has_pay_check_ibfk_1` FOREIGN KEY (`PayCheck_ID`) REFERENCES `pay_check` (`ID`),
  CONSTRAINT `has_pay_check_ibfk_2` FOREIGN KEY (`Total_Pay_ID`) REFERENCES `total_pay` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_pay_check`
--

LOCK TABLES `has_pay_check` WRITE;
/*!40000 ALTER TABLE `has_pay_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_pay_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_report`
--

DROP TABLE IF EXISTS `order_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_report` (
  `Report_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `FK_OrderReport_Report` (`Report_ID`),
  CONSTRAINT `FK_OrderReport_Order` FOREIGN KEY (`Order_ID`) REFERENCES `order_cus_voucher`.`order` (`ID`),
  CONSTRAINT `FK_OrderReport_Report` FOREIGN KEY (`Report_ID`) REFERENCES `report` (`ID`),
  CONSTRAINT `fk_report_id` FOREIGN KEY (`Report_ID`) REFERENCES `report` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_report`
--

LOCK TABLES `order_report` WRITE;
/*!40000 ALTER TABLE `order_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_check`
--

DROP TABLE IF EXISTS `pay_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_check` (
  `ID` int NOT NULL,
  `Paid_date` date NOT NULL,
  `Amount` decimal(10,2) DEFAULT '0.00',
  `PayCheck_Type` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `pay_check_chk_1` CHECK ((dayofmonth(`Paid_date`) = 1)),
  CONSTRAINT `pay_check_chk_2` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_check`
--

LOCK TABLES `pay_check` WRITE;
/*!40000 ALTER TABLE `pay_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `ID` int NOT NULL,
  `Date` date NOT NULL,
  `Profit` decimal(10,2) DEFAULT '0.00',
  `Revenue` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ID`),
  CONSTRAINT `report_chk_1` CHECK ((dayofmonth(`Date`) = 1)),
  CONSTRAINT `report_chk_2` CHECK ((`Profit` >= 0)),
  CONSTRAINT `report_chk_3` CHECK ((`Revenue` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_pay`
--

DROP TABLE IF EXISTS `total_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_pay` (
  `ID` int NOT NULL,
  `Month` int NOT NULL,
  `Year` int NOT NULL,
  `Total_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `total_pay_chk_1` CHECK ((`Month` between 1 and 12)),
  CONSTRAINT `total_pay_chk_2` CHECK ((`Year` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_pay`
--

LOCK TABLES `total_pay` WRITE;
/*!40000 ALTER TABLE `total_pay` DISABLE KEYS */;
/*!40000 ALTER TABLE `total_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_pay_report`
--

DROP TABLE IF EXISTS `total_pay_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_pay_report` (
  `Total_pay_ID` int NOT NULL,
  `Report_ID` int NOT NULL,
  PRIMARY KEY (`Total_pay_ID`),
  KEY `FK_TotalPayReportReport` (`Report_ID`),
  CONSTRAINT `FK_TotalPayReportReport` FOREIGN KEY (`Report_ID`) REFERENCES `report` (`ID`),
  CONSTRAINT `FK_TotalPayReportTotalPay` FOREIGN KEY (`Total_pay_ID`) REFERENCES `total_pay` (`ID`),
  CONSTRAINT `total_pay_report_ibfk_1` FOREIGN KEY (`Total_pay_ID`) REFERENCES `total_pay` (`ID`),
  CONSTRAINT `total_pay_report_ibfk_2` FOREIGN KEY (`Report_ID`) REFERENCES `report` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_pay_report`
--

LOCK TABLES `total_pay_report` WRITE;
/*!40000 ALTER TABLE `total_pay_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `total_pay_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_order`
--

DROP TABLE IF EXISTS `warehouse_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `Total_cost` decimal(10,2) DEFAULT '0.00',
  `Inventory_mgr_ID` int DEFAULT NULL,
  `Order_Type` enum('cancel','accept') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_WarehouseOrder_Employee` (`Inventory_mgr_ID`),
  CONSTRAINT `FK_WarehouseOrder_Employee` FOREIGN KEY (`Inventory_mgr_ID`) REFERENCES `employee_prescription`.`employee` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_order`
--

LOCK TABLES `warehouse_order` WRITE;
/*!40000 ALTER TABLE `warehouse_order` DISABLE KEYS */;
INSERT INTO `warehouse_order` VALUES (1,'2024-12-13',1500.00,1,'accept'),(2,'2024-12-12',2000.75,2,'cancel'),(3,'2024-12-11',1750.50,3,'accept'),(4,'2024-12-13',1500.00,1,'accept'),(5,'2024-12-12',2000.75,2,'cancel'),(6,'2024-12-11',1750.50,3,'accept'),(7,'2024-12-13',1500.00,1,'accept'),(8,'2024-12-12',2000.75,2,'cancel'),(9,'2024-12-11',1750.50,3,'accept'),(85,'2024-12-01',5000.00,1,'accept'),(86,'2024-12-02',3000.00,2,'cancel'),(87,'2024-12-03',7000.00,3,'accept'),(88,'2024-12-13',0.00,1,NULL),(89,'2024-12-13',0.00,1,NULL),(98,'2024-12-14',0.00,1,NULL),(99,'2024-12-14',0.00,1,NULL),(100,'2024-12-14',0.00,1,NULL),(101,'2024-12-14',0.00,1,NULL),(102,'2024-12-14',0.00,1,NULL),(104,'2024-12-14',0.00,1,NULL),(105,'2024-12-14',0.00,1,NULL),(106,'2024-12-14',0.00,1,NULL),(107,'2024-12-14',0.00,1,NULL),(109,'2024-12-14',0.00,1,NULL),(110,'2024-12-14',0.00,1,NULL),(111,'2024-12-14',0.00,1,NULL),(112,'2024-12-14',0.00,1,NULL);
/*!40000 ALTER TABLE `warehouse_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse_paid`
--

DROP TABLE IF EXISTS `warehouse_paid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_paid` (
  `WareHouse_ID` int NOT NULL,
  `PayCheck_ID` int NOT NULL,
  PRIMARY KEY (`WareHouse_ID`,`PayCheck_ID`),
  KEY `FK_WarehousePayCheck` (`PayCheck_ID`),
  CONSTRAINT `FK_WarehousePayCheck` FOREIGN KEY (`PayCheck_ID`) REFERENCES `pay_check` (`ID`),
  CONSTRAINT `warehouse_paid_ibfk_1` FOREIGN KEY (`PayCheck_ID`) REFERENCES `pay_check` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_paid`
--

LOCK TABLES `warehouse_paid` WRITE;
/*!40000 ALTER TABLE `warehouse_paid` DISABLE KEYS */;
/*!40000 ALTER TABLE `warehouse_paid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'warehouse'
--

--
-- Dumping routines for database 'warehouse'
--

--
-- Current Database: `batch_product`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `batch_product` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `batch_product`;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Cost` decimal(10,2) NOT NULL,
  `Manufacturing_date` date DEFAULT NULL,
  `Expiry_date` date DEFAULT NULL,
  `Amount` int DEFAULT '0',
  `WarehouseOrder_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `batch_chk_1` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (1,500.00,'2024-10-01','2025-10-01',100,1),(2,750.50,'2024-09-15','2025-09-15',200,2),(3,600.75,'2024-08-20','2025-08-20',150,3),(4,500.00,'2024-10-01','2025-10-01',100,1),(5,750.50,'2024-09-15','2025-09-15',200,2),(6,600.75,'2024-08-20','2025-08-20',150,3),(7,500.00,'2024-10-01','2025-10-01',100,1),(8,750.50,'2024-09-15','2025-09-15',200,2),(58,100.00,'2023-12-31','2024-12-31',50,106),(59,111.00,'2024-12-10','2024-12-26',222,107),(61,111.00,'2024-12-12','2024-12-19',219,109),(62,111.00,'2024-12-12','2024-12-19',219,110),(63,111.00,'2024-12-12','2024-12-19',219,111),(64,111.00,'2024-12-12','2024-12-19',219,112);
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`TranLuongYenNhi`@`%`*/ /*!50003 TRIGGER `batch_before_insert` BEFORE INSERT ON `batch` FOR EACH ROW BEGIN
    IF NEW.Manufacturing_date >= CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Manufacturing_date must be earlier than today (CURDATE).';
    END IF;

    -- Kiểm tra Manufacturing_date < Expiry_date
    IF NEW.Manufacturing_date >= NEW.Expiry_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Manufacturing_date must be earlier than Expiry_date.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `batch_product`
--

DROP TABLE IF EXISTS `batch_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_product` (
  `Batch_ID` int NOT NULL,
  `Product_ID` int NOT NULL,
  PRIMARY KEY (`Batch_ID`),
  KEY `FK_BatchProductProduct` (`Product_ID`),
  CONSTRAINT `batch_product_ibfk_1` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `batch_product_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`ID`),
  CONSTRAINT `FK_BatchProductBatch` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `FK_BatchProductProduct` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_product`
--

LOCK TABLES `batch_product` WRITE;
/*!40000 ALTER TABLE `batch_product` DISABLE KEYS */;
INSERT INTO `batch_product` VALUES (58,16),(62,16),(63,16),(64,16);
/*!40000 ALTER TABLE `batch_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_removal`
--

DROP TABLE IF EXISTS `batch_removal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_removal` (
  `Batch_ID` int NOT NULL,
  `WarehouseOrder_ID` int NOT NULL,
  PRIMARY KEY (`Batch_ID`),
  KEY `FK_BatchRemovalWarehouseOrder` (`WarehouseOrder_ID`),
  CONSTRAINT `batch_removal_ibfk_1` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `batch_removal_ibfk_2` FOREIGN KEY (`WarehouseOrder_ID`) REFERENCES `warehouse`.`warehouse_order` (`ID`),
  CONSTRAINT `FK_BatchRemovalBatch` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `FK_BatchRemovalWarehouseOrder` FOREIGN KEY (`WarehouseOrder_ID`) REFERENCES `warehouse`.`warehouse_order` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_removal`
--

LOCK TABLES `batch_removal` WRITE;
/*!40000 ALTER TABLE `batch_removal` DISABLE KEYS */;
/*!40000 ALTER TABLE `batch_removal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batchremoval_reason`
--

DROP TABLE IF EXISTS `batchremoval_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batchremoval_reason` (
  `Batch_ID` int NOT NULL,
  `Reason` varchar(64) NOT NULL,
  PRIMARY KEY (`Batch_ID`,`Reason`),
  CONSTRAINT `batchremoval_reason_ibfk_1` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `FK_BatchRemovalReasonBatch` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batchremoval_reason`
--

LOCK TABLES `batchremoval_reason` WRITE;
/*!40000 ALTER TABLE `batchremoval_reason` DISABLE KEYS */;
/*!40000 ALTER TABLE `batchremoval_reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable`
--

DROP TABLE IF EXISTS `consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Ingredient` varchar(200) DEFAULT NULL,
  `Serving_size` varchar(10) DEFAULT NULL,
  `Dosage` varchar(10) DEFAULT NULL,
  `Dosage_form` varchar(20) DEFAULT NULL,
  `Constraindication` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_CONSUMABLE_Product` FOREIGN KEY (`ID`) REFERENCES `product` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable`
--

LOCK TABLES `consumable` WRITE;
/*!40000 ALTER TABLE `consumable` DISABLE KEYS */;
INSERT INTO `consumable` VALUES (16,'Ingredient X','10mg','5mg','tablet','none'),(17,'Quinoa','1/4 cup','170cal','Dry','None'),(18,'Acetylsalicylic Acid','81mg','81mg','Tablet','Reye\'s syndrome'),(19,'Ascorbic Acid','500mg','500mg','Tablet','none'),(23,'Almonds, water','1 cup','30cal','Liquid','Allergy to nuts'),(24,'Ibuprofen','200mg','200mg','Tablet','none'),(25,'Vitamin A, Vitamin C, Vitamin D, etc.','1 tablet','N/A','Tablet','none'),(30,'Loratadine','10mg','10mg','Tablet','none'),(31,'EPA, DHA','1 softgel','10cal','Softgel','Allergy to fish'),(33,'Green tea leaves','1 teabag','0 calories','Dry','None'),(34,'Acetaminophen','500mg','500mg','Tablet','none'),(35,'Calcium carbonate, Vitamin D3','2 tablets','N/A','Tablet','none'),(37,'Brown rice','1/4 cup','160cal','Dry','None'),(38,'Diphenhydramine HCl','25mg','25mg','Capsule','none'),(39,'Lactobacillus acidophilus, Bifidobacterium lactis','1 capsule','N/A','Capsule','Allergy to dairy'),(40,'Honey','1 tbsp','60cal','Liquid','none'),(43,'Ascorbic Acid, Cellulose, Hypromellose, Stearic Acid, Magnesium Stearate.','1 tablet','1000mg','tablet','None'),(44,NULL,'','','',''),(45,NULL,'','','','');
/*!40000 ALTER TABLE `consumable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_equipment`
--

DROP TABLE IF EXISTS `medical_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_equipment` (
  `ID` int NOT NULL,
  `Usage_Instruction` varchar(1024) NOT NULL,
  `Material` varchar(128) DEFAULT NULL,
  `Size/Dimension` int DEFAULT '0',
  `Requirement` varchar(256) DEFAULT NULL,
  `Warranty` varchar(32) DEFAULT NULL,
  `Sterility` binary(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_MedicalEquipmentProduct` FOREIGN KEY (`ID`) REFERENCES `product` (`ID`),
  CONSTRAINT `medical_equipment_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `product` (`ID`),
  CONSTRAINT `medical_equipment_chk_1` CHECK ((`Size/Dimension` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_equipment`
--

LOCK TABLES `medical_equipment` WRITE;
/*!40000 ALTER TABLE `medical_equipment` DISABLE KEYS */;
INSERT INTO `medical_equipment` VALUES (22,'Put on arm, press button, see blood pressure','Plastic, metal',15,'For home use','1 year',_binary '0'),(29,'Place under tongue or armpit','Plastic',10,'For home and clinical use','6 months',_binary '0'),(32,'Follow instructions on individual components','Plastic, fabric',5,'For home, car, and travel','N/A',_binary '0'),(36,'Place on fingertip, press button','Plastic, metal',8,'For home monitoring','1 year',_binary '0'),(41,'Adjustable crutches for mobility assistance','Aluminum, rubber',25,'For temporary or long-term use','1 year',_binary '0');
/*!40000 ALTER TABLE `medical_equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `ID` int NOT NULL,
  `Side_effect` varchar(256) DEFAULT NULL,
  `Indication` varchar(128) NOT NULL,
  `Is_Prescription_Medicine` binary(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_MedicineConsumable` FOREIGN KEY (`ID`) REFERENCES `consumable` (`ID`),
  CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `consumable` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES (16,'Headache','Pain relief',_binary '1'),(18,'Headache, pain','Mild to moderate pain',_binary '1'),(24,'Headache, muscle ache','Inflammation, pain',_binary '0'),(30,'Sneezing, runny nose','Allergies',_binary '0'),(34,'Headache, fever','Pain, fever',_binary '0'),(38,'Itching, sneezing','Allergies, insomnia',_binary '0');
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_return_batch`
--

DROP TABLE IF EXISTS `order_return_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_return_batch` (
  `Batch_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  PRIMARY KEY (`Batch_ID`,`Order_ID`),
  KEY `FK_OrderReturnOrder_ORDER` (`Order_ID`),
  CONSTRAINT `FK_OrderReturnBatch_BATCH` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `FK_OrderReturnOrder_ORDER` FOREIGN KEY (`Order_ID`) REFERENCES `order_cus_voucher`.`order` (`ID`),
  CONSTRAINT `order_return_batch_ibfk_1` FOREIGN KEY (`Batch_ID`) REFERENCES `batch` (`ID`),
  CONSTRAINT `order_return_batch_ibfk_2` FOREIGN KEY (`Order_ID`) REFERENCES `order_cus_voucher`.`order` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_return_batch`
--

LOCK TABLES `order_return_batch` WRITE;
/*!40000 ALTER TABLE `order_return_batch` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_return_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(16) NOT NULL,
  `Description` varchar(1024) NOT NULL,
  `Origin` varchar(32) NOT NULL,
  `Tag` varchar(16) DEFAULT 'OTHER',
  `Storage_Condition` varchar(1024) DEFAULT NULL,
  `Country of origin` varchar(16) DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Directions for use` varchar(1024) NOT NULL,
  `Certificate` varchar(512) DEFAULT NULL,
  `Warning` varchar(512) DEFAULT NULL,
  `Intended User` varchar(128) DEFAULT NULL,
  `Total amount from batch` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`),
  CONSTRAINT `product_chk_1` CHECK ((`Total amount from batch` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (16,'Product A','Description of Product A','Origin A','Tag A','Store at room temperature','USA',9.99,'Take with food','Cert A','May cause drowsiness','Adults',100),(17,'Organic Quinoa','High-protein, gluten-free grain','Peru','Food','Cool, dry place','Bolivia',4.99,'Rinse and cook in water','USDA Organic','None','Adults, athletes',500),(18,'Aspirin','Pain reliever and fever reducer','USA','Medicine','Room temperature','USA',2.99,'Take with water','FDA Approved','May cause stomach upset','Adults',1000),(19,'Vitamin C','Antioxidant and immune support','USA','Supplement','Cool, dry place','USA',7.99,'Take with water','GMP Certified','None','Adults',2000),(22,'BldPrsMon','Automatic digital blood pressure monitor','China','Device','Room temperature','China',29.99,'Wrap cuff around upper arm, press start','CE Marked','None','Adults',50),(23,'Almond Milk','Dairy-free milk alternative','USA','Beverage','Refrigerate after opening','USA',3.49,'Shake well before use','Non-GMO Project Verified','Contains almonds','Adults, children',750),(24,'Ibuprofen','Reduces inflammation and pain','USA','Medicine','Room temperature','USA',4.49,'Take with food or milk','FDA Approved','May cause stomach upset','Adults, children over 12',1200),(25,'Multivitamin','Daily multivitamin for overall health','USA','Supplement','Cool, dry place','USA',9.99,'Take one daily','GMP Certified','None','Adults',1500),(29,'DigiThermometer','Fast and accurate temperature readings','China','Device','Room temperature','China',8.99,'Place under tongue or armpit','CE Marked','None','All ages',100),(30,'Loratadine','Antihistamine for allergy relief','USA','Medicine','Room temperature','USA',6.99,'Take once daily','FDA Approved','May cause drowsiness','Adults, children over 6',800),(31,'Omega-3 Fish Oil','Supports heart and brain health','Norway','Supplement','Cool, dry place','Norway',12.99,'Take with meals','GMP Certified','Contains fish','Adults',1000),(32,'First Aid Kit','Comprehensive kit for minor injuries','USA','Device','Room temperature','USA',19.99,'Follow instructions on individual components','OSHA Compliant','None','All ages',20),(33,'Green Tea','Antioxidant-rich tea','Japan','Beverage','Cool, dry place','Japan',5.99,'Steep in hot water for 3-5 minutes','JAS Organic','None','Adults',300),(34,'Acetaminophen','Pain reliever and fever reducer','USA','Medicine','Room temperature','USA',3.99,'Take every 4-6 hours','FDA Approved','May cause liver damage in high doses','Adults, children over 2',900),(35,'Cal&VitD','Supports bone health','USA','Supplement','Cool, dry place','USA',8.49,'Take with meals','GMP Certified','None','Adults',1200),(36,'Pulse Oximeter','Measures blood oxygen saturation','China','Device','Room temperature','China',24.99,'Place on fingertip, press button','CE Marked','None','Adults, children',30),(37,'Brown Rice','Whole grain, source of fiber','India','Food','Cool, dry place','India',3.99,'Rinse and cook in water','USDA Organic','None','Adults, children',600),(38,'Diphenhydramine','Antihistamine for allergies and sleep aid','USA','Medicine','Room temperature','USA',5.49,'Take as needed','FDA Approved','Causes drowsiness','Adults, children over 12',700),(39,'Probiotic','Supports digestive health','USA','Supplement','Refrigerate after opening','USA',14.99,'Take one daily','GMP Certified','Contains dairy','Adults',500),(40,'Honey','Natural sweetener','USA','Food','Room temperature','USA',6.49,'Use as desired','USDA Organic','None','Adults, children over 1',400),(41,'Crutches','Adjustable crutches for mobility assistance','USA','Device','Room temperature','USA',49.99,'Adjust to proper height, use as directed','CE Marked','None','Adults',10),(43,'Vitamin CD','Supports immune system health.','USA','Vitamins','Store in a cool, dry place.','USA',12.99,'Take one tablet daily with a meal.','GMP Certified','If you are pregnant, nursing, taking any medications or have any medical condition, consult your doctor before use.','Adults',750),(44,'ASD','ASD','ASD','ASD','ASD','ASD',11.00,'ASD','ASD','ASD','ASD',0),(45,'aa','aa','aa','aa','aa','aa',12.00,'aa','aa','aa','aa',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplement`
--

DROP TABLE IF EXISTS `supplement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplement` (
  `ID` int NOT NULL,
  `Allergen_info` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_SupplementConsumable` FOREIGN KEY (`ID`) REFERENCES `consumable` (`ID`),
  CONSTRAINT `supplement_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `consumable` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplement`
--

LOCK TABLES `supplement` WRITE;
/*!40000 ALTER TABLE `supplement` DISABLE KEYS */;
INSERT INTO `supplement` VALUES (19,'May contain traces of soy'),(25,'May contain traces of gluten'),(31,'Sourced from wild-caught fish'),(35,'May contain traces of shellfish'),(39,'10 billion CFU'),(43,'Free from: gluten, yeast, wheat, milk, lactose, soy, artificial color, artificial flavor, artificial sweetener, preservatives.'),(44,'ASD'),(45,'dau');
/*!40000 ALTER TABLE `supplement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'batch_product'
--

--
-- Dumping routines for database 'batch_product'
--
/*!50003 DROP PROCEDURE IF EXISTS `DeleteProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `DeleteProduct`(
    IN p_ProductID INT
)
BEGIN
    -- Check if the product exists
    IF NOT EXISTS (SELECT 1 FROM product WHERE ID = p_ProductID) THEN
        -- Handle case where product does not exist (optional: raise an error)
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Product not found';
    END IF;

    -- Delete from subclass tables first to avoid foreign key constraint issues
    
    -- Delete from medicine if it exists
    DELETE FROM medicine WHERE ID = p_ProductID;

    -- Delete from supplement if it exists
    DELETE FROM supplement WHERE ID = p_ProductID;
    
    -- Delete from medical_equipment if it exists
    DELETE FROM medical_equipment WHERE ID = p_ProductID;

    -- Delete from consumable if it exists
    DELETE FROM consumable WHERE ID = p_ProductID;

    -- Finally, delete from the product table
    DELETE FROM product WHERE ID = p_ProductID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllWarehouseIDs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetAllWarehouseIDs`()
BEGIN
    SELECT DISTINCT Warehouse_ID
    FROM batch_product.batch;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetBatchDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetBatchDetails`()
BEGIN
    SELECT 
        b.ID AS Batch_ID,
        b.Cost,
        b.Manufacturing_date,
        b.Expiry_date,
        b.Amount,
        wo.ID AS WarehouseOrder_ID,
        wo.Date AS Order_Date,
        wo.Total_cost,
        wo.Inventory_mgr_ID,
        wo.Order_Type
    FROM batch_product.batch b
    JOIN warehouse.warehouse_order wo
        ON b.WarehouseOrder_ID = wo.ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetJobTypeByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetJobTypeByID`(IN employeeID INT, OUT employeeJobType VARCHAR(64))
BEGIN
    SELECT JobType INTO employeeJobType
    FROM employee
    WHERE ID = employeeID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetProductList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetProductList`()
BEGIN
    -- Select all products and their attributes from the product table.
    SELECT
        p.ID,
        p.Name,
        p.Description,
        p.Origin,
        p.Tag,
        p.Storage_Condition,
        p.`Country of origin`,
        p.Price,
        p.`Directions for use`,
        p.Certificate,
        p.Warning,
        p.`Intended User`,
        p.`Total amount from batch`,
        -- Attributes specific to consumable
        c.Ingredient,
        c.Serving_size,
        c.Dosage,
        c.Dosage_form,
        c.Constraindication,
        -- Attributes specific to medicine
        m.Side_effect,
        m.Indication,
        m.Is_Prescription_Medicine,
        -- Attributes specific to supplement
        s.Allergen_info,
        -- Attributes specific to medical equipment
        me.Usage_Instruction,
        me.Material,
        me.`Size/Dimension`,
        me.Requirement,
        me.Warranty,
        me.Sterility,
        -- Indicate the type of product (consumable, medicine, supplement, medical_equipment)
        CASE
            WHEN me.ID IS NOT NULL THEN 'medical_equipment'
            WHEN m.ID IS NOT NULL THEN 'medicine'
            WHEN s.ID IS NOT NULL THEN 'supplement'
            WHEN c.ID IS NOT NULL THEN 'consumable'
            ELSE 'product'  -- This should ideally not happen if data integrity is maintained
        END AS ProductType
    FROM
        product p
    LEFT JOIN
        consumable c ON p.ID = c.ID
    LEFT JOIN
        medicine m ON c.ID = m.ID
    LEFT JOIN
        supplement s ON c.ID = s.ID
    LEFT JOIN
        medical_equipment me ON p.ID = me.ID
    ORDER BY
        p.ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertBatchData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `InsertBatchData`(
    IN p_WarehouseID INT,
    IN p_ProductID INT, -- ID sản phẩm là số nguyên
    IN p_EmployeeID INT,
    IN p_Quantity INT,
    IN p_Type VARCHAR(50),
    IN p_ExpiryDate VARCHAR(20),
	IN p_ManufacturingDate VARCHAR(20),
    IN p_Price DECIMAL(10, 2) -- Giá tiền (Price)
)
BEGIN
    DECLARE warehouse_order_id INT;
    DECLARE batch_id INT;
    DECLARE transaction_failed BOOLEAN DEFAULT FALSE;

    -- Handler xử lý lỗi SQL
    -- DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
--     BEGIN
--         SET transaction_failed = TRUE;
--     END;

    -- Bắt đầu transaction
    START TRANSACTION;

    -- 1. Chèn vào bảng warehouse_order
    INSERT INTO warehouse.warehouse_order (Date, Total_cost, Inventory_mgr_ID)
    VALUES (NOW(), 0, p_EmployeeID);
	SET warehouse_order_id = LAST_INSERT_ID();
    
    -- SELECT LAST_INSERT_ID();
    -- 2. Chèn vào bảng batch, thêm giá tiền (Price)
    INSERT INTO batch_product.batch (Cost, Manufacturing_date, Expiry_date, Amount, WarehouseOrder_ID)
    VALUES (p_Price, STR_TO_DATE(p_ManufacturingDate, '%Y-%m-%d'), STR_TO_DATE(p_ExpiryDate, '%Y-%m-%d'), p_Quantity,warehouse_order_id);
    
    -- Set the batch_id using LAST_INSERT_ID() after inserting into batch
    SET batch_id = LAST_INSERT_ID();

    -- 3. Chèn vào bảng product_batch
	INSERT INTO batch_product.batch_product (Batch_ID, Product_ID)
	VALUES (batch_id, p_ProductID);

    -- Hoàn tất hoặc hoàn tác transaction
  --   IF transaction_failed THEN
--         ROLLBACK;
--     ELSE
--         COMMIT;
--     END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `InsertProduct`(
    IN p_Name VARCHAR(16),
    IN p_Description VARCHAR(1024),
    IN p_Origin VARCHAR(32),
    IN p_Tag VARCHAR(16),
    IN p_Storage_Condition VARCHAR(1024),
    IN p_Country_of_origin VARCHAR(16),
    IN p_Price DECIMAL(10,2),
    IN p_Directions_for_use VARCHAR(1024),
    IN p_Certificate VARCHAR(512),
    IN p_Warning VARCHAR(512),
    IN p_Intended_User VARCHAR(128),
    IN p_Total_amount_from_batch INT,
    IN p_ProductType VARCHAR(20), -- 'consumable', 'medicine', 'supplement', 'medical_equipment'
    -- Consumable attributes
    IN p_Ingredient VARCHAR(200),
    IN p_Serving_size VARCHAR(10),
    IN p_Dosage VARCHAR(10),
    IN p_Dosage_form VARCHAR(20),
    IN p_Constraindication VARCHAR(100),
    -- Medicine attributes
    IN p_Side_effect VARCHAR(256),
    IN p_Indication VARCHAR(128),
    IN p_Is_Prescription_Medicine BOOLEAN,
    -- Supplement attributes
    IN p_Allergen_info VARCHAR(128),
    -- Medical equipment attributes
    IN p_Usage_Instruction VARCHAR(1024),
    IN p_Material VARCHAR(128),
    IN p_Size_Dimension INT,
    IN p_Requirement VARCHAR(256),
    IN p_Warranty VARCHAR(32),
    IN p_Sterility BOOLEAN
)
BEGIN
    DECLARE new_product_id INT;

    -- Insert into the product table
    INSERT INTO product (
        Name,
        Description,
        Origin,
        Tag,
        Storage_Condition,
        `Country of origin`,
        Price,
        `Directions for use`,
        Certificate,
        Warning,
        `Intended User`,
        `Total amount from batch`
    ) VALUES (
        p_Name,
        p_Description,
        p_Origin,
        p_Tag,
        p_Storage_Condition,
        p_Country_of_origin,
        p_Price,
        p_Directions_for_use,
        p_Certificate,
        p_Warning,
        p_Intended_User,
        p_Total_amount_from_batch
    );

    -- Get the ID of the newly inserted product
    SET new_product_id = LAST_INSERT_ID();

    -- Insert into subclass tables based on ProductType
    CASE p_ProductType
        WHEN 'consumable' THEN
            INSERT INTO consumable (
                ID,
                Ingredient,
                Serving_size,
                Dosage,
                Dosage_form,
                Constraindication
            ) VALUES (
                new_product_id,
                p_Ingredient,
                p_Serving_size,
                p_Dosage,
                p_Dosage_form,
                p_Constraindication
            );
        WHEN 'medicine' THEN
            INSERT INTO consumable (ID, Ingredient, Serving_size, Dosage, Dosage_form, Constraindication)
            VALUES (new_product_id, p_Ingredient,p_Serving_size, p_Dosage, p_Dosage_form, p_Constraindication);
            
            INSERT INTO medicine (
                ID,
                Side_effect,
                Indication,
                Is_Prescription_Medicine
            ) VALUES (
                new_product_id,
                p_Side_effect,
                p_Indication,
                p_Is_Prescription_Medicine
            );
        WHEN 'supplement' THEN
             INSERT INTO consumable (ID, Ingredient, Serving_size, Dosage, Dosage_form, Constraindication)
            VALUES (new_product_id, p_Ingredient,p_Serving_size, p_Dosage, p_Dosage_form, p_Constraindication);
            
            INSERT INTO supplement (
                ID,
                Allergen_info
            ) VALUES (
                new_product_id,
                p_Allergen_info
            );
        WHEN 'medical_equipment' THEN
            INSERT INTO medical_equipment (
                ID,
                Usage_Instruction,
                Material,
                `Size/Dimension`,
                Requirement,
                Warranty,
                Sterility
            ) VALUES (
                new_product_id,
                p_Usage_Instruction,
                p_Material,
                p_Size_Dimension,
                p_Requirement,
                p_Warranty,
                p_Sterility
            );
        ELSE
            -- Handle invalid ProductType (optional: raise an error)
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid ProductType';
    END CASE;
    
    select new_product_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `employee_prescription`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `employee_prescription` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `employee_prescription`;

--
-- Table structure for table `asking`
--

DROP TABLE IF EXISTS `asking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asking` (
  `Employee_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  PRIMARY KEY (`Employee_ID`,`Cus_ID`),
  KEY `FK_ASKING_CUSTOMER` (`Cus_ID`),
  CONSTRAINT `asking_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `asking_ibfk_2` FOREIGN KEY (`Cus_ID`) REFERENCES `order_cus_voucher`.`customer` (`ID`),
  CONSTRAINT `FK_ASKING_CUSTOMER` FOREIGN KEY (`Cus_ID`) REFERENCES `order_cus_voucher`.`customer` (`ID`),
  CONSTRAINT `FK_ASKING_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asking`
--

LOCK TABLES `asking` WRITE;
/*!40000 ALTER TABLE `asking` DISABLE KEYS */;
/*!40000 ALTER TABLE `asking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asking_detail`
--

DROP TABLE IF EXISTS `asking_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asking_detail` (
  `Employee_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  `Question` varchar(100) NOT NULL,
  `Answer` varchar(500) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`Employee_ID`,`Cus_ID`,`Date`,`Question`,`Answer`),
  CONSTRAINT `asking_detail_ibfk_1` FOREIGN KEY (`Employee_ID`, `Cus_ID`) REFERENCES `asking` (`Employee_ID`, `Cus_ID`),
  CONSTRAINT `FK_ASKING_DETAIL_ASKING` FOREIGN KEY (`Employee_ID`, `Cus_ID`) REFERENCES `asking` (`Employee_ID`, `Cus_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asking_detail`
--

LOCK TABLES `asking_detail` WRITE;
/*!40000 ALTER TABLE `asking_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `asking_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_prescription`
--

DROP TABLE IF EXISTS `doctor_prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_prescription` (
  `Prescription_ID` int NOT NULL,
  `Picture` blob,
  PRIMARY KEY (`Prescription_ID`),
  CONSTRAINT `doctor_prescription_ibfk_1` FOREIGN KEY (`Prescription_ID`) REFERENCES `prescription` (`ID`),
  CONSTRAINT `FK_DOCTOR_PRESCRIPTION_PRESCRIPTION` FOREIGN KEY (`Prescription_ID`) REFERENCES `prescription` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_prescription`
--

LOCK TABLES `doctor_prescription` WRITE;
/*!40000 ALTER TABLE `doctor_prescription` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(16) NOT NULL,
  `Address` varchar(64) DEFAULT NULL,
  `Account` varchar(32) DEFAULT NULL,
  `Password` varchar(16) DEFAULT NULL,
  `Phone_no` varchar(16) DEFAULT NULL,
  `WorkingType` varchar(64) DEFAULT NULL,
  `JobType` enum('pharmacist','inventory manager','product manager','admin') DEFAULT NULL,
  `Credential` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `Phone_no_UNIQUE` (`Phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Nguyễn Văn A','123 Lê Lợi, Hà Nội','nguyenvana','password123','0912345678','Full-time','admin','CredentialA'),(2,'Trần Thị B','45 Nguyễn Huệ, Đà Nẵng','tranthib','password456','0923456789','Part-time','inventory manager','CredentialB'),(3,'Lê Minh C','67 Trần Phú, Hồ Chí Minh','leminhc','password789','0934567890','Full-time','product manager','CredentialC'),(4,'Phạm Thị D','89 Phan Chu Trinh, Huế','phamthid','password012','0945678901','Contract','pharmacist','CredentialD'),(5,'Another John','456 Oak Ave','johndoe123','newsecurepa','555-987-6543','Part-time','pharmacist','Employee'),(11,'John Doe',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'Jane Smith',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'Alice Johnson',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'asd','asd','asd','asd','asd','Full-time','pharmacist','asd'),(33,'qwe','qwe','qwe','qwe','08992','Full-time','pharmacist','eew'),(34,'ewq','ewq','ewq','ewq','031','Full-time','pharmacist','ewq'),(35,'Tung','aggg','tung','12345678','0932809584','Full-time','pharmacist','ryfrftg');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_paid`
--

DROP TABLE IF EXISTS `employee_paid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_paid` (
  `PayCheck_ID` int NOT NULL,
  `Employee_ID` int NOT NULL,
  PRIMARY KEY (`PayCheck_ID`),
  KEY `FK_EMPLOYEE_PAID_EMPLOYEE` (`Employee_ID`),
  CONSTRAINT `employee_paid_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `employee_paid_ibfk_2` FOREIGN KEY (`PayCheck_ID`) REFERENCES `warehouse`.`pay_check` (`ID`),
  CONSTRAINT `FK_EMPLOYEE_PAID_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `FK_EMPLOYEE_PAID_PAYCHECK` FOREIGN KEY (`PayCheck_ID`) REFERENCES `warehouse`.`pay_check` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_paid`
--

LOCK TABLES `employee_paid` WRITE;
/*!40000 ALTER TABLE `employee_paid` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_paid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_salary`
--

DROP TABLE IF EXISTS `employee_salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_salary` (
  `Employee_ID` int NOT NULL,
  `Sum_Of_Salary` int NOT NULL,
  `Month` date NOT NULL,
  PRIMARY KEY (`Employee_ID`,`Month`,`Sum_Of_Salary`),
  CONSTRAINT `employee_salary_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `FK_EMPLOYEE_SALARY_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_salary`
--

LOCK TABLES `employee_salary` WRITE;
/*!40000 ALTER TABLE `employee_salary` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manage`
--

DROP TABLE IF EXISTS `manage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manage` (
  `Employee_ID` int NOT NULL,
  `Manager_ID` int NOT NULL,
  PRIMARY KEY (`Employee_ID`),
  KEY `FK_MANAGE_MANAGER` (`Manager_ID`),
  CONSTRAINT `FK_MANAGE_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `FK_MANAGE_MANAGER` FOREIGN KEY (`Manager_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `manage_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `manage_ibfk_2` FOREIGN KEY (`Manager_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manage`
--

LOCK TABLES `manage` WRITE;
/*!40000 ALTER TABLE `manage` DISABLE KEYS */;
/*!40000 ALTER TABLE `manage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `ID` int NOT NULL,
  `Date` date DEFAULT NULL,
  `Type` int DEFAULT NULL,
  `Pharmacist_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PRESCRIPTION_PHARMACIST` (`Pharmacist_ID`),
  CONSTRAINT `fk_pres_em` FOREIGN KEY (`Pharmacist_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `FK_PRESCRIPTION_PHARMACIST` FOREIGN KEY (`Pharmacist_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_detail`
--

DROP TABLE IF EXISTS `prescription_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_detail` (
  `STT` int NOT NULL,
  `Order_ID` int NOT NULL,
  `Prescription_ID` int NOT NULL,
  PRIMARY KEY (`STT`,`Order_ID`),
  KEY `FK_PRESCRIPTION_DETAIL_PRESCRIPTION` (`Prescription_ID`),
  KEY `FK_PRESCRIPTION_DETAIL_ORDER` (`Order_ID`,`STT`),
  CONSTRAINT `FK_PRESCRIPTION_DETAIL_ORDER` FOREIGN KEY (`Order_ID`, `STT`) REFERENCES `order_cus_voucher`.`order_detail` (`Order_ID`, `STT`),
  CONSTRAINT `FK_PRESCRIPTION_DETAIL_PRESCRIPTION` FOREIGN KEY (`Prescription_ID`) REFERENCES `prescription` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_detail`
--

LOCK TABLES `prescription_detail` WRITE;
/*!40000 ALTER TABLE `prescription_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_history`
--

DROP TABLE IF EXISTS `prescription_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_history` (
  `Pharmacist_ID` int NOT NULL,
  `Prescription_ID` int NOT NULL,
  `STT` int NOT NULL,
  `ModifiedContent` varchar(100) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`Pharmacist_ID`,`Prescription_ID`,`STT`),
  KEY `FK_PRESCRIPTION_HISTORY_PRESCRIPTION` (`Prescription_ID`),
  CONSTRAINT `FK_PRESCRIPTION_HISTORY_PHARMACIST` FOREIGN KEY (`Pharmacist_ID`) REFERENCES `prescription` (`Pharmacist_ID`),
  CONSTRAINT `FK_PRESCRIPTION_HISTORY_PRESCRIPTION` FOREIGN KEY (`Prescription_ID`) REFERENCES `prescription` (`ID`),
  CONSTRAINT `prescription_history_ibfk_1` FOREIGN KEY (`Pharmacist_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `prescription_history_ibfk_2` FOREIGN KEY (`Prescription_ID`) REFERENCES `prescription` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_history`
--

LOCK TABLES `prescription_history` WRITE;
/*!40000 ALTER TABLE `prescription_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_unit`
--

DROP TABLE IF EXISTS `salary_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_unit` (
  `Employee_ID` int NOT NULL,
  `OT_pay` int DEFAULT NULL,
  `Hourly_pay` int DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`),
  CONSTRAINT `FK_SALARY_UNIT_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `salary_unit_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_unit`
--

LOCK TABLES `salary_unit` WRITE;
/*!40000 ALTER TABLE `salary_unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `ID` int NOT NULL,
  `Work_from` date DEFAULT NULL,
  `Work_to` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works_on`
--

DROP TABLE IF EXISTS `works_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_on` (
  `Shift_ID` int NOT NULL,
  `Employee_ID` int NOT NULL,
  `Work_from` date DEFAULT NULL,
  `Work_to` date DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`Shift_ID`,`Employee_ID`),
  KEY `FK_WORKS_ON_EMPLOYEE` (`Employee_ID`),
  CONSTRAINT `FK_WORKS_ON_EMPLOYEE` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`),
  CONSTRAINT `FK_WORKS_ON_SHIFT` FOREIGN KEY (`Shift_ID`) REFERENCES `shift` (`ID`),
  CONSTRAINT `works_on_ibfk_1` FOREIGN KEY (`Shift_ID`) REFERENCES `shift` (`ID`),
  CONSTRAINT `works_on_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works_on`
--

LOCK TABLES `works_on` WRITE;
/*!40000 ALTER TABLE `works_on` DISABLE KEYS */;
/*!40000 ALTER TABLE `works_on` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'employee_prescription'
--

--
-- Dumping routines for database 'employee_prescription'
--
/*!50003 DROP PROCEDURE IF EXISTS `InsertEmployee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `InsertEmployee`(
    IN empName VARCHAR(16),
    IN empAddress VARCHAR(64),
    IN empAccount VARCHAR(32),
    IN empPassword VARCHAR(16),
    IN empPhoneNo VARCHAR(16),
    IN empWorkingType VARCHAR(64),
    IN empJobType VARCHAR(64),
    IN empCredential VARCHAR(128)
)
BEGIN
    INSERT INTO employee (
        Name, Address, Account, Password, Phone_no, WorkingType, JobType, Credential
    )
    VALUES (
        empName, empAddress, empAccount, empPassword, empPhoneNo, empWorkingType, empJobType, empCredential
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowAllEmployees` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `ShowAllEmployees`()
BEGIN
    SELECT * FROM employee;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowOneEmployee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `ShowOneEmployee`(
	IN empID INT
)
BEGIN
    SELECT * 
    FROM employee 
	WHERE ID = empID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Signin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `Signin`(
	IN p_Account VARCHAR(32),
    IN p_Password VARCHAR(16)
)
BEGIN
    SELECT ID, JobType, Name
    FROM employee
    WHERE p_Account = Account AND p_Password = Password;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateEmployeeJobType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `UpdateEmployeeJobType`(
    IN empID INT,
    IN newJobType VARCHAR(64)
)
BEGIN
    UPDATE employee
    SET Password = newJobType
    WHERE ID = empID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateEmployeePassword` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `UpdateEmployeePassword`(
    IN empID INT,
    IN newPassword VARCHAR(16)
)
BEGIN
    UPDATE employee
    SET Password = newPassword
    WHERE ID = empID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `order_cus_voucher`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `order_cus_voucher` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `order_cus_voucher`;

--
-- Table structure for table `company_deliver_cost`
--

DROP TABLE IF EXISTS `company_deliver_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_deliver_cost` (
  `Company_ID` int NOT NULL,
  `Deliver_cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Company_ID`),
  CONSTRAINT `company_deliver_cost_ibfk_1` FOREIGN KEY (`Company_ID`) REFERENCES `logistic_company` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_deliver_cost`
--

LOCK TABLES `company_deliver_cost` WRITE;
/*!40000 ALTER TABLE `company_deliver_cost` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_deliver_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `ID` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone_no` varchar(20) DEFAULT NULL,
  `Address` text,
  `Account` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Rewarded_Point` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Nguyễn Văn A','0123456789','123 Đường Lê Lợi, Hà Nội','nguyenvana','matkhau123',150),(2,'Trần Thị B','0987654321','456 Đường Trần Hưng Đạo, TP HCM','tranthib','matkhau456',200),(3,'Lê Văn C','0912345678','789 Đường Phạm Ngũ Lão, Đà Nẵng','levanc','mk7890',300),(4,'Phạm Thị D','0923456789','10 Đường Nguyễn Huệ, Huế','phamthid','mk1234',120),(5,'Võ Văn E','0934567890','23 Đường Lý Tự Trọng, Cần Thơ','vovane','mk5678',250),(6,'Đặng Thị F','0945678901','45 Đường Bạch Đằng, Nha Trang','dangthif','mk9012',180),(7,'Bùi Văn G','0956789012','67 Đường Nguyễn Văn Cừ, Vũng Tàu','buivang','mk3456',140),(8,'Hoàng Thị H','0967890123','89 Đường Hoàng Văn Thụ, Hải Phòng','hoangthih','mk7896',220),(9,'Đỗ Văn I','0978901234','101 Đường Điện Biên Phủ, Quảng Ninh','dovani','mk4567',170),(10,'Phan Thị J','0989012345','123 Đường Võ Thị Sáu, Bình Dương','phanthij','mk8901',260);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange_voucher`
--

DROP TABLE IF EXISTS `exchange_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchange_voucher` (
  `Voucher_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Voucher_ID`,`Cus_ID`),
  KEY `Cus_ID` (`Cus_ID`),
  CONSTRAINT `exchange_voucher_ibfk_1` FOREIGN KEY (`Voucher_ID`) REFERENCES `voucher` (`Voucher_ID`),
  CONSTRAINT `exchange_voucher_ibfk_2` FOREIGN KEY (`Cus_ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_voucher`
--

LOCK TABLES `exchange_voucher` WRITE;
/*!40000 ALTER TABLE `exchange_voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logistic_company`
--

DROP TABLE IF EXISTS `logistic_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logistic_company` (
  `ID` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone_no` varchar(20) DEFAULT NULL,
  `Address` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logistic_company`
--

LOCK TABLES `logistic_company` WRITE;
/*!40000 ALTER TABLE `logistic_company` DISABLE KEYS */;
INSERT INTO `logistic_company` VALUES (1,'Công ty Vận Tải Đông Á','028-12345678','123 Đường Vận Tải, TP. Hồ Chí Minh'),(2,'Công ty Giao Hàng Nhanh','028-23456789','456 Đường Giao Hàng, Hà Nội'),(3,'Công ty Vận Chuyển Toàn Cầu','029-87654321','789 Đường Toàn Cầu, Đà Nẵng'),(4,'Công ty Vận Chuyển Hương Giang','024-34567890','1010 Đường Hương Giang, Hải Phòng'),(5,'Công ty Chuyển Phát Nhanh','025-23456700','1111 Đường Chuyển Phát, Bình Dương'),(6,'Công ty Giao Hàng Tiết Kiệm','029-34567801','1212 Đường Tiết Kiệm, Cần Thơ'),(7,'Công ty Vận Tải Bắc Nam','027-54321011','1313 Đường Bắc Nam, Vũng Tàu'),(8,'Công ty Vận Tải Việt Nam','022-67890122','1414 Đường Việt Nam, Phan Thiết'),(9,'Công ty Giao Nhận Hàng Hóa','023-56789013','1515 Đường Giao Nhận, Thái Nguyên'),(10,'Công ty Vận Chuyển Quốc Tế','028-65432124','1616 Đường Quốc Tế, Lâm Đồng');
/*!40000 ALTER TABLE `logistic_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Destination` varchar(100) NOT NULL,
  `Note` varchar(100) DEFAULT NULL,
  `Distance` int DEFAULT NULL,
  `OrderStatus_ID` int DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`ID`),
  KEY `OrderStatus_ID` (`OrderStatus_ID`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`OrderStatus_ID`) REFERENCES `order_status` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (2,'123 Main Street, City','Leave at the front door',15,1,100.50),(3,'123 Main Street, City','Leave at the front door',15,1,100.50),(4,'123 Main Street, City','Leave at the front door',15,1,100.50),(5,'123 Main Street, City','Leave at the front door',15,1,100.50),(6,'123 Main Street, City','Leave at the front door',15,1,100.50),(7,'129 Main Street, City','Leave at the front door',15,1,100.50),(8,'130 Main Street, City','Leave at the front door',15,1,100.50);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `Order_ID` int NOT NULL,
  `STT` int NOT NULL,
  PRIMARY KEY (`Order_ID`,`STT`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),(6,1),(6,2),(7,1),(7,2);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_prepare`
--

DROP TABLE IF EXISTS `order_prepare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_prepare` (
  `Employee_ID` int NOT NULL,
  `Order_ID` int NOT NULL,
  PRIMARY KEY (`Employee_ID`,`Order_ID`),
  KEY `Order_ID` (`Order_ID`),
  CONSTRAINT `order_prepare_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_prepare`
--

LOCK TABLES `order_prepare` WRITE;
/*!40000 ALTER TABLE `order_prepare` DISABLE KEYS */;
INSERT INTO `order_prepare` VALUES (10,2),(10,3),(10,4),(10,5),(10,6),(10,7),(10,8);
/*!40000 ALTER TABLE `order_prepare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `ID` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'Chờ xử lý'),(2,'Đã giao hàng'),(3,'Đã giao'),(4,'Đã hủy'),(5,'Đã trả lại');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_update`
--

DROP TABLE IF EXISTS `order_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_update` (
  `Order_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Update_content` varchar(255) DEFAULT NULL,
  `Shipper_ID` int DEFAULT NULL,
  `Company_ID` int DEFAULT NULL,
  `OrderStatus_ID` int DEFAULT NULL,
  PRIMARY KEY (`Order_ID`,`Date`),
  KEY `Shipper_ID` (`Shipper_ID`,`Company_ID`),
  KEY `OrderStatus_ID` (`OrderStatus_ID`),
  CONSTRAINT `order_update_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`ID`),
  CONSTRAINT `order_update_ibfk_2` FOREIGN KEY (`Shipper_ID`, `Company_ID`) REFERENCES `shipper` (`ID`, `Company_ID`),
  CONSTRAINT `order_update_ibfk_3` FOREIGN KEY (`OrderStatus_ID`) REFERENCES `order_status` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_update`
--

LOCK TABLES `order_update` WRITE;
/*!40000 ALTER TABLE `order_update` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_order`
--

DROP TABLE IF EXISTS `place_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place_order` (
  `Order_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Voucher_ID` int DEFAULT NULL,
  PRIMARY KEY (`Order_ID`,`Cus_ID`),
  KEY `Cus_ID` (`Cus_ID`),
  KEY `Voucher_ID` (`Voucher_ID`),
  CONSTRAINT `place_order_ibfk_1` FOREIGN KEY (`Cus_ID`) REFERENCES `customer` (`ID`),
  CONSTRAINT `place_order_ibfk_2` FOREIGN KEY (`Voucher_ID`) REFERENCES `voucher` (`Voucher_ID`),
  CONSTRAINT `place_order_ibfk_3` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_order`
--

LOCK TABLES `place_order` WRITE;
/*!40000 ALTER TABLE `place_order` DISABLE KEYS */;
INSERT INTO `place_order` VALUES (2,2,'2024-12-14',2),(3,3,'2024-12-14',2),(4,4,'2024-12-14',2),(5,5,'2024-12-14',2),(6,6,'2024-12-14',2),(7,7,'2024-12-14',2),(8,8,'2024-12-14',2);
/*!40000 ALTER TABLE `place_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_add`
--

DROP TABLE IF EXISTS `product_add`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_add` (
  `Order_ID` int NOT NULL,
  `STT` int NOT NULL,
  `Product_ID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Order_ID`,`STT`),
  CONSTRAINT `product_add_ibfk_1` FOREIGN KEY (`Order_ID`, `STT`) REFERENCES `order_detail` (`Order_ID`, `STT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_add`
--

LOCK TABLES `product_add` WRITE;
/*!40000 ALTER TABLE `product_add` DISABLE KEYS */;
INSERT INTO `product_add` VALUES (2,1,101,2),(2,2,102,3),(3,1,101,2),(3,2,102,3),(4,1,101,2),(4,2,102,3),(5,1,16,17),(5,2,22,3),(6,1,16,17),(6,2,22,3),(7,1,16,17),(7,2,22,3);
/*!40000 ALTER TABLE `product_add` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_review`
--

DROP TABLE IF EXISTS `product_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_review` (
  `Cus_ID` int NOT NULL,
  `Product_ID` int NOT NULL,
  PRIMARY KEY (`Cus_ID`,`Product_ID`),
  CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`Cus_ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_review`
--

LOCK TABLES `product_review` WRITE;
/*!40000 ALTER TABLE `product_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_review_detail`
--

DROP TABLE IF EXISTS `product_review_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_review_detail` (
  `Product_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `Rating` decimal(2,1) NOT NULL,
  PRIMARY KEY (`Product_ID`,`Cus_ID`,`Date`,`Comment`,`Rating`),
  KEY `Cus_ID` (`Cus_ID`,`Product_ID`),
  CONSTRAINT `product_review_detail_ibfk_1` FOREIGN KEY (`Cus_ID`, `Product_ID`) REFERENCES `product_review` (`Cus_ID`, `Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_review_detail`
--

LOCK TABLES `product_review_detail` WRITE;
/*!40000 ALTER TABLE `product_review_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_review_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_voucher`
--

DROP TABLE IF EXISTS `product_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_voucher` (
  `Product_ID` int NOT NULL,
  `Voucher_ID` int NOT NULL,
  PRIMARY KEY (`Product_ID`,`Voucher_ID`),
  KEY `Voucher_ID` (`Voucher_ID`),
  CONSTRAINT `product_voucher_ibfk_1` FOREIGN KEY (`Voucher_ID`) REFERENCES `voucher` (`Voucher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_voucher`
--

LOCK TABLES `product_voucher` WRITE;
/*!40000 ALTER TABLE `product_voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_sys_voucher`
--

DROP TABLE IF EXISTS `receive_sys_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receive_sys_voucher` (
  `Voucher_ID` int NOT NULL,
  `Cus_ID` int NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Voucher_ID`,`Cus_ID`),
  KEY `Cus_ID` (`Cus_ID`),
  CONSTRAINT `receive_sys_voucher_ibfk_1` FOREIGN KEY (`Voucher_ID`) REFERENCES `voucher` (`Voucher_ID`),
  CONSTRAINT `receive_sys_voucher_ibfk_2` FOREIGN KEY (`Cus_ID`) REFERENCES `customer` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_sys_voucher`
--

LOCK TABLES `receive_sys_voucher` WRITE;
/*!40000 ALTER TABLE `receive_sys_voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `receive_sys_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper`
--

DROP TABLE IF EXISTS `shipper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper` (
  `ID` int NOT NULL,
  `Company_ID` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone_no` varchar(20) DEFAULT NULL,
  `Address` text,
  `Account` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `License_Plate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`,`Company_ID`),
  KEY `Company_ID` (`Company_ID`),
  CONSTRAINT `shipper_ibfk_1` FOREIGN KEY (`Company_ID`) REFERENCES `logistic_company` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper`
--

LOCK TABLES `shipper` WRITE;
/*!40000 ALTER TABLE `shipper` DISABLE KEYS */;
INSERT INTO `shipper` VALUES (1,1,'Nguyễn Văn A','090-1234567','123 Đường Vận Tải, TP. Hồ Chí Minh','nguyenvana','matkhau123','29A-12345'),(2,2,'Trần Thị B','090-2345678','456 Đường Giao Hàng, Hà Nội','tranthib','matkhau234','30B-23456'),(3,3,'Lê Minh C','090-3456789','789 Đường Toàn Cầu, Đà Nẵng','leminhc','matkhau345','31C-34567'),(4,4,'Phạm Thị D','090-4567890','1010 Đường Hương Giang, Hải Phòng','phamthid','matkhau456','32D-45678'),(5,5,'Hoàng Văn E','090-5678901','1111 Đường Chuyển Phát, Bình Dương','hoangvane','matkhau567','33E-56789'),(6,6,'Bùi Thị F','090-6789012','1212 Đường Tiết Kiệm, Cần Thơ','buithef','matkhau678','34F-67890'),(7,7,'Cao Minh G','090-7890123','1313 Đường Bắc Nam, Vũng Tàu','caomingg','matkhau789','35G-78901'),(8,8,'Dương Thị H','090-8901234','1414 Đường Việt Nam, Phan Thiết','duongthih','matkhau890','36H-89012'),(9,9,'Vũ Minh I','090-9012345','1515 Đường Giao Nhận, Thái Nguyên','vuminhi','matkhau901','37I-90123'),(10,10,'Ngô Thị J','090-0123456','1616 Đường Quốc Tế, Lâm Đồng','ngothij','matkhau012','38J-01234');
/*!40000 ALTER TABLE `shipper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper_deliver`
--

DROP TABLE IF EXISTS `shipper_deliver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipper_deliver` (
  `Order_ID` int NOT NULL,
  `Shipper_ID` int NOT NULL,
  `Company_ID` int NOT NULL,
  `Accepted_date` date DEFAULT NULL,
  `Tracking_number` varchar(255) DEFAULT NULL,
  `Cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `Shipper_ID` (`Shipper_ID`,`Company_ID`),
  CONSTRAINT `shipper_deliver_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order` (`ID`),
  CONSTRAINT `shipper_deliver_ibfk_2` FOREIGN KEY (`Shipper_ID`, `Company_ID`) REFERENCES `shipper` (`ID`, `Company_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper_deliver`
--

LOCK TABLES `shipper_deliver` WRITE;
/*!40000 ALTER TABLE `shipper_deliver` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipper_deliver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `Voucher_ID` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Condition` text,
  `Start_date` date DEFAULT NULL,
  `End_date` date DEFAULT NULL,
  `VoucherType` varchar(50) DEFAULT NULL,
  `Exchanged_Point` int DEFAULT NULL,
  `Product_flag` int DEFAULT NULL,
  `Tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Voucher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,'Giảm giá sản phẩm điện tử',50.00,'Áp dụng cho tất cả các sản phẩm điện tử có giá trị trên $200','2024-01-01','2024-12-31','Giảm giá',100,1,'điện tử, giảm giá, 2024'),(2,'Khuyến mãi Giáng Sinh',30.00,'Áp dụng cho tất cả các đơn hàng trong mùa lễ Giáng Sinh','2024-12-01','2024-12-25','Giảm giá',50,1,'giáng sinh, khuyến mãi, giảm giá'),(3,'Miễn phí vận chuyển cho đơn hàng trên $100',0.00,'Miễn phí vận chuyển cho các đơn hàng có giá trị trên $100','2024-01-01','2024-12-31','Miễn phí vận chuyển',200,1,'vận chuyển, miễn phí, đơn hàng'),(4,'Mua một tặng một miễn phí',0.00,'Mua một sản phẩm, tặng thêm một sản phẩm miễn phí','2024-06-01','2024-06-30','Mua 1 tặng 1',300,1,'mua một, tặng một, khuyến mãi'),(5,'Hoàn tiền 10% cho sản phẩm chọn lọc',10.00,'Hoàn tiền 10% cho các sản phẩm chọn lọc','2024-02-01','2024-05-31','Hoàn tiền',150,1,'hoàn tiền, khuyến mãi, sản phẩm chọn lọc');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'order_cus_voucher'
--

--
-- Dumping routines for database 'order_cus_voucher'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetAllOrders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetAllOrders`()
BEGIN
    -- Retrieve details of all orders with related information
    SELECT o.ID AS Order_ID,
           o.Destination,
           o.Note,
           o.Distance,
           o.OrderStatus_ID,
           o.Total,
           po.Cus_ID,
           c.Name AS Customer_Name,
           c.Phone_no AS Customer_Phone,
           po.`Date` AS Order_Date,
           po.Voucher_ID,
           sd.Shipper_ID,
           sp.Name AS Shipper_Name,
           lc.Name AS Logistic_Company_Name,
           sd.Cost AS Shipping_Cost,
           p.Name AS Product_Name,
           pa.Quantity,
           e.Name
    FROM order_cus_voucher.order o
    LEFT JOIN order_cus_voucher.place_order po ON o.ID = po.Order_ID
    LEFT JOIN order_cus_voucher.customer c ON po.Cus_ID = c.ID
    LEFT JOIN order_cus_voucher.shipper_deliver sd ON o.ID = sd.Order_ID
	LEFT JOIN order_cus_voucher.shipper sp ON sd.Shipper_ID = sp.ID
	LEFT JOIN order_cus_voucher.logistic_company lc ON sp.Company_ID = lc.ID
    LEFT JOIN order_cus_voucher.product_add pa ON o.ID = pa.Order_ID
    LEFT JOIN batch_product.product p ON pa.Product_ID = p.ID
    LEFT JOIN order_cus_voucher.order_prepare op ON o.ID = op.employee_id
    LEFT JOIN employee_prescription.employee e on op.employee_id= e.ID
    ORDER BY o.ID; -- Orders will be sorted by Order_ID
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCustomerDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetCustomerDetails`()
BEGIN
    SELECT ID, Name, Phone_no FROM customer;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetEmployeeOrders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `GetEmployeeOrders`(
	IN empID INT
)
BEGIN
    -- Retrieve details of all orders with related information
    SELECT o.ID AS Order_ID,
           o.Destination,
           o.Note,
           o.Distance,
           o.OrderStatus_ID,
           o.Total,
           po.Cus_ID,
           c.Name AS Customer_Name,
           c.Phone_no AS Customer_Phone,
           po.`Date` AS Order_Date,
           po.Voucher_ID,
           sd.Shipper_ID,
           sp.Name AS Shipper_Name,
           lc.Name AS Logistic_Company_Name,
           sd.Cost AS Shipping_Cost,
           p.Name AS Product_Name,
           pa.Quantity
    FROM order_cus_voucher.order o
    JOIN order_cus_voucher.order_prepare op ON o.ID = op.employee_id
    LEFT JOIN order_cus_voucher.place_order po ON o.ID = po.Order_ID
    LEFT JOIN order_cus_voucher.customer c ON po.Cus_ID = c.ID
    LEFT JOIN order_cus_voucher.shipper_deliver sd ON o.ID = sd.Order_ID
	LEFT JOIN order_cus_voucher.shipper sp ON sd.Shipper_ID = sp.ID
	LEFT JOIN order_cus_voucher.logistic_company lc ON sp.Company_ID = lc.ID
    LEFT JOIN order_cus_voucher.product_add pa ON o.ID = pa.Order_ID
    LEFT JOIN batch_product.product p ON pa.Product_ID = p.ID
    WHERE op.employee_id=empID
    ORDER BY o.ID; -- Orders will be sorted by Order_ID
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `InsertOrder`(
    IN Destination varchar(100),
    IN Note varchar(100),
	IN Distance INT,
    IN OrderStatus_ID INT, -- avail
	IN Total DECIMAL(10,2),
    
    IN cust_id INT,	-- avail or not
    IN cust_name VARCHAR(255),
	IN cust_phone_no VARCHAR(20),
    IN order_date VARCHAR(100),
    IN voucher_id INT,	-- avail
    
    IN shipper_id INT, -- available
    IN shipper_cost DECIMAL(10,2),
    -- for product add table
    IN order_items JSON ,  -- This is for holding order details in JSON format
    
    -- for order_prepare
    IN employee_id INT
)
BEGIN
    DECLARE order_id INT;
    DECLARE company_id INT;
    DECLARE transaction_failed BOOLEAN DEFAULT FALSE;
	DECLARE i INT DEFAULT 0;
	DECLARE num_items INT;
    DECLARE product_id INT;
    DECLARE quantity INT;
    DECLARE current_item TEXT;

	   -- Declare a handler for any error
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- If an error occurs, set transaction_failed to TRUE
        SET transaction_failed = TRUE;
    END;

    -- Start a transaction
    START TRANSACTION;

    
    
      -- Insert into the order table and get the order_id
		INSERT INTO order_cus_voucher.order (Destination, Note, Distance, OrderStatus_ID, Total)
		VALUES (Destination, Note, Distance, OrderStatus_ID, Total);
		SET order_id = LAST_INSERT_ID();
        
        -- insert into order_prepare
        INSERT INTO order_cus_voucher.order_prepare 
		VALUES (employee_id, order_id);
        
        -- check available cus_id
        if cust_id IS NULL THEN
			INSERT INTO order_cus_voucher.customer (Name, Phone_no)
            VALUES (cust_name, cust_phone_no);  -- Example discount value
            SET cust_id = LAST_INSERT_ID();
		 END IF;
            
		-- insert into order_prepare
        INSERT INTO order_cus_voucher.place_order (Order_ID,Cus_ID, `Date`, Voucher_ID)
		VALUES (
        order_id, 
        cust_id,
        STR_TO_DATE(
            SUBSTRING_INDEX(order_date, 'GMT', 1), -- Extract the relevant part of the date
            '%a %b %d %Y %H:%i:%s'
        ), 
        voucher_id
    );
        
        -- find company_id of shipper
        SELECT Company_ID INTO company_id from order_cus_voucher.shipper where ID=shipper_id;
        
        -- insert into shipper_deliver
        INSERT INTO order_cus_voucher.shipper_deliver (Order_ID,Shipper_ID, Company_ID, Cost)
		VALUES (order_id, shipper_id,company_id,shipper_cost);
			

        -- Loop through the JSON order items and insert into the order_detail table
        SET num_items = JSON_LENGTH(order_items);
        WHILE i < num_items DO
			INSERT INTO order_detail 
            VALUES (order_id,i+1);
            INSERT INTO product_add
            VALUES (
                order_id, 
                i+1,
                JSON_UNQUOTE(JSON_EXTRACT(order_items, CONCAT('$[', i, '].product_id'))),
                JSON_UNQUOTE(JSON_EXTRACT(order_items, CONCAT('$[', i, '].quantity')))
            );
            SET i = i + 1;
        END WHILE;

    -- If there was no error, commit the transaction, otherwise, roll back
		-- IF transaction_failed THEN
-- 			ROLLBACK;
-- 		ELSE
-- 			COMMIT;
-- 		END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowOrderStatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `ShowOrderStatus`()
BEGIN
   SELECT * FROM order_status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowShipperInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `ShowShipperInfo`()
BEGIN
    -- Select shipper ID and name from SHIPPER table
    SELECT ID AS Shipper_ID, Name AS Shipper_Name
    FROM shipper;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowVoucherInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`TranLuongYenNhi`@`%` PROCEDURE `ShowVoucherInfo`()
BEGIN
    -- Select shipper ID and name from SHIPPER table
    SELECT Voucher_ID AS ID, Name , Amount
    FROM voucher;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-17 11:44:57
