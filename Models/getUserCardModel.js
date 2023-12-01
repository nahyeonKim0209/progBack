//User Id를 받고 유저 프로필에 들어갈 카드 정보를 불러오는 함수

//input = userId
//outpue = Card정보

const mariadb = require("mariadb");
require("dotenv").config();

const { DBconnection } = require("../Config/config");

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function getUserCard(formData) {

    const connection = await pool.getConnection();

    const query =
        "select user_info.user_id, user_info.major_name, user_info.field_of_study_name, st.titles_name, sb.badge_name,sb.badge_image,user_info.user_project_resume_1,user_info.user_project_resume_2,user_info.user_project_resume_3 from user_info inner join system_titles st on user_info.user_titles_id = st.titles_id inner join system_badge sb on user_info.user_badge_id = sb.badge_id where user_id = ?";
    const values = [
        formData.userId //userIdList[i]
    ]
  
    await connection.execute(query, values);
    connection.release();

    return query;
    
  }

  module.exports = { getUserCard };