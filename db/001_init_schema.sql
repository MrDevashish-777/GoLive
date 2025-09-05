-- MySQL schema migration for Creator’s Stream Hub

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE streams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('live','offline') DEFAULT 'offline',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES users(id)
);

CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stream_id INT,
  user_id INT,
  message TEXT NOT NULL,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stream_id) REFERENCES streams(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_wallets (
  user_id INT PRIMARY KEY,
  balance DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  gateway_transaction_id VARCHAR(255) NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  tokens_purchased INT NOT NULL,
  status ENUM('pending','completed','failed') NOT NULL,
  transaction_date DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  host_id INT,
  stream_id INT,
  amount_donated INT NOT NULL,
  donation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id),
  FOREIGN KEY (host_id) REFERENCES users(id),
  FOREIGN KEY (stream_id) REFERENCES streams(id)
);

CREATE TABLE host_invites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stream_id INT,
  host_id INT,
  invited_user_id INT,
  status ENUM('pending','accepted','rejected') DEFAULT 'pending',
  FOREIGN KEY (stream_id) REFERENCES streams(id),
  FOREIGN KEY (host_id) REFERENCES users(id),
  FOREIGN KEY (invited_user_id) REFERENCES users(id)
);
