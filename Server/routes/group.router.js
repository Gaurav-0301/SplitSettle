const express=require("express");


const groupRouter=express.Router();
const {searchUser,createGroup}=require("../controllers/groups.controller");
const protectRoute = require("../middleWare/protectedRoute");

groupRouter.get("/searchUser",searchUser);
groupRouter.post("/createGroup",protectRoute,createGroup);


module.exports=groupRouter;

