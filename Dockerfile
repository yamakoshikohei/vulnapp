# Python 3.7（EOL: 2023-06-27）を使用（既にサポート終了）
FROM python:3.7

# 作業ディレクトリを設定
WORKDIR /app

# 脆弱性のあるライブラリを明示的にインストール
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# アプリケーションコードをコピー
COPY app.py .

# ポートを開放
EXPOSE 5000

# アプリケーションを起動
CMD ["python", "app.py"]
