import React from 'react';
import List from '@/list';
import Upload from '@/upload/original-upload';
import type { CardUploadProps } from '@/types';
import { prefix } from "@/manifest";

class CardUpload extends React.Component<CardUploadProps, any> {
  cardUploadRef: React.RefObject<any>;

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
  }

  handleCardUploadRef = ref => (this.cardUploadRef = ref);

  /**
   *
   */
  onHandleProgress = () => {

  }

  onHandleChange = () => {

  }
  render(): React.ReactNode {
    const {
      className,
      style,
      onRemove,
      onCancel,
      onPreview,
      isPreview,
      reUpload,
      disabled,
      itemRender,
      action,
      timeout,
      children
    } = this.props;
    return (
      <List
        className={className}
        style={style}
        listType="card"
        value={this.state.value}
        onRemove={onRemove}
        onCancel={onCancel}
        onPreview={onPreview}
        itemRender={itemRender}
        isPreview={isPreview}
        uploader={this.cardUploadRef}
        reUpload={reUpload}
      >
        <div className={`${prefix}-list-item`}>
          <Upload
            disabled={disabled}
            action={action}
            timeout={timeout}
            isPreview={isPreview}
            value={this.state.value}
            onProgress={this.onHandleProgress}
            onChange={this.onHandleChange}
            ref={this.handleCardUploadRef}
          >
            {children || '上传图片'}
          </Upload>
        </div>
      </List>
    );
  }
}

export default CardUpload;
