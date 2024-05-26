"use client"
import { handleFollow } from '../../actions/actions'
import { unFollow } from '../../actions/actions'
import { usePathname } from "next/navigation"

const FollowBtn = ({ followers, userId, myid }) => {
const path = usePathname()
    const jsFollowers = JSON.parse(followers)
    if (myid) {
        if (myid === userId) {
            return <></>
        } 

            const follower = jsFollowers?.filter(follower => {
                if (follower._id) {
                   return follower._id === myid
                } else {
                    return follower === myid 
                }
            })

            if (follower.length <= 0) {
                return (
                        <form action={handleFollow}>
                            <input type="text" name="followerid" defaultValue={`${myid}`} hidden />
                            <input type="text" name="userid" defaultValue={`${userId}`} hidden />
                            <input type="text" name="path" defaultValue={path} hidden />
                            <button className="bg-primary hover:bg-primarydark text-black font-bold py-2 px-4 rounded">
                                Follow
                            </button>
                        </form>
                )
            } else {
                return (
                        <form action={unFollow}>
                            <input type="text" name="unfollowerid" defaultValue={`${myid}`} hidden />
                            <input type="text" name="userid" defaultValue={`${userId}`} hidden />
                            <input type="text" name="path" defaultValue={path} hidden />
                            <button className="bg-primary hover:bg-primarydark text-black font-bold py-2 px-4 rounded">
                                Unfollow
                            </button>
                        </form>
                )

               
            }
    } else {
        return <></>
    }
}

export default FollowBtn