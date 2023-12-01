// main page API

const express = require("express");
const router = express.Router();

const { getUserCard } = require("../Models/getUserCardModel");
const { getUserIdList } = require("../Models/getUserIdList");

router.post("/mainPage", async(req,res)=>{

  try{
    const userId = await getUserIdList();
    console.log(userId);

    for(let step=0; step<10; step++){
      const userProfile = await getUserCard(userId[step]);
      console.log(userProfile);
    }

  } catch(error){

    console.error("API 호출 오류: ", error);
    res
      .status(501)
      .json({success:false, message:"API 호출 중 오류가 발생했습니다."});
    
  }

});

module.exports = router;