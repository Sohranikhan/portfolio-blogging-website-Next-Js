import DeleteBtn from '../DeleteBtn/DeleteBtn'
import {deleteComment } from '../../actions/actions'
import Image from 'next/image'
const CommentsData = ({comments}) => {
    return (
        <>
            <div className="flex items-start w-auto my-2">
                <div className=" flex flex-col w-10 h-auto mx-2 ">
                    {comments?.userId?.image ? <Image src={comments.userId.image} alt={comments?.userId?.name} width="28" height="28" className="w-10 h-auto rounded-full" /> : <p className={`w-7 h-7 rounded-full  flex items-center justify-center`}>🍁</p>}
                    <p className="text-sm w-full">{comments?.userId?.name}</p>
                </div>
                <p className=" comment whitespace-pre-wrap text-wrap overflow-scroll my-2">{comments.comment}</p>
            </div>
            <DeleteBtn id={`${comments._id}`} path={'/dashboard'} handler={deleteComment} />
        </>)
}

export default CommentsData