import React from 'react';
import ReactDOM from 'react-dom/client';
import navs from './nav';
import './clear.scss';
import '../src/index.scss';

function App() {

  return (
    <div className="app">
      <div className="content">
        <h1>Upload</h1>
        <p>文件选择上传和拖拽上传控件。</p>
        <h2>代码演示</h2>
        {
          navs.map((it, index) => {
            return <div key={index} name={index} id={index}>{ React.createElement(it.component) }</div>;
          })
        }
      </div>
      <div className="nav">
        <div className="nav-container">
          {
            navs.map((it, index) => {
              return <div key={index}><a href={`#${index}`}>{ it.title }</a></div>;
            })
          }
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
