import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DMMessageModel } from "../models/dmMessage.model.js";
import { FriendshipModel } from "../models/friendship.model.js";

//send DM message
const sendDMMessage = asyncHandler(async(req,res)=>{
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const {content,attachments}=req.body;

    if(!content?.trim() && (!attachments || attachments.length===0)){
        throw new ApiError(400,"Message content or attachments are required");
    }


    //check if sender and receiver are friends
    const friendship = await FriendshipModel.findOne({
        $or:[
            {requester:senderId, recipient:receiverId, status:"accepted"},
            {requester:receiverId, recipient:senderId, status:"accepted"}
        ]
    });

    if(!friendship){
        throw new ApiError(400,"You are not friends with this user");
    }

    const dmMessage = await DMMessageModel.create({
        sender:senderId,
        receiver:receiverId,
        content,
        attachments
    });

    return res.status(201).json(new ApiResponse(201,dmMessage,"DM message sent successfully")); 
});

const getDMMessages = asyncHandler(async (req, res) => {
  const me = req.user._id;
  const otherUser = req.params.userId;

  // Optional: friendship check again (recommended)
  const friendship = await FriendshipModel.findOne({
    status: "accepted",
    $or: [
      { requester: me, recipient: otherUser },
      { requester: otherUser, recipient: me }
    ]
  });

  if (!friendship) {
    throw new ApiError(403, "Not friends");
  }

  const messages = await DMMessageModel.find({
    $or: [
      { sender: me, receiver: otherUser },
      { sender: otherUser, receiver: me }
    ]
  })
    .sort({ createdAt: 1 })
    .populate("sender receiver", "username avatarUrl");

  res.json(new ApiResponse(200, messages));
});


export {sendDMMessage,getDMMessages};