

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema osd
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `osd` ;

-- -----------------------------------------------------
-- Schema osd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `osd` DEFAULT CHARACTER SET utf8 ;
USE `osd` ;

-- -----------------------------------------------------
-- Table `osd`.`Customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Customer` ;

CREATE TABLE IF NOT EXISTS `osd`.`Customer` (
  `user_id` VARCHAR(30) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`Cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Cart` ;

CREATE TABLE IF NOT EXISTS `osd`.`Cart` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (`cart_id`, `user_id`),
  CONSTRAINT `fk_Cart_Customer1`
    FOREIGN KEY (`user_id`)
    REFERENCES `osd`.`Customer` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Product` ;

CREATE TABLE IF NOT EXISTS `osd`.`Product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `p_name` VARCHAR(80) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `price` DECIMAL(6,2) UNSIGNED NOT NULL,
  `weight` DECIMAL(8,4) UNSIGNED NOT NULL,
  `description` VARCHAR(3000) NOT NULL,
  `imgPath` VARCHAR(1000),
  `type` VARCHAR(25),
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `p_name_UNIQUE` (`p_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Cart_Item` ;

CREATE TABLE IF NOT EXISTS `osd`.`Cart_Item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `fk_Item_Cart1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `osd`.`Cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_Product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `osd`.`Product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`Shipping_Address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Shipping_Address` ;

CREATE TABLE IF NOT EXISTS `osd`.`Shipping_Address` (
  `s_address_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(100) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` CHAR(2) NOT NULL,
  `zip` DECIMAL(5) NOT NULL,
  PRIMARY KEY (`s_address_id`),
  UNIQUE KEY(`address`, `city`, `state`, `zip`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Order` ;

CREATE TABLE IF NOT EXISTS `osd`.`Order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `order_date` DATE NOT NULL,
  `user_id` VARCHAR(30) NOT NULL,
  `s_address_id` INT NOT NULL,
  `weight` DECIMAL(8,4) NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`user_id`)
    REFERENCES `osd`.`Customer` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_Shipping_Address1`
    FOREIGN KEY (`s_address_id`)
    REFERENCES `osd`.`Shipping_Address` (`s_address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `osd`.`OrderItem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `osd`.`Order_Item` ;

CREATE TABLE IF NOT EXISTS `osd`.`Order_Item` (
  `order_item_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`order_item_id`, `order_id`),
  CONSTRAINT `fk_OrderItems_Order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `osd`.`Order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_OrderItem_Product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `osd`.`Product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
