DROP DATABASE IF EXISTS PRODUCTS;

CREATE DATABASE PRODUCTS;

DROP TABLE IF EXISTS SKUs;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Characteristics;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Related;
DROP TABLE IF EXISTS Features;
DROP TABLE IF EXISTS Styles;
DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  id INTEGER UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Features (
  id INTEGER UNIQUE NOT NULL,
  product_id INTEGER,
  feature VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products (id),
  PRIMARY KEY (id)
);

CREATE TABLE Styles (
  id INTEGER UNIQUE NOT NULL,
  product_id INTEGER,
  name VARCHAR(255) NOT NULL,
  sale_price INTEGER DEFAULT NULL,
  original_price INTEGER,
  default_style BOOLEAN NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products (id),
  PRIMARY KEY (id)
);

CREATE TABLE SKUs (
  id INTEGER UNIQUE NOT NULL,
  styleId INTEGER,
  size VARCHAR(255) NOT NULL,
  quantity INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES Styles (id)
);

CREATE TABLE Photos (
  id INTEGER UNIQUE NOT NULL,
  styleId INTEGER,
  url VARCHAR NOT NULL,
  thumbnail_url VARCHAR NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES Styles (id)
);

CREATE TABLE Characteristics (
  id INTEGER UNIQUE NOT NULL,
  product_id INTEGER,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES Products (id)
);

CREATE TABLE Cart (
  id INTEGER UNIQUE NOT NULL,
  user_session INTEGER NOT NULL,
  product_id INTEGER,
  active BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES Products (id)
);

CREATE TABLE Related (
  id INTEGER UNIQUE NOT NULL,
  current_product_id INTEGER,
  related_product_id INTEGER,
  FOREIGN KEY (current_product_id) REFERENCES Products (id),
  FOREIGN KEY (related_product_id) REFERENCES Products (id),
  PRIMARY KEY (id)
);

\copy Products FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/product.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Features FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/features.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Styles FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/styles.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true, NULL 'null');
\copy SKUs FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/skus.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Photos FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/photos.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Characteristics FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/characteristics.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Cart FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/cart.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true);
\copy Related FROM '/home/alvino/Desktop/hackreactor/SDC/Products_API/Products/data/sdc_data/transformed_related.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER true, NULL 'null');

