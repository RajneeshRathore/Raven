import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {UserModel} from "../models/user.model.js";

const getProfile=asyncHandler(async(req,res)=>{
    // const user=await UserModel.findById(req.user.id).select("-password");
    // if(!user) throw new ApiError(404,"User not found");
    return res.json(new ApiResponse(200,"User profile",req.user));
});

export {getProfile};