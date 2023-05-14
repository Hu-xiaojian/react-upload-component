import React from 'react';
import Upload from '@/upload';
import type { OriginalUpload as OriginalUploadX } from '@/types';

interface OriginalUploadProps extends OriginalUploadX {

}

/**
 * @desc 原始上传
 */
class OriginalUpload extends React.Component<OriginalUploadProps, any> {

  /**
   * @desc 文件上传回调
   */
  onHandleSelect = (value) => {
  };

  render (): React.ReactNode {
    const {
      children,
      ...others
    } = this.props;
    return (<Upload
      { ...others }
      onSelect={this.onHandleSelect}
    >
      {
        children
      }
    </Upload>);
  }
}

export default OriginalUpload;
