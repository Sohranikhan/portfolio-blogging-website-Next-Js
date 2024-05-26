"use server"
import { getServerSession } from "next-auth"
import { authOptions } from '../utils/authOptions'
import { revalidatePath } from "next/cache"
import Comment from "../models/Comments";
import Posts from "../models/Post";
import mongoose from "mongoose";
import User from "../models/User";
import transporter from '../utils/transporter'
import VerifyEmail from "../models/VerifyEmail";
import bcrypt from 'bcrypt'

export const handleComment = async (formData) => {
    const session = await getServerSession(authOptions)
    const comment = formData.get('comment')
    const postId = formData.get('postid')
    const path = formData.get('path')
    const userId = session?.user?.id

    if (userId === null || userId === undefined) {
        return {
            message: "You Have to Login Before Comment",
            success: false,
            status: 500
        }
    }
    if (comment !== '' && postId !== null && path !== undefined) {
        try {
            const postComment = new Comment({
                comment: comment,
                postId: postId,
                userId: userId
            })
            await Posts.updateOne({ _id: postId }, { $push: { comments: postComment._id } })
            await postComment.save()
            revalidatePath(path,"page")
            return {
                message: "Commented Successfully",
                success: true,
                status: 200
            }
        } catch (error) {
            return {
                message: "Error Occur during posting Comment",
                success: false,
                status: 400,
                error: error.message
            }
        }
    }
    else {
        return {
            message: "Please write comment before submit",
            success: false,
            status: 400
        }
    }
}



export const deleteComment = async (formData) => {
    try {
        const id = formData.get('id')
        const comPostId = await Comment.findOne({_id: id})
         await Posts.updateOne({ _id: comPostId.postId },{$pull:{comments: id}})
         await Comment.deleteOne({ _id: id })       
            revalidatePath('/dashboard',"page")
            return {
                message: "Comment Deleted Successfully",
                success: true,
                status: 200
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            status: 400
        }
    }

}

export const handleLike = async (formData) => {
    const session = await getServerSession(authOptions)
    const postId = formData.get('postid')
    const userId = session?.user?.id
    try {

        if (userId === null || userId === undefined) {
            return {
                message: "You Have to Login Before Comment",
                success: false,
                status: 500
            }
        }

        const post = await Posts.findOne({_id: postId})
          const preLiker = post.likes.filter(post=>{
if (post === userId) {
    return post
}else return []

          } )
          if (preLiker.length === 0) {
            await Posts.updateOne({_id: postId},{$push:{likes: userId}})
            const newPost = await Posts.findOne({ _id: postId })
            return {
                    success: true,
                    message: "You Liked This Post 😍",
                    likes: newPost.likes.length,
                    status: 200
                }
          }else{
              await Posts.updateOne({_id: postId},{$pull:{likes: userId}})
              const newPost = await Posts.findOne({ _id: postId })
              return {
                  success: true,
                  message: "You Disliked This Post 🙂",
                  likes: newPost.likes.length,
                  status: 200
              }
          }
  
      }catch(error){
         return { success: false, message: error.message }
      }
}

export const handleDelete = async (formData) => {
    try {
      const postId = formData.get('id')
      const path = formData.get('path')
      const getPostWriter = await Posts.findOne({_id: postId})
      await User.updateOne({_id: getPostWriter.postwriter},{$pull:{posts: postId}})
      await Comment.deleteMany({postId: postId})
      await Posts.deleteOne({ _id: postId});
      
        revalidatePath(path);
        return{
            success: true,
            message: "Post Deleted With Whole Data",
            status: 200
        }
    } catch (error) {
  return{
    error: error.message,
    success: false,
    status: 400
  }    
  }
  };


  export const deleteUser = async(formData)=>{
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await Posts.deleteMany({postwriter: id})
        await Comment.deleteMany({userId: id})
        await User.deleteOne({_id: id})
        revalidatePath(path,'page')
        return{
            success: true,
            message: "User Deleted With Whole Data",
            status: 200
        }
    } catch (error) {
        return{
            success: false,
            message: error.message,
            status: 400
        }
    }

  }




//   Admin Data

