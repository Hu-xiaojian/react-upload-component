import React from 'react';
import Upload from '../../src';
import { View, DownLoadIcon, DeleteIcon } from './icon';

const defaultValue = [
  {
    uid: "0",
    name: "IMG.png",
    state: "done",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://im.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
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

  const fileNameRender = file => {
    return <span>fileNameRender-{file.name}</span>
  }


  const actionRender = file => {
    return <div>
      <View />
      <DownLoadIcon />
      <DeleteIcon />
    </div>
  }

  return (<>
    <Upload.Dragger
      className={'test-----------------'}
      defaultValue={defaultValue}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
    <Upload.List
      listType="image"
      defaultValue={defaultValue}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
    <Upload.List
      listType="icon"
      defaultValue={defaultValue}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />

    <Upload.Card
      defaultValue={defaultValue}
      fileNameRender={fileNameRender}
      actionRender={actionRender}
    />
  </>);
};

export default ExtraList;
