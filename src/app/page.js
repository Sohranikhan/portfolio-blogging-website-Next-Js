import Image from "next/image";
import Button from "../components/Button/Button"
import ButtonSecond from "../components/ButtonSecond/ButtonSecond";
import MySkills from'../components/MySkills/MySkills'

const Home = async () => {
  return (
    <main className="w-full">
      <div className="hero w-full flex lg:flex-row flex-col gap-4 items-center justify-between">
        <div className="heroHead lg:flex-[1] w-full mt-16 lg:mt-0">

          <span className="my-4 text-xl bg-transparent">Hi There!</span>
          <h1 className="my-4 text-2xl lg:text-3xl font-bold mb-6"> I am Amir Sohail <br />
            <span className=" text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-t from-primarydark to-primary" >Full Stack Website Developer</span>
          </h1>
          <p className="lg:max-w-[90%] text-base">Working on Website Development since 4 Years. I have strong experience on Frontend Development and Backend Development.</p>
          <div className="w-full flex items-center gap-3">
            <Button url="/contact" text="Hire Me" title="Email Me" />
            <ButtonSecond text="My Projects" url="/projects" title="My Projects" />
          </div>
        </div>
        <div className="heroImage w-lg lg:flex-[1] flex items-center lg:justify-end justify-center">
          <Image src="/images/heroImage.webp" width="400" height="400" className="heroImageAnimate w-[40rem] object-cover" priority="small" alt="Ak devs hero Image" />
        </div>
      </div>

      <MySkills />
    </main>
  )
}
export default Home