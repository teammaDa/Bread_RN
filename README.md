# パン焼けたよ  
src/  
-pages/ 		--表示スクリーン画面  
-routes/ 		--ルート管理  
-firebase/ 	--firebaseの設定
-styles/		--スタイルシート

# 起動方法  
```
$npm install -g expo-cli  
```  
モジュールのインストール
```
$npm install
```  

ローカルホスト立ち上げる
```
$expo start
```
# Dockerでの起動方法  
Windows:  
以下のコマンドで
```
$make wsl
```  
wslでうまくipアドレスが取得できない、またはwsl以外のターミナルを使用する場合:  
```
$ipconfig
```
により表示された「IPv4 アドレス」の部分を.envファイルに貼り付ける

```
LOCAL_IP_ADDR=XXX.XXX.XXX.XXX
```
その後以下のコマンドで立ち上げ  
```
$make build
```
Mac:
```
$make mac
```
  
その後以下のコマンドで実行
```
$expo start
```  

wを押すとweb上で立ち上がる  
Expo GoをインストールしたスマホでQRを読み取る   
QRを読み取っても動かない場合、場合LAN=>Tunnelに変更する  
localhost:19002にアクセスし変更するか、次のコマンド実行で変更できる。
```
$expo start --tunnel
```  

