import { NextResponse } from "next/server";
import Comment from "../../../../models/Comments";
import connect from "../../../../utils/db";

export const GET = async ()=>{
    try {
        const comments = await Comment.find({postId: id}).populate('userId')
        return NextResponse.json({
            comments: comments,
            success: true,
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Not Commented",
            success: false,
            status: 400
        })    
    }
}

export const POST = async(request)=>{
    await connect()
const {comment, userId,postId} = await request.json();
try {
    const postComment = new Comment({
        comment: comment,
        postId: postId,
        userId: userId
    })
    const info = await postComment.save()
    (info);
    return NextResponse.json({
        message: "Commented Successfully",
        success: true,
        status: 200
    })    
} catch (error) {
    (error);
    return NextResponse.json({
        message: "Not Commented",
        success: false,
        status: 400
    })    
}

}