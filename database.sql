CREATE DATABASE IF NOT EXISTS kasir_baju;
USE kasir_baju;
DROP TABLE IF EXISTS trx; DROP TABLE IF EXISTS members; DROP TABLE IF EXISTS products; DROP TABLE IF EXISTS users;
CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY,nama VARCHAR(100) NOT NULL,username VARCHAR(50) NOT NULL UNIQUE,password CHAR(64) NOT NULL,role ENUM('admin','kasir') NOT NULL);
CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY,kode VARCHAR(20) NOT NULL,nama VARCHAR(150) NOT NULL,kat VARCHAR(50) NOT NULL,harga INT NOT NULL,stok INT NOT NULL DEFAULT 0);
CREATE TABLE members(id INT AUTO_INCREMENT PRIMARY KEY,nama VARCHAR(100) NOT NULL,telepon VARCHAR(30) NOT NULL UNIQUE,alamat VARCHAR(255) NOT NULL DEFAULT '',created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE trx(id INT AUTO_INCREMENT PRIMARY KEY,no VARCHAR(30) NOT NULL UNIQUE,tgl DATETIME NOT NULL,kasir VARCHAR(100),kasir_u VARCHAR(50),items JSON NOT NULL,total INT NOT NULL,bayar INT NOT NULL,kembali INT NOT NULL,metode VARCHAR(20) NOT NULL);
INSERT INTO users(nama,username,password,role) VALUES('Administrator','admin',SHA2('admin123',256),'admin'),('Budi Kasir','kasir',SHA2('kasir123',256),'kasir');
INSERT INTO products(kode,nama,kat,harga,stok) VALUES
('BRG-001','Kaos Polos Cotton Combed','Baju',55000,40),('BRG-002','Kaos Oversize Graphic','Baju',89000,30),
('BRG-003','Kemeja Flanel Kotak','Baju',149000,18),('BRG-004','Kemeja Putih Lengan Panjang','Baju',135000,15),
('BRG-005','Polo Shirt Pria','Baju',99000,22),('BRG-006','Blouse Wanita Katun','Baju',119000,12),
('BRG-007','Celana Jeans Slim Fit','Celana',249000,14),('BRG-008','Celana Chino Panjang','Celana',189000,16),
('BRG-009','Celana Cargo','Celana',199000,9),('BRG-010','Celana Pendek Pria','Celana',85000,25),
('BRG-011','Rok Plisket Wanita','Rok',99000,4),('BRG-012','Jaket Hoodie Fleece','Jaket',229000,11),
('BRG-013','Jaket Bomber','Jaket',289000,5),('BRG-014','Sweater Rajut','Jaket',159000,3),
('BRG-015','Kaos Kaki (3 pasang)','Aksesoris',30000,50),('BRG-016','Ikat Pinggang Kulit','Aksesoris',75000,7);
INSERT INTO trx(no,tgl,kasir,kasir_u,items,total,bayar,kembali,metode) VALUES
('TRX-DEMO-01',DATE_SUB(NOW(),INTERVAL 4 DAY),'Budi Kasir','kasir','[{"id":"2","nama":"Kaos Oversize Graphic","harga":89000,"qty":1}]',89000,100000,11000,'Tunai'),
('TRX-DEMO-02',DATE_SUB(NOW(),INTERVAL 3 DAY),'Budi Kasir','kasir','[{"id":"7","nama":"Celana Jeans Slim Fit","harga":249000,"qty":1},{"id":"15","nama":"Kaos Kaki (3 pasang)","harga":30000,"qty":2}]',309000,309000,0,'QRIS'),
('TRX-DEMO-03',DATE_SUB(NOW(),INTERVAL 2 DAY),'Budi Kasir','kasir','[{"id":"12","nama":"Jaket Hoodie Fleece","harga":229000,"qty":1},{"id":"1","nama":"Kaos Polos Cotton Combed","harga":55000,"qty":2}]',339000,350000,11000,'Tunai'),
('TRX-DEMO-04',DATE_SUB(NOW(),INTERVAL 1 DAY),'Budi Kasir','kasir','[{"id":"3","nama":"Kemeja Flanel Kotak","harga":149000,"qty":1},{"id":"8","nama":"Celana Chino Panjang","harga":189000,"qty":1}]',338000,338000,0,'Transfer');
