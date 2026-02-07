import {Router} from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getMe,searchUsers,updateMe,getUserById } from '../controllers/user.controller.js';


const router=Router();

router.get('/me',authMiddleware,getMe)
router.get('/search',authMiddleware,searchUsers)
router.get('/:userId',authMiddleware,getUserById)
router.patch('/me',authMiddleware,updateMe)


/*
GET    /api/v1/users/me     (get own profile)
GET    /api/v1/users/:userId (get user profile by id)
GET    /api/v1/users/search?q=username (search users by username)
PATCH  /api/v1/users/me       (update avatar, username)
DELETE /api/v1/users/me       (delete account)
*/

export default router;