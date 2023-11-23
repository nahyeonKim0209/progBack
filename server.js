const express = require("express");

require("dotenv").config();
const { PORT } = process.env;

const signAPI = require("./API/signAPI");

const app = express();

//POST request로부터 파라미터 데이터 추출.
app.use(express.json());

//API 연결
app.use("/sign", signAPI);

//서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/에서 실행 중입니다.`);
});
   