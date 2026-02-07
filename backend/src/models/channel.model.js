import mongoose from "mongoose";
const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["private", "group", "public"], default: "private" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
const ChannelModel = mongoose.model("Channel", channelSchema);

export { ChannelModel };