const express = require("express");
const router = express.Router();
const { signUp } = require("../Models/sign/signUpModel");
const { signIn } = require("../Models/sign/signInModel");

router.post("/signUp", async (req, res) => {
  try {
    const formData = req.body;
    const result = await signUp(formData);
    if (result.success) {
      res
        .status(200)
        .json({ success: true, message: "회원가입이 완료되었습니다." });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
    res
      .status(500)
      .json({ success: false, message: "API 호출 중 오류가 발생했습니다." });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const formData = req.body;
    const result = await signIn(formData);
    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("API 호출 오류:", error);
    res
      .status(500)
      .json({ success: false, message: "API 호출 중 오류가 발생했습니다." });
  }
});

module.exports = router;
