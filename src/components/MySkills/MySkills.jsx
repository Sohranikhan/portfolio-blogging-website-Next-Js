import Image from "next/image"
import { FaReact} from "react-icons/fa"
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3, IoLogoNodejs } from "react-icons/io"
import Button from "../Button/Button"


const MySkills = () => {
    
    return (
        <div className="w-full h-auto my-10 md:min-h-[100vh]">
            <div className="w-auto flex md:flex-row flex-col gap-6 items-center justify-evenly">

                <Image src={'/images/myskills.webp'} width={350} height={500} className=" w-[100%] max-w-sm hidden md:block shadow-lg shadow-text rounded-t-3xl  flex-[1] h-auto" alt="My Skills" />
            <div className="skills w-full flex flex-col items-start max-w-[40rem] flex-1 md:flex-[3]">
                    <h2 className="my-4">My Skills 🧑‍🎓</h2>

    <div className="OneSkill w-full flex flex-col my-3">
                        <IoLogoHtml5 size={25} className="cursor-pointer" color="orangered" title="HTML 5" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[95%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>95%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        <IoLogoCss3 size={25} className="cursor-pointer" color="#0051ff" title="CSS 3" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[90%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>90%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        <IoLogoJavascript size={25} className="cursor-pointer" color="#dec804" title="Javascript" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[86%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>86%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        <FaReact size={25} className="cursor-pointer" color="#0abfd4" title="React js" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[84%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>84%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        <IoLogoNodejs size={25} className="cursor-pointer" color="green" title="Node js" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[85%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>85%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        <p className="cursor-pointer text-xl" title="Next Js"> <span className="text-primary">N</span>ext Js</p>
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[90%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>90%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        
                    <Image src={'/logo/tailwind.svg'} width={35} height={35} alt="tailwind css"className="cursor-pointer w-6 h-6" title="Tailwind css" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[95%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>95%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="OneSkill w-full flex flex-col my-3">
                        
                    <p className="cursor-pointer text-xl" title="Express Js"> <span className="text-primary">E</span>xpress Js</p>
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[88%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>88%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="OneSkill w-full flex flex-col my-3">
                        
                    <Image src={'/logo/mongodb.svg'} width={35} height={35} alt="tailwind css"className="cursor-pointer" title="Mongo DB" />
                        <div className="skill w-full h-[0.5rem] mt-2 border-2 border-text rounded-2xl">
                            <div className="aproach relative w-[90%] h-full bg-text rounded-2xl">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center absolute top-[-50px] right-[-25px] cursor-pointer">
                                    <p>🚩</p><p>90%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button url={'/about'} text={'Read More'} title={'Read More'} />
                </div>
            </div>
        </div>
    )
}

export default MySkills