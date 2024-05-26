"use client"
import { FaFilePdf } from "react-icons/fa"

const PdfButton = ({url}) => {
const handlePdf = async() =>{
const pdf = await fetch('http://localhost:4000/api/webtopdf',{
    method: 'POST',
    headers:{
        'Content-type': 'application/json'
    },
    body:JSON.stringify({url: url, type:'pdf'})
})
const jsPdf = await pdf.json()
const blob = new Blob([new Uint8Array(jsPdf.data.data)],{type: 'application/pdf'})
const url2 = URL.createObjectURL(blob)
const a= document.createElement('a')
a.href= url2
a.target = '_blank'
a.download = Math.floor(Math.random()*999)+'webPdf.pdf'
a.click()

}

  return (
    <button onClick={handlePdf} className="downloadPdf p-1"><FaFilePdf color='red'fontSize="1.5em" /></button>
  )
}

export default PdfButton