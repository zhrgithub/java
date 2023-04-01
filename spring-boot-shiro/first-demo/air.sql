/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : air

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 03/11/2020 22:52:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for air
-- ----------------------------
DROP TABLE IF EXISTS `air`;
CREATE TABLE `air`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `district_id` int(20) NULL DEFAULT NULL,
  `monitor_time` date NULL DEFAULT NULL,
  `pm10` int(20) NULL DEFAULT NULL,
  `pm25` int(20) NULL DEFAULT NULL,
  `monitering_station` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_modify_time` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of air
-- ----------------------------
INSERT INTO `air` VALUES (1, 1, '2020-11-03', 323, 32, '张三', '2020-11-03');
INSERT INTO `air` VALUES (2, 2, '2020-12-04', 442, 555, '李四', '2020-11-08');
INSERT INTO `air` VALUES (3, 3, '2020-11-03', 222, 222, '王五', '2020-11-03');
INSERT INTO `air` VALUES (4, 4, '2020-11-03', 333, 333, '赵六', '2020-11-03');
INSERT INTO `air` VALUES (5, 5, '2020-11-03', 444, 444, '钱七', '2020-11-03');

-- ----------------------------
-- Table structure for district
-- ----------------------------
DROP TABLE IF EXISTS `district`;
CREATE TABLE `district`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of district
-- ----------------------------
INSERT INTO `district` VALUES (1, '张三');
INSERT INTO `district` VALUES (2, '李四');
INSERT INTO `district` VALUES (3, '王五');
INSERT INTO `district` VALUES (4, '赵六');
INSERT INTO `district` VALUES (5, '钱七');

SET FOREIGN_KEY_CHECKS = 1;
