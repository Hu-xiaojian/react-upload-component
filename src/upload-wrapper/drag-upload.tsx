import React, { Component } from 'react';
import Upload from '@/upload/original-upload';
import { UploadIcon } from '@/icon';
import { prefix } from '@/manifest';
import { emptyFn } from '@/utils';
import type { DragUploadProps } from '@/types';

const DragChildren = React.memo(({
  children,
  className = ''
}) => {
  return children || (<div className={ `${ prefix }-drag ${ className }` }>
    <div className={ `${ prefix }-drag-icon` }><UploadIcon/></div>
    <div className={ `${ prefix }-drag-text` }>点击或者拖动文件到虚线框内上传</div>
    <div className={ `${ prefix }-drag-hint` }>支持 docx, xls, pdf, rar, zip, png, jpg 等类型的文件</div>
  </div>)
});

/**
 * @desc state
 */
interface DragUploadState {
  value: Array<any>;
  dragOver: boolean;
}

/**
 * @desc 拖拽上传
 */
class DragUpload extends Component<DragUploadProps, DragUploadState> {
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
      dragOver: false,
    };
    this.dragUploadRef = React.createRef();
  }


  /**
   * @desc 拖拽离开
   */
  onHandleDragLeave = e => {
    this.setState({
      dragOver: false,
    });
    this.props.onDragLeave(e);
  }

  /**
   * @desc 处理拖过
   */
  onHandleDragOver = e => {
    if (!this.state.dragOver) {
      this.setState({
        dragOver: true,
      });
    }
    this.props.onDragOver(e);
  }

  /**
   * @desc 投放
   */
  onHandleDrop = e => {
    this.setState({
      dragOver: false,
    });
    this.props.onDrop(e);
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

  render (): React.ReactNode {
    const {
      children,
      className = '',
      listType,
      isPreview,
      onDragLeave,
      onDrop,
      onDragOver,
      ...others
    } = this.props;

    const { dragOver, value } = this.state;
    console.log(value,'-------value')
    return (<Upload
      { ...others }
      value={value}
      isPreview={isPreview}
      // 非预览态只能text/image
      listType={!isPreview && listType === 'card' ? 'text' : listType}
      className={ `${ prefix }-draggable ${ className }` }
      draggable
      onDragLeave={ this.onHandleDragLeave }
      onDragOver={ this.onHandleDragOver }
      onDrop={ this.onHandleDrop }
      ref={ this.handleDragUploadRef }
    >
      <DragChildren className={ (dragOver ? `${ prefix }-drag-over` : '') }>{ children }</DragChildren>
    </Upload>);
  }
}

DragUpload.defaultProps = {
  onDragLeave: emptyFn,
  onDragOver: emptyFn,
  onDrop: emptyFn,
}

DragUpload.displayName = 'DragUpload';

export default DragUpload;
