const User = require("../models/auth.model");
const Group = require("../models/group.model");
const mongoose =require("mongoose")

const searchUser=async(req,res)=>{
    const {uid}=req.query;

    try {
         if (!uid) {
            return res.status(400).json({
                success: false,
                message: "UID is required"
            });
        }

      const current_user=await User.findOne({uid:uid.trim()});

      if(!current_user){
        return res.status(404).json({
            success:false,
            message:"User not found !!",
        })

        
      }
      return res.status(200).json({
        success:true,
        user:current_user

      })

} catch (error) {
        console.log("Error occur in FindUser"+error);
        return res.status(500).json({
            success:false,
            message:"Error occur in FindUser"+error,
        });
    }
}

const createGroup=async(req,res)=>{
    const creatorId=req.user.id;

    try {
        const {name,members}=req.body;

        if(!name || !name.trim()){
            return res.status(500).json({
                success:false,
                message:"Name required"
            })
        }

        if(!Array.isArray(members)){
            return res.status(500).json({
                success:false,
                message:"members must be in Array"
            })
        }

    const users=await User.find({
        uid:{$in: members}
    }).select("_id userName uid profilePic");

    if(users.length!== members.length){
        return res.status(404).json({
            success:false,
            message:"One or more user not found"
        })
    }

    const memberIds = users.map(user => user._id);

   memberIds.push(new mongoose.Types.ObjectId(creatorId));

    console.log("REQ BODY:", req.body);
console.log("creatorId:", creatorId);
console.log("members from request:", members);
console.log("users:", users);
console.log("memberIds:", memberIds);
  

  const uniqueMembers = [
    ...new Map(
        memberIds.map(id => [
            id.toString(),
            id
        ])
    ).values()
];

    const newGroup=await Group.create(
        {
            name:name.trim(),
            createdBy:creatorId,
            admins:[
                creatorId
            ],
            members:uniqueMembers
        }
    );

    return res.status(201).json({
        success:"true",
        message:"New Group created successfully",
        group:newGroup
    });

        
    } catch (error) {
         console.log("Create group error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create group"
        });
        
    }
}



module.exports = {
    searchUser,createGroup
};