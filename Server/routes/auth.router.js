const express=require("express")
const authRouter=express.Router()
const {getMe,signUp,logout,otpVerification,accessToken,login,resendOtp}  = require("../controllers/auth.controller")


authRouter.get("/auth/getMe",getMe);
authRouter.post("/auth/signUp",signUp);
authRouter.post("/auth/login",login);

authRouter.get("/auth/logout/:id",logout);
authRouter.post("/auth/otpverify/:id",otpVerification);
authRouter.post("/auth/accessToken",accessToken);
authRouter.post("/auth/resendOtp/:userId",resendOtp);



module.exports=authRouter;