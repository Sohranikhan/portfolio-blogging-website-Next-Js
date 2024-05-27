import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { ThemeProvider } from "../../context/ThemeContext";
import Provider from "../../context/SessionProvider";
import 'react-toastify/dist/ReactToastify.css';
import UserNavBar from'../components/UserNavBar/UserNavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Akdevp | Website Design and development services provider',
  description: 'I am Amir Sohail, full-Stack website devaloper, working form 4 years on website devalopment. I can create any type of website that you want.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider >
          <Provider>
          <div className="mainLayout w-full min-h-[45rem] px-3 mx-auto flex flex-col justify-between">
            <div className="flex flex-col gap-1 max-w-[1450px] lg:mx-7">
            <Navbar />
            <UserNavBar />
            </div>
            <div className="max-w-[1450px] w-full mx-auto px-1">
              {children}
            </div>
            <Footer />
          </div>
          </Provider>
        </ThemeProvider >
      </body>
    </html>
  )
}
