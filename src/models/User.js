import mongoose from "mongoose";
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        require: true,  
    },
    email:{
        type: String,
        unique: true,
        require: true,  
    },
    image: {
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,  
    },
    isadmin:{
        type: Boolean,
        default: false
    },
    followers:[{
        type: Schema.Types.ObjectId,
        ref: "portuser"
    }],
    following:[{
        type: Schema.Types.ObjectId,
        ref: "portuser"
    }],
    posts:[{
        type: Schema.Types.ObjectId,
        ref: "blogpost"
    }],
   verified: {
    type: Boolean,
    default: false
   }
},{timestamp: true})

const User = mongoose.models.portuser || mongoose.model("portuser", userSchema);
export default User