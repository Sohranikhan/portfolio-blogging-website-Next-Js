import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import Post from "../../../../models/Post";

export const POST  = async (request)=>{
    const data = await request.formData()
    try {
        await connect()
        const title = data.get('title')
        const slug = data.get('slug')
        const desc = data.get('desc')
        const content = data.get('content')

         await Post.updateOne({slug: slug},{$set:{
            title: title,
            desc: desc,
            content: content,
       }})

        return  NextResponse.json({message:"Successfully Updated",success: true})
    } catch (error) {

        return NextResponse.json({message:"DataBase Error",status: 500,success: false})
    }
}
