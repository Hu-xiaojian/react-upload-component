import React from 'react';
import { Dialog, Upload } from "@alifd/next";

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
  // {
  //   uid: "1",
  //   name: "IMG.png",
  //   percent: 50,
  //   suffix: 'jpg',
  //   state: "uploading",
  //   url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   downloadURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   imgURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   size: 2000
  // },
  // {
  //   uid: "2",
  //   name: "IMG.png",
  //   state: "error",
  //   size: 2000,
  //   url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   downloadURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   imgURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   errorMsg: "这是错误信息"
  // },
  // {
  //   uid: "3",
  //   name: "IMG.png",
  //   suffix: 'zip',
  //   state: "error",
  //   url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   downloadURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   imgURL:
  //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
  //   size: 2000
  // }
];

const DialogImg = ({ src, visible, onClose }) => {
  const [val, setVal] = React.useState(defaultValue);
  const ref = React.useRef();
  return (<>
    <Dialog
      visible={visible}
      isFullScreen
      onOk={onClose}
      onCancel={onClose}
      onClose={onClose}
    >
      <img src={src} alt=""/>
    </Dialog>
  </>);
};

export default DialogImg;
