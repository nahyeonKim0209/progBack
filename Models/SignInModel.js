const mariadb = require("mariadb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
require("dotenv").config();

const { DBconnection } = require("../Config/config");

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function signIn(formData) {
  try {
    const connection = await pool.getConnection();

    const query = "SELECT * FROM user_info WHERE user_id=?";
    const values = [formData.userId];

    const dbResult = await connection.execute(query, values);
    connection.release();

    //아이디-비밀번호 검증
    if (
      bcrypt.compareSync(formData.userPW, dbResult[0].user_password) === false
    ) {
      return { success: false, message: "로그인에 실패했습니다." };
    }
    console.log(JWT_KEY);

    //JWT 발행
    let token = jwt.sign(
      {
        type: "JWT",
        userID: dbResult[0].user_id,
        userPW: dbResult[0].user_password,
      },
      JWT_KEY,
      {
        expiresIn: "60m",
        issuer: "localhost",
      }
    );

    return { success: true, message: "로그인이 완료되었습니다.", token };
  } catch (error) {
    console.error("로그인 오류:", error);
    return { success: false, message: "로그인에 실패했습니다." };
  }
}

module.exports = { signIn };
