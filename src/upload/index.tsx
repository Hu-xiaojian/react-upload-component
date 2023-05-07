import React from 'react';
import Base from './base';

/**
 * @desc 上传组件
 * @return React.ReactNode
 */
class Upload extends React.Component<any, any> {
  static displayName: string;

  render(): React.ReactNode {
    return <Base />;
  }
}

Upload.displayName = 'Upload';

export default Upload;
