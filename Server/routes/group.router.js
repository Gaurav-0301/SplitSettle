const express=require("express");


const groupRouter=express.Router();
const {searchUser,createGroup,getMyGroups,updateGroupProfile}=require("../controllers/groups.controller");
const protectRoute = require("../middleWare/protectedRoute");

groupRouter.get("/searchUser/:uid",searchUser);
groupRouter.post("/createGroup",protectRoute,createGroup);
groupRouter.get("/getMyGroups",protectRoute,getMyGroups);
groupRouter.post("/updateGroupProfile/:id",updateGroupProfile);


module.exports=groupRouter;

