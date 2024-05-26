"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "../../components/ReactQuill/ReactQuill";
import { ToastContainer, toast } from "react-toastify";
import BlogHead from "../../components/BlogHead/BlogHead";
import Description from "../../components/Description/Description";
import EditorOpt from "../../components/EditorOpt/EditorOpt";
import { useSession } from "next-auth/react";
import Button from "../../components/Button/Button";

const slugify =(str)=>
{
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
  }

const WritePage = () => {
  const router = useRouter();
  const [topImage, setTopImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [econtent, setContent] = useState("");
  const imageRef = useRef();

  const {data: session} = useSession() 
 if (!session?.user) {
 return <div className=" my-4 flex flex-col items-center justify-center"><h2>Please First Login</h2>
 <div className="my-3">
 <Button text={'Login'} title={'Click & Login'} url={'/login'} />
 </div>
 </div>
 }else{

   const addFile = (e) => {
    const body = new FormData();
    body.append("img", e.target.files[0]);
    fetch("/api/posts/imgupload", {
      method: "POST",
      body: body,
    }).then((data) =>
    data.json()).then((jsData) => {
        if (jsData.success === true) {
          toast.success(jsData.message);
          setContent(
            (prev) =>
            `${prev} <br /> \n <Image src="${jsData.url}" width="800" height="400" alt="${e.target.files[0].name}" className="w-[100%] h-auto object-cover" />`
          );
        } else toast.error(jsData.message);
      });
    };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setTopImage(e.target.files[0]);
      imageRef.current.innerHTML = `<Image src="${URL.createObjectURL(
        e.target.files[0]
      )}" width='800' height="400" alt="Top image" className="w-[100%] h-[400px] object-cover" />`;
    }
  };

  
  const handlePostSubmit = async () => {
    const slug = slugify(title)
    const formData = new FormData();
    
    if (
      topImage !== "" &&
      title !== "" &&
      desc !== "" &&
      econtent !== "" &&
      slug !== "" &&
      topImage !== null
    ) {
      try {
        
        formData.append("topImage", topImage);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("slug", slug);
        formData.append("content", econtent);
        formData.append('postwriter', `${session?.user?.id}`)
        const sendBlog = await fetch("/api/posts", {
          method: "POST",
          body: formData,
        });

        const res = await sendBlog.json();
        toast.success(res.message,{
          theme: 'dark'
        });
        setTimeout(() => {
          router.push(`/blog/${slug}`);
        }, 5000);
      } catch (error) {
        toast.error(error.message,{
          theme: 'dark'
        });
      }
    } else {
      toast.error("Please fill up all fields",{
        theme: 'dark'
      });
    }
  };
  return (
    <div className="w-full min-h-[100vh] mt-8">
      {/* title */}
      <BlogHead
        title={title}
        setTitle={setTitle}
        imageRef={imageRef}
        handleImage={handleImage}
        />

      {/* Description */}
      <Description desc={desc} setDesc={setDesc} />
      {/* Editor Options */}
      <EditorOpt addFile={addFile} />

      <ReactQuill econtent={econtent} setContent={setContent} />

      <button
        onClick={handlePostSubmit}
        className="fixed right-2 lg:right-12 z-50 px-4 py-2 bottom-11 bg-primary text-black font-bold rounded-xl"
        >
        Publish
      </button>
      <ToastContainer />
    </div>
  );
}
};
export default WritePage;
