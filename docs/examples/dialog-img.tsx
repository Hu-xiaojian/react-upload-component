import React from 'react';
import { Dialog, Upload } from "@alifd/next";

const DialogImg = ({ src, visible, onClose }) => {
  const [val, setVal] = React.useState([]);
  const ref = React.useRef();
  return (<>
    <Dialog
      visible={visible}
      isFullScreen
      onOk={onClose}
      onCancel={onClose}
      onClose={onClose}
    >
      <img src={src} alt=""/>
    </Dialog>
    <Upload
     /* listType="text"
      value={val}
      onChange={value => {
        setVal(value)
      }}*/
      ref={ref}
      listType='text'
      className='test'
      // disabled
      // maxCount={1}
      // // isPreview
      // renderPreview={file => {
      //   console.log('-----------------renderPreview')
      //   return <div>{ file.name }预览渲染</div>
      // }}
      // defaultValue={defaultValue}
      // fileNameRender={file => {
      //   console.log('-------------------------fileNameRender')
      //   return `${file.name}-fileNameRender`;
      // }}
      // // actionRender={(file) => {
      // //   console.log('-------------------------actionRender')
      // //   return <>11111111</>
      // // }}
      // onSelect={(file, values) => {
      //   console.log(file, values,'-----------------onSelect')
      // }}
      // value={this.state.value}
      // // reUpload={false}
      progressProps={{
        className: 'test-className',
        textRender: (percent) => {
          return `${Math.floor(percent)}%-`
        }
      }}
      // multiple
      action='http://127.0.0.1:7001/file'
      // formatter={(response) => {
      //   return { ...response, url: `http://127.0.0.1:7001${response.url}`,  }
      // }}
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
      //     return Promise.reject('12312312312312测试')
      //   }
      // }}
      // afterSelect={file => {
      //   console.log(file,'-----------------------afterSelect')
      //   return Promise.reject('---------afterSelect')
      // }}
      // onPreview={file => {
      //   this.setState({ src: file.url, visible: true })
      // }}
      // accept="image/png"
      // onRemove={file => {
      //   console.log(file,'-============onRemove')
      //   return Promise.resolve()
      // }}
      // onError={(file, error, response) => {
      //   console.log(file, error, '------------error',response , '--------------onError')
      // }}
      onSuccess={(file, values) => {
        console.log(file,'---------success', values)
      }}
      // onSelect={(v, file) => {
      //   console.log(ref.current.getInstance().startUpload(),'-------')
      //   console.log(v,'----------',file)
      // }}
      // onImageError={(file,error) => {
      //   console.log(file,error,'-------------------------onImageError')
      // }}
      // onChange={values => {
      //   console.log('0--------------',values)
      //   this.setState({ value: [] })
      // }}
      onProgress={(values, file) => {
        console.log(values,'----------------',file,'-====================onProgress')
      }}
    >1231231</Upload>
  </>);
};

export default DialogImg;
