"use client"
import { useRef } from 'react'
import {postAnnouncement} from '../../actions/actions'

const AnnounceEmailForm = () => {
const formRef = useRef()
  return (
    <form action={postAnnouncement} ref={formRef} className="flex flex-col gap-3 w-full justify-end">
    <textarea name="content" placeholder="Enter Your Content.." className="w-full min-h-52 resize-none p-5 bg-transparent rounded border-4 border-primary-100 ">
    
    </textarea>
    <button type="submit" onClick={()=> formRef.current.reset()} className="h-9 px-2 rounded bg-primary w-fit min-w-24 text-black">Post</button>
          </form>
  )
}

export default AnnounceEmailForm