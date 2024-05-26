import PostsData from "../PostsData/PostsData"
const UserDetails = ({data}) => {
    return (
        <details className="my-3">
            <div className=" flex flex-col items-center justify-center my-2">
              {data?.map(psData=>(
                <div className="w-full" key={psData._id}>

              <PostsData data={psData} />
                </div>
              ))}
            </div>
            <summary>
                Posts
            </summary>
        </details>)
}

export default UserDetails