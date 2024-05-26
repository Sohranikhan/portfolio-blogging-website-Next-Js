import Image from "next/image";
import Link from "next/link";
import FollowBtn from "../FollowBtn/FollowBtn";
import mongoose from "mongoose";
const Followers = ({tfollowers, myid}) => {
if (tfollowers.length === 0) {
   return(
    <div className="my-3 ">
        <p>No Follower Yet 🙂</p>
    </div>
   ) 
}

  return (
    <div className="w-full h-auto followers grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 py-4 mx-auto">
                        {tfollowers && tfollowers.map(follower=>(
                    <div  key={`${follower._id}`} className="userImage w-auto max-w-40 h-auto flex flex-col">
                        <Link href={`/user/${follower._id}`}>
                        <Image src={follower.image} alt={follower.name} width={50} height={50} className="w-12 h-12 rounded-[50%] object-cover" />
                        </Link>
                            <FollowBtn followers={JSON.stringify(follower?.followers)} myid={`${myid}`} userId={`${follower._id}`} />
                    </div>
                        ))}
                        
                    </div>
  )
}

export default Followers