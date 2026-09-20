const User = require("../models/auth.model");
const Group = require("../models/group.model");
const mongoose =require("mongoose")

const searchUser=async(req,res)=>{
    const {uid}=req.params;

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
        const {grpName,members}=req.body;

        if(!grpName || !grpName.trim()){
            return res.status(500).json({
                success:false,
                message:" Group Name required"
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
           grpName:grpName.trim(),
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

const getMyGroups=async(req,res)=>{
 try {
    const userId=req.user.id;

    const groups=await Group.find({
        members:userId
    }).populate(
        "createdBy",
        "uid userName profilePic"

    ).populate(
        "admins",
        "uid userName profilePic"
    ).pupulate(
        "members",
        "uid userName profilePic"
    ).sort(
        {updatedAt:-1}
    )

    return res.status(201).json({
        success:true,
        groups

    })
    
 } catch (error) {
    console.log("Error occur at getMyGroups "+error);
    return res.status(500).json({
        success:true,
        message:"Error occur at getMyGroups "+error
    })
 }
}

const updateGroupProfile = async (req, res) => {
    try {
        const { groupPic, groupName } = req.body;
        const { id } = req.params;
        let updatedData = {};

        if (grpName) {
            updatedData.grpName = grpName;
        }
       
        if (groupPic) {
            const uploadRes = await cloudinary.uploader.upload(profilePic, {
                folder: 'Group_pics'
            });
            updatedData.profilePic = uploadRes.secure_url;
        }

        
        const updatedGroup= await Group.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        res.status(200).json({
            success: true,
            updatedData: updatedGroup
        });

    } catch (error) {
        console.error("Update Group error:", error);

        res.status(400).json({
            success: false,
            message: "update Group fail: " + error.message
        });
    }
};



module.exports = {
    searchUser,createGroup,getMyGroups,updateGroupProfile
};