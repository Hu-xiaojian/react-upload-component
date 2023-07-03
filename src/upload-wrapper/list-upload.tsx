import React, { Component } from 'react';
import Upload from '@/upload/original-upload';
import { shallowEqual } from '@/utils';
import type { ListUploadProps, ValueItem } from '@/types';

interface ListUploadState {
  value: Array<ValueItem>;
}

class ListUpload extends Component<ListUploadProps, ListUploadState> {
  static displayName: string;
  static defaultProps: object;

  dragUploadRef: React.Ref<any>;

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
    };
    this.dragUploadRef = React.createRef();
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if ('value' in nextProps && nextProps.value !== prevState.value) {
      return {
        value: !Array.isArray(nextProps.value) ? [] : nextProps.value,
      };
    }
    return null;
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
    const { value } = this.state;
    return (<Upload
      { ...others }
      value={value}
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
