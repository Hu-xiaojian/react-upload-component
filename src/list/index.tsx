import React from 'react';
import { sizeCalculator } from '@/utils';
import { prefix } from '@/manifest';
import Progress from '@/progress';
import { DeleteIcon } from '@/icon';
import type { ListProps } from '@/types';

const getInfo = (file) => {
  const downloadURL = file.downloadURL || file.url;
  const imgURL = file.imgURL || file.url;
  const size = sizeCalculator(file.size);
  return { downloadURL, imgURL, size };
}

const typeOfFn = fn => typeof fn === 'function';

const getTextList = (file, { itemRender, fileNameRender, actionRender, onRemove, className }) => {

  let item = null;

  if (typeOfFn(itemRender)) {
    // todo
    item = itemRender(file, { onRemove });
  }

  const { downloadURL, size } = getInfo(file);
  // const onClick = () => (file.state === 'uploading' ? this.handleCancel(file) : this.handleClose(file));
  return (
    <div className={`${prefix}-list ${className}`} key={file.uid || file.name}>
      {
        item ? item : (
          <>
            <div className={ `${ prefix }-list-item` }>
              <a
                href={ downloadURL }
                target="_blank"
                rel="noopener noreferrer"
                style={ { pointerEvents: downloadURL ? '' : 'none' } }
                className={ `${ prefix }-list-item-name` }
              >
                <span>{ typeOfFn(fileNameRender) ? fileNameRender(file) : file.name }</span>
                { !!size && <span className={ `${ prefix }-list-item-size` }>({ size })</span> }
              </a>
            </div>
            { file.state === 'uploading' ? (<div className={`${prefix}-list-item-progress`}><Progress percent={file.percent} /></div>) : null }
            { file.state === 'error' && file.errorMsg ? (<div className={`${prefix}-list-item-error-msg`}>{file.errorMsg}</div>) : null }
            <div className={`${prefix}-list-item-action-render`}>
              { typeOfFn(actionRender) ? actionRender(file) : <DeleteIcon /> }
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
    } = this.props;


    // todo 预览
    if (isPreview) {
      return null;
    }

    const props = { className, itemRender, fileNameRender, actionRender, onRemove };

    return (<div className={`${prefix}-list-container`}>
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
