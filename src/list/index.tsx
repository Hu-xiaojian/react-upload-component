import React from 'react';
import classnames from 'classnames';
import { prefix } from '@/manifest';
import type { ListProps, RenderImageProps, TextAndImageListProps } from '@/types';
import { RenderImage, TextAndImageList, CardList, IconList } from "@/list/helper";
import { emptyFn, promiseCall } from "@/utils";

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
    const cancel = onCancel(file);
    promiseCall(cancel, () => {
      upload && upload.removeFile(file);
    });
  }

  /**
   * @desc 处理删除
   * @param file
   */
  onHandleRemove = file => {
    const { onRemove, upload } = this.props;
    const remove = onRemove(file);
    promiseCall(remove, () => {
      upload && upload.removeFile(file);
    });
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
    const { upload } = this.props;
    upload && files.length && upload.replaceWithNewFile(oldFile, files[0]);
  }

  render (): React.ReactNode {
    const {
      style,
      className,
      children,
      value = [],
      listType,
      itemRender,
      fileNameRender,
      actionRender,
      onPreview,
      reUpload = true,
      isPreview,
      renderPreview,
      progressProps,

      accept,
      name,
    } = this.props;

    const props = {
      style,
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
    }, className);

    return (<div className={classNames}>
      {
        value.map(file => {
          if (!file) {
            return null;
          }
          const key = file.uid || file.name;
          if (listType === 'text') {
            return (<TextAndImageList
              key={key}
              {...props}
              file={file}
              name={name}
              accept={accept}
              onSelect={this.onHandleSelect}
            />);
          } else if (listType === 'image') {
            return (<TextAndImageList
              key={key}
              {...props}
              file={file}
              name={name}
              accept={accept}
              onSelect={this.onHandleSelect}
              renderImageChildren={<RenderImage key="img" { ...renderImageChildrenProps } file={file} />}
            />);
          } else if (listType === 'card') {
            return (<CardList
              key={key}
              {...props}
              file={file}
              name={name}
              accept={accept}
              onSelect={this.onHandleSelect}
              reUpload={reUpload}
              renderImageChildren={<RenderImage key="img" { ...renderImageChildrenProps } file={file} />}
            />);
          } else if (listType === 'icon') {
            return <IconList key={key} {...props} file={file} />
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
