import React from 'react';
import Upload from '../src';

import '../src/index.scss';
import { Upload as AntdUpload } from 'antd';
import { Upload as NextUpload } from '@alifd/next';

function UploadDraggable() {
  const UploadDraggableRef = React.createRef();
  return (
    <div>
      <h1>本地测试draggable组件</h1>
      <Upload.Dragger
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
      <AntdUpload multiple onChange={e=> {
        console.log(e,'-------------')
      }}>
        AntdUpload上传
      </AntdUpload>
      <div>========================================================</div>
      <NextUpload.Dragger
        // autoUpload
        onError={(error, response, file) => {
          console.log('------==========NextUpload-onError', error, response, file)
        }}
        onChange={value => {
          // console.log(value,'----=============')
        }}
      >
        {/*NextUpload*/}
      </NextUpload.Dragger>
    </div>
  );
}

export default UploadDraggable;
