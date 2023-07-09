import React from 'react';
import Upload from '../../src';

const defaultValue = [
  {
    uid: "0",
    name: "IMG.png",
    state: "done",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  },
  {
    uid: "1",
    name: "IMG.png",
    percent: 50,
    suffix: 'jpg',
    state: "uploading",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  },
  {
    uid: "2",
    name: "IMG.png",
    state: "error",
    size: 2000,
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    errorMsg: "0--------------------------------------------------------------------------------------================================================================IMG.png0--------------------------------------------------------------------------------------================================================================IMG.png0--------------------------------------------------------------------------------------================================================================IMG.pngfail to upload something"
  },
  {
    uid: "3",
    name: "IMG.png",
    suffix: 'zip',
    state: "error",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  }
];

function UploadDraggable() {
  const UploadDraggableRef = React.createRef();
  return (
    <div>

      <Upload.Dragger
        listType="image"
        defaultValue={defaultValue}
        // onPreview={(file) => {
        //   console.log(file,'-------file')
        // }}
        // progressProps={{
        //   textRender: (percent) => percent + '%'
        // }}
        // // listType="text"
        // onImageError={(file, error) => {
        //   console.log(file,'---------------file, error', error)
        // }}
        // onError={(error, response, file) => {
        //   console.log('------==========onError', error, response, file)
        // }}
        //
        // onChange={value => {
        //   // console.log(value,'----=============')
        // }}
        // action='http://127.0.0.1:7001/file'
        // ref={UploadDraggableRef}
      >
      </Upload.Dragger>
    </div>
  );
}

export default UploadDraggable;