export const adminDataHandler = async (id) => {
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
          return {
            users: users,
            success: true,
            status: 200
          }
        }
        return {
            message: "No Data Found!",
            success: true,
            status: 200
          }
      }
      return {
        message: "Something went wrong 🔺",
        success: false,
        status: 400
      }
    } 
    catch (error) {
        return {
            message: error.message,
            success: false,
            status: 400
          }    
        }
  }

  export const postAnnouncement = async(formData) =>{
    try {
    const content = formData.get('content')
    const users = await User.find({},{email: 1, _id:0});
    const emails = users.map(user => user.email);
    const mailOptions = {
      from: process.env.GMAIL,
      to: emails.join(', '),
      subject: "Announcement From Akdevp",
      html: content
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return{
                success: false,
                message: error,
                status: 400
            }
        }else{
            return{
                success: true,
                message: 'Emails are sended 🥰',
                status: 200
            }
        }
    })
} catch (error) {
    return{
        success: false,
        message: error.message,
        status: 400
    }
}
}

export const handleFollow = async(formData)=>{
    try {
        const followerId = formData.get('followerid')
        const userId = formData.get('userid')
        const path = formData.get('path')

        await User.updateOne({_id: userId},{$push:{followers: followerId}})
        await User.updateOne({_id: followerId},{$push:{following: userId}})

        revalidatePath(`${path}`)
        return {
            success: true,
            message: "Followed Successfully",
            status: 200
        }
    } catch (error) {
        return{
            success: false,
            message: error.message,
            status: 400
        }
    }

}

export const unFollow = async(formData) =>{
    try {     
        const unFollowerId = formData.get('unfollowerid')
        const userId = formData.get('userid')
        const path = formData.get('path')

        await User.updateOne({_id: userId},{$pull:{followers: unFollowerId}})
        await User.updateOne({_id: unFollowerId},{$pull:{following: userId}})

        revalidatePath(`${path}`)
        return {
            success: true,
            message: "UnFollowed Successfully",
            status: 200
        }
    } catch (error) {
     return{
            success: false,
            message: error.message,
            status: 400
     }   
    }
}


export const handleOtp = async(formData)=>{
    const id = formData.get('id')
    const otp = formData.get('otp')

    try {
        const exist = await VerifyEmail.find({ userId: id })
        if (exist.length === 0) {
            return {
                success: false,
                message: 'Account does not exist, Please sign-in before',
                status: 400
            }
        } else {
            const expire  = exist[0]?.expire
            const hashedOtp = exist[0]?.otp

            if (expire < Date.now()) {
                await VerifyEmail.deleteMany({ userId: id })
                return {
                    success: false,
                    message: 'OTP has been expired, Please create new one',
                    status: 400
                }
            } else {
                const validOtp = await bcrypt.compare(otp, hashedOtp)
                if (validOtp) {
                    await User.updateOne({ _id: id }, { verified: true })
                    await VerifyEmail.deleteMany({ userId: id })
                    return {
                        success: true,
                        message: 'Email has been successfully verified',
                        status: 200
                    }
                }
                else{
                    return {
                        success: false,
                        message: 'Please enter a valid OTP',
                        status: 200
                    }  
                }
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
            status: 400
        }
    }
} 


export const resendOtp = async(formData)=>{
    try {
        const { id } = formData.get('id')
        if (id) {
            const user = await User.findOne({ _id: id })
            const otp = `${Math.floor(1000+Math.random()*9000)}`
    
                const mailOptions = {
                    from: process.env.GMAIL,
                    to: user.email,
                    subject: "OTP from Akdevp",
                    html: `Please verify your Email Address by enter this opt <br /> <strong>${otp}</strong> <br /> This otp will expire in 1 hour`
                }
                const saltRound = 10
                const hashedOtp = await bcrypt.hash(otp,saltRound)
                await VerifyEmail.deleteMany({userId: id})
                const newOtpVerify = new VerifyEmail({
                    userId: user._id,
                    otp: hashedOtp,
                    createdat: Date.now(),
                    expire: Date.now()+ 3600000,
                })
                
                await newOtpVerify.save()
                 transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return  {message:"unsuccess uploaded",success: false}
                  }
                  return  {message:"success uploaded",success: false}
                })
            
                return {
                    success: true,
                    message: "New OTP is sended to your Email",
                    status: "PENDING",
                    data:{
                        id: user._id,
                        email: user.email
                    }
                   }    
        }else{
            return {
                success: false,
                message: 'Please sign-in before',
                status: 400
               }
        }
        
    } catch (error) {
        return {
            success: false,
            message: error.message,
            status: 400
           }
    }
}