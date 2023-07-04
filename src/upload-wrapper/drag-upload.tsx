import React from 'react';
import Upload from '@/upload/original-upload';
import Base from './base';
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
  dragOver: boolean;
}

/**
 * @desc 拖拽上传
 */
class DragUpload extends Base<DragUploadProps, DragUploadState> {
  static displayName: string;
  static defaultProps: object;

  uploaderRef: React.Ref<any>;

  constructor (props) {
    super(props);
    this.state = {
      dragOver: false,
    };
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

    const { dragOver } = this.state;
    return (<Upload
      { ...others }
      isPreview={isPreview}
      // 非预览态只能text/image
      listType={!isPreview && listType === 'card' ? 'text' : listType}
      className={className}
      draggable
      onDragLeave={ this.onHandleDragLeave }
      onDragOver={ this.onHandleDragOver }
      onDrop={ this.onHandleDrop }
      ref={ this.saveUploaderRef }
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
