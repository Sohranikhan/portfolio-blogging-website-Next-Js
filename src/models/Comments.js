import mongoose, {Schema} from "mongoose"

const commentSchema = new Schema({
    comment:{
        type:String,
        require: true,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogpost'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'portuser'
    }
},{timestamps: true})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment