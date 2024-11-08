#ベースイメージとしてPythonを使用してビルド
FROM python:3.7

# アプリケーションディレクトリを作成して移動
WORKDIR /usr/src/server

# requirements.txtをコピー
COPY Docker/back_context/requirements.txt /usr/src/server/requirements.txt

# requirements.txtをインストール
RUN pip install -r /usr/src/server/requirements.txt

# アプリケーションのソースコードをコピー
COPY backend/. /usr/src/server/

# Uvicornでアプリケーションを起動
CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "3001"]

