// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // 引入 cors 模块

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000', // 允许来自这个源的请求
    credentials: true // 如果需要发送 cookies，设置为 true
  }));

// 使用内置的json中间件来解析JSON格式的请求体
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'message_board'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database!');
});

app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM note ORDER BY date DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// 首页留言列表数据
var comments= {"comments":[]}

app.post('/api/endpoint', (req, res) => {
  const receivedData = req.body;
  console.log(receivedData)

  const comment=receivedData;
  let now_date = new Date();
  let s1 = now_date.toISOString()
  let s1_len19 = s1.slice(0, 19);
  let s2 = s1.slice(0, 10);
  comment.datetime=s2;

  comments.comments.unshift(comment);

  // 写入数据库
  s_name = receivedData["name"]
  s_message = receivedData["message"]
  if(s_name!=undefined && s_message!=undefined){
    let sqlStr =  "INSERT INTO note (user, content, date)VALUES(\'"+s_name+"\',\'"+s_message+"\',\'"+s1_len19+"\')"
    db.query(sqlStr,(err)=>{
        console.log(err,'如果为null，sql语句执行成功')
    })
  }else{
    console.log('s_name或者s_message为空，不执行插入')
  }

  // console.log("bbb")

  try{
    // 返回状态码200来表示成功
    res.status(200).json({
      message: 'Request processed successfully'
    });
  }catch(error){
    console.log("ERROR on res.status(200)")
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
