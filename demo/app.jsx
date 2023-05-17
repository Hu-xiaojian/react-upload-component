import React from 'react';
import ReactDOM from 'react-dom/client';
import Upload from '../src';
import '../src/index.scss';
import { Upload as AntdUpload } from 'antd';
import { Upload as NextUpload } from '@alifd/next';

function App() {
  return (
    <div>
      <h1>本地测试组件</h1>
      <Upload
        action='http://127.0.0.1:7001/file'
        multiple
        autoUpload
        timeout={300}
        onChange={e => {
          console.log(e,'--------onChange')
        }}
        onSuccess={(res, file) => {
          console.log(res,'--------onSuccess')
        }}
      >上传</Upload>
      <div>========================================================</div>
      <AntdUpload multiple onChange={e=> {
        console.log(e,'-------------')
      }}>
        AntdUpload上传
      </AntdUpload>
      <div>========================================================</div>
      <NextUpload
        autoUpload
        onChange={e => {
          console.log(e,'--------onChange')
        }}
      >
        NextUpload
      </NextUpload>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
