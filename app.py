from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, this is a vulnerable Flask app!"

# ユーザー入力をそのまま外部リクエストに使用（CVE-2018-18074の問題を再現）
@app.route("/fetch")
def fetch():
    import requests
    url = request.args.get("url")  # ユーザー入力を直接利用（危険）
    response = requests.get(url)
    return response.text

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
