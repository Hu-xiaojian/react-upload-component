import React from 'react';
import classnames from 'classnames';
import { sizeCalculator } from '@/utils';
import { prefix } from '@/manifest';
import Progress from '@/progress';
import { DeleteIcon, LoadingErrIcon, PictureIcon } from '@/icon';
import type { ListProps } from '@/types';

const getInfo = (file, props) => {
  const downloadURL = file.downloadURL || file.url;
  const imgURL = file.imgURL || file.url;
  const size = sizeCalculator(file.size);
  const className = classnames({
    [`${prefix}-list-item`]: true,
    [`${prefix}-list-item-${file.state}`]: file.state,
    [`${prefix}-list-item-${props.listType}`]: true,
    [`${prefix}-list-item-error-with-msg`]: file.state === 'error' && file.errorMsg,
  }, props.className);
  return { downloadURL, imgURL, size, className };
}

const typeOfFn = fn => typeof fn === 'function';

const getTextAndImageList = (file, props, children?) => {
  const { itemRender, fileNameRender, actionRender, progressProps, onHandleCancel, onHandleRemove } = props;
  let item = null;

  if (typeOfFn(itemRender)) {
    item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
  }

  const fileInfo = getInfo(file, props);
  const { downloadURL, size, className } = fileInfo;
  // 上传中为取消，其他情况为删除
  const onClick = () => (file.state === 'uploading' ? onHandleCancel(file) : onHandleRemove(file));
  return (
    <div className={className} key={file.uid || file.name}>
      {
        item ? item : (
          <>
            { children && children(file, fileInfo, props) }
            <div className={ `${ prefix }-list-item-name-wrap` }>
              <a
                href={ downloadURL }
                target="_blank"
                rel="noopener noreferrer"
                style={ { pointerEvents: downloadURL ? '' : 'none' } }
                className={`${prefix}-list-item-name`}
              >
                <span>{ typeOfFn(fileNameRender) ? fileNameRender(file) : file.name }</span>
                { !!size && <span className={ `${ prefix }-list-item-size` }>({ size })</span> }
              </a>
            </div>
            { file.state === 'uploading' ? (<div className={`${prefix}-list-item-progress`}><Progress state="normal" percent={file.percent} { ...progressProps } /></div>) : null }
            { file.state === 'error' && file.errorMsg ? (<div className={`${prefix}-list-item-error-msg`}>{file.errorMsg}</div>) : null }
            <div className={`${prefix}-list-item-options`}>
              { typeOfFn(actionRender) ? actionRender(file) : <DeleteIcon onClick={onClick} /> }
            </div>
          </>
        )
      }
    </div>
  );
}

const getImageChildren = (file, fileInfo, props) => {
  const { onHandleImageError, onPreview } = props;
  const { imgURL } = fileInfo;

  let img = null;
  if (file.state === 'uploading' || (file.state === 'selected' && !imgURL)) {
    img = <PictureIcon />;
  } else if (file.state === 'error') {
    img = <LoadingErrIcon />;
  } else {
    img = (
      <img
        src={imgURL}
        onError={error => onHandleImageError(file, error)}
        tabIndex="0"
        onClick={() => onPreview(file)}
      />
    );
  }
  return <div className={`${prefix}-list-item-image-thumbnail`}>{ img }</div>;
}

/**
 * @desc
 */
class List extends React.Component<ListProps, any> {
  static displayName: string;


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

  render (): React.ReactNode {
    const {
      className,
      value,
      listType,
      itemRender,
      fileNameRender,
      actionRender,
      onPreview,
      onProgress,
      reUpload,
      isPreview,
      progressProps,
    } = this.props;


    // todo 预览
    if (isPreview) {
      return null;
    }

    const props = {
      className,
      itemRender,
      fileNameRender,
      actionRender,
      listType,
      progressProps,
      onPreview,
      onHandleCancel: this.onHandleCancel,
      onHandleRemove: this.onHandleRemove,
      onHandleImageError: this.onHandleImageError,
    };

    const classNames = classnames({
      [`${prefix}-list`]: true,
      [` ${prefix}-list-${listType}`]: true,
    });

    return (<div className={classNames}>
      {
        (value || []).map(file => {
          if (!file) {
            return null;
          }
          if (listType === 'text') {
            return getTextAndImageList(file, props);
          } else if (listType === 'image') {
            return getTextAndImageList(file, props, getImageChildren);
          } else if (listType === 'card') {
            // return this.getPictureCardList(file);
          }
          return null;
        })
      }
    </div>);
  }
}

List.displayName = 'List';
export default List;
