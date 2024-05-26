import Image from "next/image";
import Button from "../../components/Button/Button"
import './about.css'

const about = () => {
    return ( 
<div className="aboutme flex flex-col items-start justify-start w-full">
   <div className="imageContainer w-full h-[350] mx-auto relative">
    <Image src="/images/aboutme.webp" width="1350" height="350" priority="medium" className="w-[1350px] object-cover grayscale h-auto max-h-[350px]"  alt="About Image man working on computer"/>
   <div className="imageText absolute bottom-4 left-1 p-2 rounded text-background">
    <h1 className="text-xl font-bold">Read About Me</h1>
    <h2 className=" text-xl sm:text-2xl lg:text-3xl">Here is my short introduction</h2>
   </div>
   </div>
<div className="stTextContainer my-4 flex lg:flex-row flex-col gap-14 items-start justify-between">

<div className="txtdiv flex-1">
    <h3 className="text-3xl font-bold my-4">Who I Am?</h3>
    <p className="text-base">
    I am a 23-year-old student of <span> B.Sc. Information Engineering Technology </span>, studying at <span>MIR CHAKAR KHAN RIND UNIVERSTY OF TECHNOLOGY DG Khan</span>. I have already completed a Diploma of <span>Computer Information technology </span> 3 years ago from this university. </p>
    <br />
    <p>
     I have started learning about <span>website design & websites since my diploma days</span>. I warmly appreciate my university teachers, who encourage me to learn new things instead of traditional studies. I appreciate all my teachers who teach me at least one word, but I mostly appreciate <span>Mr. Saleem Sahab</span> and <span>Ms. Saima Sahiba</span> . They teach us their best.
</p>
</div>

<div className="txtdiv flex-1">
<h3 className="text-3xl my-4">What skills do I have?</h3>
    <p className="text-base">
    I started learning from <span>💮 HTML and CSS</span> in my diploma days. I also learn <span>JAVA</span>, but my target was website Development, so my focus was <span>JavaScript 💓</span>.
    </p>
     <p className="text-base">
     After improving my 💮 JavaScript, I want to shift to <span> React JS</span>, but for some reason I shifted my way to <span>💮 Node.js</span> and <span>💮 Express.js</span>. After that, I have made real world API and <span>Web Scraping API</span> by <span>💮 Cheerio</span> ,<span>💮 Axios</span> and last <span>Puppeteer</span>. <br /><br />
     </p>
     <p className="text-base">
      When I feel it is not enough, I started learning <span>💮 React JS</span>. It was pretty easy for me. I have completed two courses on <span>YOUTUBE</span>, the first on <span>Code Ninja</span> and the other was <span>Indian Chenel</span>. <br /> <br />
        </p>
      <p className="text-base">
       After having full control of React JS concepts, I started learning <span>💮 Next Js</span>. In Next Js Journey, <span>Lama dev</span> was my favorite and best and best teacher and also my playlist has awesome tutorials of this man at that time 💖.
</p>

<Button url="mailto:sohailppp1121@gmail.com" text="Read More" title="Read More About Me ❤️"/>
</div>

</div>
</div>

     );
}
 
export default about;