const express = require("express");

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/에서 실행 중입니다.`);
});
