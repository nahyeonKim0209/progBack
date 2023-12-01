const mariadb = require("mariadb");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { BCRYPT_KEY } = process.env;

const { DBconnection } = require("../../Config/config");

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);
const bcryptKey = parseInt(BCRYPT_KEY); //Bcrypt_key 정수로 가공

async function signUp(formData) {
  try {
    const connection = await pool.getConnection();

    const hashedPW = await bcrypt.hash(formData.userPW, bcryptKey); //비밀번호 암호화

    const query =
      "INSERT INTO user_info (user_id, major_name, field_of_study_name, user_password, user_name, college_email, user_phone,user_contact_1,user_contact_2,user_contact_3,field_of_study_idx_1,field_of_study_idx_2,field_of_study_idx_3,filed_of_study_idx_4,user_badge_id,user_titles_id) VALUES (?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      formData.userId,
      formData.userMajor,
      formData.userFieldOfStudy,
      hashedPW,
      formData.userName,
      formData.userCollegeEmail,
      formData.userPhone,
      formData.userContact1, //default value is null.
      formData.userContact2, //default value is null.
      formData.userContact3, //default value is null.
      formData.userFieldOfStudy1, //default value is null.
      formData.userFieldOfStudy2, //default value is null.
      formData.userFieldOfStudy3, //default value is null.
      formData.userFieldOfStudy4, //default value is null.
      formData.userBadgeId, //default value is 0.
      formData.userTitlesId, //default value is 0.
    ];

    await connection.execute(query, values);

    connection.release();
    return { success: true, message: "회원가입이 완료되었습니다." };
  } catch (error) {
    console.error("회원가입 오류:", error);
    return { success: false, message: "회원 가입 중 오류가 발생했습니다." };
  }
}

module.exports = { signUp };
