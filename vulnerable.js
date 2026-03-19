const express = require('express');
const mysql = require('mysql');
const app = express();

// 🚨 【脆弱性1】ハードコーディングされた機密情報（Hardcoded Credentials）
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // ❌ ここにハードコーディングされた認証情報がある
    password: "password123",  // ❌ パスワードをコードに直接書くのは危険
    database: "testdb"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to database!");
});

app.use(express.urlencoded({ extended: false }));

// 🚨 【脆弱性2】SQLインジェクション（SQL Injection）
app.get('/user', (req, res) => {
    let userId = req.query.id;  // ❌ ユーザー入力をエスケープせずにSQLに直接挿入
    let query = `SELECT * FROM users WHERE id = '${userId}'`;  // ❌ SQLインジェクションの危険性
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 🚨 【脆弱性3】クロスサイトスクリプティング（XSS）
app.get('/search', (req, res) => {
    let searchQuery = req.query.q;  // ❌ ユーザー入力を直接HTMLに挿入
    res.send(`<h1>Search Results for: ${searchQuery}</h1>`);  // ❌ XSSの危険性
});

// 🚨 【脆弱性4】危険な`eval`の使用（Remote Code Execution）
app.get('/eval', (req, res) => {
    let code = req.query.code;
    res.send(`Result: ${eval(code)}`);  // ❌ ユーザー入力を直接`eval`に渡すのは危険
});

// 🚨 【脆弱性5】HTTPのみで送信されるパスワード（安全でない通信）
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    console.log(`Login attempt: ${username}, ${password}`);  // ❌ パスワードをログに出力するのは危険
    
    res.send("Login attempt recorded.");
});

// サーバーを起動
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
