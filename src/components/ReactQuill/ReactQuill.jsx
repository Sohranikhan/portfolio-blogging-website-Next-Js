import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import Loader from "../../components/Loader/Loader";
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-bright.css';

dynamic(() => {
  hljs.configure({
    languages: ['javascript', 'html', 'jsx', 'css', 'c++']
  })
  // @ts-ignore
  window.hljs = hljs
})
const QuillNoSSRWrapper = dynamic(() => import('react-quill')
  , {
    ssr: false,
    loading: () => <div className="py-3"><Loader /></div>
  })

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] },{color:['color-picker','red','blue','green','gray'],background:['color-picker','red','blue','green','gray']},{ size: [] }],
    [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "script",
      "blockquote",
      "list",
      'color',
      'background',
      "indent",
      "link",
      "code-block"],
      [{align:[]}],
      [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  },
  clipboard: {
    matchVisual: true,
  },
}
const ReactQuill = ({ econtent, setContent }) => {

  return (
    <div className="w-full h-full py-3 whitespace-pre-wrap ql-snow">
      <QuillNoSSRWrapper
        modules={modules}
        value={econtent}
        onChange={setContent} theme="snow" placeholder="Write Your Post..." />
    </div>
  )
}
export default ReactQuill