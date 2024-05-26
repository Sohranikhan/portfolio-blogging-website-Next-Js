import connect from "../../../utils/db";
import User from "../../../models/User"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

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
                isverified: true
            })
            await newUser.save()  

            return NextResponse.json({
                success: true,
                message: "You have created your account. Please Login",
                status: 200,
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


