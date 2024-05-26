import Image from "next/image";
import { FaUpload } from "react-icons/fa";

const Title = ({title , setTitle , imageRef , handleImage}) => {
  return (
    <div className="flex lg:flex-row flex-col w-full min-h-[400px] h-auto relative">
        <div className=" flex-1 block relative">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border-none outline-none w-full h-full lg:h-full my-2 font-bold text-4xl resize-none p-1"
          placeholder="Post Title"
          ></textarea>
        <p className={title.length >70?"text-red-500 bg-[#00190e3b] p-2 rounded absolute right-0 bottom-[-8px]":"bg-[#00190e3b] p-2 rounded absolute right-0 bottom-[-8px]"}>
          {title.length}/70
        </p>
          </div>
          <div className="topImage flex flex-col items-center justify-center flex-1 max-h-[400px] bg-[#2ad57728] relative"  >
            <div className="imageDiv w-full h-[400px] overflow-hidden" ref={imageRef}>

            </div>
               <label htmlFor="topImage" className="absolute bottom-0 right-0 flex gap-2 items-center justify-center p-3 rounded-lg bg-primary cursor-pointer text-black font-bold hover:bg-primarydark">
                <FaUpload size={20} color="black" />
                Upload Image
                </label>
                <input type="file" id="topImage" accept="image/*" onChange={handleImage} hidden />
          </div>
      </div>
  )
}

export default Title