import Image from "next/image"
import Link from "next/link"
import DeleteBtn from '../DeleteBtn/DeleteBtn'
import { handleDelete } from "../../actions/actions";
import CommentsData from '../CommentsData/CommentsData'

const PostsData = ({data}) => {
  (data?._id);
  return (
    <>
          <div className="w-full flex items-center justify-between">
            <Link href={'blog/' + data?.slug} className="flex flex-col gap-2 " key={data?._id}>
              <div className="blogContent w-full">
                <h2 className=" mb-4 text-xl font-bold">{data?.title.slice(0, 40)}</h2>
              </div>
              <p>❤️  </p>
            </Link>
            <div className="flex gap-2">
              <DeleteBtn id={`${data?._id}`} path={`/dashboard`} handler={handleDelete} />
              <Link href={`/update/${data?.slug}`} title="Edit Post" className="bg-yellow-500 text-black flex items-center justify-center h-10 px-3 rounded ">Edit</Link>
            </div>

          </div>

          <details className="w-full flex flex-col items-start justify-start">
          <div className="comments w-full flex flex-col-reverse items-start justify-start">

{data?.comments[0] && data?.comments?.map((data) => (
  <div key={data._id} className="flex items-center justify-between gap-2 my-3 w-full bg-[#0fcb6530] rounded relative">
    <CommentsData comments={data} />
  </div>
))}
</div>
<summary>Comments</summary>
          </details>
        </>
  )
}

export default PostsData