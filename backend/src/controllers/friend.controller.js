import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { FriendshipModel } from "../models/friendship.model.js";

const sendFriendRequest = asyncHandler(async (req, res) => {
  const requester = req.user._id;
  const recipient = req.params.userId;

  if (requester.equals(recipient)) {
    throw new ApiError(400, "You cannot friend yourself");
  }

  const exists = await FriendshipModel.findOne({
    $or: [
      { requester, recipient },
      { requester: recipient, recipient: requester }
    ]
  });

  if (exists) {
    throw new ApiError(400, "Friend request already exists");
  }

  const request = await FriendshipModel.create({ requester, recipient });

  res.status(201).json(new ApiResponse(201, request, "Friend request sent"));
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { requesterId } = req.params;

  const request = await FriendshipModel.findOne({
    requester: requesterId,
    recipient: req.user._id,
    status: "pending",
  });

  if (!request) {
    throw new ApiError(404, "Friend request not found");
  }

  request.status = "accepted";
  await request.save();

  res.json(new ApiResponse(200, request, "Friend request accepted"));
});



export { sendFriendRequest, acceptFriendRequest };
