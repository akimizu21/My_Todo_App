# ベースイメージとしてNodeを使用してビルド
FROM node:18 AS build

# アプリケーションディレクトリを作成して移動
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY ./package*.json ./
RUN npm install

# アプリケーションのソースコードをコピーしてビルド
COPY . .
RUN npm run build

# サーバー用イメージとしてNginxを使用してビルド成果物をコピー
FROM nginx:alpine

# ReactのビルドファイルをNginxのデフォルトの公開ディレクトリにコピー
COPY --from=build /app/build /usr/share/nginx/html

# Nginxのデフォルト設定を削除
RUN rm /etc/nginx/conf.d/default.conf

# Nginx設定を追加
COPY ./nginx.conf /etc/nginx/conf.d

# Nginxを公開するポートを指定
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]