import Image from "next/image";
import Posts from "../../../models/Post";
import connect from "../../../utils/db";
import dynamic from "next/dynamic";
import {WhatsappShareBtn , FacebookShareBtn, TwitterShareBtn } from "../../../components/ShareBtns/ShareBtns.jsx";
import PdfButton from '../../../components/PdfButton/PdfButton.jsx'
import Comment from "../../../models/Comments";
import CommentForm from "../../../components/CommentForm/CommentForm";
import User from "../../../models/User.js";
import LikeBtn from '../../../components/LikeBtn/LikeBtn'
import Link from "next/link";
await connect()

import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-bright.css';

dynamic(() => {
  hljs.configure({
    languages: ['javascript', 'html', 'jsx', 'css', 'c++']
})
    window.hljs = hljs
  })
const getComments = async (id)=>{
    try {
        const comments = await Comment.find({postId: id}).populate('userId')
        return comments  
    } catch (error) {
        return error
    }  
}

const getData = async (slug) => {
    try {
        const userPost = await Posts.findOne({slug:slug}).populate({
            path: 'postwriter',
            model: 'portuser'
        })
        return {postData: userPost , likes: userPost.likes.length}
    } catch (error) {
        return (
            <div className="w-full flex items-center justify-center">
                Something went wrong! 🔴
            </div>
        )
    }
}

export async function generateMetadata({ params }) {
    const {postData: data} = await getData(params.slug)
    return {
        title: data?.title,
        description: data?.desc
    }
}
 
const BlogPost = async ({ params }) => {
    const {postData: blgData , likes}  = await getData(params.slug)
    const comments = await getComments(blgData?._id)
    return (

        <div className="w-full">
            <div className="singleBlog flex lg:flex-row flex-col lg:items-center lg:justify-center gap-12 my-12">
                <div className="singlecontent flex-1 flex flex-col gap-5">
                    <h1 className="lg:text-5xl text-4xl font-bold my-3">{blgData?.title}</h1>
                    <p className="text-xl">{blgData?.desc}</p>
                    <Link href={`/user/${blgData?.postwriter?._id}`} className="author flex items-center gap-4">
                    {blgData?.postwriter?.image ? <Image src={blgData?.postwriter?.image} width="40" height="40" priority="medium" className="rounded-[50%] object-cover" alt={blgData.postwriter.name} /> : <Image src="/images/user.webp" width="40" height="40" priority="medium" alt={blgData.postwriter.name} className="rounded-[50%] object-cover"  /> }
                        <span>{blgData?.postwriter?.name}</span>
                    </Link>
                </div>
                <div className="imageContainer flex-1 h-auto max-h-[450px] overflow-hidden">
                    <Image src={blgData?.img} width="500" height="400" alt="Single Work Image" className="w-full h-auto max-h-[450px] object-cover" />
                </div>
            </div>

            <div className="options w-full flex items-center justify-center max-w-min bg-white text-black rounded-lg mx-auto gap-6 mb-4 p-2">

      <LikeBtn postId={`${blgData?._id}`} preLikes={`${likes}`} />          
      <WhatsappShareBtn text={`${blgData?.title} \n ${blgData?.desc} `} url={`/blog/${blgData.slug}`}  />
      <FacebookShareBtn title={blgData?.title} url="/blog" />
      <TwitterShareBtn title="Hello World" url="#" />
      <PdfButton url={'/blog/'+params.slug} />
                
            </div> 
            <div className="flex md:flex-row flex-col-reverse items-start justify-evenly w-full">
                <div className="blogContent md:w-[80%] w-full" dangerouslySetInnerHTML={{ __html: blgData?.content }} />
                <div className="adsInfo md:w-[20%] w-full my-4 bg-blue-600 text-white">
                    Area For Ads
                </div>
            </div>
            <div className="commentSec w-full my-3 bg-background-100 rounded">
                 {/* Comment Form   */}
               <CommentForm postId={`${blgData?._id}`} /> 

                <div className="comments w-full flex flex-col-reverse items-start justify-start my-2">
                    {comments && comments?.map((data) => (
                        <Link href={`/user/${data?.userId?._id}`} key={`${data._id}`} className="flex items-start gap-2 my-3 w-full bg-[#0fcb6530] rounded">
                             <div className=" flex flex-col w-10 h-auto mx-2">
                                {data?.userId?.image ? <Image src={data?.userId?.image} width="28" height="28" className="w-10 h-auto rounded-full" alt={data?.userId?.name} /> : <p className={`w-7 h-7 rounded-full  flex items-center justify-center`}>🍁</p>}
                                <p className="text-sm w-full">{data?.userId?.name}</p>
                            </div> 
                            <p className=" comment whitespace-pre-wrap text-wrap overflow-scroll my-2">{data.comment}</p>
                        </Link>
                    ))}
                </div> 
            </div>

        </div>
    );
}

export default BlogPost;