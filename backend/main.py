from fastapi import FastAPI, HTTPException
from typing import List # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware # CORSを回避するために必要
from db import session # DBと接続するためのセッション
from model import TodoTable, TodoCreate, TodoResponse, TodoUpdate # 今回使うモデルをインポート

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
@app.post("/todo", response_model=TodoResponse)
async def create_todo(todo: TodoCreate):
  # データベース用のモデルを作成
  new_todo = TodoTable(title=todo.title, isDone=todo.isDone)
  # データを追加してコミット
  session.add(new_todo)
  session.commit()
  return {"message": "Todo added successfully"}

# todoListの削除
@app.delete("/todo/{todo_id}")
async def delete_todo(todo_id: int):
  # 削除対象のTodoを取得
  todo = session.query(TodoTable).filter(TodoTable.id == todo_id).first()
  if not todo:
    raise HTTPException(status_code=404, detail="Todo not found")
  # 削除処理
  session.delete(todo)
  session.commit()
  return {"message": "Todo deleted successfully"}

# 未完了 #
# isDoneの変更
@app.put("/todo/{todo_id}")
async def change_isDone(todo_update: TodoUpdate):
  todo = session.query(TodoTable).filter(TodoTable.id == todo_update.id).first()
  # todoがない場合の処理
  if not todo:
     raise HTTPException(status_code=404, detail="Todo not found")
  # todoがあれば更新する
  todo.isDone = todo_update.isDone
  session.commit()
  return {"message": f"Todo with id {todo_update.id} isDone changed to {todo_update.isDone}"}

@app.get("/")
async def root():
    return {'message': 'Hello World'}



