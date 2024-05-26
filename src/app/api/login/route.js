import connect from "../../../utils/db";
import User from "../../../models/User"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
export const POST = async(request)=>{
    try {
    const { email , password} = await request.json()
    await connect()
    const exacUser = await User.findOne({email: email})
    if (exacUser) {
        const matchPass = bcrypt.compareSync(password, exacUser.password)
        if (matchPass) {
            return NextResponse.json({
                user: exacUser,
                status: 200,
                success: true
            }) 
        }else{
        return NextResponse.json({
            message:"Email or Password is incorrect!",
            success: false,
            status: 401,
        })
        }
        } else{
            return NextResponse.json({
                message: "You are looking new here, Please Sign-in first",
                success: false,
                status: 401,
            })
        }
    } catch (error) {

        return NextResponse.json({
            success: false,
            status: 401,
            error: error 
            })
    }
}