import Image from "next/image"
import DeleteBtn from "../DeleteBtn/DeleteBtn"
import {adminDataHandler, deleteUser} from '../../actions/actions'
import UserDetails from '../UserDetails/UserDetails'
import Link from "next/link"

const AdminData = async({ id }) => {
  // adminDataHandler
const data = await adminDataHandler(id)
if (data?.users < 1) {
    return (
      <div className="w-full mt-4 flex flex-col items-start justify-start">
        <p>
          No Posts Data found 😢 <br />
          Or I am facing error on fetching data.
        </p>
        <br />
      </div>
    )
  } else {
    return (
      <div className="w-full flex gap-3">
        <div className="usersData flex flex-col gap-2 w-full">
          {data?.users?.map(data => (
            <div key={data._id} className="relative p-3 flex flex-col bg-[#0f520f5d] w-full my-4">
              <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Link href={`/user/${data._id}`} className="flex items-center gap-3">
                {data?.image ? <Image src={data?.image} width={50} height={50} alt={data.name} /> : <p>🍁</p>}
                <strong className="text-xl">{data.name}</strong>
              </Link>
              <span>Posts: {data?.posts?.length}</span>
            </div>
        <div className="opt flex items-center gap-2">
          {`${data._id}` !== id ?
            <DeleteBtn id={`${data._id}`} path={'/dashboard'} handler={deleteUser} />
            : <div className=""></div>
          }
        </div>
              </div>
              
{/* Details Components */}
<UserDetails data={data?.posts} />

            </div>
        ))}
        
        </div>
      </div>
    )
  }
}

export default AdminData