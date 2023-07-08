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
    if ('value' in nextProps && nextProps.value !== prevState.value) {
      return {
        value: !Array.isArray(nextProps.value) ? [] : nextProps.value,
      };
    }
    return null;
  }

  /**
   *
   */
  onHandleProgress = () => {

  }

  onHandleChange = (value, file) => {
    this.setState({ value }, () => {
      this.props.onChange(value, file);
    });
  }
  render(): React.ReactNode {
    const {
      className,
      style,
      onRemove,
      onCancel,
      onPreview,
      isPreview,
      onImageError,
      reUpload,
      disabled,
      itemRender,
      action,
      timeout,
      children,
      maxCount,
      ...others
    } = this.props;
    const { value } = this.state;
    const _maxCount = value.length >= maxCount;
    return (
      <List
        { ...others }
        style={style}
        className={className}
        listType="card"
        value={this.state.value}
        onRemove={onRemove}
        onCancel={onCancel}
        onPreview={onPreview}
        itemRender={itemRender}
        isPreview={isPreview}
        uploader={this.uploaderRef}
        reUpload={reUpload}
        onImageError={onImageError}
      >
        <div className={`${prefix}-list-item ${_maxCount ? `${prefix}-hidden` : ""}`}>
          <Upload
            listType={false} // list不渲染
            className={`${prefix}-list-card-upload`}
            disabled={disabled}
            action={action}
            timeout={timeout}
            isPreview={isPreview}
            value={this.state.value}
            onProgress={this.onHandleProgress}
            onChange={this.onHandleChange}
            ref={this.saveUploaderRef}
          >
            {children || '上传图片'}
          </Upload>
        </div>
      </List>
    );
  }


  componentDidMount() {
    this.saveUploaderRef(this.uploaderRef);
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
}

CardUpload.displayName = 'CardUpload';

export default CardUpload;
