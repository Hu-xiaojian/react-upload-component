import React from 'react';
import Upload from '@/upload/original-upload';
import BaseRef from '../upload/base-ref';
import { emptyFn } from "@/utils";
import type { ListUploadProps } from '@/types';

class ListUpload extends BaseRef<ListUploadProps, any> {
  static displayName: string;
  static defaultProps: object;

  uploaderRef: React.Ref<any>;
  constructor (props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }

    this.state = {
      value: !Array.isArray(value) ? [] : value,
      uploaderRef: this.uploaderRef,
    };
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const isUploading = prevState.uploaderRef && prevState.uploaderRef.isUploading();
    // 上传中不允许做受控修改
    if ('value' in nextProps && nextProps.value !== prevState.value && !isUploading) {
      return {
        value: !Array.isArray(nextProps.value) ? [] : nextProps.value,
      };
    }
    return null;
  }

  /**
   * @desc 文件上传进度
   * @param value 所有文件
   * @param targetItem 上传文件
   */
  onHandleProgress = (value, targetItem) => {
    this.setState({ value }, () => {
      this.props.onProgress(value, targetItem);
    });
  }

  onHandleChange = (value, file) => {
    this.setState({ value }, () => {
      this.props.onChange(value, file);
    });
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
      value={this.state.value}
      onProgress={this.onHandleProgress}
      onChange={this.onHandleChange}
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

  componentDidMount() {
    this.updateUploaderRef(this.uploaderRef);
  }

  componentDidUpdate() {
    const { uploaderRef } = this.state;
    if (!uploaderRef && this.uploaderRef) {
      this.updateUploaderRef(this.uploaderRef);
    }
  }
  updateUploaderRef(uploaderRef) {
    this.setState({ uploaderRef });
  }
}

ListUpload.defaultProps = {
  onChange: emptyFn,
  onProgress: emptyFn,
}

ListUpload.displayName = 'ListUpload';

export default ListUpload;
