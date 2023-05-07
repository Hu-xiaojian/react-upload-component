import React from 'react';
import ReactDOM from 'react-dom/client';
import Upload from '../src';

function App() {
  return (
    <div>
      <h1>本地测试组件</h1>
      <Upload />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
