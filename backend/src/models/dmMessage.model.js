import mongoose from "mongoose";

const dmMessageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    content:{type:String},
    attachments:[String],//image URLs, files
    isRead:{type:Boolean, default:false}
},{timestamps:true});

const DMMessageModel = mongoose.model("DMMessage",dmMessageSchema);

export{DMMessageModel};