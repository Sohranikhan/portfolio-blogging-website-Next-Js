"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "../../../components/ReactQuill/ReactQuill";
import { ToastContainer, toast } from "react-toastify";
import BlogHead from "../../../components/BlogHead/BlogHead";
import Description from "../../../components/Description/Description";
import EditorOpt from "../../../components/EditorOpt/EditorOpt";

const UpdatePost = ({ params }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [econtent, setContent] = useState("");
  const imageRef = useRef();

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`).then((data) =>
      data.json()).then((data) => {
        imageRef.current.innerHTML = `<Image src="${data.img}" width='800' height="400" alt="Top image" className="w-[100%] h-[400px] object-cover" />`;
        setSlug(params.slug);
        setTitle(data.title);
        setDesc(data.desc);
        setContent(data.content);
      });
  }, [params.slug]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.innerHTML = `<Image src="${URL.createObjectURL(
        e.target.files[0]
      )}" width='800' height="400" alt="Top image" className="w-[100%] h-[400px] object-cover" />`;
    }
  };

  const handlePostUpdate = async () => {
    const formData = new FormData();
    if (
      title !== "" &&
      desc !== "" &&
      econtent !== "" &&
      slug !== ""
    ) {
      try {
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("slug", slug);
        formData.append("content", econtent);
        const sendBlog = await fetch("/api/posts/update", {
          method: "POST",
          body: formData,
        });
        const res = await sendBlog.json();

        toast.success(res.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please fill up all fields");
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
      {/* <EditorOpt addFile={addFile} /> */}

      <ReactQuill econtent={econtent} setContent={setContent} />
      <button
        onClick={handlePostUpdate}
        className="fixed right-2 lg:right-12 px-4 py-2 bottom-11 bg-primary text-white rounded-xl"
      >
        Update
      </button>
      <ToastContainer />
    </div>
  );
};
export default UpdatePost;
