# モデルの定義
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from db import Base
from db import ENGINE

# todoテーブルのモデルTodoTableを定義
class TodoTable(Base):
  __tablename__ = "todo"
  id = Column(Integer, autoincrement=True, nullable=False, primary_key=True)
  title = Column(String, nullable=False)
  isDone = Column(Integer, nullable=False)

# POSTやPUTのとき受け取るリクエスト用のモデルを定義
class TodoCreate(BaseModel):
  title: str
  isDone: int

# GETのとき受け取るレスポンス用のモデルを定義
class TodoResponse(BaseModel):
  id: int
  title: str
  isDone: int

def main():
  # テーブルが存在しなければ、テーブルを作成
  Base.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
  main()
