import Image from "next/image";
import EmailForm from '../../components/EmailForm/EmailForm'
export const metadata = {
    title: 'Amir Sohail Contact Information',
    description: 'There is my contact information, any query or work you can contact me anytime :)',
}
const Contact = () => {
    return (
        <div className="contact w-full h-auto">
            <div className="content flex flex-col-reverse lg:flex-row gap-24 items-center">
                <div className="imgcontainer flex-1 h-[500px] relative">
                    <Image src="/images/contact.webp" width="500" height="500" alt="AK devs contact Image" className="imageAnimate w-full object-cover hidden sm:block" />
                </div>
                {/* client form */}
                <EmailForm />
            </div>
        </div>
    );
}

export default Contact;