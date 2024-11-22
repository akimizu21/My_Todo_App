-- データベースの削除
DROP DATABASE todoapp;

-- データベースの作成
CREATE DATABASE todoapp;

-- データベースを選択
USE todoapp;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS todo (
  id int UNIQUE NOT NULL AUTO_INCREMENT, 
  title varchar(255) NOT NULL,
  isDone boolean NOT NULL,
  PRIMARY KEY (id)
);

-- デモデータの挿入
INSERT INTO todo (title, isDone) VALUES
('Buy groceries', false),
('Clean the house', true),
('Write Docker documentation', false);
