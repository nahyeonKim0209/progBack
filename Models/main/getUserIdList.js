//User Id list를 불러오는 함수

const mariadb = require("mariadb");
require("dotenv").config();

const { DBconnection } = require("../../Config/config");

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

const userIdList = [];

async function getUserIdList() {
  
    const connection = await pool.getConnection();
    //10명의 사용자를 불러오는 쿼리
    const userId =
        "select user_id from user_info limit 10";

    connection.execute(userId);
    connection.release();

    userIdList.splice(userId);

    return userId;
    
  }

module.exports = userIdList;
module.exports = { getUserIdList };