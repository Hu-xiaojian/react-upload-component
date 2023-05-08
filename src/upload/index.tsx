import React from 'react';
import Base, { BaseProps } from './base';
import Uploader, { UploaderConfig, UploaderInstance } from './uploader';

interface UploadProps extends BaseProps, UploaderConfig {}

/**
 * @desc 上传组件
 * @return React.ReactNode
 */
class Upload extends React.Component<UploadProps, any> {
  static displayName: string;

  uploader: UploaderInstance;

  uploaderConfig = ({
    action,
    beforeUpload,
    customRequest,
    data,
    headers,
    method,
    name,
    onProgress,
    onSuccess,
    onError,
    timeout,
    withCredentials,
  }): UploaderConfig => ({
    action,
    beforeUpload,
    customRequest,
    data,
    headers,
    method,
    name,
    onProgress,
    onSuccess,
    onError,
    timeout,
    withCredentials,
  })

  componentDidMount () {
    const config = this.uploaderConfig(this.props);
    // 初始化 uploader 配置
    this.uploader = new Uploader(config);
  }

  componentDidUpdate (prevProps: Readonly<UploadProps>) {
    const config = this.uploaderConfig(this.props);
    const configKeys = Object.keys(config);
    // for (let i = 0; i < configKeys.length; i++) {
    //   if (prevProps[i] !== config[i]) {
    //     // this.uploader
    //   }
    // }
  }

  render (): React.ReactNode {
    const {} = this.props;
    return <Base />;
  }
}

Upload.displayName = 'Upload';

export default Upload;
