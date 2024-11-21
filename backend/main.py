from fastapi import FastAPI
from typing import List # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware # CORSを回避するために必要
from db import session # DBと接続するためのセッション
from model import TodoTable, Todo # 今回使うモデルをインポート

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
# テーブルの全情報取得
@app.get("/todos")
async def get_todos():
  todos = session.query(TodoTable).all()
  return [{"id": todo.id, "title": todo.title, "description": todo.description} for todo in todos]

@app.get("/")
async def root():
    return {'message': 'Hello World'}

@app.get("/hello")
async def root():
    return {'message': 'Hello Hello'}



