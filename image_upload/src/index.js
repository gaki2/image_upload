import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//https://cookinghoil.tistory.com/114

function Input() {
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const onChange = (e) => {
    console.log(e.target.files);
    setImgFile(e.target.files);
    setImgBase64([]);

    for(let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i]) {
          let reader = new FileReader();
          // 파일을 읽어 버퍼에 저장합니다.
          reader.readAsDataURL(e.target.files[i]);
          // 파일 상태 업데이트
          reader.onloadend = () => {
            const base64 = reader.result;
            console.log(base64);
            if (base64) {
              let base64Sub = base64.toString();
              console.log(base64Sub);
              setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            }
          }
        }
    }
  }

  const WriteBoard = () => {
    const fd = new FormData();
    console.log(imgFile);
    Object.values(imgFile).forEach((file) => fd.append("file", file));

    for (let key of fd.entries()) {
      console.log(key[0] + ',' + key[1]);
    }
  }

  return(
    <div>
      <input type='file' multiple='multiple' onChange={onChange} accept='.git, .jpg, .png, .jpeg'></input>
      {imgBase64.map((item) => {
        return(
          <img src={item} style={{width:'auto', height:'auto', maxWidth:'300px', maxHeight:'300px'}}></img>
          )
      })}
      <button onClick={WriteBoard}>전송</button>
    </div>
  )
}

function App() {
  return(
    <div>
      <Input></Input>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));