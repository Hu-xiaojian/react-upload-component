import React from 'react';
import Upload from '../src';

import { Upload as AntdUpload } from 'antd';
import { Upload as NextUpload } from '@alifd/next';
import '../src/index.scss';

const defaultValue = [
  {
    uid: "0",
    name: "0--------------------------------------------------------------------------------------================================================================IMG.png0--------------------------------------------------------------------------------------================================================================IMG.png0--------------------------------------------------------------------------------------================================================================IMG.png",
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
    state: "uploading",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
  },
  {
    uid: "2",
    name: "IMG.png",
    state: "error",
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
    state: "error",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
  }
];

function UploadDraggable() {
  const UploadDraggableRef = React.createRef();
  return (
    <div>
      <h1>本地测试draggable组件</h1>
      <Upload.Dragger
        progressProps={{
          textRender: (percent) => percent + '%'
        }}
        defaultValue={defaultValue}
        listType="text"
        onError={(error, response, file) => {
          console.log('------==========onError', error, response, file)
        }}
        onChange={value => {
          // console.log(value,'----=============')
        }}
        action='http://127.0.0.1:7001/file'
        ref={UploadDraggableRef}
      >
        {/*<div className='test'>拖拽</div>*/}
      </Upload.Dragger>
      <div>========================================================</div>
      <AntdUpload
        action='http://127.0.0.1:7001/file'
        multiple onChange={e=> {
        console.log(e,'-------------')
      }}>
        AntdUpload上传
      </AntdUpload>
      <div>========================================================</div>
      <NextUpload
        listType='text'
        limit={10}
        method={'post'}
        action='http://127.0.0.1:7001/file'

        // autoUpload
        onError={(error, response, file) => {
          console.log('------==========NextUpload-onError', error, response, file)
        }}
        onChange={value => {
          // console.log(value,'----=============')
        }}
        headers={{'X-Requested-With':null}}
      >
        NextUpload
      </NextUpload>
    </div>
  );
}

export default UploadDraggable;
