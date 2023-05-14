import React from 'react';
import ReactDOM from 'react-dom/client';
import Upload from '../src';
import '../src/index.scss';
import { Upload as AntdUpload } from 'antd';

function App() {
  return (
    <div>
      <h1>本地测试组件</h1>
      <Upload
        multiple
        onChange={e => {
          console.log(e,'--------')
        }}
      >上传</Upload>
      <div>========================================================</div>
      <AntdUpload multiple onChange={e=> {
        console.log(e,'-------------')
      }}>
        AntdUpload上传
      </AntdUpload>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
