import mongoose,{ Schema } from "mongoose";

const verifyEmailSchema = new Schema({
    userId:{
        type: String,
        require: true,
    },
    otp:{
        type: String,
        require: true,
    },
    createdat:{
       type: Date,
       require: true  
    },
    expire:{
        type: Date,
        require: true,
    }
})

const VerifyEmail = mongoose.models.verifyemail || mongoose.model('verifyemail', verifyEmailSchema);
export default VerifyEmail