import nodemailer from "nodemailer"

 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        ciphers:'SSLv3'
    }
})
export default transporter