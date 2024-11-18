# モデルの定義
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from app.db import Base
from app.db import ENGINE

# todoテーブルのモデルTodoTableを定義
class TodoTable(Base):
  __tablename__ = "todo"
  id = Column(Integer, autoincrement=True, nullable=False, primary_key=True)
  title = Column(String, nullable=False)
  isDone = Column(Integer, nullable=False)

# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class Todo(BaseModel):
  id: int
  title: str
  isDone: int

def main():
  # テーブルが存在しなければ、テーブルを作成
  Base.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
  main()
