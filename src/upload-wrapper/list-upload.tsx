import React, { Component } from 'react';
import type { ListUploadProps } from '@/types';
import { prefix } from "@/manifest";
import Upload from "@/upload/original-upload";

class ListUpload extends Component<ListUploadProps, any> {
  static displayName: string;
  static defaultProps: object;

  dragUploadRef: React.Ref<any>;

  constructor (props) {
    super(props);
    this.dragUploadRef = React.createRef();
  }


  /**
   * @desc 中断上传
   */
  abort = (file) => {
    this.dragUploadRef.abort(file);
  }

  /**
   * @desc 开始上传
   */
  startUpload = () => {
    this.dragUploadRef.startUpload();
  }

  handleDragUploadRef = ref => (this.dragUploadRef = ref);


  render(): React.ReactNode {
    const {
      children,
      className = '',
      ...others
    } = this.props;
    return (<Upload
      { ...others }
      className={ `${ prefix }-list-upload ${ className }` }
      ref={ this.handleDragUploadRef }
    >
      {
        children || <button className="upload-btn">文件上传</button>
      }
    </Upload>);
  }
}

export default ListUpload;
