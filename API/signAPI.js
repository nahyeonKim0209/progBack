const express = require("express");
const router = express.Router();
const { signUp } = require("../Models/signUpModel");
//const { signIn } = require("../Services/signIn");

router.post("/signUp", async (req, res) => {
  try {
    const formData = req.body;

    const result = await signUp(formData, res);

    res.json(result);
  } catch (error) {
    console.error("API 호출 오류:", error);
    res
      .status(500)
      .json({ success: false, message: "API 호출 중 오류가 발생했습니다." });
  }
});

//router.post("/signIn", signIn);

module.exports = router;
