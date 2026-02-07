import { Router } from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,rejectFriendRequest,blockUser,getFriends,getFriendRequests
} from "../controllers/friend.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/request/:userId", authMiddleware, sendFriendRequest);
router.post("/accept/:requesterId", authMiddleware, acceptFriendRequest);
router.post("/reject/:requesterId", authMiddleware, rejectFriendRequest);
router.post("/block/:userId", authMiddleware, blockUser);
router.get("/", authMiddleware, getFriends);
router.get("/requests", authMiddleware, getFriendRequests);

export default router;
