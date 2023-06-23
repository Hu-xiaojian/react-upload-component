import React from 'react';
import classnames from 'classnames';
import { prefix } from '@/manifest';
import type { ListProps, RenderImageProps, TextAndImageListProps } from '@/types';
import { RenderImage, TextAndImageList, CardList, IconList } from "@/list/helper";
import { emptyFn } from "@/utils";

/**
 * @desc
 */
class List extends React.Component<ListProps, any> {
  static displayName: string;
  static defaultProps: object;

  /**
   * @desc 处理取消
   * @param file
   */
  onHandleCancel = file => {
    const { onCancel, upload } = this.props;
    if (onCancel(file) !== false) {
      upload.abort(file);
    }
  }

  /**
   * @desc 处理删除
   * @param file
   */
  onHandleRemove = file => {
    const { onRemove, upload } = this.props;
    if (onRemove(file) !== false) {
      upload.removeFile(file);
    }
  }

  /**
   * @desc 图片加载失败
   * @param file
   * @param obj
   */
  onHandleImageError = (file, obj) => {
    obj.onerror = null;
    this.props.onImageError(file, obj);
  };

  /**
   * @desc 重新选择
   * @param oldFile 旧file
   * @param files 新file Array<File>
   */
  onHandleSelect = (oldFile, files) => {
    const { uploader } = this.props;
    uploader && files.length && uploader.replaceWithNewFile(oldFile, files[0]);
  }

  render (): React.ReactNode {
    const {
      children,
      value = [],
      listType,
      itemRender,
      fileNameRender,
      actionRender,
      onPreview,
      onProgress,
      reUpload = true,
      isPreview,
      renderPreview,
      progressProps,
    } = this.props;

    const props = {
      listType,
      itemRender,
      fileNameRender,
      actionRender,
      progressProps,
      onHandleCancel: this.onHandleCancel,
      onHandleRemove: this.onHandleRemove,

      isPreview,
      renderPreview,
    } as TextAndImageListProps;

    const renderImageChildrenProps = {
      isPreview,
      onPreview,
      onHandleImageError: this.onHandleImageError,
    } as RenderImageProps;

    const classNames = classnames({
      [`${prefix}-list`]: true,
      [`${prefix}-list-${listType}`]: !isPreview,
      [`${prefix}-list-${listType}-preview`]: isPreview,
    });

    return (<div className={classNames}>
      {
        value.map(file => {
          if (!file) {
            return null;
          }
          if (listType === 'text') {
            return (<TextAndImageList file={file} {...props} />);
          } else if (listType === 'image') {
            return (<TextAndImageList {...props} file={file} renderImageChildren={<RenderImage { ...renderImageChildrenProps } file={file} />} />);
          } else if (listType === 'card') {
            return <CardList {...props} file={file} onSelect={this.onHandleSelect} reUpload={reUpload} renderImageChildren={<RenderImage { ...renderImageChildrenProps } file={file} />} />
          } else if (listType === 'icon') {
            return <IconList {...props} file={file} />
          }
          return null;
        })
      }
      { children }
    </div>);
  }
}

List.displayName = 'List';

List.defaultProps = {
  onRemove: emptyFn,
  onCancel: emptyFn,
  onPreview: emptyFn,
  onImageError: emptyFn,
};

export default List;
