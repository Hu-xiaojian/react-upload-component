import React from 'react';
import List from '@/list';
import Upload from '@/upload/original-upload';
import BaseRef from '../upload/base-ref';
import { prefix } from '@/manifest';
import { emptyFn } from "@/utils";
import type { CardUploadProps, ValueItem } from '@/types';

interface CardUploadState {
  value: Array<ValueItem>
}

class CardUpload extends BaseRef<CardUploadProps, CardUploadState> {
  static displayName: string;
  defaultProps: object;

  uploaderRef: React.RefObject<any>;

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

      className,
      style,
      onRemove,
      onCancel,
      onPreview,
      isPreview,
      itemRender,
      onImageError,
      actionRender,
      fileNameRender,
      renderPreview,
      reUpload,
      maxCount,

      onSelect,
      autoUpload,
      multiple,
      disabled,
      action,
      timeout,
      formatter,
      onSuccess,
      accept,
      name = 'file',
      beforeUpload,
      afterSelect,
      onError,
      ...others
    } = this.props;
    const { value } = this.state;
    const _maxCount = value.length >= maxCount;
    return (
      <List
        { ...others }
        style={style}
        accept={accept}
        name={name}
        className={className}
        upload={this.uploaderRef}
        reUpload={reUpload}
        listType="card"
        value={this.state.value}
        onRemove={onRemove}
        onCancel={onCancel}
        isPreview={isPreview}
        onPreview={onPreview}
        renderPreview={renderPreview}
        onImageError={onImageError}
        actionRender={actionRender}
        fileNameRender={fileNameRender}
        itemRender={itemRender}
      >
        <div className={`${prefix}-list-item ${_maxCount ? `${prefix}-hidden` : ""}`}>
          <Upload
            value={this.state.value}
            maxCount={maxCount}
            ref={this.saveUploaderRef}
            multiple={multiple}
            accept={accept}
            name={name}
            formatter={formatter}
            listType={false} // list不渲染
            className={`${prefix}-list-card-upload`}
            disabled={disabled}
            action={action}
            timeout={timeout}
            isPreview={isPreview}
            autoUpload={autoUpload}
            beforeUpload={beforeUpload}
            afterSelect={afterSelect}
            onError={onError}
            onSelect={onSelect}
            onProgress={this.onHandleProgress}
            onChange={this.onHandleChange}
            onSuccess={onSuccess}
          >
            {children || '上传图片'}
          </Upload>
        </div>
      </List>
    );
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

CardUpload.defaultProps = {
  onChange: emptyFn,
  onProgress: emptyFn,
}

CardUpload.displayName = 'CardUpload';

export default CardUpload;
