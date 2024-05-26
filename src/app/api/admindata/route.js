import { NextResponse } from "next/server"
import User from '../../../models/User'
import Post from '../../../models/Post'
import Comment from '../../../models/Comments'

export const POST = async (request) => {
    const {id}= await request.json()
    try {
      const verifyAdmin = await User.findOne({ _id: id})
      if (verifyAdmin.isadmin === true) {
        const users = await User.find().populate({
          path: 'posts',
          model: 'blogpost',
          populate: {
            path: 'comments',
            model: 'Comment',
          }
        })
        if (users?.length) {
          return NextResponse.json({
            users: users,
            success: true,
            status: 200
          })
        }
        return NextResponse.json({
            message: "No Data Found!",
            success: true,
            status: 200
          })
      }
      return NextResponse.json({
        message: "Something went wrong 🔺",
        success: false,
        status: 400
      })
    } 
    catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
            status: 400
          })    
        }
  }