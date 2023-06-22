import React from 'react';
import classnames from 'classnames';
import { sizeCalculator, typeOfFn } from '@/utils';
import { prefix } from '@/manifest';
import Progress from '@/progress';
import Base from '@/upload/base';
import { DeleteIcon, DownLoadIcon, EditorIcon, LoadingErrIcon, PictureIcon } from '@/icon';
import type { ListProps } from '@/types';

const getInfo = (file, props?) => {
  const downloadURL = file.downloadURL || file.url;
  const imgURL = file.imgURL || file.url;
  const size = sizeCalculator(file.size);
  const className = classnames({
    [`${prefix}-list-item`]: true,
    [`${prefix}-list-item-${file.state}`]: file.state,
    [`${prefix}-list-item-${props?.listType}`]: true,
    [`${prefix}-list-item-error-with-msg`]: file.state === 'error' && file.errorMsg,
  }, props?.className);
  return { downloadURL, imgURL, size, className, name: file.name };
}



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
  const { onHandleImageError, onPreview, isPreview } = props;
  const { imgURL } = fileInfo;

  let img = null;

  const state = isPreview ? '' : file.state;

  if (state === 'uploading' || (state === 'selected' && !imgURL)) {
    img = <PictureIcon />;
  } else if (state === 'error') {
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
  return <div className={`${prefix}-list-item-image-thumbnail`} key='img'>{ img }</div>;
}

const getCardList = (file, props, children?) => {
  // todo name accept
  const { itemRender, fileNameRender, actionRender, progressProps, onHandleCancel, onSelect, onHandleRemove, isPreview, reUpload, accept, name } = props;
  let item = null;


  const fileInfo = getInfo(file, props);
  const { downloadURL, className } = fileInfo;
  const state = isPreview ? '' : file.state;
  const img = children && children(file, fileInfo, props);
  if (state === 'uploading') {
    item = [
      img,
      <div key='cancel' className="card-cancel" onClick={() => onHandleCancel(file)}>取消</div>,
      <Progress key='progress' state="normal" percent={file.percent} { ...progressProps } />,
    ];
  } else {
    if (typeOfFn(itemRender)) {
      // todo
      item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
    } else {
      item = [
        img,
        <div className={`${prefix}-tool`} key='tool'>
          {
            typeOfFn(actionRender) ? actionRender(file) : (
              <div className={`${prefix}-tool-btns`}>
                {
                  state !== 'error' ? (
                    <a
                      href={downloadURL}
                      target="_blank"
                      style={ { pointerEvents: downloadURL ? '' : 'none' } }
                      rel="noopener noreferrer"
                      className={`${prefix}-tool-btns-item`}
                    >
                      <DownLoadIcon />
                    </a>
                  ) : null
                }
                {
                  reUpload && !isPreview ? (
                    <Base
                      accept={accept}
                      name={name}
                      onSelect={files => onSelect(file, files)}
                    >
                      <EditorIcon />
                    </Base>
                  ) : null
                }
                <div><DeleteIcon className="card-del" onClick={() => onHandleRemove(file)}  /></div>
              </div>
            )
          }
        </div>
      ]
    }
  }
  return (
    <div className={className} key={file.uid || file.name}>
      <div className={`${prefix}-list-item-wrapper`}>{ item }</div>
      <div className={`${prefix}-list-item-name`}>{ typeOfFn(fileNameRender) ? itemRender(file) : file.name}</div>
    </div>
  )
};

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
      className,
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


    // todo 预览
    if (isPreview) {
      const classNames = classnames({
        [`${prefix}-list-preview`]: true,
        [`${prefix}-list-preview-${listType}`]: true,
        [className]: !!className,
      });
      return (<div className={classNames}>
        {
          value.map(file => {
            if (!file) {
              return null;
            }
            const { downloadURL, imgURL, name, size } = getInfo(file);
            let item = typeOfFn(renderPreview) ? renderPreview(file) : '';

            if (item) {
              return item;
            } else {
              if (listType === 'text') {
                item = (<div className={ `${ prefix }-list-preview-text-item-name-wrap` }>
                  <a
                    href={ downloadURL }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={ { pointerEvents: downloadURL ? '' : 'none' } }
                    className={`${prefix}-list-preview-text-item-name`}
                  >
                    <span>{ typeOfFn(fileNameRender) ? fileNameRender(file) : name }</span>
                    { !!size && <span className={ `${ prefix }-list-preview-text-item-size` }>({ size })</span> }
                  </a>
                </div>);
              } else if (listType === 'image') {
                item = (
                  <>
                    { getImageChildren(file, { imgURL }, { onHandleImageError: this.onHandleImageError, onPreview, isPreview }) }
                    <div className={ `${ prefix }-list-preview-image-item-name-wrap` }>
                      <a
                        href={ downloadURL }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={ { pointerEvents: downloadURL ? '' : 'none' } }
                        className={`${prefix}-list-preview-image-item-name`}
                      >
                        <span>{ typeOfFn(fileNameRender) ? fileNameRender(file) : name }</span>
                        { !!size && <span className={ `${ prefix }-list-preview-image-item-size` }>({ size })</span> }
                      </a>
                    </div>
                  </>
                )
              } else if (listType === 'card') {

              }
            }
            return <div className={`${prefix}-list-preview-${listType}-item`} key={file.uid || file.name}>{ item }</div>;
          })
        }
      </div>)
    }

    const props = {
      className,
      itemRender,
      fileNameRender,
      actionRender,
      listType,
      progressProps,
      reUpload,
      onPreview,
      onSelect: this.onHandleSelect,
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
        value.map(file => {
          if (!file) {
            return null;
          }
          if (listType === 'text') {
            return getTextAndImageList(file, props);
          } else if (listType === 'image') {
            return getTextAndImageList(file, props, getImageChildren);
          } else if (listType === 'card') {
            return getCardList(file, props, getImageChildren);
          }
          return null;
        })
      }
      { children }
    </div>);
  }
}

List.displayName = 'List';
export default List;
