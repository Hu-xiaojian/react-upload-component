import React from 'react';
import ReactDOM from 'react-dom/client';
import Progress from '../src/progress';
import UploadDraggable from "./upload-dragger";
import './clear.scss';
import '../src/index.scss';

function App() {
  const [percent, setPercent] = React.useState(0);

  return (
    <div>
      <button onClick={() => setPercent(prev => prev === 0 ? 0 : prev - 10)}>测试-</button>
      <button onClick={() => setPercent(prev => prev === 100 ? 100 : prev + 10)}>测试+</button>
      <Progress
        hasBorder
        state={'normal'}
        backgroundColor={'green'}
        percent={percent}
        progressive
        color={'red'}
        textRender={() => '测试'}
      />
      <Progress
        hasBorder
        shape={'circle'}
        state={'normal'}
        backgroundColor={'green'}
        percent={percent}
        progressive
        color={'red'}
        textRender={() => '测试'}
      />
      <UploadDraggable />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
