import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,select:false},
    avatarUrl: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
        userId: this._id,
        email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
  );
}


const User = mongoose.model("User", userSchema);

const validateUser = (user) =>{
    return joi.object({
        username: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }).validate(user);
}

const validateLogin = (data) =>{
    return joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }).validate(data);
}

export { User, validateUser, validateLogin };