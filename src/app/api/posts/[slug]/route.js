import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import Post from "../../../../models/Post";

export const GET = async (request, { params }) => {
    const { slug } = params
    try {
        await connect()
        const userPost = await Post.findOne({ slug })
        return NextResponse.json({ img: userPost.img,title: userPost.title, desc: userPost.desc, content: userPost.content, createdAt: userPost.createdAt, success: true , likes: userPost.likes.length })
    } catch (error) {
        return NextResponse.json({
            message: "DataBase Error",
            success: false
        })
    }
}


export const DELETE = async (request, { params }) => {
    const { slug } = params
    try {
        await connect()
        await Post.deleteOne({slug: slug})
        return NextResponse.json({
            message: "Post has been successfully Deleted.",
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            message: "DataBase Error",
            success: false
        })
    }
}