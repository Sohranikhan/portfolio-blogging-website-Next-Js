import { redirect } from "next/navigation";
import Loader from "../../components/Loader/Loader";
import BlogsData from "../../components/BlogsData/BlogsData";
import Button from "../../components/Button/Button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../utils/authOptions";
import { Suspense } from "react";
import AdminData from "../../components/AdminData/AdminData";
import connect from "../../utils/db";
import AnnounceEmailForm from '../../components/AnnounceEmailForm/AnnounceEmailForm'
const Dashboard = async() => {
  await connect()
const session = await getServerSession(authOptions)
 if (session?.user?.isadmin === true) {
  return (
    <div className="blogs w-full flex lg:flex-row flex-col gap-6">
    <div className="blogsDiv w-full flex flex-col flex-1">
      <h1 className="my-3 text-2xl md:text-3xl ">Super Admin Dashboard 🥰 </h1>
      <p className="my-3 text-lg">Writers on Akdevp</p>
<Suspense fallback={<Loader />}>
    <AdminData id={session?.user?.id}/>
</Suspense>
</div>
    <div className="flex-1 flex-col gap-6 h-full my-5 flex items-center justify-center">
     <Button text="Write Blog ✍️" url="/write" title="Write Blog Post" />

     <div className="flex flex-col items-start justify-end w-full">
      <h3 className="py-3 text">Create an Announcement</h3>
        {/* Email Form */}
      <AnnounceEmailForm />
     </div>
    </div>
 </div>
  )
}else if(session?.user?.verified){
  return (
    <div className="blogs w-full flex lg:flex-row flex-col gap-6">
    <div className="blogsDiv w-full flex flex-col flex-1">
      <h2 className="my-5">{session?.user?.name} Posts</h2>
<Suspense fallback={<Loader />}>
    <BlogsData id={session?.user?.id} admin={false} />
</Suspense>
</div>
    <div className="flex-1 h-full my-5 flex items-center justify-center">
     <Button text="Write Blog ✍️" url="/write" title="Write Blog Post" />
    </div>
 </div>
  )
}else{
  return redirect('/')
}
}

export default Dashboard
  