import React from 'react';
import Upload from 'react-upload-component';
import 'react-upload-component/index.scss';
import DialogImg from "./dialog-img";

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
    uid: "1",
    name: "IMG.png",
    percent: 50,
    suffix: 'jpg',
    state: "uploading",
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
    state: "error",
    size: 2000,
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    errorMsg: "这是错误信息"
  },
  {
    uid: "3",
    name: "IMG.png",
    suffix: 'zip',
    state: "error",
    url: "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    downloadURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    imgURL:
      "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
    size: 2000
  }
];

class CardList extends React.Component<any, any>{
  constructor (props) {
    super(props);
    this.state = {
      value: [],
      src: '',
      visible: false,
    };
  }
  render () {
    const { src, visible } = this.state;
    return (<>
      <Upload.Card
        // maxCount={1}
        // value={this.state.value}
        action='http://127.0.0.1:7001/file'
        formatter={(response) => {
          return { ...response, url: `http://127.0.0.1:7001${response.url}` }
        }}
        onPreview={file => {
          this.setState({ src: file.url, visible: true })
        }}
        onRemove={file => {
          console.log(file,'-============')
          return Promise.resolve()
        }}
        onError={file => {
          console.log(file,'------------error')
        }}
        onSuccess={(file, values) => {
          console.log(file,'---------success', values)
        }}
        // onChange={values => {
        //   console.log('0--------------',values)
        //   this.setState({ value: [] })
        // }}
        // onProgress={(values, file) => {
        //   console.log(values,'----------------',file,'-====================')
        // }}
      />
      <DialogImg src={src} visible={visible} onClose={() => this.setState({visible: false})} />
    </>);
  }
}

export default CardList;
