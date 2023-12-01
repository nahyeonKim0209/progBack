const mariadb = require("mariadb");
const bcrypt = require("bcrypt");
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

    if (
      bcrypt.compareSync(formData.userPW, dbResult[0].user_password) === false
    ) {
      return { success: false, message: "로그인에 실패했습니다." };
    } //비밀번호 비교

    return { success: true, message: "로그인이 완료되었습니다." };
  } catch (error) {
    console.error("로그인 오류:", error);
    return { success: false, message: "로그인에 실패했습니다." };
  }
}

module.exports = { signIn };
