from fastapi import FastAPI
from typing import List # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware # CORSを回避するために必要
from db import session # DBと接続するためのセッション
from model import TodoTable, TodoCreate, TodoResponse # 今回使うモデルをインポート

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],  
)

# ------APIの実装--------
# todoListの取得
@app.get("/todos")
async def get_todos():
  todo = session.query(TodoTable).all()
  return [{"id": todo_list.id, "title": todo_list.title, "isDone": bool(todo_list.isDone)} for todo_list in todo]

# todoListの登録
@app.post("/todos", response_model=TodoResponse)
async def create_todos(todo: TodoCreate):
  # データベース用のモデルを作成
  new_todo = TodoTable(title=todo.title, isDone=todo.isDone)
  # データを追加してコミット
  session.add(new_todo)
  session.commit()
  return {"message": "Todo added successfully"}

@app.get("/")
async def root():
    return {'message': 'Hello World'}



