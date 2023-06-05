DROP DATABASE IF EXISTS my_bots_db;
CREATE DATABASE my_bots_db;

\c my_bots_db;

DROP TABLE IF EXISTS servers;
CREATE TABLE servers (
  id SERIAL NOT NULL PRIMARY KEY,
  bot_id INT NOT NULL,
  bot_name TEXT NOT NULL,
  server_id INT NOT NULL,
  server_name TEXT NOT NULL,
  prefix TEXT NOT NULL DEFAULT '--'
);