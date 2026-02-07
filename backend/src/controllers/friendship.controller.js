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

  return res.status(201).json(new ApiResponse(201, request, "Friend request sent"));
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

  return res.json(new ApiResponse(200, request, "Friend request accepted"));
});

const rejectFriendRequest = asyncHandler(async (req, res) => {
  const { requesterId } = req.params;

  const request = await FriendshipModel.findOne({
  requester: requesterId,
  recipient: req.user._id,
  status: "pending"
});


  if (!request) {
    throw new ApiError(404, "Friend request not found");
  }

  if (!request.recipient.equals(req.user._id)) {
    throw new ApiError(403, "Not authorized");
  }

  await request.deleteOne();

  return res.json(
    new ApiResponse(200, null, "Friend request rejected")
  );
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const me = req.user._id;

  await FriendshipModel.findOneAndUpdate(
    {
      $or: [
        { requester: me, recipient: userId },
        { requester: userId, recipient: me }
      ]
    },
    {
      requester: me,
      recipient: userId,
      status: "blocked"
    },
    { upsert: true, new: true }
  );

  res.json(new ApiResponse(200, null, "User blocked"));
});

const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const friends = await FriendshipModel.find({
    status: "accepted",
    $or: [{ requester: userId }, { recipient: userId }]
  }).populate("requester recipient", "username avatarUrl");

  const friendList = friends.map(f => {
    return f.requester._id.equals(userId)
      ? f.recipient
      : f.requester;
  });

  res.json(new ApiResponse(200, friendList));
});

const getFriendRequests = asyncHandler(async (req, res) => {
  const requests = await Friendship.find({
    recipient: req.user._id,
    status: "pending"
  }).populate("requester", "username avatarUrl");

  res.json(new ApiResponse(200, requests));
});




export { sendFriendRequest, acceptFriendRequest, rejectFriendRequest ,blockUser,getFriends,getFriendRequests};
