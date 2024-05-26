import React from 'react'

const Description = ({desc , setDesc}) => {
  return (
    <div className=" w-full h-auto relative mt-4">    
    <textarea
      name="desc"
      value={desc}
      onChange={(e)=> setDesc(e.target.value)}
      className="bg-transparent border-none outline-none w-full h-40 lg:h-24 my-2 font-bold text-xl resize-none p-1"
      placeholder="Post short description"
    ></textarea>
    <p className={desc.length >160?"text-red-500 bg-[#00190e3b] p-2 rounded absolute right-0 bottom-[-8px]":"bg-[#00190e3b] p-2 rounded absolute right-0 bottom-[-8px]"}>
      {desc.length}/160
    </p>
  </div>
  )
}

export default Description