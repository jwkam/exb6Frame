-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Server version	5.5.5-10.5.4-MariaDB

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
-- Table structure for table `cmn_user_div_dtl`
--

DROP TABLE IF EXISTS `cmn_user_div_dtl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_user_div_dtl` (
  `USER_DIV_CD` varchar(10) NOT NULL COMMENT '사용자구분코드',
  `CONN_RCD` varchar(20) NOT NULL COMMENT '연계코드[연계공통코드]',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_DIV_CD`,`CONN_RCD`),
  KEY `CMN_USER_DIV_DTL_FK_01` (`USER_DIV_CD`),
  CONSTRAINT `CMN_USER_DIV_DTL_FK_1` FOREIGN KEY (`USER_DIV_CD`) REFERENCES `cmn_user_div` (`USER_DIV_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자구분상세';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_user_div_dtl`
--

LOCK TABLES `cmn_user_div_dtl` WRITE;
/*!40000 ALTER TABLE `cmn_user_div_dtl` DISABLE KEYS */;
INSERT INTO `cmn_user_div_dtl` VALUES ('GUEST','GUEST',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('TST001','TST001.01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `cmn_user_div_dtl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_user_div`
--

DROP TABLE IF EXISTS `cmn_user_div`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_user_div` (
  `USER_DIV_CD` varchar(10) NOT NULL COMMENT '사용자구분코드',
  `USER_DIV_NM` varchar(300) NOT NULL COMMENT '사용자구분명',
  `STTS_LCLS_RCD` varchar(20) DEFAULT NULL COMMENT '신분대분류코드[CMN054]',
  `STTS_MCLS_RCD` varchar(20) DEFAULT NULL COMMENT '신분중분류코드[CMN055]',
  `STTS_SCLS_RCD` varchar(20) DEFAULT NULL COMMENT '신분소분류코드[CMN056]',
  `EXPL` varchar(1500) DEFAULT NULL COMMENT '설명',
  `PRT_ORD` decimal(2,0) DEFAULT NULL COMMENT '출력순서',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_DIV_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자구분';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_user_div`
--

LOCK TABLES `cmn_user_div` WRITE;
/*!40000 ALTER TABLE `cmn_user_div` DISABLE KEYS */;
INSERT INTO `cmn_user_div` VALUES ('GUEST','외부사용자','CMN054.001','CMN055.020','','',2,NULL,NULL,NULL,NULL,'2020-03-23 15:47:38','E000000061','cmnCUserDiv_s','')
,('TST001','테스트팀','CMN054.001','CMN055.010','','',1,NULL,NULL,NULL,NULL,'2020-03-23 15:47:38','E000000061','cmnCUserDiv_s','')
,('TST002','내부직원','CMN054.004','CMN055.010',NULL,NULL,3,'2020-04-10 14:10:31','TST001','cmnCUserDiv','211.109.22.109','2020-04-10 14:10:31','TST001','cmnCUserDiv','211.109.22.109');
/*!40000 ALTER TABLE `cmn_user_div` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_party`
--

DROP TABLE IF EXISTS `cmn_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_party` (
  `PARTY_ID` varchar(15) NOT NULL COMMENT '구성원ID',
  `RESNO` varchar(13) DEFAULT NULL COMMENT '주민등록번호',
  `NM_KOR` varchar(300) NOT NULL COMMENT '성명_한글',
  `NM_ENG` varchar(300) DEFAULT NULL COMMENT '성명_영문',
  `NM_CHA` varchar(300) DEFAULT NULL COMMENT '성명_한자',
  `GENDER_RCD` varchar(20) DEFAULT NULL COMMENT '성별코드[CMN012]',
  `BRTDY` varchar(8) DEFAULT NULL COMMENT '생년월일',
  `LNR_SLR_DIV_RCD` varchar(20) DEFAULT NULL COMMENT '음력양력구분코드[CMN013]',
  `NAT_RCD` varchar(20) DEFAULT NULL COMMENT '국가코드[CMN019]',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`PARTY_ID`),
  KEY `CMN_PARTY_IX_01` (`NM_KOR`(255)),
  KEY `CMN_PARTY_IX_02` (`RESNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='구성원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_party`
--

LOCK TABLES `cmn_party` WRITE;
/*!40000 ALTER TABLE `cmn_party` DISABLE KEYS */;
INSERT INTO `cmn_party` VALUES ('000000000000010',NULL,'ADMIN',NULL,NULL,'CMN012.01',NULL,NULL,'CMN019.410','2020-04-09 19:37:16','E000000061','cmnCParty_s',NULL,'2020-04-09 19:37:16','E000000061','cmnCParty_s',NULL);
/*!40000 ALTER TABLE `cmn_party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_tmp_reg_fee`
--

DROP TABLE IF EXISTS `cmn_tmp_reg_fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_tmp_reg_fee` (
  `SCH_YEAR` varchar(4) NOT NULL COMMENT '학년도',
  `SMT_RCD` varchar(10) NOT NULL COMMENT '학기코드[TMP006]',
  `STUD_NO` varchar(20) NOT NULL COMMENT '학번',
  `REG_CLS_RCD` varchar(10) NOT NULL COMMENT '등록분류코드[TMP007]',
  `IFR_DT` datetime NOT NULL COMMENT '고지일자',
  `PAY_CLOSE_DT` datetime NOT NULL COMMENT '납입마감일자',
  `DIV_PAY_REQ_DT` datetime DEFAULT NULL COMMENT '분납요청일자',
  `DIV_PAY_DESC` varchar(300) DEFAULT NULL COMMENT '분납내역',
  `DIV_PAY_TYPE_CD` varchar(10) DEFAULT NULL COMMENT '분납유형코드',
  `DIV_PAY_STAT_RCD` varchar(10) DEFAULT NULL COMMENT '분납상태코드[TMP008]',
  `DIV_PAY_NO` varchar(20) DEFAULT NULL COMMENT '분납번호',
  `BKG_PNT` decimal(15,0) DEFAULT NULL COMMENT '수강신청학점',
  `BKG_TIME` decimal(15,0) DEFAULT NULL COMMENT '수강신청시간',
  `REG_STUD_DIV_RCD` varchar(10) DEFAULT NULL COMMENT '등록생구분코드[TMP009]',
  `REMARK` varchar(1000) DEFAULT NULL COMMENT '비고',
  `REF_KEY` varchar(50) DEFAULT NULL COMMENT '참조키',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`SCH_YEAR`,`SMT_RCD`,`STUD_NO`,`REG_CLS_RCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='템플릿 등록금';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_tmp_reg_fee`
--

LOCK TABLES `cmn_tmp_reg_fee` WRITE;
/*!40000 ALTER TABLE `cmn_tmp_reg_fee` DISABLE KEYS */;
INSERT INTO `cmn_tmp_reg_fee` VALUES ('1900','TMP00601','4','TMP00701','2020-03-17 00:00:00','2020-03-17 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-17 15:11:23','E000000061','cmnCGridGrid','','2020-03-17 15:11:23','E000000061','cmnCGridGrid',''),('1900','TMP00601','4','TMP00702','2020-03-17 00:00:00','2020-03-17 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-17 15:11:46','E000000061','cmnCGridGrid','','2020-03-17 15:11:46','E000000061','cmnCGridGrid',''),('1900','TMP00601','4','TMP00703','2020-03-17 00:00:00','2020-03-17 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-17 15:11:46','E000000061','cmnCGridGrid','','2020-03-17 15:11:46','E000000061','cmnCGridGrid',''),('2020','TMP00601','1','TMP00701','2020-03-03 03:00:00','2020-03-03 03:00:00','2020-03-06 00:00:00','','','','',NULL,NULL,'TMP00901','','','2020-03-16 11:36:41','E000000061','','','2020-03-16 11:46:08','E000000061','cmnCGridGrid',''),('2030','TMP00601','1','TMP00702','2020-03-06 00:00:00','2020-03-06 00:00:00',NULL,NULL,NULL,'TMP00801',NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-16 11:46:08','E000000061','cmnCGridGrid','','2020-03-16 11:46:08','E000000061','cmnCGridGrid','');
/*!40000 ALTER TABLE `cmn_tmp_reg_fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_usr_oper_grp`
--

DROP TABLE IF EXISTS `cmn_usr_oper_grp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_usr_oper_grp` (
  `USER_ID` varchar(50) NOT NULL COMMENT '사용자ID[학번/교직번]',
  `OPRT_ROLE_ID` varchar(20) NOT NULL COMMENT '업무역할ID',
  `ST_DT` varchar(8) NOT NULL COMMENT '시작일자',
  `ED_DT` varchar(8) NOT NULL COMMENT '종료일자',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_ID`,`OPRT_ROLE_ID`),
  KEY `CMN_USR_OPER_GRP_FK_01` (`USER_ID`),
  KEY `CMN_USR_OPER_GRP_FK_02` (`OPRT_ROLE_ID`),
  CONSTRAINT `FK01_CMN_USR_OPER_GRP` FOREIGN KEY (`OPRT_ROLE_ID`) REFERENCES `cmn_role` (`OPRT_ROLE_ID`),
  CONSTRAINT `FK02_CMN_USR_OPER_GRP` FOREIGN KEY (`USER_ID`) REFERENCES `cmn_use_user` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자업무역할';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_usr_oper_grp`
--

LOCK TABLES `cmn_usr_oper_grp` WRITE;
/*!40000 ALTER TABLE `cmn_usr_oper_grp` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmn_usr_oper_grp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_role`
--

DROP TABLE IF EXISTS `cmn_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_role` (
  `OPRT_ROLE_ID` varchar(20) NOT NULL COMMENT '업무역할ID',
  `OPRT_ROLE_NM` varchar(300) NOT NULL COMMENT '업무역할명',
  `OPRT_ROLE_DESC` varchar(4000) DEFAULT NULL COMMENT '업무역할내역',
  `USE_YN` char(1) DEFAULT 'N' COMMENT '사용여부',
  `BSIC_AUTH_YN` varchar(1) DEFAULT 'N' COMMENT '기본권한여부',
  `ST_DT` varchar(8) NOT NULL COMMENT '시작일자',
  `ED_DT` varchar(8) NOT NULL COMMENT '종료일자',
  `DUSE_DT` varchar(8) DEFAULT NULL COMMENT '폐기일자',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`OPRT_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='업무역할';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_role`
--

LOCK TABLES `cmn_role` WRITE;
/*!40000 ALTER TABLE `cmn_role` DISABLE KEYS */;
INSERT INTO `cmn_role` VALUES ('ADMIN_CMN','공통 관리자','','Y','Y','20200327','20991231','','2020-03-27 16:23:32','E000000061','cmnCRole_s','','2020-03-27 16:26:43','E000000061','cmnCRole_s',''),('ADMIN_TST','테스트 관리자','','Y','Y','20200327','20991231','','2020-03-27 16:23:43','E000000061','cmnCRole_s','','2020-03-27 16:26:43','E000000061','cmnCRole_s',''),('TMT_STAFF','토마토 내부 직원',NULL,'Y','Y','20200716','20991231',NULL,'2020-07-16 17:44:13','TST008','cmnCRole','211.109.22.200','2020-07-16 17:44:13','TST008','cmnCRole','211.109.22.200');
/*!40000 ALTER TABLE `cmn_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_default_role`
--

DROP TABLE IF EXISTS `cmn_default_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_default_role` (
  `USER_DIV` varchar(300) NOT NULL COMMENT '사용자구분',
  `STAT_RCD` varchar(20) NOT NULL COMMENT '상태코드[CMN049]',
  `OPRT_ROLE_ID` varchar(20) NOT NULL COMMENT '업무역할ID',
  `DEPT_CD` varchar(5) NOT NULL DEFAULT 'ALL' COMMENT '부서코드[ALL]',
  `JOBKND_RCD` varchar(20) NOT NULL DEFAULT 'ALL' COMMENT '직종코드[APS003,ALL]',
  `USE_YN` char(1) NOT NULL DEFAULT 'N' COMMENT '사용여부',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_DIV`(255),`STAT_RCD`,`OPRT_ROLE_ID`,`DEPT_CD`,`JOBKND_RCD`),
  KEY `CMN_DEFAULT_ROLE_FK_01` (`OPRT_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자그룹별기본권한';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_default_role`
--

LOCK TABLES `cmn_default_role` WRITE;
/*!40000 ALTER TABLE `cmn_default_role` DISABLE KEYS */;
INSERT INTO `cmn_default_role` VALUES ('TST001','CMN049.0001','ADMIN_CMN','ALL','ALL','Y','2020-04-10 11:20:18','TST008','cmnCDfUserRole','211.109.22.200','2020-04-10 11:20:18','TST008','cmnCDfUserRole','211.109.22.200'),('TST001','CMN049.0001','ADMIN_TST','ALL','ALL','Y','2020-04-10 11:20:28','TST008','cmnCDfUserRole','211.109.22.200','2020-04-10 11:20:28','TST008','cmnCDfUserRole','211.109.22.200'),('TST002','CMN049.0001','TMT_STAFF','ALL','ALL','Y','2020-07-16 17:45:14','TST008','cmnCDfUserRole','211.109.22.200','2020-07-16 17:45:14','TST008','cmnCDfUserRole','211.109.22.200');
/*!40000 ALTER TABLE `cmn_default_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_message`
--

DROP TABLE IF EXISTS `cmn_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_message` (
  `UNIT_SYS_RCD` varchar(20) NOT NULL COMMENT '단위시스템코드[CMN003]',
  `MSG_CD` varchar(10) NOT NULL COMMENT '메시지코드',
  `LANG_DIV_RCD` varchar(20) NOT NULL COMMENT '언어구분코드[CMN006]',
  `MSG_DIV_RCD` varchar(20) NOT NULL COMMENT '메시지구분코드[CMN037]',
  `MSG_TEXT` varchar(1500) NOT NULL COMMENT '메시지텍스트',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`UNIT_SYS_RCD`,`MSG_CD`,`LANG_DIV_RCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='서버메시지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_message`
--

LOCK TABLES `cmn_message` WRITE;
/*!40000 ALTER TABLE `cmn_message` DISABLE KEYS */;
INSERT INTO `cmn_message` VALUES ('CMN003.CMN','-104','CMN006.KR','CMN037.DB','문자',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-177','CMN006.KR','CMN037.DB','삽입 값 또는 갱신 값의 수가 컬럼의 수와 동일하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-180','CMN006.KR','CMN037.DB','날짜 형식이 올바르지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-181','CMN006.KR','CMN037.DB','날짜 범위를 벗어났습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-204','CMN006.KR','CMN037.DB','정의되지 않은 오브젝트 이름이나 제한조건 이름이 발견되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-206','CMN006.KR','CMN037.DB','정의되지 않은 컬럼',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-302','CMN006.KR','CMN037.DB','입력하신 값이 너무 큽니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-407','CMN006.KR','CMN037.DB','필수입력값({0})이 입력되지 않았습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-420','CMN006.KR','CMN037.DB','문자 값이 유효하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-4228','CMN006.KR','CMN037.DB','인식되지 않는 JDBC 유형입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-530','CMN006.KR','CMN037.DB','관련정보 ({0})가 존재하지 않아',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-532','CMN006.KR','CMN037.DB','관련정보 ({0})가 존재하여 해당 데이터에 대한 삭제 또는 변경작업이 불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-801','CMN006.KR','CMN037.DB','0으로 나눌 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-803','CMN006.KR','CMN037.DB','입력하려는 자료가 이미 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','-9999','CMN006.KR','CMN037.DB','자료처리중 오류가 발생하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','1062','CMN006.KR','CMN037.DB','중복된 데이터가 존재합니다.','2020-04-28 17:02:56','TST008','cmnCMessage','211.109.22.200','2020-04-28 17:02:56','TST008','cmnCMessage','211.109.22.200'),('CMN003.CMN','CMN001','CMN006.KR','CMN037.ERR','정상적인 접근방식이 아닙니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN002','CMN006.KR','CMN037.WRN','일정시간동안 서비스 이용이 없습니다.n안전한 시스템 사용을 위해 자동 로그아웃됩니다.n재로그인하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN003','CMN006.KR','CMN037.ERR','사용자 세션이 존재 하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN004','CMN006.KR','CMN037.ERR','메뉴정보가 존재하지 않습니다. n관리자에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN005','CMN006.KR','CMN037.ERR','사용자정보가 일치하지 않습니다. n관리자에게 문의하세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN006','CMN006.KR','CMN037.WRN','실행하신 요청에 대한 데이터 처리 권한이 없습니다.n재로그인 후 다시 시도해 주시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN007','CMN006.KR','CMN037.ERR','지정된 아이피에서만 사용가능한 프로그램 입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN008','CMN006.KR','CMN037.WRN','【중복로그인 금지안내】n다른 PC 또는 브라우저에서 로그인 되어 이전에 로그인된 브라우저에서는 자동로그아웃 처리됩니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN009','CMN006.KR','CMN037.ERR','포틀릿과 연계된 화면을 찾을 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN010','CMN006.KR','CMN037.ERR','입력하신 {0}은(는) 존재하지 않는 아이디입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN011','CMN006.KR','CMN037.ERR','비밀번호가 정확하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN012','CMN006.KR','CMN037.WRN','{0}은(는) 변경불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN013','CMN006.KR','CMN037.WRN','{0}은(는) 삭제불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN014','CMN006.KR','CMN037.WRN','{0}의 복사할 데이터가 존재하지 않습니다. 자료를 확인해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN015','CMN006.KR','CMN037.WRN','{0}에 대한 중복된 데이터가 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN016','CMN006.KR','CMN037.WRN','{0}의 자료가 이미 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN017','CMN006.KR','CMN037.ERR','파일다운로드시 오류가 발생했습니다.n파일이 존재하지 않거나 네트워크가 불안정합니다.n관리자에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN018','CMN006.KR','CMN037.ERR','파일 업로드시 오류가 발생했습니다. n파일이 존재하지 않거나 네트워크가 불안정합니다.n관리자에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN019','CMN006.KR','CMN037.ERR','파일 삭제시 오류가 발생했습니다. n파일이 존재하지 않거나 네트워크가 불안정합니다.n관리자에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN020','CMN006.KR','CMN037.ERR','첨부파일이 존재하지 않아',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN021','CMN006.KR','CMN037.ERR','첨부파일을 저장할 저장소 경로가 존재하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN022','CMN006.KR','CMN037.WRN','{0} 확장자는 업로드 할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN023','CMN006.KR','CMN037.ERR','엑셀 출력에 실패하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN024','CMN006.KR','CMN037.WRN','입력한 주민등록번호[{0}]와 동일한 주민등록번호가 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN025','CMN006.KR','CMN037.WRN','대표주소로 지정된 주소가 하나도 존재하지 않습니다. 필히 하나의 주소를 대표주소로 지정하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN026','CMN006.KR','CMN037.WRN','{0} 업무영역상세에 지정업무영역이 존재하여 삭제할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN027','CMN006.KR','CMN037.WRN','하위부서의 데이터가 있어 삭제할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN028','CMN006.KR','CMN037.WRN','전자결재 연동서식 정보가 존재하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN030','CMN006.KR','CMN037.ERR','에러가 발생했습니다. n시스템 관리자에게 문의하여 주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN031','CMN006.KR','CMN037.ERR','잘못된 첨부파일 경로입니다.(보안상의 이유로 상위폴더에 대한 접근은 불가합니다.)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN032','CMN006.KR','CMN037.WRN','처리 조치중 또는 조치완료된 의뢰 건은 삭제가 불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN033','CMN006.KR','CMN037.WRN','해당 로그인ID로 이미 등록된 계정이 존재합니다.n다른 로그인ID를 입력하세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN034','CMN006.KR','CMN037.WRN','해당 계정은 대표계정입니다. 반드시 1개의 대표계정이 지정되어야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN035','CMN006.KR','CMN037.WRN','현재 비밀번호가 잘못되었습니다. 다시 확인해주시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN036','CMN006.KR','CMN037.ERR','{0} 의 하위 데이터가 있어 {1} 할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN037','CMN006.KR','CMN037.ERR','{0}이 아닙니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN038','CMN006.KR','CMN037.ERR','메뉴에 대한 접근권한이 없습니다.n시스템 관리자에게 문의하여 주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN039','CMN006.KR','CMN037.ERR','개인권한에 대한 프로그램 처리가 누락되었습니다.n보안상의 이유로 개인권한 처리를 수행하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN040','CMN006.KR','CMN037.ERR','본인의 자료만 조회가능합니다.n사용자 정보가 일치하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN041','CMN006.KR','CMN037.ERR','기준년도학기 설정이 존재하지 않습니다.n관리자에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN042','CMN006.KR','CMN037.ERR','엑셀 파일을 읽는 도중 오류가 발생하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN043','CMN006.KR','CMN037.ERR','전자서명 연동서식 정보가 존재하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN044','CMN006.KR','CMN037.WRN','{0} 기간이 아닙니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN045','CMN006.KR','CMN037.ERR','전년도 데이터가 존재 하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN046','CMN006.KR','CMN037.ERR','현재년도[{0}] 데이터가 존재합니다.n현재년도[{0}] 데이터 삭제 후 전년도 데이터를 복사',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN047','CMN006.KR','CMN037.ERR','발송 초기화에 실패하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN048','CMN006.KR','CMN037.ERR','부서별 메시지 한도를 초과하여 메시지를 보낼 수 없습니다. 정보지원센터에 확인하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN049','CMN006.KR','CMN037.WRN','예약 발송은 현재 시간 이후로 입력되어야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN050','CMN006.KR','CMN037.WRN','업로드 할 데이터가 존재하지 않습니다.n확인 후 다시 시도하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN051','CMN006.KR','CMN037.WRN','{0} 일정이 이미 존재합니다. 확인 후 다시 시도하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN052','CMN006.KR','CMN037.ERR','{0} 데이터가 존재하지 않습니다. n확인 후 다시 시도하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN053','CMN006.KR','CMN037.ERR','하위에 상세코드 내역이 존재하여 삭제가 불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN054','CMN006.KR','CMN037.WRN','전자결재 연계에 필요한 서식정보가 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN056','CMN006.KR','CMN037.ERR','해당하는 전자결재 연계설정 폼문서를 찾을 수 없습니다. FORM-MAP-ID【{0}】 FORM ID【{1}】',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN057','CMN006.KR','CMN037.ERR','해당하는 전자결재 연계설정 폼문서 로딩중 오류가 발생하였습니다.(XML로딩 실패)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN058','CMN006.KR','CMN037.WRN','{0}에 {1}({2})님이 상신하여 {3}중인 연계 건이 존재하여 연계처리 할 수 없습니다.n진행 중인 연계건일 경우 전자결재에서 반려 또는 회수 처리 후 재연계하여 주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN059','CMN006.KR','CMN037.ERR','결재 연동양식에 지정된 값({0})이 조회결과 값에 없습니다. FORM-MAP-ID【{1}】 FORM ID【{2}】',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN060','CMN006.KR','CMN037.ERR','{0}은(는) 필수값입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN061','CMN006.KR','CMN037.ERR','해당 캠퍼스가 존재하지 않거나 권한이 없습니다.n캠퍼스를 다시 선택해주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN062','CMN006.KR','CMN037.WRN','다른 PC또는 브라우저에서 로그인되어 이전 로그인된 현재 창은 자동 로그아웃 됩니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN063','CMN006.KR','CMN037.ERR','지금은 {0} 기간입니다.n다시 로그인해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN064','CMN006.KR','CMN037.ERR','발송문이 등록되지 않았습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN065','CMN006.KR','CMN037.ERR','메일 발송에 실패하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN066','CMN006.KR','CMN037.ERR','메시지 ID가 입력되지 않았습니다.n정보통신팀에게 문의바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN067','CMN006.KR','CMN037.WRN','{0}데이터가 존재하지 않아 {1} 할 수 없습니다.n확인 후 다시 시도하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN068','CMN006.KR','CMN037.WRN','{0}된 데이터는 {1}할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN069','CMN006.KR','CMN037.WRN','{0}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN070','CMN006.KR','CMN037.WRN','해당 외부인ID로 이미 등록된 계정이 존재합니다.n다른 외부인ID를 입력하세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN071','CMN006.KR','CMN037.WRN','통합정보 계정의 사용기간이 종료되어 시스템을 사용할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN072','CMN006.KR','CMN037.WRN','입력하신 패스워드가 일치하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CMN003.CMN','CMN073','CMN006.KR','CMN037.WRN','사용자관리에 해당 구성원이 존재하여 삭제할 수 없습니다.','2020-03-30 14:42:31','E000000061','cmnCMessage_s','','2020-03-30 14:42:31','E000000061','cmnCMessage_s','');
/*!40000 ALTER TABLE `cmn_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_log_event`
--

DROP TABLE IF EXISTS `cmn_log_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_log_event` (
  `ACCES_DTTM` timestamp NULL DEFAULT NULL COMMENT '접근일시',
  `SES_KEY` varchar(300) DEFAULT NULL COMMENT '세션키',
  `MENU_ID` varchar(50) DEFAULT NULL COMMENT '메뉴ID',
  `REQ_URL` varchar(255) DEFAULT NULL COMMENT '요청URL',
  `PARAM` varchar(4000) DEFAULT NULL COMMENT '매개변수',
  `USER_ID` varchar(50) DEFAULT NULL COMMENT '사용자ID',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='접근이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_log_event`
--

LOCK TABLES `cmn_log_event` WRITE;

/*!40000 ALTER TABLE `cmn_log_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_oper_menu`
--

DROP TABLE IF EXISTS `cmn_oper_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_oper_menu` (
  `OPRT_ROLE_ID` varchar(20) NOT NULL COMMENT '업무역할ID',
  `MENU_ID` varchar(50) NOT NULL COMMENT '메뉴ID',
  `PGM_ID` varchar(50) NOT NULL COMMENT '프로그램ID',
  `USE_AUTH_RCD` varchar(20) NOT NULL COMMENT '사용권한코드[CMN045]',
  `DEPT_AUTH_RCD` varchar(20) DEFAULT NULL COMMENT '부서권한코드[CMN035]',
  `DOWNLD_YN` varchar(1) DEFAULT 'N' COMMENT '다운로드여부',
  `PRT_YN` varchar(1) DEFAULT 'N' COMMENT '출력여부',
  `MSG_SND_YN` varchar(1) DEFAULT 'N' COMMENT '메시지발송여부',
  `EMAIL_SND_YN` varchar(1) DEFAULT 'N' COMMENT '이메일발송여부',
  `MENU_URL` varchar(50) DEFAULT NULL COMMENT '메뉴URL',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`OPRT_ROLE_ID`,`MENU_ID`,`PGM_ID`),
  KEY `CMN_OPER_MENU_FK_01` (`OPRT_ROLE_ID`),
  KEY `CMN_OPER_MENU_FK_02` (`MENU_ID`,`PGM_ID`),
  CONSTRAINT `FK02_CMN_OPER_MENU` FOREIGN KEY (`MENU_ID`, `PGM_ID`) REFERENCES `cmn_menu` (`MENU_ID`, `PGM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='업무역할별 메뉴';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_oper_menu`
--

LOCK TABLES `cmn_oper_menu` WRITE;
/*!40000 ALTER TABLE `cmn_oper_menu` DISABLE KEYS */;
INSERT INTO `cmn_oper_menu` VALUES ('ADMIN_CMN','00010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','00030','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','CMN010010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','CMN010020','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','CMN010030','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','CMN010040','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','CMN010060','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-24 10:34:46','TST008','cmnCRoleMenu','211.109.22.200','2020-06-24 10:34:46','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','cmnCCareReq','cmnCCareReq','CMN045.0001','','Y','Y','N','N','/CmnCareReq','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCClientMessage','cmnCClientMessage','CMN045.0001','','Y','Y','N','N','/CmnClientMessage','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCCode','cmnCCode','CMN045.0001','','Y','Y','N','N','/CmnCode','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCDfUserRole','cmnCDfUserRole','CMN045.0001','','Y','Y','N','N','/CmnDfUserRole','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCGrid','cmnCGrid','CMN045.0001','','Y','Y','N','N','/CmnGrid','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCGridForm','cmnCGridForm','CMN045.0001','','Y','Y','N','N','/CmnGridForm','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCGridFormOnes','cmnCGridFormOnes','CMN045.0001','','Y','Y','N','N','/CmnGridFormOnes','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCGridGrid','cmnCGridGrid','CMN045.0001','','Y','Y','N','N','/CmnGridGrid','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCMenu','cmnCMenu','CMN045.0001','','Y','Y','N','N','/CmnMenu','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCMessage','cmnCMessage','CMN045.0001','','Y','Y','N','N','/CmnMessage','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCParty','cmnCParty','CMN045.0001','','Y','Y','N','N','/CmnParty','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCPgm','cmnCPgm','CMN045.0001','','Y','Y','N','N','/CmnPgm','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCRole','cmnCRole','CMN045.0001','','Y','Y','N','N','/CmnRole','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCRoleMenu','cmnCRoleMenu','CMN045.0001','','Y','Y','N','N','/CmnRoleMenu','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200')
,('ADMIN_CMN','cmnCUserDiv','cmnCUserDiv','CMN045.0001','','Y','Y','N','N','/CmnUserDiv','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','cmnCUserRole','cmnCUserRole','CMN045.0001','','Y','Y','N','N','/CmnUserRole','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200')
,('ADMIN_CMN','cmnCUseUser','cmnCUseUser','CMN045.0001','','Y','Y','N','N','/CmnUseUser','2020-06-01 09:50:12','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 12:17:03','TST008','','211.109.22.200'),('ADMIN_CMN','Overview','Overview','CMN045.0001','CMN035.0001','Y','Y','N','N','/Overview','2020-06-01 13:13:48','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 13:13:48','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','TMP010010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 09:53:24','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_CMN','tstHome','tstHome','CMN045.0001','CMN035.0001','Y','Y','N','N','/tstHome','2020-06-24 10:34:46','TST008','cmnCRoleMenu','211.109.22.200','2020-06-24 10:34:46','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','00020','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010020','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010030','MENUHEADER','CMN045.0001','','Y','Y','N','N','','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 11:26:08','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010040','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010050','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010060','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','TST010070','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstAPIListMng','tstAPIListMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TSTAPIListMng','2020-07-30 10:26:46','TST005','cmnCRoleMenu','211.109.22.117','2020-07-30 10:26:46','TST005','cmnCRoleMenu','211.109.22.117'),('ADMIN_TST','tstCtrlAPICls','tstCtrlAPICls','CMN045.0001','','Y','Y','N','N','/TstCtrlApiCls','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 14:42:40','TST008','','211.109.22.200'),('ADMIN_TST','tstDstr','tstDstr','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstDstr','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstEquipMng','tstEquipMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstEquipMng','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstExb6VersMng','tstExb6VersMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstExb6VersMng','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstIsuMng','tstIsuMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstIsuMng','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstMeeting','tstMeeting','CMN045.0001','CMN035.0001','Y','Y','N','N','/tstMeeting','2020-08-18 17:04:22','TST010','cmnCRoleMenu','211.109.22.122','2020-08-18 17:04:22','TST010','cmnCRoleMenu','211.109.22.122'),('ADMIN_TST','tstMobTaskMng','tstMobTaskMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstMobTaskMng','2020-06-15 16:57:46','TST007','cmnCRoleMenu','211.109.22.116','2020-06-15 16:57:46','TST007','cmnCRoleMenu','211.109.22.116')
,('ADMIN_TST','tstPAutoTest','tstPAutoTest','CMN045.0001','','Y','Y','N','N','/TstAutoTest','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 16:30:15','TST008','Y21uQ1JvbGVNZW51JmNtbkNSb2xlTWVudQ==','211.109.22.200'),('ADMIN_TST','tstProcessStatistic','tstProcessStatistic','CMN045.0001','','Y','Y','N','N','/techProcessStatis','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 14:01:44','TST008','','211.109.22.200'),('ADMIN_TST','tstRsltActn','tstRsltActn','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstRsltActn','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstRsltStatistic','tstRsltStatistic','CMN045.0001','','Y','Y','N','N','/rsltStatistics','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 14:01:44','TST008','','211.109.22.200'),('ADMIN_TST','tstRsltVerify','tstRsltVerify','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstRsltVerify','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstRuleEleMng','tstRuleEleMng','CMN045.0001','','Y','Y','N','N','/TstRuleEle','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 16:28:08','TST008','Y21uQ1JvbGVNZW51JmNtbkNSb2xlTWVudQ==','211.109.22.200'),('ADMIN_TST','tstRuleSet','tstRuleSet','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstRuleSet','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstScmStatistic','tstScmStatistic','CMN045.0001','','Y','Y','N','N','/scmStatistics','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 14:01:44','TST008','','211.109.22.200'),('ADMIN_TST','tstScrMng','tstScrMng','CMN045.0001','','Y','Y','N','N','/TstScr','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-22 16:26:21','TST008','Y21uQ1JvbGVNZW51JmNtbkNSb2xlTWVudQ==','211.109.22.200'),('ADMIN_TST','tstTaskMng','tstTaskMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstTaskMng','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstTestCaseMng','tstTestCaseMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstTestCaseMng','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:10','TST008','cmnCRoleMenu','211.109.22.200'),('ADMIN_TST','tstWeeRep','tstWeeRep','CMN045.0001','CMN035.0001','Y','Y','N','N','/tstWeeRep','2020-08-24 09:05:10','TST010','cmnCRoleMenu','211.109.22.122','2020-08-24 09:05:10','TST010','cmnCRoleMenu','211.109.22.122'),('ADMIN_TST','tstXpathMng','tstXpathMng','CMN045.0001','CMN035.0001','Y','Y','N','N','/TstXpathMng','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200','2020-06-01 10:58:09','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','00010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','00020','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','00030','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','CMN010060','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','cmnCGrid','cmnCGrid','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','cmnCGridForm','cmnCGridForm','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','cmnCGridFormOnes','cmnCGridFormOnes','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','cmnCGridGrid','cmnCGridGrid','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','Overview','Overview','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','TMP010010','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','TST010060','MENUHEADER','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','tstHome','tstHome','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','tstProcessStatistic','tstProcessStatistic','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','tstRsltStatistic','tstRsltStatistic','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200'),('TMT_STAFF','tstScmStatistic','tstScmStatistic','CMN045.0001','CMN035.0001','Y','Y','N','N',NULL,'2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200','2020-07-16 17:45:00','TST008','cmnCRoleMenu','211.109.22.200');
/*!40000 ALTER TABLE `cmn_oper_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_menu`
--

DROP TABLE IF EXISTS `cmn_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_menu` (
  `MENU_ID` varchar(50) NOT NULL COMMENT '메뉴ID',
  `PGM_ID` varchar(50) NOT NULL COMMENT '프로그램ID',
  `UP_MENU_ID` varchar(50) DEFAULT NULL COMMENT '상위메뉴ID',
  `UP_PGM_ID` varchar(50) DEFAULT NULL COMMENT '상위프로그램ID',
  `MENU_NM` varchar(300) NOT NULL COMMENT '메뉴명',
  `MENU_NM_ENG` varchar(300) DEFAULT NULL COMMENT '메뉴명_영문',
  `MENU_NM_CHA` varchar(300) DEFAULT NULL COMMENT '메뉴명_한자',
  `UNIT_SYS_RCD` varchar(20) DEFAULT NULL COMMENT '단위시스템코드[CMN003]',
  `MENU_LVL` decimal(2,0) NOT NULL COMMENT '메뉴수준',
  `PRT_ORD` decimal(5,0) DEFAULT NULL COMMENT '출력순서',
  `USE_YN` char(1) DEFAULT 'N' COMMENT '사용여부',
  `MENU_YN` char(1) DEFAULT 'N' COMMENT '메뉴여부',
  `SHOW_YN` char(1) DEFAULT 'N' COMMENT '보이기여부',
  `CTRL_VAR_01` varchar(300) DEFAULT NULL COMMENT '제어변수1',
  `CTRL_VAR_02` varchar(300) DEFAULT NULL COMMENT '제어변수2',
  `CTRL_VAR_03` varchar(300) DEFAULT NULL COMMENT '제어변수3',
  `CTRL_VAR_04` varchar(300) DEFAULT NULL COMMENT '제어변수4',
  `ICON` varchar(100) DEFAULT NULL COMMENT '아이콘경로',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`MENU_ID`,`PGM_ID`),
  UNIQUE KEY `CMN_MENU_UX_01` (`MENU_ID`),
  KEY `CMN_MENU_FK_01` (`PGM_ID`),
  KEY `CMN_MENU_FK_03` (`UP_MENU_ID`,`UP_PGM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_menu`
--

LOCK TABLES `cmn_menu` WRITE;
/*!40000 ALTER TABLE `cmn_menu` DISABLE KEYS */;
INSERT INTO `cmn_menu` VALUES ('00010','MENUHEADER',NULL,NULL,'공통관리',NULL,NULL,'CMN003.CMN',0,1,'Y','Y','Y',NULL,NULL,NULL,NULL,'theme/blue/images/main/icon_left02.png','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69'),('00020','MENUHEADER',NULL,NULL,'테스트',NULL,NULL,'CMN003.TST',0,2,'Y','Y','Y',NULL,NULL,NULL,NULL,'theme/blue/images/main/icon_left01.png','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69'),('00030','MENUHEADER',NULL,NULL,'템플릿',NULL,NULL,'CMN003.TMP',0,3,'Y','Y','Y',NULL,NULL,NULL,NULL,'theme/blue/images/main/icon_left03.png','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:18:57','TST002','cmnCMenu','211.109.22.69'),('CMN010010','MENUHEADER','00010','MENUHEADER','코드관리',NULL,NULL,'CMN003.CMN',2,1,'Y','Y','Y',NULL,NULL,NULL,NULL,'','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69'),('CMN010020','MENUHEADER','00010','MENUHEADER','사용자관리',NULL,NULL,'CMN003.CMN',2,2,'Y','Y','Y',NULL,NULL,NULL,NULL,'','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69'),('CMN010030','MENUHEADER','00010','MENUHEADER','메뉴/업무역할',NULL,NULL,'CMN003.CMN',2,3,'Y','Y','Y',NULL,NULL,NULL,NULL,'','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69'),('CMN010040','MENUHEADER','00010','MENUHEADER','권한관리',NULL,NULL,'CMN003.CMN',2,4,'Y','Y','Y',NULL,NULL,NULL,NULL,'','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69'),('CMN010050','MENUHEADER','00010','MENUHEADER','연동',NULL,NULL,'CMN003.CMN',2,5,'N','N','N',NULL,NULL,NULL,NULL,'','2020-05-11 16:35:25','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:35:32','TST002','cmnCMenu','211.109.22.69'),('CMN010060','MENUHEADER','00010','MENUHEADER','공통',NULL,NULL,'CMN003.CMN',1,6,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-06-24 10:32:39','TST008','cmnCMenu','211.109.22.200','2020-06-24 10:32:54','TST008','cmnCMenu','211.109.22.200'),('cmnCCareReq','cmnCCareReq','CMN010010','MENUHEADER','변경요청관리',NULL,NULL,'CMN003.CMN',3,14,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:57:30','TST002','cmnCMenu','211.109.22.69','2020-06-23 12:12:36','TST008','cmnCMenu','211.109.22.200'),('cmnCClientMessage','cmnCClientMessage','CMN010010','MENUHEADER','클라이언트 메시지관리',NULL,NULL,'CMN003.CMN',3,12,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:57:30','TST002','cmnCMenu','211.109.22.69','2020-06-23 12:12:36','TST008','cmnCMenu','211.109.22.200'),('cmnCCode','cmnCCode','CMN010010','MENUHEADER','공통코드관리',NULL,NULL,'CMN003.CMN',3,10,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:57:30','TST002','cmnCMenu','211.109.22.69','2020-06-23 12:12:36','TST008','cmnCMenu','211.109.22.200'),('cmnCDfUserRole','cmnCDfUserRole','CMN010040','MENUHEADER','신분별기본권한',NULL,NULL,'CMN003.CMN',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:44','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:44','TST002','cmnCMenu','211.109.22.69'),('cmnCGrid','cmnCGrid','TMP010010','MENUHEADER','TEMLPATE(그리드)',NULL,NULL,'CMN003.TMP',3,100,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:10:48','TST002','cmnCMenu','211.109.22.69','2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200'),('cmnCGridForm','cmnCGridForm','TMP010010','MENUHEADER','TEMLPATE(그리드+폼상세[멀티])',NULL,NULL,'CMN003.TMP',3,102,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:10:48','TST002','cmnCMenu','211.109.22.69','2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200'),('cmnCGridFormOnes','cmnCGridFormOnes','TMP010010','MENUHEADER','TEMLPATE(그리드+폼상세[단건])',NULL,NULL,'CMN003.TMP',3,103,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:10:48','TST002','cmnCMenu','211.109.22.69','2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200'),('cmnCGridGrid','cmnCGridGrid','TMP010010','MENUHEADER','TEMLPATE(그리드+그리드)',NULL,NULL,'CMN003.TMP',3,101,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:10:48','TST002','cmnCMenu','211.109.22.69','2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200'),('cmnCMenu','cmnCMenu','CMN010030','MENUHEADER','메뉴관리',NULL,NULL,'CMN003.CMN',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69'),('cmnCMessage','cmnCMessage','CMN010010','MENUHEADER','서버 메시지관리',NULL,NULL,'CMN003.CMN',3,13,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:57:30','TST002','cmnCMenu','211.109.22.69','2020-06-23 12:12:36','TST008','cmnCMenu','211.109.22.200'),('cmnCParty','cmnCParty','CMN010020','MENUHEADER','구성원관리',NULL,NULL,'CMN003.CMN',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:59:18','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:59:18','TST002','cmnCMenu','211.109.22.69'),('cmnCPgm','cmnCPgm','CMN010030','MENUHEADER','프로그램관리',NULL,NULL,'CMN003.CMN',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69'),('cmnCRole','cmnCRole','CMN010030','MENUHEADER','업무역할',NULL,NULL,'CMN003.CMN',3,4,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69'),('cmnCRoleMenu','cmnCRoleMenu','CMN010030','MENUHEADER','업무역할메뉴',NULL,NULL,'CMN003.CMN',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:20','TST002','cmnCMenu','211.109.22.69'),('cmnCUserDiv','cmnCUserDiv','CMN010010','MENUHEADER','사용자구분관리',NULL,NULL,'CMN003.CMN',3,11,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:57:30','TST002','cmnCMenu','211.109.22.69','2020-06-23 12:12:36','TST008','cmnCMenu','211.109.22.200'),('cmnCUserRole','cmnCUserRole','CMN010040','MENUHEADER','사용자업무역할',NULL,NULL,'CMN003.CMN',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:00:44','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:00:44','TST002','cmnCMenu','211.109.22.69'),('cmnCUseUser','cmnCUseUser','CMN010020','MENUHEADER','사용자관리',NULL,NULL,'CMN003.CMN',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:59:18','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:59:18','TST002','cmnCMenu','211.109.22.69'),('Overview','Overview','TMP010010','MENUHEADER','디자인가이드',NULL,NULL,'CMN003.CMN',3,99,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200','2020-06-01 13:13:35','TST008','cmnCMenu','211.109.22.200'),('TMP010010','MENUHEADER','00030','MENUHEADER','업무',NULL,NULL,'CMN003.TMP',2,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:41:22','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:41:22','TST002','cmnCMenu','211.109.22.69'),('TST010010','MENUHEADER','00020','MENUHEADER','기초관리',NULL,NULL,'CMN003.TST',2,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:37:07','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010020','MENUHEADER','00020','MENUHEADER','케이스관리',NULL,NULL,'CMN003.TST',2,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:37:07','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010030','MENUHEADER','00020','MENUHEADER','분배',NULL,NULL,'CMN003.TST',2,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010040','MENUHEADER','00020','MENUHEADER','테스트관리',NULL,NULL,'CMN003.TST',2,4,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010050','MENUHEADER','00020','MENUHEADER','결과관리',NULL,NULL,'CMN003.TST',2,5,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010060','MENUHEADER','00020','MENUHEADER','통계',NULL,NULL,'CMN003.TST',2,6,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('TST010070','MENUHEADER','00020','MENUHEADER','기타',NULL,NULL,'CMN003.TST',2,7,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69','2020-05-11 16:40:34','TST002','cmnCMenu','211.109.22.69'),('tstAPIListMng','tstAPIListMng','TST010010','MENUHEADER','API 목록 관리',NULL,NULL,'CMN003.TST',3,4,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-07-30 10:25:37','TST005','cmnCMenu','211.109.22.117','2020-07-30 10:25:37','TST005','cmnCMenu','211.109.22.117'),('tstCtrlAPICls','tstCtrlAPICls','TST010010','MENUHEADER','컨트롤 API 분류',NULL,NULL,'CMN003.TST',3,5,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:11','TST002','cmnCMenu','211.109.22.69','2020-07-30 10:25:37','TST005','cmnCMenu','211.109.22.117'),('tstDstr','tstDstr','TST010030','MENUHEADER','테스트 분배',NULL,NULL,'CMN003.TST',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69'),('tstEquipMng','tstEquipMng','TST010070','MENUHEADER','테스트 장비 관리',NULL,NULL,'CMN003.TST',3,4,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:10:20','TST002','cmnCMenu','211.109.22.69','2020-08-24 09:03:51','TST010','cmnCMenu','211.109.22.122'),('tstExb6VersMng','tstExb6VersMng','TST010010','MENUHEADER','eXbuilder6 버전 관리',NULL,NULL,'CMN003.TST',3,6,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:11','TST002','cmnCMenu','211.109.22.69','2020-07-30 10:25:37','TST005','cmnCMenu','211.109.22.117'),('tstHome','tstHome','CMN010060','MENUHEADER','홈',NULL,NULL,'CMN003.CMN',2,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-06-24 10:34:23','TST008','cmnCMenu','211.109.22.200','2020-06-24 10:34:23','TST008','cmnCMenu','211.109.22.200'),('tstIsuMng','tstIsuMng','TST010020','MENUHEADER','SCM 관리',NULL,NULL,'CMN003.TST',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69'),('tstMeeting','tstMeeting','TST010070','MENUHEADER','회의록 관리 ',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-08-18 16:59:24','TST010','cmnCMenu','211.109.22.122','2020-08-18 16:59:24','TST010','cmnCMenu','211.109.22.122'),('tstMobTaskMng','tstMobTaskMng','TST010040','MENUHEADER','모바일 테스트 매니져',NULL,NULL,'CMN003.TST',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-06-15 14:11:03','TST007','cmnCMenu','211.109.22.116','2020-06-15 14:19:00','TST007','cmnCMenu','211.109.22.116'),('tstPAutoTest','tstPAutoTest','TST010040','MENUHEADER','테스트 자동실행',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-28 16:31:45','TST003','cmnCMenu','211.109.22.128','2020-06-15 14:22:49','TST007','cmnCMenu','211.109.22.116'),('tstProcessStatistic','tstProcessStatistic','TST010060','MENUHEADER','테스트 통계',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:09:53','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:09:53','TST002','cmnCMenu','211.109.22.69'),('tstRsltActn','tstRsltActn','TST010050','MENUHEADER','테스트 결과 조치',NULL,NULL,'CMN003.TST',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:09:10','TST002','cmnCMenu','211.109.22.69','2020-08-10 10:00:26','TST005','cmnCMenu','211.109.22.117'),('tstRsltStatistic','tstRsltStatistic','TST010060','MENUHEADER','결과 통계',NULL,NULL,'CMN003.TST',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:09:53','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:09:53','TST002','cmnCMenu','211.109.22.69'),('tstRsltVerify','tstRsltVerify','TST010050','MENUHEADER','테스트 결과 검증',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:09:10','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:09:10','TST002','cmnCMenu','211.109.22.69'),('tstRuleEleMng','tstRuleEleMng','TST010030','MENUHEADER','테스트 룰요소 관리',NULL,NULL,'CMN003.TST',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69'),('tstRuleSet','tstRuleSet','TST010030','MENUHEADER','테스트 룰세트 관리',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:08:17','TST002','cmnCMenu','211.109.22.69'),('tstScmStatistic','tstScmStatistic','TST010060','MENUHEADER','SCM 통계',NULL,NULL,'CMN003.TST',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:09:53','TST002','cmnCMenu','211.109.22.69','2020-06-15 14:23:40','TST007','cmnCMenu','211.109.22.116'),('tstScrMng','tstScrMng','TST010020','MENUHEADER','테스트 화면 관리',NULL,NULL,'CMN003.TST',3,1,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69'),('tstTaskMng','tstTaskMng','TST010040','MENUHEADER','테스트 매니져',NULL,NULL,'CMN003.TST',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:08:42','TST002','cmnCMenu','211.109.22.69','2020-06-15 14:11:12','TST007','cmnCMenu','211.109.22.116'),('tstTestCaseMng','tstTestCaseMng','TST010020','MENUHEADER','테스트 케이스 관리',NULL,NULL,'CMN003.TST',3,2,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69','2020-05-11 17:07:48','TST002','cmnCMenu','211.109.22.69'),('tstWeeRep','tstWeeRep','TST010070','MENUHEADER','주간보고 관리',NULL,NULL,'CMN003.TST',3,3,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-08-24 09:03:51','TST010','cmnCMenu','211.109.22.122','2020-08-24 09:03:51','TST010','cmnCMenu','211.109.22.122'),('tstXpathMng','tstXpathMng','TST010010','MENUHEADER','xPath 관리',NULL,NULL,'CMN003.TST',3,7,'Y','Y','Y',NULL,NULL,NULL,NULL,NULL,'2020-05-11 17:07:11','TST002','cmnCMenu','211.109.22.69','2020-07-30 10:25:37','TST005','cmnCMenu','211.109.22.117');
/*!40000 ALTER TABLE `cmn_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_tmp_reg`
--

DROP TABLE IF EXISTS `cmn_tmp_reg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_tmp_reg` (
  `STUD_NO` varchar(20) NOT NULL COMMENT '학번',
  `PARTY_ID` varchar(20) NOT NULL COMMENT '구성원 ID',
  `REP_NM` varchar(100) NOT NULL COMMENT '대표명',
  `ENG_NM` varchar(100) DEFAULT NULL COMMENT '영어명',
  `CHA_NM` varchar(100) DEFAULT NULL COMMENT '한자명',
  `GENDER_RCD` varchar(10) DEFAULT NULL COMMENT '성별코드([TMP001])',
  `SSN` varchar(30) DEFAULT NULL COMMENT '주민번호',
  `STUD_DIV_RCD` varchar(10) DEFAULT NULL COMMENT '학생구분코드([TMP002])',
  `DEPT_CD` varchar(10) DEFAULT NULL COMMENT '학사부서코드',
  `DAY_NIGHT_DIV_RCD` varchar(10) DEFAULT NULL COMMENT '주야간코드([TMP003])',
  `NAT_RCD` varchar(10) DEFAULT NULL COMMENT '국가코드([TMP004])',
  `ZIPCODE` varchar(10) DEFAULT NULL COMMENT '우편번호',
  `ADDR1` varchar(500) DEFAULT NULL COMMENT '주소1',
  `ADDR2` varchar(500) DEFAULT NULL COMMENT '주소2',
  `CLP_NO` varchar(30) DEFAULT NULL COMMENT '휴대전화번호',
  `AEN` varchar(30) DEFAULT NULL COMMENT '내선번호',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '이메일',
  `BANK_RCD` varchar(10) DEFAULT NULL COMMENT '은행코드([TMP005])',
  `ACCT_NO` varchar(100) DEFAULT NULL COMMENT '계좌번',
  `OWNER_NM` varchar(100) DEFAULT NULL COMMENT '소유명',
  `FILE_SERIAL_NO` decimal(15,0) DEFAULT NULL COMMENT '파일순번',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`STUD_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='템플릿 학생정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_tmp_reg`
--

LOCK TABLES `cmn_tmp_reg` WRITE;
/*!40000 ALTER TABLE `cmn_tmp_reg` DISABLE KEYS */;
INSERT INTO `cmn_tmp_reg` VALUES ('1','000000000000001','강석민',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-04-28 16:57:26','TST008','cmnCGrid','211.109.22.200','2020-04-28 16:57:26','TST008','cmnCGrid','211.109.22.200'),('11','1','222','www','','','','','','','TMP00401','','','','','','','','','',NULL,'2020-03-12 19:32:35','E000000061','','','2020-05-13 19:01:54','','',''),('1111','1111','111','','','','','','','','','','','','','','','','','',NULL,'2020-03-23 11:50:47','E000000061','cmnCGridFormOnes','','2020-05-13 17:59:42','','',''),('3','3','이지율','Jeeeyul Lee','인샬라','TMP00101','','','','','TMP00401','','ㄳㄱㄷㅅㄱ','','','','','','','',NULL,'2020-03-12 19:26:41','E000000061','','','2020-07-23 13:19:39','TST011','cmnCGridGrid','211.109.22.199'),('33','333','33',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-16 10:31:40','E000000061','','','2020-03-16 10:31:40','E000000061','',''),('4','4','4','4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-12 19:26:41','E000000061','','','2020-03-12 19:26:41','E000000061','','');
/*!40000 ALTER TABLE `cmn_tmp_reg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_fvr_menu`
--

DROP TABLE IF EXISTS `cmn_fvr_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_fvr_menu` (
  `USER_ID` varchar(50) NOT NULL COMMENT '사용자ID[학번/교직번]',
  `MENU_ID` varchar(50) NOT NULL COMMENT '메뉴ID',
  `PGM_ID` varchar(50) NOT NULL COMMENT '프로그램ID',
  `PRT_ORD` decimal(5,0) DEFAULT NULL COMMENT '출력순서',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_ID`,`MENU_ID`,`PGM_ID`),
  KEY `CMN_FVR_MENU_FK_01` (`MENU_ID`,`PGM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='즐겨찾기';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_fvr_menu`
--

LOCK TABLES `cmn_fvr_menu` WRITE;
/*!40000 ALTER TABLE `cmn_fvr_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmn_fvr_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_pgm`
--

DROP TABLE IF EXISTS `cmn_pgm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_pgm` (
  `PGM_ID` varchar(50) NOT NULL COMMENT '프로그램ID',
  `PGM_NM` varchar(300) NOT NULL COMMENT '프로그램명',
  `UNIT_SYS_RCD` varchar(20) NOT NULL COMMENT '단위시스템코드[CMN003]',
  `PGM_DIV_RCD` varchar(20) DEFAULT NULL COMMENT '프로그램구분코드[CMN059]',
  `PGM_TYPE_RCD` varchar(20) DEFAULT NULL COMMENT '프로그램유형코드[CMN060]',
  `CALL_PAGE` varchar(255) DEFAULT NULL COMMENT '호출페이지',
  `MOBILE_YN` char(1) DEFAULT 'N' COMMENT '모바일사용여부',
  `USE_YN` char(1) DEFAULT 'N' COMMENT '사용여부',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`PGM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='프로그램';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_pgm`
--

LOCK TABLES `cmn_pgm` WRITE;
/*!40000 ALTER TABLE `cmn_pgm` DISABLE KEYS */;
INSERT INTO `cmn_pgm` VALUES ('cmnCCareReq','변경요청관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCCareReq.clx','Y','Y','2020-03-27 14:09:08','E000000061','cmnCPgm_s','','2020-03-27 17:18:49','E000000061','cmnCPgm_s',''),('cmnCClientMessage','클라이언트 메시지관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCClientMessage.clx','Y','Y','2020-03-27 14:11:36','E000000061','cmnCPgm_s','','2020-03-27 14:11:36','E000000061','cmnCPgm_s',''),('cmnCCode','공통코드관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCCode.clx','Y','Y','2020-03-19 13:37:35','E000000061','cmnCPgm_s','','2020-03-19 13:51:06','E000000061','cmnCPgm_s',''),('cmnCDfUserRole','신분별기본권한','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCDfUserRole.clx','Y','Y','2020-03-27 14:12:31','E000000061','cmnCPgm_s','','2020-03-27 14:12:31','E000000061','cmnCPgm_s',''),('cmnCGrid','TEMLPATE(그리드)','CMN003.TMP','CMN059.04','CMN060.01','app/cmn/cmnCGrid.clx','Y','Y','2020-03-27 14:47:28','E000000061','cmnCPgm_s','','2020-03-27 14:50:48','E000000061','cmnCPgm_s',''),('cmnCGridForm','TEMLPATE(그리드+폼상세[단건)','CMN003.TMP','CMN059.04','CMN060.01','app/cmn/cmnCGridForm.clx','Y','Y','2020-03-27 14:47:28','E000000061','cmnCPgm_s','','2020-03-27 14:50:48','E000000061','cmnCPgm_s',''),('cmnCGridFormOnes','TEMLPATE(그리드+폼상세[멀티])','CMN003.TMP','CMN059.04','CMN060.01','app/cmn/cmnCGridFormOnes.clx','Y','Y','2020-03-27 14:47:28','E000000061','cmnCPgm_s','','2020-03-27 14:50:48','E000000061','cmnCPgm_s',''),('cmnCGridGrid','TEMLPATE(그리드+그리드)','CMN003.TMP','CMN059.04','CMN060.01','app/cmn/cmnCGridGrid.clx','Y','Y','2020-03-27 14:47:28','E000000061','cmnCPgm_s','','2020-03-27 14:50:48','E000000061','cmnCPgm_s',''),('cmnCMenu','메뉴관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCMenu.clx','Y','Y','2020-03-27 14:15:27','E000000061','cmnCPgm_s','','2020-03-27 14:15:27','E000000061','cmnCPgm_s',''),('cmnCMessage','서버 메시지관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCMessage.clx','Y','Y','2020-03-27 14:15:54','E000000061','cmnCPgm_s','','2020-03-27 14:15:54','E000000061','cmnCPgm_s',''),('cmnCParty','구성원관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCParty.clx','Y','Y','2020-03-27 14:16:13','E000000061','cmnCPgm_s','','2020-03-27 14:16:13','E000000061','cmnCPgm_s',''),('cmnCPgm','프로그램관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCPgm.clx','Y','Y','2020-03-27 14:17:32','E000000061','cmnCPgm_s','','2020-03-27 14:17:32','E000000061','cmnCPgm_s',''),('cmnCRole','업무역할','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCRole.clx','Y','Y','2020-03-27 14:18:43','E000000061','cmnCPgm_s','','2020-03-27 14:18:43','E000000061','cmnCPgm_s',''),('cmnCRoleMenu','업무역할메뉴','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCRoleMenu.clx','Y','Y','2020-03-27 14:18:43','E000000061','cmnCPgm_s','','2020-03-27 14:18:43','E000000061','cmnCPgm_s',''),('cmnCUserDiv','사용자구분관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCUserDiv.clx','Y','Y','2020-03-27 14:18:43','E000000061','cmnCPgm_s','','2020-03-27 14:18:43','E000000061','cmnCPgm_s',''),('cmnCUserRole','사용자업무역할','CMN003.CMN','CMN059.04','CMN060.02','app/cmn/cmnCUserRole.clx','Y','Y','2020-03-27 14:18:43','E000000061','cmnCPgm_s','','2020-03-27 14:21:52','E000000061','cmnCPgm_s',''),('cmnCUseUser','사용자관리','CMN003.CMN','CMN059.04','CMN060.01','app/cmn/cmnCUseUser.clx','Y','Y','2020-03-19 15:58:04','E000000061','cmnCPgm_s','','2020-03-19 15:58:04','E000000061','cmnCPgm_s',''),('MENUHEADER','MENUHEADER','CMN003.CMN','CMN059.04','CMN060.01',NULL,'N','Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Overview','디자인가이드','CMN003.CMN','CMN059.04','CMN060.02','theme/guide/Overview.clx','Y','Y','2020-06-01 13:13:06','TST008','cmnCPgm','211.109.22.200','2020-06-01 13:13:06','TST008','cmnCPgm','211.109.22.200'),('tstAPIListMng','API 목록 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstAPIListMng.clx','Y','Y','2020-07-30 10:24:07','TST005','cmnCPgm','211.109.22.117','2020-07-30 10:24:07','TST005','cmnCPgm','211.109.22.117'),('tstCtrlAPICls','컨트롤 API 분류','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstCtrlAPICls.clx','Y','Y','2020-04-13 17:49:59','TST005','cmnCPgm','211.109.22.117','2020-04-13 17:49:59','TST005','cmnCPgm','211.109.22.117'),('tstDstr','테스트 분배','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstDstr.clx','Y','Y','2020-03-27 14:54:48','E000000061','cmnCPgm_s','','2020-03-27 14:54:48','E000000061','cmnCPgm_s',''),('tstEquipMng','테스트 장비 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstEquipMng.clx','Y','Y','2020-04-10 18:06:46','TST002','cmnCPgm','211.109.22.69','2020-04-10 18:06:46','TST002','cmnCPgm','211.109.22.69'),('tstExb6VersMng','eXbuilder6 버전 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstExb6VersMng.clx','Y','Y','2020-03-27 14:54:48','E000000061','cmnCPgm_s','','2020-03-27 14:54:48','E000000061','cmnCPgm_s',''),('tstHome','홈','CMN003.CMN','CMN059.04','CMN060.02','app/tst/tstHome.clx','Y','Y','2020-06-15 20:07:23','TST010','cmnCPgm','211.109.22.122','2020-06-23 12:20:00','TST008','cmnCPgm','211.109.22.200'),('tstIsuMng','SCM 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstIsuMng.clx','Y','Y','2020-03-27 14:54:48','E000000061','cmnCPgm_s','','2020-03-27 14:54:48','E000000061','cmnCPgm_s',''),('tstMeeting','회의록 관리 ','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstMeeting.clx','Y','Y','2020-08-18 16:45:13','TST010','cmnCPgm','211.109.22.122','2020-08-18 17:06:56','TST010','cmnCPgm','211.109.22.122'),('tstMobTaskMng','모바일 테스트 매니져','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstMobTaskMng.clx','Y','Y','2020-06-15 11:31:58','TST007','cmnCPgm','211.109.22.116','2020-06-15 11:31:58','TST007','cmnCPgm','211.109.22.116'),('tstPAutoTest','테스트 자동실행','CMN003.TST','CMN059.04','CMN060.02','app/tst/tstAutoTest.clx','Y','Y','2020-05-28 16:31:25','TST003','cmnCPgm','211.109.22.128','2020-06-03 14:50:42','TST006','cmnCPgm','211.109.22.153'),('tstProcessStatistic','테스트 통계','CMN003.TST','CMN059.04','CMN060.02','app/tst/tstProcessStatistic.clx','Y','Y','2020-04-10 16:22:04','TST005','cmnCPgm','192.168.43.192','2020-05-06 08:40:14','TST002','cmnCPgm','211.109.22.69'),('tstRsltActn','테스트 결과 조치','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstRsltActn.clx','Y','Y','2020-03-27 14:54:48','E000000061','cmnCPgm_s','','2020-07-31 13:55:05','TST005','cmnCPgm','211.109.22.117'),('tstRsltStatistic','결과 통계','CMN003.TST','CMN059.04','CMN060.02','app/tst/tstRsltStatistic.clx','Y','Y','2020-05-06 08:42:31','TST002','cmnCPgm','211.109.22.69','2020-05-06 08:42:31','TST002','cmnCPgm','211.109.22.69'),('tstRsltVerify','테스트 결과 검증','CMN003.TST','CMN059.04','CMN060.02','app/tst/tstRsltVerify.clx','Y','Y','2020-03-27 14:54:48','E000000061','cmnCPgm_s','','2020-03-27 14:55:48','E000000061','cmnCPgm_s',''),('tstRuleEleMng','테스트 룰요소 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstRuleEleMng.clx','Y','Y','2020-03-27 14:57:11','E000000061','cmnCPgm_s','','2020-03-27 14:57:11','E000000061','cmnCPgm_s',''),('tstRuleSet','테스트 룰세트 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstRuleSet.clx','Y','Y','2020-03-27 14:57:30','E000000061','cmnCPgm_s','','2020-03-27 14:57:30','E000000061','cmnCPgm_s',''),('tstScmStatistic','SCM 통계','CMN003.TST','CMN059.04','CMN060.02','app/tst/tstScmStatistic.clx','Y','Y','2020-04-27 16:21:45','TST002','cmnCPgm','211.109.22.69','2020-04-27 16:21:45','TST002','cmnCPgm','211.109.22.69'),('tstScrMng','테스트 화면 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstScrMng.clx','Y','Y','2020-03-27 14:58:35','E000000061','cmnCPgm_s','','2020-03-27 14:58:35','E000000061','cmnCPgm_s',''),('tstTaskMng','테스트 매니져','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstTaskMng.clx','Y','Y','2020-03-27 14:58:35','E000000061','cmnCPgm_s','','2020-05-12 09:23:57','TST005','cmnCPgm','211.109.22.117'),('tstTestCaseMng','테스트 케이스 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstTestCaseMng.clx','Y','Y','2020-03-27 14:58:35','E000000061','cmnCPgm_s','','2020-03-27 14:58:35','E000000061','cmnCPgm_s',''),('tstWeeRep','주간보고 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstWeeRep.clx','Y','Y','2020-08-24 09:02:15','TST010','cmnCPgm','211.109.22.122','2020-08-24 09:02:15','TST010','cmnCPgm','211.109.22.122'),('tstXpathMng','xPath 관리','CMN003.TST','CMN059.04','CMN060.01','app/tst/tstXpathMng.clx','Y','Y','2020-03-27 14:58:35','E000000061','cmnCPgm_s','','2020-03-27 14:58:35','E000000061','cmnCPgm_s','');
/*!40000 ALTER TABLE `cmn_pgm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_mlanguage`
--

DROP TABLE IF EXISTS `cmn_mlanguage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_mlanguage` (
  `MSG_CD` varchar(10) NOT NULL COMMENT '메시지코드',
  `LANG_DIV_RCD` varchar(20) NOT NULL COMMENT '언어구분코드[CMN006]',
  `MSG_DIV_RCD` varchar(20) NOT NULL COMMENT '메시지구분코드[CMN037]',
  `MSG_TEXT` varchar(1500) NOT NULL COMMENT '메시지텍스트',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`MSG_CD`,`LANG_DIV_RCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='다국어관리(클라이언트메시지)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_mlanguage`
--

LOCK TABLES `cmn_mlanguage` WRITE;
/*!40000 ALTER TABLE `cmn_mlanguage` DISABLE KEYS */;
INSERT INTO `cmn_mlanguage` VALUES ('CMN-M001','CMN006.KR','CMN037.CMN','{0} 메뉴에 변경 요청건이 등록되었습니다.','2020-07-02 13:45:02','TST008','cmnCClientMessage','211.109.22.200','2020-07-02 15:04:12','TST008','cmnCClientMessage','211.109.22.200'),('CRM-M001','CMN006.KR','CMN037.CRM','저장 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M002','CMN006.KR','CMN037.CRM','삭제 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M003','CMN006.KR','CMN037.CRM','{0}에 변경된 데이터가 있습니다.\n저장하지 않은 데이터는 반영되지 않습니다.\n계속 진행하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M004','CMN006.KR','CMN037.CRM','마감 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M005','CMN006.KR','CMN037.CRM','{0} 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M006','CMN006.KR','CMN037.CRM','{0} 데이터가 존재합니다. 다시 생성하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M007','CMN006.KR','CMN037.CRM','전년도({0})의 {1} 정보를 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M008','CMN006.KR','CMN037.CRM','수정 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M009','CMN006.KR','CMN037.CRM','등록 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M010','CMN006.KR','CMN037.CRM','취소 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M011','CMN006.KR','CMN037.CRM','처리 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M012','CMN006.KR','CMN037.CRM','처리취소 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M013','CMN006.KR','CMN037.CRM','{0}을(를) 저장하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M014','CMN006.KR','CMN037.CRM','{0}을(를) 등록하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M015','CMN006.KR','CMN037.CRM','{0}을(를) 수정하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M016','CMN006.KR','CMN037.CRM','{0}을(를) 삭제하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M017','CMN006.KR','CMN037.CRM','{0}을(를) 취소하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M018','CMN006.KR','CMN037.CRM','{0}을(를) 생성하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M019','CMN006.KR','CMN037.CRM','{0}을(를) 생성취소하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M020','CMN006.KR','CMN037.CRM','{0}을(를) 처리하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M021','CMN006.KR','CMN037.CRM','{0}을(를) 처리취소하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M022','CMN006.KR','CMN037.CRM','{0}을(를) 일괄 수정하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M023','CMN006.KR','CMN037.CRM','{0}을(를) {1}하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M024','CMN006.KR','CMN037.CRM','기존에 있던 자료는 삭제됩니다. 계속 진행하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M035','CMN006.KR','CMN037.CRM','{0}년도 {1}의 데이터를 {2}년도 {3} 데이터로 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M036','CMN006.KR','CMN037.CRM','{0}건의 데이터가 존재합니다.\n삭제하시고 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M039','CMN006.KR','CMN037.CRM','{0}년도 데이터를 {1}년도 데이터로 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M040','CMN006.KR','CMN037.CRM','{0}년도 데이터가 존재합니다. {0}년도 데이터 삭제 후 {1}년도 데이터를 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M041','CMN006.KR','CMN037.CRM','{0}도 함께 삭제됩니다. \n그래도 삭제하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M044','CMN006.KR','CMN037.CRM','{0} 정보도 함께 삭제됩니다. \n그래도 삭제하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M045','CMN006.KR','CMN037.CRM','{0}년도 데이터를\n{1}년도 데이터로 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M047','CMN006.KR','CMN037.CRM','기준일 {0} 의 데이터를\n{1}의 데이터로 복사생성 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M052','CMN006.KR','CMN037.CRM','{0} 처리상태를 {1}(으)로 변경하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M054','CMN006.KR','CMN037.CRM','저장하면 다시 수정할 수 없습니다.\n 저장하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M055','CMN006.KR','CMN037.CRM','신청하시겠습니까?\n(신청처리 후 수정이 불가합니다.)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M056','CMN006.KR','CMN037.CRM','{0} 처리 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M057','CMN006.KR','CMN037.CRM','{0}을 기준으로 복사 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M058','CMN006.KR','CMN037.CRM','{0}의 데이터가 존재합니다. \n 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M060','CMN006.KR','CMN037.CRM','{0}학년도 {1} {2} 을(를) 하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M077','CMN006.KR','CMN037.CRM','{0}건의 데이터가 존재합니다.\n삭제하시고 생성하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M080','CMN006.KR','CMN037.CRM','{0}의 데이터를 {1}로 복사하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M083','CMN006.KR','CMN037.CRM','기존 대상자 정보는 삭제되고 대상자를 생성합니다. 계속하시겠습니까?',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CRM-M084','CMN006.KR','CMN037.CRM','분배 하시겠습니까?','2020-05-07 15:27:44','TST002','cmnCClientMessage','211.109.22.69','2020-05-07 15:27:44','TST002','cmnCClientMessage','211.109.22.69'),('ERR-SRV','CMN006.KR','CMN037.ERR','시스템 내부 장애가 발생하였습니다.\n 관리자에게 문의 하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M000','CMN006.KR','CMN037.INF','{0}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M001','CMN006.KR','CMN037.INF','조회되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M002','CMN006.KR','CMN037.INF','저장되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M003','CMN006.KR','CMN037.INF','삭제되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M004','CMN006.KR','CMN037.INF','조회된 내역이 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M005','CMN006.KR','CMN037.INF','갱신된 데이터가 조회되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M006','CMN006.KR','CMN037.INF','변경된 내역이 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M007','CMN006.KR','CMN037.INF','삭제할 데이터가 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M008','CMN006.KR','CMN037.INF','선택된 데이터가 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M009','CMN006.KR','CMN037.INF','마감되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M011','CMN006.KR','CMN037.INF','종료일은 시작일 이후로 선택해야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M012','CMN006.KR','CMN037.INF','프로그램 탭은 {0}개를 초과할 수 없습니다. \n열려있는 프로그램을 닫은후 선택해 주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M013','CMN006.KR','CMN037.INF','복사하였습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M014','CMN006.KR','CMN037.INF','취소되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M015','CMN006.KR','CMN037.INF','출력 되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M016','CMN006.KR','CMN037.INF','{0}건 {1}되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M017','CMN006.KR','CMN037.INF','생성되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M018','CMN006.KR','CMN037.INF','조치중 또는 조치완료된 건은 삭제가 불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M024','CMN006.KR','CMN037.INF','종료일시는 시작일시 이후로 작성하여야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M026','CMN006.KR','CMN037.INF','{0} 대상자를 선택해 주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M027','CMN006.KR','CMN037.INF','{0} 선택 후 {1}처리가 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M028','CMN006.KR','CMN037.INF','{0}학년도 {1}의 {2} 데이터가 복사 되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M029','CMN006.KR','CMN037.INF','{0}학년도 {1}의 {2} 정보가 없습니다. \n자료를 확인해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M030','CMN006.KR','CMN037.INF','대학(원)이 {0}인 경우에만 대학원 복사가 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M037','CMN006.KR','CMN037.INF','{0}번째 행의 {1}은(는) 이미 존재하는 {2}입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M038','CMN006.KR','CMN037.INF','{0}건 복사되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M039','CMN006.KR','CMN037.INF','{0}은(는)필수 선택 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M040','CMN006.KR','CMN037.INF','{0}건 업로드 되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M049','CMN006.KR','CMN037.INF','처리되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M050','CMN006.KR','CMN037.INF','{0}이 전체인 경우, {1} 또는  {2}중에 하나는 필수입력입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M051','CMN006.KR','CMN037.INF','{0}의 데이터가 없습니다. \n자료를 확인해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M052','CMN006.KR','CMN037.INF','{0}학년도 {1}의 정보가 {2}학년도 {3}로 복사 되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M053','CMN006.KR','CMN037.INF','변경전과 변경후 {0}은(는) 동일할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M054','CMN006.KR','CMN037.INF','즐겨찾기 추가되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M065','CMN006.KR','CMN037.INF','{0}건 확정처리 되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M067','CMN006.KR','CMN037.INF','이미 확정 처리된 내역이있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M079','CMN006.KR','CMN037.INF','{0}의 {1}번째 데이터에서 {2}은(는) 필수 입력 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M080','CMN006.KR','CMN037.INF','개인권한이 없는 사용자는 조회만 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M081','CMN006.KR','CMN037.INF','{0}의 {1}는 1건만 선택 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M083','CMN006.KR','CMN037.INF','조회 기간은 최대 {0} 입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M100','CMN006.KR','CMN037.INF','확정처리되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M101','CMN006.KR','CMN037.INF','확정취소처리되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M102','CMN006.KR','CMN037.INF','하나의 행만 선택해 주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M103','CMN006.KR','CMN037.INF','복사되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M105','CMN006.KR','CMN037.INF','사용여부가 미사용인 경우 삭제불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M113','CMN006.KR','CMN037.INF','발송되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M126','CMN006.KR','CMN037.INF','승인되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M127','CMN006.KR','CMN037.INF','승인취소되었습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('INF-M128','CMN006.KR','CMN037.INF','기본권한은 삭제에서 제외되었습니다.','2020-05-07 16:06:18','TST002','cmnCClientMessage','211.109.22.69','2020-05-07 16:06:18','TST002','cmnCClientMessage','211.109.22.69'),('INF-M129','CMN006.KR','CMN037.INF','선택된 {0} 데이터가 없습니다.','2020-06-22 10:09:58','TST008','cmnCClientMessage','211.109.22.200','2020-06-22 10:09:58','TST008','cmnCClientMessage','211.109.22.200'),('WRN-M001','CMN006.KR','CMN037.WRN','{0}은(는) 필수 입력 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M002','CMN006.KR','CMN037.WRN','{0}의 {1}번째 데이터에서',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M003','CMN006.KR','CMN037.WRN','{0}중 하나는 필수 입력 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M004','CMN006.KR','CMN037.WRN','{0}은(는) 유효하지 않은 형식입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M005','CMN006.KR','CMN037.WRN','{0}은(는) {1}자 이상으로 입력하십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M006','CMN006.KR','CMN037.WRN','{0}은(는) {1} 자리수만큼 입력하십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M007','CMN006.KR','CMN037.WRN','{0}은(는) 숫자만 입력할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M008','CMN006.KR','CMN037.WRN','{0}은(는) {1}부터 {2}사이로 입력하십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M009','CMN006.KR','CMN037.WRN','{0}은(는) {1}보다 클 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M010','CMN006.KR','CMN037.WRN','{0}은(는) {1}보다 작을수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M011','CMN006.KR','CMN037.WRN','{0}은(는) {1}와 같아야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M012','CMN006.KR','CMN037.WRN','{0}은(는) 유효한 주민등록번호가 아닙니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M013','CMN006.KR','CMN037.WRN','{0}은(는) 유효한 사업자등록번호가 아닙니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M014','CMN006.KR','CMN037.WRN','{0}은(는) 잘못된 전화번호 입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M015','CMN006.KR','CMN037.WRN','{0}은(는) 잘못된 날짜 입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M016','CMN006.KR','CMN037.WRN','파일사이즈는 {0}를 초과 할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M017','CMN006.KR','CMN037.WRN','파일은 최대 {0}개까지 첨부 할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M018','CMN006.KR','CMN037.WRN','첨부파일은 {0} 확장자만 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M019','CMN006.KR','CMN037.WRN','{0}은(는) 알파벳과 숫자만 입력할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M020','CMN006.KR','CMN037.WRN','{0}은(는) 알파벳만 입력할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M021','CMN006.KR','CMN037.WRN','{0}은(는) 한글만 입력할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M022','CMN006.KR','CMN037.WRN','{0}은(는) 삭제할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M023','CMN006.KR','CMN037.WRN','{0}을(를) 선택하세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M024','CMN006.KR','CMN037.WRN','{0} 유형의 파일은 업로드 불가합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M025','CMN006.KR','CMN037.WRN','{0} 은(는) 선택할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M026','CMN006.KR','CMN037.WRN','{0} 만 선택할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M028','CMN006.KR','CMN037.WRN','{0} 또는 {1}은 필수 입력 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M029','CMN006.KR','CMN037.WRN','데이터가 존재하지 않습니다. 데이터를 생성해 주시고 다시 시도해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M040','CMN006.KR','CMN037.WRN','{0}행의 데이터가 이미 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M041','CMN006.KR','CMN037.WRN','{0} 이 아닙니다. \n조회만 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M044','CMN006.KR','CMN037.WRN','사용자 번호/성명이 지정 되어야 조회 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M047','CMN006.KR','CMN037.WRN','{0}/{1} \n진료이력이 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M049','CMN006.KR','CMN037.WRN','진행상태가 작성중일 경우에만 신청이 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M050','CMN006.KR','CMN037.WRN','진행상태가 작성중인 경우에만 삭제가 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M051','CMN006.KR','CMN037.WRN','중복된 사업자번호가 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M054','CMN006.KR','CMN037.WRN','{0}번째 항목에 {1}이(가) 존재하여 삭제할 수 없습니다. {2} 삭제 후 삭제 가능합니다. ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M063','CMN006.KR','CMN037.WRN','관리항목은 순차적으로 초기화 하셔야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M064','CMN006.KR','CMN037.WRN','{0}은(는)  이미 입력된 관리항목 입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M065','CMN006.KR','CMN037.WRN','{0}은(는) {1}을(를) 먼저 저장 후 선택하시기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M066','CMN006.KR','CMN037.WRN','{0}번째 자료 확인.\n이미 이수처리된 자료가 포함되어 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M067','CMN006.KR','CMN037.WRN','{0}번째 자료 확인.\n확인구분이 담당자확인인 자료만 이수처리 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M068','CMN006.KR','CMN037.WRN','{0}번째 자료 확인.\n평가가 완료된 자료만 이수처리 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M069','CMN006.KR','CMN037.WRN','{0}의 평가비율 총계가 100% 일때 저장이 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M070','CMN006.KR','CMN037.WRN','{0}번째 자료 확인.\n이수처리된 자료만 성적반영 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M071','CMN006.KR','CMN037.WRN','{0}이 {1}인 경우 {2}합니다',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M073','CMN006.KR','CMN037.WRN','{0}은(는) 필수 동의 항목입니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M074','CMN006.KR','CMN037.WRN','{0}은(는) {1}만 사용 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M075','CMN006.KR','CMN037.WRN','{0} {1} 는 2개 다 입력해야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M088','CMN006.KR','CMN037.WRN','{0}이(가) {1}인 경우에만 {2}이(가) 가능합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M089','CMN006.KR','CMN037.WRN','From ~ To에 맞게 값을 입력하여 주십시오.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M090','CMN006.KR','CMN037.WRN','From ~ To의 값을 모두 입력해야 합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M093','CMN006.KR','CMN037.WRN','삭제할 사진이 존재하지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M094','CMN006.KR','CMN037.WRN','{0}은(는) 1건만 선택할 수 있습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M098','CMN006.KR','CMN037.WRN','입력기간이 아닙니다.\n담당자에게 문의하세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M099','CMN006.KR','CMN037.WRN','{0}을(를) 입력하기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M103','CMN006.KR','CMN037.WRN','변경사항이 존재합니다. 확인 후 다시시도해주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M104','CMN006.KR','CMN037.WRN','신규 상태에서는 입력할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M105','CMN006.KR','CMN037.WRN','올바른 {0} 형식이 아닙니다.\n다시 입력해 주세요.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M106','CMN006.KR','CMN037.WRN','{0} 처리할 {1}을(를)\n선택하기 바랍니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M107','CMN006.KR','CMN037.WRN','{0}, {1}의 선후관계가 맞지 않습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M108','CMN006.KR','CMN037.WRN','결제가 진행중입니다. 수정/삭제 할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M109','CMN006.KR','CMN037.WRN','이미 진행중인 결제 문서가 존재합니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M110','CMN006.KR','CMN037.WRN','음수는 입력할 수 없습니다.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('WRN-M111','CMN006.KR','CMN037.WRN','브라우저와 테스터는 필수 항목입니다.','2020-05-07 15:28:40','TST002','cmnCClientMessage','211.109.22.69','2020-05-07 15:28:40','TST002','cmnCClientMessage','211.109.22.69');
/*!40000 ALTER TABLE `cmn_mlanguage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_log_login`
--

DROP TABLE IF EXISTS `cmn_log_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_log_login` (
  `SES_KEY` varchar(300) DEFAULT NULL COMMENT '세션키',
  `USER_ID` varchar(50) DEFAULT NULL COMMENT '사용자ID',
  `LOGIN_DTTM` timestamp NULL DEFAULT NULL COMMENT '로그인일시',
  `LOGIN_TYPE` varchar(300) DEFAULT NULL COMMENT '로그인유형',
  `BROWER_INFO` varchar(300) DEFAULT NULL COMMENT '브라우저정보',
  `OS_INFO` varchar(300) DEFAULT NULL COMMENT '접속OS정보',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  KEY `CMN_LOG_LOGIN_IX_01` (`USER_ID`,`LOGIN_DTTM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='로그인이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_log_login`
--

LOCK TABLES `cmn_log_login` WRITE;
/*!40000 ALTER TABLE `cmn_log_login` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmn_log_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_sys_req`
--

DROP TABLE IF EXISTS `cmn_sys_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_sys_req` (
  `MENU_ID` varchar(50) NOT NULL COMMENT '메뉴ID',
  `REQ_SEQ` int(10) NOT NULL COMMENT '의뢰차수',
  `REQ_DT` varchar(8) NOT NULL COMMENT '의뢰일자',
  `REQ_PSN_NM` varchar(300) NOT NULL COMMENT '의뢰자명',
  `REQ_DIV_RCD` varchar(20) DEFAULT NULL COMMENT '의뢰구분코드[CMN301]',
  `REQ_CTNT` varchar(2000) NOT NULL COMMENT '의뢰내용',
  `ACTN_STAT_RCD` varchar(20) DEFAULT NULL COMMENT '조치상태코드[CMN302]',
  `ACTN_CTNT` varchar(2000) DEFAULT NULL COMMENT '조치내용',
  `ACTN_DT` varchar(8) DEFAULT NULL COMMENT '조치일자',
  `ACTNR_NM` varchar(8) DEFAULT NULL COMMENT '조치자명',
  `CNFMR_NM` varchar(8) DEFAULT NULL COMMENT '확인자명',
  `ATTC_FILE_NO` varchar(20) DEFAULT NULL COMMENT '첨부파일번호',
  `REG_USER_ID` varchar(50) DEFAULT NULL COMMENT '등록사용자ID',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`MENU_ID`,`REQ_SEQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='전산의뢰';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_sys_req`
--

LOCK TABLES `cmn_sys_req` WRITE;
/*!40000 ALTER TABLE `cmn_sys_req` DISABLE KEYS */;
/*!40000 ALTER TABLE `cmn_sys_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cmn_use_user`
--

DROP TABLE IF EXISTS `cmn_use_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmn_use_user` (
  `USER_ID` varchar(50) NOT NULL COMMENT '사용자ID',
  `PARTY_ID` varchar(15) DEFAULT NULL COMMENT '구성원ID',
  `LOGIN_ID` varchar(50) DEFAULT NULL COMMENT '로그인ID',
  `USER_DIV_CD` varchar(10) DEFAULT NULL COMMENT '사용자구분코드[CMN0701테이블]',
  `PWD` varchar(300) DEFAULT NULL COMMENT '비밀번호',
  `PWD_CHG_DTTM` datetime DEFAULT NULL COMMENT '비밀번호변경일시',
  `PWD_EFFT_DAYS` decimal(5,0) DEFAULT NULL COMMENT '비밀번호유효일수',
  `TMP_PWD` varchar(300) DEFAULT NULL COMMENT '임시비밀번호',
  `TMP_PWD_COPY` varchar(300) DEFAULT NULL COMMENT '임시비밀번호2(비밀번호변경시)',
  `LOGIN_FAIL` decimal(5,0) DEFAULT NULL COMMENT '로그인실패',
  `LOGIN_FAIL_DTTM` datetime DEFAULT NULL COMMENT '로그인실패일시',
  `LOGIN_PBY_DTTM` datetime DEFAULT NULL COMMENT '로그인가능일시',
  `LOGIN_SUCCSS` datetime DEFAULT NULL COMMENT '로그인성공',
  `USE_YN` char(1) DEFAULT NULL COMMENT '사용여부',
  `SYS_MGR_YN` char(1) DEFAULT NULL COMMENT '시스템관리자여부',
  `DUP_PERMIT_YN` char(1) DEFAULT NULL COMMENT '중복허용여부',
  `EFFT_ST_DT` varchar(8) DEFAULT NULL COMMENT '유효시작일자',
  `EFFT_ED_DT` varchar(8) DEFAULT NULL COMMENT '유효종료일자',
  `RMK` varchar(4000) DEFAULT NULL COMMENT '비고',
  `PSN_CTFC_ORI_NM` varchar(300) DEFAULT NULL COMMENT '인증서DN',
  `AD_CHECK` char(1) DEFAULT 'N' COMMENT 'AD체크여부',
  `STAT_RCD` varchar(20) DEFAULT NULL COMMENT '상태코드([CMN049])',
  `CRT_DTHR` datetime DEFAULT NULL COMMENT '생성일시',
  `CRT_USER_ID` varchar(50) DEFAULT NULL COMMENT '생성자ID',
  `CRT_PGM_ID` varchar(50) DEFAULT NULL COMMENT '생성프로그램ID',
  `CRT_IP_MAC` varchar(50) DEFAULT NULL COMMENT '생성IP/MAC',
  `UPD_DTHR` datetime DEFAULT NULL COMMENT '갱신일시',
  `UPD_USER_ID` varchar(50) DEFAULT NULL COMMENT '갱신자ID',
  `UPD_PGM_ID` varchar(50) DEFAULT NULL COMMENT '갱신프로그램ID',
  `UPD_IP_MAC` varchar(50) DEFAULT NULL COMMENT '갱신IP/MAC',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `CMN_USE_USER_UX_01` (`LOGIN_ID`),
  KEY `CMN_USE_USER_IX_01` (`EFFT_ST_DT`,`EFFT_ED_DT`),
  KEY `CMN_USE_USER_IX_02` (`USER_DIV_CD`),
  KEY `CMN_USE_USER_IX_03` (`USER_ID`,`PWD`(255)),
  KEY `CMN_USE_USER_IX_04` (`PARTY_ID`),
  CONSTRAINT `FK01_CMN_USE_USER` FOREIGN KEY (`PARTY_ID`) REFERENCES `cmn_party` (`PARTY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='사용자';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmn_use_user`
--

LOCK TABLES `cmn_use_user` WRITE;
/*!40000 ALTER TABLE `cmn_use_user` DISABLE KEYS */;
INSERT INTO `cmn_use_user` VALUES ('TST002','000000000000004','sh','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N','','','20200327','20200731','',NULL,'N','CMN049.0002','2020-03-27 16:15:22','E000000061','cmnCUseUser_s','','2020-08-05 09:59:43','TST006','cmnCUseUser','211.109.22.153'),('TST003','000000000000005','mk','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','20200327','99991231','',NULL,'N','CMN049.0002','2020-03-27 16:20:51','E000000061','cmnCUseUser_s','','2020-03-27 19:32:14','E000000061','cmnCUseUser_s',''),('TST004','000000000000006','wodml12','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N','','','20200327','20200701','',NULL,'N','CMN049.0002','2020-03-27 16:20:51','E000000061','cmnCUseUser_s','','2020-07-02 10:51:47','TST006','cmnCUseUser','211.109.22.153'),('TST005','000000000000007','kjy','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','20200327','99991231','',NULL,'N','CMN049.0002','2020-03-27 16:20:51','E000000061','cmnCUseUser_s','','2020-03-27 19:32:14','E000000061','cmnCUseUser_s',''),('TST006','000000000000008','suhyun','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','20200327','99991231','',NULL,'N','CMN049.0002','2020-03-27 16:23:35','E000000061','cmnCUseUser_s','','2020-03-27 19:32:14','E000000061','cmnCUseUser_s',''),('TST007','000000000000009','jj','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N','','','20200327','20200731','',NULL,'N','CMN049.0002','2020-03-27 16:23:35','E000000061','cmnCUseUser_s','','2020-08-05 09:59:19','TST006','cmnCUseUser','211.109.22.153'),('TST008','000000000000010','skyhawk97','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','19990101','99991231','',NULL,'N','CMN049.0002',NULL,NULL,NULL,NULL,'2020-04-09 21:09:41','TST001','cmnCUseUser','211.109.22.200'),('TST009','000000000000011','guest','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'N','','','20200410','99991231','',NULL,'N','CMN049.0002','2020-04-10 10:35:29','TST001','cmnCUseUser','211.109.22.153','2020-08-07 09:09:47','TST006','cmnCUseUser','211.109.22.153'),('TST010','000000000000012','young12','TST001','tomato2194',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','20200421','99991231','',NULL,'N','CMN049.0002','2020-04-21 13:41:46','TST001','cmnCUseUser','211.109.22.109','2020-04-21 14:03:29','TST001','cmnCUseUser','211.109.22.109'),('TST011','000000000000014','exbuilder6','TST002','exbuilder6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','','','20200715','99991231','',NULL,'N','CMN049.0002','2020-07-16 17:42:39','TST008','cmnCUseUser','211.109.22.200','2020-07-16 17:47:34','TST008','cmnCUseUser','211.109.22.200');
/*!40000 ALTER TABLE `cmn_use_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-24 16:25:14
