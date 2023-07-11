# NGINX_LogFIle_Analyzer
___
## これは何(What is this)
これは、NGINXのログファイルを読み込んで、誰が何回アクセスしたかを表示するスクリプトです！<BR>
This is a script that reads the NGINX log file and displays who accessed the site and how many times!<BR>
## 使い方(How to use)
まず、NodeJSとFSが入っていることを確認してください。<BR>
First, make sure that NodeJS and FS are included.<BR>
<BR>
Main.jsが有る場所で、以下のコマンドを入力します<BR>
At the location where Main.js is located, enter the following command<BR>
```sh
node Main.js NGINX_LOGFILE_PATH_HERE.log
```
すると、結果が返ってきます。<BR>
サイズがでかいと時間がかかる場合があります<BR>
Then the results are returned.<BR>
It may take longer if the size is large.<BR>