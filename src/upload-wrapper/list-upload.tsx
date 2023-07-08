import React from 'react';
import Upload from '@/upload/original-upload';
import BaseRef from '../upload/base-ref';
import type { ListUploadProps } from '@/types';

class ListUpload extends BaseRef<ListUploadProps, any> {
  static displayName: string;
  static defaultProps: object;

  uploaderRef: React.Ref<any>;
  constructor (props) {
    super(props);
  }

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
      ref={ this.saveUploaderRef }
    >
      {
        children || <button className="upload-btn">文件上传</button>
      }
    </Upload>);
  }
}

export default ListUpload;
