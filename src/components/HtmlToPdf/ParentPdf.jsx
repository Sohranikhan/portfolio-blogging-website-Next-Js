"use client"

const ParentPdf =()=>{
        const ref = React.useRef();
        return(<div className="main">
        <div className="content" ref={ref}>
        <h1>Hello PDF</h1>
        <p id="text text-blue">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </div>
        <button onClick={handlePdf}>GeneratePdf</button>
        </div>);
}

export default ParentPdf;