"use client"
import {
      FacebookShareButton,
      LinkedinShareButton,
      RedditShareButton,
      TelegramShareButton,
      TwitterShareButton,
      WhatsappShareButton,
} from "react-share";
import { FaWhatsapp ,FaFacebook , FaTwitter, FaReddit, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
const TelegramShareBtn = ({ url , title}) => {
      return (

            <TelegramShareButton url={url} title={title} >
<FaWhatsapp fontSize="1.5em" color="black"/>
                  </TelegramShareButton>

      )
}
const FacebookShareBtn = ({ url, title }) => {
      return (

            <FacebookShareButton url={url} title={title}>
<FaFacebook fontSize="1.5em" color="black" />
            </FacebookShareButton>

      )
}

const WhatsappShareBtn = ({ url,text }) => {
      return (

            <WhatsappShareButton url={url} title={text}>
            <FaWhatsapp fontSize="1.5em" color="black" />
            </WhatsappShareButton>

      )
}

const TwitterShareBtn = ({ url, title }) => {
      return (

            <TwitterShareButton title={title} url={url}>
<FaTwitter fontSize="1.5em" color="black" />
            </TwitterShareButton>

      )
}

const RedditShareBtn = ({ title }) => {
      return (

            <RedditShareButton title={title}>
<FaReddit fontSize="1.5em" color="black"/>
            </RedditShareButton>

      )
}
const LinkedinShareBtn = ({ url, title }) => {
      return (

            <LinkedinShareButton url={url} title={title}>
<FaLinkedin fontSize="1.5em" color="black" />
            </LinkedinShareButton>
      )
}


export {
      RedditShareBtn,
      TwitterShareBtn,
      WhatsappShareBtn,
      FacebookShareBtn,
      TelegramShareBtn
}