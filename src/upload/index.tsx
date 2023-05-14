import React from 'react';
import Base from './base';
import Uploader from './uploader';
import type { Base as BaseX, UploaderConfig, UploaderInstance } from '@/types';

interface UploadProps extends BaseX, UploaderConfig {}

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
    for (let i = 0; i < configKeys.length; i++) {
      if (prevProps[i] !== config[i]) {
        this.uploader.setConfig(config);
        return;
      }
    }
  }

  render (): React.ReactNode {
    const {
      accept,
      children,
      disabled,
      draggable,
      id,
      multiple,
      name,
      onSelect,
      onDragOver,
      onDragLeave,
      onDrop,
      webkitdirectory,
      ...others
    } = this.props;
    return (<Base
      {...others}
      accept={accept}
      disabled={disabled}
      draggable={draggable}
      id={id}
      multiple={multiple}
      name={name}
      onSelect={onSelect}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      webkitdirectory={webkitdirectory}
    >
      { children }
    </Base>);
  }

  componentWillUnmount() {
    this.abortUpload();
  }

  abortUpload =(file?) => this.uploader.abortUpload(file);

  startUpload(fileList) {
    this.uploader.startUpload(fileList);
  }
}

Upload.displayName = 'Upload';

export default Upload;
