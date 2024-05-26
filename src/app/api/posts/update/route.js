import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import connect from "../../../../utils/db";
import Post from "../../../../models/Post";

export const POST  = async (request)=>{
    const data = await request.formData()
    try {
        await connect()
        const image = data.get('topImage')
        const title = data.get('title')
        const slug = data.get('slug')
        const desc = data.get('desc')
        const content = data.get('content')
        let imageName;
if (typeof image !== 'string') {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const path = join(process.cwd(),'/public/images/blogImages/',image.name)
    await writeFile(path, buffer)
    imageName = '/images/blogImages/'+image.name
}
if (typeof image === 'string') {
    if (image.includes('/images/blogImages/')) {
   imageName = image
    }else{
        imageName = '/images/blogImages/'+image
    }
}

         await Post.updateOne({slug: slug},{$set:{
            img: imageName,
            title: title,
            desc: desc,
            content: content,
       }})

        return  NextResponse.json({message:"Successfully Updated",success: true})
    } catch (error) {

        return NextResponse.json({message:"DataBase Error",status: 500,success: false})
    }
}
