var express = require('express');
var app = express();
app.use(express.static(__dirname + '/www'));   //此設定為指定web內容所放置的目錄
app.listen('8080');                            //此設定為export出來的port，可自行設定
console.log('working on 8080');