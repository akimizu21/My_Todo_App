-- データベースの削除
DROP DATABASE todoapp;

-- データベースの作成
CREATE DATABASE todoapp;

-- データベースを選択
USE todoapp;

-- テーブルの作成
CREATE TABLE todo (
  id int P UNIQUE NOT NULL AUTO_INCREMENT, 
  title varchar(255) NOT NULL,
  isDone boolean NOT NULL
  PRIMARY KEY (id)
);
