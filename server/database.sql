-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP TABLE EVENTS

-- -----------------------------------------------------
-- Schema willmachendb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema willmachendb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `willmachendb` DEFAULT CHARACTER SET utf8 ;
USE `willmachendb` ;


-- -----------------------------------------------------
-- Table `willmachendb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willmachendb`.`users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `userID_UNIQUE` (`userID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willmachendb`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willmachendb`.`events` (
  `itemID` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `subject` VARCHAR(45) NOT NULL,
  `descrip` VARCHAR(300) NOT NULL,
  `category` VARCHAR(45) NULL,
  `latitude` VARCHAR(30) NOT NULL,
  `longitude` VARCHAR(30) NOT NULL,
  `likes` INT,
  PRIMARY KEY (`itemID`),
  UNIQUE INDEX `iditems_UNIQUE` (`itemID` ASC),
  INDEX `userID_idx` (`userid` ASC),
  CONSTRAINT `userID`
    FOREIGN KEY (`userid`)
    REFERENCES `willmachendb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willmachendb`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willmachendb`.`messages` (
  `msgID` INT NOT NULL AUTO_INCREMENT,
  `senderID` INT NOT NULL,
  `receiverID` INT NOT NULL,
  `text` VARCHAR(500) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`msgID`),
  UNIQUE INDEX `msgID_UNIQUE` (`msgID` ASC),
  INDEX `senderID_idx` (`senderID` ASC),
  INDEX `receiverID_idx` (`receiverID` ASC),
  CONSTRAINT `senderID`
    FOREIGN KEY (`senderID`)
    REFERENCES `willmachendb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `receiverID`
    FOREIGN KEY (`receiverID`)
    REFERENCES `willmachendb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
