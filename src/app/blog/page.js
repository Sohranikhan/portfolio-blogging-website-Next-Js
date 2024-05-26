import Posts from "../../models/Post";
import Image from "next/image";
import Link from "next/link";
import connect from "../../utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import User from "../../models/User";

const dataFetch = async() =>{
   const session = await getServerSession(authOptions)
   try {
      await connect();
   if (session?.user) {
      const cUser = await User.findOne({_id: session?.user.id},{followers: 1})      
      const data = await Posts.find({postwriter: {$in: cUser.followers}});
      return data;
   } else {
      const data = await Posts.find({}).sort('-1');
      return data;
   }

   } catch (error) {
      return {
         success: false,
         error: error
      }
   }
}
const popularBlogs = async()=>{
   try {
      await connect();
      const data = await Posts.find({}).sort({likes: -1}).limit(10)
      return data;
   } catch (error) {
      return {
         success: false,
         error: error.message
      }
   }
}
const Blog = async() => {
   const data = await dataFetch()
   const pPosts = await popularBlogs()
   console.log(data, pPosts);
if (data.length === 0) {
   return(
   <div className="flex items-center justify-center">
      No Data found 😢
   </div>
   )
}
if (!data || data.error) {
   return(
   <div className="flex items-center justify-center">
      Something went wrong! 🔴 
   </div>
   )
}

return ( 
<div className="blogs w-full flex flex-col md:flex-row gap-6">
   <div className="posts md:w-[70%] w-full flex flex-col" >

   { data.map((item)=>(
      <Link href={'blog/'+item.slug} className="flex flex-col sm:flex-row items-start justify-start gap-12 mb-10" key={item._id}>
<div className="blogImage w-full sm:w-auto h-auto">
    <Image src={item.img} width="200" height="180" priority="medium" alt="blog image" className="sm:w-[200px] sm:max-w-[250px] sm:h-[150px] sm:max-h-[180px] w-full h-auto object-cover"/>
   </div>
   <div className="blogContent w-full px-3 flex flex-col gap-3">
    <h2 className=" mb-2 text-lg md:text-xl lg:text-2xl font-bold md:max-w-[90%]">{item.title}</h2>
    <p className="blogDesc text-base md:max-w-[90%]">{item.desc}</p>
    <button className="font-bold w-fit px-1 text-sm h-8 rounded-lg bg-primary text-black" title='Read More'>Read More</button>

   </div>
   </Link> 
   ))
}
   </div>

   <div className="mostViewed md:w-[30%] w-full bg-background-100 p-4 rounded">
<h3 className="text-center my-2">Popular Posts</h3>
{pPosts && pPosts.map((post)=>(
<Link href={'/blog/'+post.slug} key={`${post._id}`} className="flex flex-col gap-3">
   <div className="flex">
<h4 className="font-bold text-xl">{post.title.slice(0,30)}</h4>
   </div>
   <div className="imagediv">
      <Image src={post.img} className="w-24 max-h-24 max-w-auto h-auto" width={100} height={100} alt={post.title} />
   </div>
   </Link>   
))

}
   </div>

</div>

     );
}
 
export default Blog;