import React from 'react';
import ReactDOM from 'react-dom/client';
import Upload from '../src';

import { Upload as AntdUpload } from 'antd';
import { Upload as NextUpload } from '@alifd/next';
import UploadDraggable from "./upload-dragger";
import '@alifd/next/index.scss'
import '../src/index.scss';

function App() {
  return (
    <div>
      <UploadDraggable />
      {/*<Upload.Dragger*/}
      {/*  action='http://127.0.0.1:7001/file'*/}
      {/*  multiple*/}
      {/*  autoUpload*/}
      {/*  timeout={300}*/}
      {/*  onChange={e => {*/}
      {/*    console.log(e,'--------onChange')*/}
      {/*  }}*/}
      {/*  onSuccess={(res, file) => {*/}
      {/*    console.log(res,'--------onSuccess')*/}
      {/*  }}*/}
      {/*>*/}
      {/*  /!*<div className='test'>拖拽</div>*!/*/}
      {/*</Upload.Dragger>*/}
      {/*<div>========================================================</div>*/}
      {/*<AntdUpload multiple onChange={e=> {*/}
      {/*  console.log(e,'-------------')*/}
      {/*}}>*/}
      {/*  AntdUpload上传*/}
      {/*</AntdUpload>*/}
      {/*<div>========================================================</div>*/}
      {/*<NextUpload*/}
      {/*  autoUpload*/}
      {/*  onChange={e => {*/}
      {/*    console.log(e,'--------onChange')*/}
      {/*  }}*/}
      {/*>*/}
      {/*  NextUpload*/}
      {/*</NextUpload>*/}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
