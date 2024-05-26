"use client"
import Image from "next/image";
import { useState } from "react";

const EditorOpt = ({ addFile}) => {

  const [open, setOpen] = useState(false)
  
  return (
    <div className="editorOptions flex gap-2 transition">

    <button className="moreOpt w-8 h-8 p-2 border rounded-full border-primary-500" onClick ={()=> setOpen(!open)}>
    <Image src="/icons/plus.svg"  width="20" height="20" alt="More options" />
    </button>

    {open && <div className="flex gap-2">
    <label htmlFor="file" className="cursor-pointer w-8 h-8 p-2 border rounded-full border-primary-500">
    <Image src="/icons/image.svg"  width="20" height="20" alt="More options" />
    </label>
  <input type="file" name="file" id="file" onChange={addFile} hidden />

    <button className="moreOpt w-8 h-8 p-2 border rounded-full border-primary-500">
    <Image src="/icons/link.svg"  width="20" height="20" alt="More options" />
    </button>
    
    <button className="moreOpt w-8 h-8 p-2 border rounded-full border-primary-500">
    <Image src="/icons/video.svg"  width="20" height="20" alt="More options" />
    </button> 
       </div>
       }
</div>
  )
}

export default EditorOpt