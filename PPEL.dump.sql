-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: PPEL
-- ------------------------------------------------------
-- Server version	5.5.47-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TextQuestions`
--

DROP TABLE IF EXISTS `TextQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TextQuestions` (
  `id` char(8) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `isPublic` tinyint(1) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `id` (`id`),
  CONSTRAINT `TextQuestions_ibfk_1` FOREIGN KEY (`id`) REFERENCES `USER` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TextQuestions`
--

LOCK TABLES `TextQuestions` WRITE;
/*!40000 ALTER TABLE `TextQuestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `TextQuestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `id` char(8) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `email` varchar(64) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES ('11346814',1,'junaid.khan@wsu.edu','2016-04-13 04:12:57');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoAnswers`
--

DROP TABLE IF EXISTS `VideoAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VideoAnswers` (
  `id` char(8) NOT NULL,
  `path` varchar(4096) NOT NULL,
  `isPublic` tinyint(1) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionID` int(11) NOT NULL,
  KEY `id` (`id`),
  KEY `on_delete` (`questionID`),
  CONSTRAINT `on_delete` FOREIGN KEY (`questionID`) REFERENCES `VideoQuestions` (`questionId`) ON DELETE CASCADE,
  CONSTRAINT `VideoAnswers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `USER` (`id`),
  CONSTRAINT `VideoAnswers_ibfk_2` FOREIGN KEY (`questionID`) REFERENCES `VideoQuestions` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoAnswers`
--

LOCK TABLES `VideoAnswers` WRITE;
/*!40000 ALTER TABLE `VideoAnswers` DISABLE KEYS */;
INSERT INTO `VideoAnswers` VALUES ('11346814','/app/videos/11346814/public1.mp4',0,'2016-04-13 21:27:06',1),('11346814','/app/videos/11346814/public2.mp4',0,'2016-04-13 21:28:15',2);
/*!40000 ALTER TABLE `VideoAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoQuestions`
--

DROP TABLE IF EXISTS `VideoQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VideoQuestions` (
  `id` char(8) DEFAULT NULL,
  `path` varchar(4096) NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`questionId`),
  KEY `id` (`id`),
  CONSTRAINT `VideoQuestions_ibfk_1` FOREIGN KEY (`id`) REFERENCES `USER` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoQuestions`
--

LOCK TABLES `VideoQuestions` WRITE;
/*!40000 ALTER TABLE `VideoQuestions` DISABLE KEYS */;
INSERT INTO `VideoQuestions` VALUES (NULL,'/app/videos/public/public1.mp4',1,'2016-04-13 21:26:16',1),(NULL,'/app/videos/public/public2.mp4',1,'2016-04-13 21:27:35',2);
/*!40000 ALTER TABLE `VideoQuestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-13 23:26:38
