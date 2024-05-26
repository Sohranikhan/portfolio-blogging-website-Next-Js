import connect from "../../../utils/db";
import User from "../../../models/User"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import transporter from "../../../utils/transporter";
import VerifyEmail from "../../../models/VerifyEmail";

export const POST = async(request)=>{
    const {name , email , password} = await request.json()
    await connect()
    try {
        const exacUser = await User.findOne({email: email})
        if (exacUser) {
            return NextResponse.json({
                success: false,
                message: "You are already registerd here, Plaese login",
                status: 401,
            }) 
        } else{
            const securePassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                name:name,
                email:email,
                image: `https://avatar.iran.liara.run/public/boy?username=${name}`,
                password:securePassword,
                isverified: false
            })
            const user = await newUser.save()  
            const otp = `${Math.floor(1000+Math.random()*9000)}`

            const mailOptions = {
                from: process.env.GMAIL,
                to: email,
                subject: "OTP from Akdevp",
                html: `Please verify your Email Address by enter this opt <br /> <strong>${otp}</strong> <br /> This otp will expire in 1 hour`
            }
            const saltRound = 10
            const hashedOtp = await bcrypt.hash(otp,saltRound)
            const newOtpVerify = new VerifyEmail({
                userId: user._id,
                otp: hashedOtp,
                createdat: Date.now(),
                expire: Date.now()+ 3600000,
            })
            
            await newOtpVerify.save()
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return  NextResponse.json({message:"unsuccess uploaded",success: false})
              }
              return  NextResponse.json({message:"unsuccess uploaded",success: false})
            })
          
            return NextResponse.json({
                success: true,
                message: "Verify Email Address by OTP, sended to Your Email",
                status: "PENDING",
                data:{
                    id: user._id,
                    email: user.email
                }
               })
        }
       
    } catch (error) {
       return NextResponse.json({
        success: false,
        message: error.message,
        status: 500,
       }) 
    }
}


