const express = require("express");

const app = express();
app.use(express.urlencoded({extended:true}));

const port = 5000;

app.use(express.json());
const fs = require("fs");

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));


// 投稿一覧データ
const tulartData = require("./tulart-data.json");

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});

// 投稿一覧読み込み用GetAPI
app.get("/tulart-data", (req, res) => {
  const resData = tulartData.reverse();
  res.json(resData);
});

// 投稿用PostAPI(雑につくってる！)
app.post("/tulart", function(req, res){
  req.body.id = tulartData.length + 1;
  fs.writeFile(
    __dirname + "/tulart-data.json",
    JSON.stringify([...tulartData,req.body]),
    function () {
      res.send("投稿完了");
    }
  );
});
