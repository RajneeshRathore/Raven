import { UserModel, validateUser ,validateLogin} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import RefreshTokenModel from "../models/refreshToken.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const cookieOptions={
  httpOnly:true,
  secure:process.env.NODE_ENV==="production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge:7*24*60*60*1000, //7 days
}
const generateTokens = async (user, deviceInfo) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await RefreshTokenModel.create({
    token: refreshToken,
    user: user._id,
    deviceInfo
  });

  return { accessToken, refreshToken };
};


const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = validateUser({ username, email, password });
  if (error) throw new ApiError(400, error.details[0].message);

  const existedUser = await UserModel.findOne({ email });
  if (existedUser) throw new ApiError(400, "User Already Exist");

  const user = await UserModel.create({ username, email, password });
  const createdUser = await UserModel.findById(user._id).select("-password");
  return res
    .status(201)
    .json(new ApiResponse(201,createdUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLogin({ email, password });

  if (error) throw new ApiError(400, error.details[0].message);

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) throw new ApiError(400, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new ApiError(400, "Invalid email or password");

  const{ accessToken, refreshToken } = await generateTokens(user, req.headers['user-agent'] || 'Unknown Device');

  const loggedInUser = await UserModel.findById(user._id).select("-password");

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
  .cookie("refreshToken", refreshToken, cookieOptions).json(new ApiResponse(200,loggedInUser, "User logged in successfully"));
});

const logout = asyncHandler(async (req,res)=>{
   const token = req.cookies?.refreshToken;
   if(!token) throw new ApiError(401,"Unauthorized");
   const hashedToken = crypto.createHash("sha256").update(token).digest("hex"); 
   const refreshToken = await RefreshTokenModel.findOneAndDelete({token: hashedToken});
   if(!refreshToken) throw new ApiError(403,"Invalid refresh token");
   res.clearCookie("accessToken", cookieOptions);
   res.clearCookie("refreshToken", cookieOptions);
   return res.status(200).json(new ApiResponse(200,{},"Logged out successfully"));
});

export { register ,login,logout};
