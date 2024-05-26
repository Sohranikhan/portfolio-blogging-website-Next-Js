import Posts from "../../models/Post";
import Comment from "../../models/Comments";
import User from '../../models/User'
import AdminData from "../AdminData/AdminData";
import PostsData from '../PostsData/PostsData'

const blgData = async (id) => {
  try {
    const data = await Posts.find({postwriter: id}).populate({
      path: "comments",
      model: 'Comment'
    }).exec();
    return {
      data: data,
      success: true
    }
  } catch (error) {
    return {
      message: error.message,
      success: false
    }
  }
}

const BlogsData = async ({id , admin}) => {
  if (admin === true) {
    return <AdminData />
  }
  const data = await blgData(id);
  if (data?.data?.length === 0) {
    return (
      <div className="w-full mt-4 flex flex-col items-start justify-start">
        <p>
          No Post Data found 😢
        </p>
        <br />
      </div>
    )
  }
  if (data.success === false) {
    return (
      <div className="w-full flex items-center justify-center">
        Something went wrong! 🔴
        <br />
       {data.message}
      </div>
    )
  }

  return (
    <>
      {data?.data.map((post) => (
    <div key={post?._id} className="flex flex-col bg-background-100 p-2 rounded w-full gap-12 mb-10" >
       <PostsData data={post} />
       </div>
      ))}
    </>
  )
}

export default BlogsData