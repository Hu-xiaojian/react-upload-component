import React from 'react';
import classnames from 'classnames';
import { sizeCalculator } from '@/utils';
import { prefix } from '@/manifest';
import Progress from '@/progress';
import { DeleteIcon } from '@/icon';
import type { ListProps } from '@/types';

const getInfo = (file, props) => {
  const downloadURL = file.downloadURL || file.url;
  const imgURL = file.imgURL || file.url;
  const size = sizeCalculator(file.size);
  const className = classnames({
    [`${prefix}-list-item`]: true,
    [`${prefix}-list-item-${file.state}`]: file.state,
    [` ${prefix}-list-item-${props.listType}`]: true,
    [`${prefix}-list-item-error-with-msg`]: file.state === 'error' && file.errorMsg,
  }, props.className);
  return { downloadURL, imgURL, size, className };
}

const typeOfFn = fn => typeof fn === 'function';

const getTextList = (file, props) => {
  const { itemRender, fileNameRender, actionRender, progressProps, onHandleCancel, onHandleRemove } = props;
  let item = null;

  if (typeOfFn(itemRender)) {
    item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
  }

  const { downloadURL, size, className } = getInfo(file, props);
  // 上传中为取消，其他情况为删除
  const onClick = () => (file.state === 'uploading' ? onHandleCancel(file) : onHandleRemove(file));
  return (
    <div className={className} key={file.uid || file.name}>
      {
        item ? item : (
          <>
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
    if (onCancel && onCancel(file)) {
      upload.abort(file);
    }
  }

  /**
   * @desc 处理删除
   * @param file
   */
  onHandleRemove = file => {
    const { onRemove, upload } = this.props;
    if (onRemove && onRemove(file)) {
      upload.removeFile(file);
    }
  }

  render (): React.ReactNode {
    const {
      className,
      value,
      listType,
      itemRender,
      fileNameRender,
      onRemove,
      onCancel,
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
      onRemove,
      listType,
      progressProps,
      onHandleCancel: this.onHandleCancel,
      onHandleRemove: this.onHandleRemove,
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
            return getTextList(file, props);
          } else if (listType === 'image') {
            return getTextList(file, props);
            // return this.getImageList(file);
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
