import { NextResponse } from 'next/server';
import transporter from '../../../utils/transporter';
export const POST = async(request)=> {
  const body = await request.formData();
  try {
    const userName = body.get('userName')
    const email = body.get('email')
    const message = body.get('message')

const adminMailData = {
    from: userName,
    to: process.env.GMAIL,
    subject: `Message From ${userName}`,
    text: message + " | Sent from: " + email,
    html: `<div><p>${message}</p></div><p>Sent from:
${email}</p>`
}
const userMailData = {
    from: 'Akdevp',
    to: email,
    subject: `Hello ${userName} at Akdevp`,
    text: "We are happy to see your message 😍",
    html: `<div><p>Dear ${userName}, We have recived your message, We will touch with you ,Thanks for your time.</p></div>`
}
transporter.sendMail(userMailData, function (err, info) {
    if(err)
    return NextResponse.json({success: false, error : err})
  })
  transporter.sendMail(adminMailData, function (err, info) {
    if(err)
    return NextResponse.json({success: false, error : err})
  })
    return NextResponse.json({success: true, data : {userName}})
  } catch (error) {
    return NextResponse.json({success: false, error : error})
  }
  
}