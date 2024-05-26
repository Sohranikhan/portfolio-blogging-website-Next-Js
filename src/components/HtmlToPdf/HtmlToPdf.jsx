import { jsPDF} from "jspdf";

export default function HtmlToPdf ({html}){
    const handlePDF = async (html) => {
        (html);
        const doc = new jsPDF("div", "pt", "a4", false);
        doc.text(html, 5, 50)
        // do whatever you want in your pdf and finally save your pdf
        doc.save("mypdf.pdf");
    }

    return (
        <button onClick={()=> handlePDF(html.current.outerHTML)}>Generate PDF</button>
    )
} 