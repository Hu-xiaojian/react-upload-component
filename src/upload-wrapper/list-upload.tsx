import React, { Component } from 'react';
import Upload from '@/upload/original-upload';
import type { ListUploadProps } from '@/types';

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
      listType,
      isPreview,
      ...others
    } = this.props;
    return (<Upload
      { ...others }
      isPreview={isPreview}
      // 非预览态只能text/image
      listType={!isPreview && listType === 'card' ? 'text' : listType}
      className={className}
      ref={ this.handleDragUploadRef }
    >
      {
        children || <button className="upload-btn">文件上传</button>
      }
    </Upload>);
  }
}

export default ListUpload;
