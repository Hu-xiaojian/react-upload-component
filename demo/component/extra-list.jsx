import React from 'react';
import Upload from '../../src';
import { View, DownLoadIcon, DeleteIcon } from './icon';
import { Dialog, Button } from '@alifd/next';
import '@alifd/next/index.scss';
import './extra-list.scss';

const showImg = url => {
  Dialog.show({
    title: "img preview",
    content: <img src={url} style={{ width: 400, height: 400 }} />,
    footer: false
  });
};

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
  {
    uid: "2",
    name: "IMG.png",
    state: "done",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  },
  {
    uid: "4",
    name: "IMG.png",
    state: "done",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  },
  {
    uid: "3",
    name: "IMG.png",
    state: "done",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  }
];

const actionRenderStyle = {
  '.sine-die-list-item-options': {
    '.icon': {
      margin: "0 8px",
    },
  },
}

const ExtraList = () => {
  const [ value, setValue ] = React.useState(defaultValue);

  const fileNameRender = file => {
    return <span>fileNameRender-{file.name}</span>
  }


  const actionRender = file => {
    return <div className="action-render">
      <Button
        text
        onClick={e => {
          e.preventDefault();
          showImg(file.url);
        }}
      >
        <View />
      </Button>
      <Button
        component="a"
        text
        href={file.url} target="_blank"
      >
        <DownLoadIcon />
      </Button>
      <Button
        text
        onClick={e => {
          e.preventDefault();
          const _value = JSON.parse(JSON.stringify(value));
          _value.pop();
          setValue(_value)
        }}
      >
        <DeleteIcon />
      </Button>
    </div>
  }

  return (<>
    <Upload.Dragger
      className={'components-----------------'}
      value={value}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
    <Upload.List
      listType="image"
      value={value}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
    <Upload.List
      // isPreview
      listType="icon"
      value={value}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />

    <Upload.Card
      value={value}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
  </>);
};

export default ExtraList;
