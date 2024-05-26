import Image from 'next/image'
import User from '../../../models/User'
import Posts from '../../../models/Post'
import FollowBtn from '../../../components/FollowBtn/FollowBtn'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../utils/authOptions'
import Followers from '../../../components/Followers/Followers'
import {FaNewspaper , FaHeart, FaUserFriends, FaUserCheck} from "react-icons/fa"
import connect from '../../../utils/db'
const getUser = async (id) => {
    try {
        await connect()

        const user = await User.findOne({ _id: id },{password:0}).populate({
            path: 'posts',
            model: 'blogpost',
            select: ['img','title','likes','slug'],
        }).populate({
            path: 'followers',
            model: 'portuser',
            select: ['_id','image','name', 'followers']
        })

        if (user) {
            let totalLikes = []
            user.posts.map(post => {
                post.likes.map(like => {
                    totalLikes.push(like._id)
                })
            })
            return {
                user,
                likes: totalLikes.length,
                success: true,
                message: "Success"
            }
        } else {
            return {
                success: false,
                message: "Something went wrong!"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

const page = async ({ params }) => {
    const session = await getServerSession(authOptions)
    const userData = await getUser(params.id)
    if (userData.success === true) {
        return (
            <div className='w-full h-auto min-h-[35rem]'>
                <div className="userInfo w-full flex flex-col items-center justify-center">
                    <div className="userImage w-auto min-w-52 h-52 flex flex-col items-center justify-center gap-4">
                        <Image src={userData?.user?.image} alt={userData?.user?.name} width={150} height={150} className="w-36 h-36 rounded-[50%] object-cover" />
                        <div className="w-auto flex items-center justify-center  gap-3 my-3">
                            <p className='w-auto text-xl'>{userData?.user?.name}</p>
                            <FollowBtn followers={JSON.stringify(userData?.user?.followers)} userId={`${userData?.user?._id}`} myid={`${session?.user?.id}`} />
                        </div>
                    </div>
                    <div className="w-full h-auto grid grid-cols-4 gap-2 max-w-xl mt-7">
                        <div className="w-fit px-4 h-16 max-w-52 mx-auto  min-w-auto flex flex-col items-center justify-start gap-1 cursor-pointer" ><FaNewspaper size={40} color='#17c94d' /> <p>{userData?.user?.posts?.length}</p> </div>
                        <div className="w-fit px-4 h-16 max-w-52 mx-auto  min-w-auto flex  flex-col items-center justify-start gap-1 cursor-pointer" ><FaHeart size={40} color='red' /> <p>{userData?.likes}</p> </div>
                        <div className="w-fit px-4 h-16 max-w-52 mx-auto  min-w-auto flex  flex-col items-center justify-start gap-1 cursor-pointer"><FaUserFriends size={40} color='#17c94d' /> <p>{userData?.user?.followers?.length}</p> </div>
                        <div className="w-fit px-4 h-16 max-w-52 mx-auto  min-w-auto flex  flex-col items-center justify-start gap-1 cursor-pointer"><FaUserCheck size={40} color='#17c94d' /> {userData?.user?.following?.length} </div>
                    </div>
<div className="w-full max-w-[70rem] mx-auto flex flex-col items-start justify-start py-3">

                        <h3>Followers</h3>
                    <Followers tfollowers={userData?.user?.followers} myid={`${session.user.id}`}  />
</div>
                    <div className="w-full mx-3 flex flex-col max-w-3xl">
                        {userData?.user?.posts.map((post) => (
                            <div className="w-full flex flex-col gap-3 my-1" key={`${post._id}`}>
                                <Link href={`/user/${userData?.user?._id}`} className='flex items-center justify-start gap-3 my-4'>
                                <Image src={userData?.user?.image} width={35} height={35} alt={userData?.user?.name} className='w-9 h-9 rounde-[50%]' />
                                <p>{userData?.user?.name}</p>
                                </Link>
                                <Link href={`/blog/${post?.slug}`} className='w-full flex flex-col gap-3'>
                                <div className="flex-[1] overflow-hidden">
                                    <h2 className='text-xl font-medium '>{post?.title}</h2>
                                </div>
                                <div className="relative w-full h-auto max-h-[36rem] flex-[1]">
                                    <Image src={post?.img} alt={post?.title} width={500} height={300} className='w-full h-full' />
                                    <p className='absolute top-2 right-2 p-2 text-white bg-[#06000084] rounded'>{post?.likes?.length} ❤️</p>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                <div className="userInfo">
                    {userData.message}
                    <p>Something went wrong!🔴</p>
                </div>

            </div>
        )
    }
}

export default page