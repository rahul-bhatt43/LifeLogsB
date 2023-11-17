import mongoose from "mongoose";

const postScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    imgLink:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    uid:{
        type:String,
        required:true,
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
},{
    timestamps:true,
})

export  default mongoose.model("Post",postScheme)