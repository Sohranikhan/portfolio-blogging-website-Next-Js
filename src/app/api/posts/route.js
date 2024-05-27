import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Post from "../../../models/Post";
import User from "../../../models/User"
import transporter from "../../../utils/transporter";
import { join } from 'path'
export const GET  = async ()=>{
    try {
await connect()
const userPosts = await Post.find()
return NextResponse.json({ userPosts, success: true})
         
    } catch (error) {
        return new NextResponse("DataBase Error",{status: 500})
    }
}

export const POST  = async (request)=>{
    const data = await request.formData()
    try {
        await connect()
        const title = data.get('title')
        const slug = data.get('slug')
        const desc = data.get('desc')
        const content = data.get('content')
        const postwriter = data.get('postwriter')

        const blogData = new Post({
            title: title,
            slug: slug,
            desc: desc,
            content: content,
            postwriter: postwriter
        })
        await blogData.save()
        await User.updateOne({_id: postwriter}, {$push:{posts: blogData._id}})
        const users = await User.findOne({followers: postwriter},{name:1}).populate({
            path:'followers',
            model: 'portuser',
            select: ['email']
          });
  const emails = users?.followers?.map(user => user.email);

  const mailOptions = {
    from: process.env.GMAIL,
    to: emails.join(', '),
    subject: title,
    html: `
    <a href='blog/${blogData.slug}' style='text-decoration: none;'>
       <div">
        <h2>${blogData.title}</h2>
        <p>${blogData.desc}</p>    
       </div>
       </a> 
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return  NextResponse.json({message:"Unsuccess uploaded",success: true})
  }
})
     return  NextResponse.json({message:"Successfully uploaded",success: true})
    } catch (error) {
        return NextResponse.json({message: error.message,status: 500,success: false})
    }
}
