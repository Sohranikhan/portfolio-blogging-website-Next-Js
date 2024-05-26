import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,  
    },
    desc:{
        type: String,
        unique: true,
        require: true,  
    },
    slug:{
        type: String,
        require: true,  
    },
    img:{
        type: String,
        require: true,  
    },
    content:{
        type: String,
        require: true,  
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'portuser'
    }],
    postwriter:{
        type: Schema.Types.ObjectId,
        ref: "portuser"
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
    ,
},{timestamps: true})

const Posts = mongoose.models.blogpost || mongoose.model("blogpost", postSchema);
export default Posts