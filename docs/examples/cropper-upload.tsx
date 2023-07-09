import React from 'react';
import Upload from 'react-upload-component';
import { Dialog } from '@alifd/next';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
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
];

// plan 2: base64 -> Blob -> File, IE9+
function dataURL2Blob2File(dataURL, fileName) {
  const arr = dataURL.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    u8arr = new Uint8Array(bstr.length);
  let n = bstr.length;
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  // Blob to File
  // set lastModifiedDate and name
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

const CropperUpload = () => {
  const saveCropperRef = React.useRef();
  const uploader = React.useRef();
  const [visible, setVisible] = React.useState(false);
  const [src, setSrc] = React.useState('');

  const onOk = () => {
    const data = saveCropperRef.current.cropper.getCroppedCanvas().toDataURL();
    const file = dataURL2Blob2File(data, "components.png");
    uploader.current.startUpload(file);
    onCancel();
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (<>
    <Upload.Selecter
      ref={uploader}
      defaultValue={defaultValue}
      autoUpload={false}
      action='http://127.0.0.1:7001/file'
      onChange={val => {
        console.log(val,'---===================val')
      }}
      onSelect={(files, value) => {
        const reader = new FileReader();

        reader.onload = () => {
          setSrc(reader.result);
          setVisible(true);
        };
        reader.readAsDataURL(files[0].originalFileObj);
      }}
    >

    </Upload.Selecter>
    <Dialog
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      onClose={onCancel}
      isFullScreen
    >
      <Cropper
        ref={saveCropperRef}
        src={src}
        style={{ height: 300, width: 400 }}
      />
    </Dialog>
  </>);
};

export default CropperUpload;
