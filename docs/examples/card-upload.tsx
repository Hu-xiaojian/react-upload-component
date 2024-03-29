import React from 'react';
import Upload, { Progress } from 'react-upload-component';
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
        className='test'
        ref={ref => {
          this.ref = ref;
          // console.log(ref,'----------ref')
        }}
        // disabled
        // maxCount={1}
        // isPreview
        // renderPreview={file => {
        //   console.log('-----------------renderPreview')
        //   return <div>{ file.name }预览渲染</div>
        // }}
        // defaultValue={defaultValue}
        // fileNameRender={file => {
        //   console.log('-------------------------fileNameRender')
        //   return `${file.name}-fileNameRender`;
        // }}
        // actionRender={(file) => {
        //   console.log('-------------------------actionRender')
        //   return <>11111111</>
        // }}
        onSelect={(file, values) => {
          // this.ref.startUpload();
          console.log(file, values,'-----------------onSelect')
        }}
        // value={this.state.value}
        // reUpload={false}
        progressProps={{
          className: 'test-className',
          // textRender: (percent) => {
          //   return `${Math.floor(percent)}%`
          // }
        }}
        multiple
        action='http://127.0.0.1:7001/file'
        formatter={(response) => {
          return { ...response, url: `http://127.0.0.1:7001${response.url}`,  }
        }}
        // itemRender={(file, props) => {
        //   console.log(file,'-------------itemRender', props)
        //   if (file.state === 'uploading') {
        //     return (<div>
        //       <Progress percent={file.percent} shape="circle" textRender={(percent) => {
        //         return `${Math.floor(percent)}%`
        //       }} />
        //       <div onClick={props.onCancel}>取消</div>
        //       <div>{ file.name }</div>
        //     </div>)
        //   }
        //   return (<>
        //     <div onClick={props.onRemove}>删除</div>
        //     <props.UploadContainer test='test'>重新上传</props.UploadContainer>
        //     自定义渲染{file.name}
        //   </>)
        // }}
        // autoUpload={false}
        // beforeUpload={(file, configs) => {
        //   console.log(file,configs,'-----------------------beforeUpload')
        //   if (file.size > 1) {
        //     console.error('----------------------测试')
        //     // return false;
        //   }
        // }}
        // afterSelect={file => {
        //   console.log(file,'-----------------------afterSelect')
        //   return Promise.reject('---------afterSelect')
        // }}
        // onPreview={file => {
        //   this.setState({ src: file.url, visible: true })
        // }}
        accept="image/png,.pdf"
        // onRemove={file => {
        //   console.log(file,'-============onRemove')
        //   return Promise.resolve()
        // }}
        // onError={(file, error, response, values) => {
        //   console.log(file, error, '------------error',response , '--------------onError', values)
        // }}
        // onSuccess={(file, values) => {
        //   console.log(file,'---------success', values)
        // }}
        // onImageError={(file,error) => {
        //   console.log(file,error,'-------------------------onImageError')
        // }}
        // onChange={values => {
        //   console.log('0--------------',values)
        //   this.setState({ value: [] })
        // }}
        // onProgress={(values, file) => {
        //   console.log(values,'----------------',file,'-====================onProgress')
        // }}
      />
      <DialogImg src={src} visible={visible} onClose={() => this.setState({visible: false})} />
    </>);
  }
}

export default CardList;
