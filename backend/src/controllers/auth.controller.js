import { User, validateUser } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = validateUser({ username, email, password });
  if (error) throw new ApiError(400, error.details[0].message);

  const existedUser = await User.find(email);
  if (existedUser) throw new ApiError(400, "User Already Exist");

  const user = await User.create({ username, email, password });

  const createdUser = await User.findById(user._id);
  return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"));


});


export {register};
