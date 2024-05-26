import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export const POST  = async (request)=>{
    const data = await request.formData()
    try {
        const image = data.get('img')
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const path = join(process.cwd(),'/public/images/blogImages/',image.name)
        await writeFile(path, buffer)
        const imageName = "/images/blogImages/"+image.name
        return  NextResponse.json({message:"Successfully uploaded", url: imageName ,success: true})
    } catch (error) {
        return NextResponse.json({message:"DataBase Error",status: 500,success: false})
    }
}
