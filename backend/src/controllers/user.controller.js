import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getProfile=asyncHandler(async(req,res)=>{
    return res.json(new ApiResponse(200,req.user,"User profile"));
});

export {getProfile};