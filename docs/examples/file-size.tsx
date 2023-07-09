import React from 'react';
import Upload from 'react-upload-component';
import 'react-upload-component/index.scss';

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
    errorMsg: "这是错误信息"
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

const FileSize = () => {
  return (<Upload.List
    defaultValue={defaultValue}
    beforeUpload={(file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          if (e.total > 2 * 1024 * 1024) {
            console.error('File size must be < 2M')
            reject('File size must be < 2M');
            return;
          }
          const img = new Image();
          img.onload = () => {
            if (img.width <= 1200) {
              resolve('success file < 1200');
              // resolve(false);
            } else {
              console.error(`Image width ${img.width}px, Exceed limits！`)
              reject(`Image width ${img.width}px, Exceed limits！`);
              // reject()
            }
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
    }}
  />);
};

export default FileSize;
