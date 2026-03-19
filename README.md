# 演習用の脆弱性のあるアプリケーション
* CodeQL
* Dependabot
* Trivy
* Secrets Scanning

## 使い方
自身のGitHubリポジトリに本リポジトリをPushして使用して下さい。

### 新しいリポジトリの準備
1. GitHubのページで新しいリポジトリを「**Public**」で作成
   - リポジトリ名（Repository name）は何でもOK（ここでは「**vulnapp**」として作成）
   - Descriptionは何でもOK
   - プライバシーは「**Public**」で作成
   - 「Add a README file」「Add .gitignore」「Choose a license」などは**チェックしない／None**を選択
2. 新しいリポジトリのSSH（またはHTTPS）のURLをコピー
   - `git@github.com:ユーザー名/vulnapp.git`
3. 以下のコマンドを実行して、自身のGitHubリポジトリにPush

```sh
cd    # 以下はルートディレクトリに作成
git clone https://github.com/securistant/vulnapp.git
cd vulnapp/
git remote remove origin
git remote -v
git remote add origin git@github.com:ユーザー名/vulnapp.git
git remote -v
git branch -M main
git push -u origin main
```