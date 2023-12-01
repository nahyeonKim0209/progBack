const express = require("express");

require("dotenv").config();
//const { PORT } = process.env;
const port = 4000;

const signAPI = require("./API/signAPI");
const mainAPI = require("./API/mainAPI");

const app = express();

//POST request로부터 파라미터 데이터 추출.
app.use(express.json());

//API 연결
app.use("/sign", signAPI);
app.use("/main", mainAPI);

//서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
