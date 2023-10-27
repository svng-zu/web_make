
import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='itbambucket';
const REGION ='ap-northeast-2';

AWS.config.update({
    accessKeyId: 'AKIAVUV3427FAJA2PBGB',
    secretAccessKey: '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'
})
//실제로 저장할 버킷 객체
const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


function App() {
  //파일 업로드 진행 상태를 저장할 상태 변수
  const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
      //선택한 파일을 selectFile에 저장
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
              //전송되는 중간에 전송 비율을 출력
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

  return <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default App;
