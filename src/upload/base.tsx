import React from 'react';
import { emptyFn } from './utils';
import type { Base } from '@/types';

/**
 * @desc 底层组件
 * @return React.ReactNode
 */
class BaseUpload extends React.Component<Base, null> {
  static displayName: string;
  static defaultProps = {
    onSelect: emptyFn,
    onDragLeave: emptyFn,
    onDrop: emptyFn,
    onDragOver: emptyFn,
  }

  fileRef: HTMLInputElement;

  /**
   * @desc 文件选择回调
   */
  onHandleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSelect } = this.props;
    const { files } = e.target;
    const acceptedFiles = [...files].map((it: File) => {
      // todo chrome文件上传情况
      return it;
    });
    onSelect(acceptedFiles);
  }

  /**
   * @desc 处理点击
   */
  onHandleClick = () => {
    const file = this.fileRef as HTMLInputElement;
    if (!file) return;
    // 清空 input value
    file.value = '';
    file.click();
  };

  /**
   * @desc 处理按键
   */
  onHandleKeyDown = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onHandleClick();
    }
  };

  /**
   * @desc 处理拖过
   */
  onHandleDragOver = () => {
  };

  /**
   * @decs 处理投放
   */
  onHandleDrop = () => {
  };

  handleFileRef = ref => (this.fileRef = ref);

  render (): React.ReactNode {
    const {
      accept,
      className,
      capture,
      children,
      disabled,
      draggable,
      multiple = false,
      name = 'file',
      onDragLeave,
      style = {},
      webkitdirectory,
    } = this.props;

    let eventWrapper = {};
    if (!disabled) {
      eventWrapper = {
        onClick: this.onHandleClick,
        onKeyDown: this.onHandleKeyDown,
        /**
         * @desc tabIndex通过「Tab」键使HTML元素可聚焦
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
         */
        tabIndex: '0', ...(draggable ? {
          onDragOver: this.onHandleDragOver,
          onDragLeave,
          onDrop: this.onHandleDrop,
        } : {}),
      };
    }

    const newProps = {};

    // todo
    if (webkitdirectory) {
      newProps.webkitdirectory = '';
    }
    // todo
    if (capture) {
      newProps.capture = capture;
    }

    return (<div className={ `upload-base-container ${ className ?? '' }` } style={ style } { ...eventWrapper }>
        <input
          { ...newProps }
          ref={ this.handleFileRef }
          type="file"
          name={ name }
          style={ { display: 'none' } }
          accept={ accept }
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
          aria-hidden
          multiple={ multiple }
          onChange={ this.onHandleSelect }
          disabled={ disabled }
        />
        { children }
      </div>);
  }
}

BaseUpload.displayName = 'BaseUpload';

export default BaseUpload;
