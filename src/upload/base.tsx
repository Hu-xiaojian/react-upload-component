import React from 'react';
import { emptyFn } from './utils';

export interface BaseProps {
  /**
   * @desc 样式
   */
  style: object;
  /**
   * @desc 类名
   */
  className: string;

  /**
   * @desc 文件大小，字节为单位（8bit -> 1byte, 1024byte -> 1kb, 1kb -> 1024mb, ...）
   */
  size: number;

  /**
   * @desc 文件名称
   */
  name: string;

  /**
   * @desc 子级
   */
  children: React.ReactNode;

  /**
   * @desc 是否禁用
   */
  disabled: boolean;

  /**
   * @desc 是否多选
   * https://caniuse.com/?search=multiple ie10+
   */
  multiple: boolean;

  /**
   * @desc 是否支持文件夹上传
   * https://caniuse.com/?search=directory
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
   * The webkitdirectory attribute on the <input type="file"> element allows entire directory with file contents (and any subdirectories) to be selected.
   */
  webkitdirectory: boolean;

  /**
   * todo
   * @desc 调用系统设备媒体
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
   */
  capture: string;

  /**
   * todo
   * @desc 文件上传类型 (image/png, image/jpeg, .jpg, .jpeg, .png, ...)
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
   */
  accept: string;

  /**
   * @desc 是否拖拽上传
   */
  draggable: boolean;

  /**
   * @desc 拖过回调
   */
  onDragOver: Function;

  /**
   * @desc 拖拽离开回调
   */
  onDragLeave: Function;

  /**
   * @desc 投放回调
   */
  onDrop: Function;

  /**
   * @desc 文件选择回调
   */
  onSelect: Function;
}

/**
 * @desc 底层组件
 * @return React.ReactNode
 */
class Base extends React.Component<BaseProps, null> {
  static displayName: string;

  fileRef: HTMLInputElement;

  /**
   * @desc 文件选择回调
   */
  onHandleSelect = () => {};

  /**
   * @desc 处理点击
   */
  onHandleClick = () => {};

  /**
   * @desc 处理按键
   */
  onHandleKeyDown = () => {};

  /**
   * @desc 处理拖过
   */
  onHandleDragOver = () => {};

  /**
   * @decs 处理投放
   */
  onHandleDrop = () => {};

  handleFileRef = ref => (this.fileRef = ref);

  render(): React.ReactNode {
    const {
      accept,
      className,
      capture,
      children,
      disabled,
      draggable,
      multiple = false,
      name = 'file',
      onDragLeave = emptyFn,
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
        tabIndex: '0',
        ...(draggable
          ? {
              onDragOver: this.onHandleDragOver,
              onDragLeave,
              onDrop: this.onHandleDrop,
            }
          : {}),
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

    return (
      <div className={`base-container ${className ?? ''}`} style={style} {...eventWrapper}>
        <input
          {...newProps}
          ref={this.handleFileRef}
          type="file"
          name={name}
          style={{ display: 'none' }}
          accept={accept}
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
          aria-hidden
          multiple={multiple}
          onChange={this.onHandleSelect}
          disabled={disabled}
        />
        {children}
      </div>
    );
  }
}

Base.displayName = 'Base';

export default Base;
