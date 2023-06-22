import React from 'react';
import classnames from "classnames";
import Progress from '@/progress';
import Base from '@/upload/base';
import { sizeCalculator, typeOfFn } from '@/utils';
import { DeleteIcon, DownLoadIcon, EditorIcon, LoadingErrIcon, PictureIcon, FILE, fileIcons, IconListError } from '@/icon';
import { prefix } from '@/manifest';
import type { TextAndImageListProps, RenderImageProps, CardListProps, IconListProps } from '@/types';

/**
 * @desc 根据类型获取对应svg
 * @param type 文件类型
 * @param mimeType 文件类型
 * @param suffix 文件后缀
 */
function getFileSvg(type: string, mimeType: string, suffix: string, name: string): React.FunctionComponent {
  let res: React.FunctionComponent = FILE;

  let _name: any = name ?? '';
  _name = _name.lastIndexOf('.');
  _name = (name ?? '').slice(_name + 1);

  const mimeTypeFn = (k, t) => (fileIcons[k].mimeType.indexOf(t) !== -1 );
  const suffixFn = (k, t) => (fileIcons[k].suffix.indexOf(t) !== -1 );
  for (const key in fileIcons) {
    // 找到icon退出循环
    if (res !== FILE) {
      break;
    }
    if (mimeTypeFn(key, type) || mimeTypeFn(key, mimeType) || suffixFn(key, suffix) || suffixFn(key, _name)) {
      res = fileIcons[key];
    }
  }
  return res;
}

/**
 * @desc 文件信息
 * @param file 文件对象
 * @param props
 */
const getFileInfo = (file, props?): {
  downloadURL: string;
  imgURL: string;
  size: string;
  classNames: string;
  name: string;
} => {
  const { downloadURL, url, imgURL, state, errorMsg, name, size } = file;
  const { listType = '', className = '', isPreview } = props || {};

  // 预览
  const _imgURL = imgURL || url;
  // 下载
  const _downloadURL = downloadURL || url;
  // 大小
  const _size = sizeCalculator(size);

  const classNames = classnames({
    [`${prefix}-list-item`]: true,
    [`${prefix}-list-preview-${listType}-item`]: isPreview,
    [`${prefix}-list-item-${state}`]: !isPreview && state,
    [`${prefix}-list-item-${listType}`]: !isPreview && !!listType,
    [`${prefix}-list-item-error-with-msg`]: !isPreview && state === 'error' && errorMsg,
  }, className);
  return { downloadURL: _downloadURL, imgURL: _imgURL, size: _size, classNames, name };
}

/**
 * @desc 文件和图片列表
 */
const TextAndImageList: React.FunctionComponent<TextAndImageListProps> = (props: TextAndImageListProps): React.ReactElement => {
  const {
    className,
    file,
    listType,
    itemRender,
    fileNameRender,
    actionRender,
    progressProps,
    onHandleCancel,
    onHandleRemove,

    isPreview,
    renderPreview,

    renderImageChildren,
  } = props;
  let item = null;

  if (isPreview && typeOfFn(renderPreview)) {
    item = renderPreview(file);
  } else if (!isPreview && typeOfFn(itemRender)) {
    // todo
    item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
  }

  const { downloadURL, size, classNames } = getFileInfo(file, { className, listType, isPreview });

  const state = isPreview ? '' : file.state;
  // 上传中为取消，其他情况为删除
  const onClick = () => (state === 'uploading' ? onHandleCancel(file) : onHandleRemove(file));

  const previewCls = isPreview ? `preview-${listType}-`  : '';

  return (
    <div className={classNames} key={file.uid || file.name}>
      {
        item ? item : (
          <>
            { renderImageChildren }
            <div className={ `${ prefix }-list-${previewCls}item-name-wrap` }>
              <a
                href={ downloadURL }
                target="_blank"
                rel="noopener noreferrer"
                style={ { pointerEvents: downloadURL ? '' : 'none' } }
                className={`${prefix}-list-${previewCls}item-name`}
              >
                <span>{ typeOfFn(fileNameRender) ? fileNameRender(file) : file.name }</span>
                { !!size && <span className={ `${ prefix }-list-${previewCls}item-size` }>({ size })</span> }
              </a>
            </div>
            { state === 'uploading' ? (<div className={`${prefix}-list-item-progress`}><Progress state="normal" percent={file.percent} { ...progressProps } /></div>) : null }
            { state === 'error' && file.errorMsg ? (<div className={`${prefix}-list-item-error-msg`}>{file.errorMsg}</div>) : null }
            <div className={`${prefix}-list-item-options`}>
              { !isPreview ? typeOfFn(actionRender) ? actionRender(file) : <DeleteIcon onClick={onClick} /> : null }
            </div>
          </>
        )
      }
    </div>
  );
};

/**
 * @desc 渲染图片
 */
const RenderImage = (props: RenderImageProps) => {
  const { onHandleImageError, onPreview, isPreview, file } = props;
  const { imgURL } = getFileInfo(file);

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


/**
 * @desc 卡片列表
 */
const CardList: React.FunctionComponent<CardListProps> = (props: CardListProps): React.ReactElement => {
  const {
    className,
    file,
    listType,
    itemRender,
    fileNameRender,
    actionRender,
    progressProps,
    onHandleCancel,
    onHandleRemove,

    isPreview,
    renderPreview,

    renderImageChildren,

    // 编辑
    onSelect,
    reUpload,
    // todo name accept
    accept,
    name,
  } = props;

  let item = null;

  const { downloadURL, classNames } = getFileInfo(file, { className, listType, isPreview });
  const state = isPreview ? '' : file.state;
  if (state === 'uploading') {
    item = [
      renderImageChildren,
      <div key='cancel' className="card-cancel" onClick={() => onHandleCancel(file)}>取消</div>,
      <Progress key='progress' state="normal" percent={file.percent} { ...progressProps } />,
    ];
  } else {
    if (isPreview && typeOfFn(renderPreview)) {
      item = renderPreview(file);
    } else if (!isPreview && typeOfFn(itemRender)) {
      // todo
      item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
    } else {
      item = [
        renderImageChildren,
        <div className={`${prefix}-tool`} key='tool'>
          {
            !isPreview && typeOfFn(actionRender) ? actionRender(file) : (
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
                { !isPreview && <div><DeleteIcon className="card-del" onClick={() => onHandleRemove(file)}  /></div> }
              </div>
            )
          }
        </div>
      ]
    }
  }

  const previewCls = isPreview ? `preview-${listType}-`  : '';

  return (
    <div className={classNames} key={file.uid || file.name}>
      <div className={`${prefix}-list-${previewCls}item-wrapper`}>{ item }</div>
      <div className={`${prefix}-list-${previewCls}item-name`}>{ typeOfFn(fileNameRender) ? fileNameRender(file) : file.name}</div>
    </div>
  );
};

/**
 * @desc icon列表
 */
export const IconList: React.FunctionComponent<IconListProps> = (props: IconListProps): React.ReactElement => {
  const {
    className,
    file,
    listType,
    itemRender,
    fileNameRender,
    actionRender,
    progressProps,
    onHandleCancel,
    onHandleRemove,

    isPreview,
    renderPreview,

  } = props;

  let item = null;

  const state = isPreview ? '' : file.state;
  // 上传中为取消，其他情况为删除
  const onClick = () => (state === 'uploading' ? onHandleCancel(file) : onHandleRemove(file));

  if (state === 'uploading') {
    item = <Progress key='progress' shape="circle" state="normal" percent={file.percent} { ...progressProps } />;
  } else if (state === 'error') {
    item = <IconListError />;
  } else {
    if (isPreview && typeOfFn(renderPreview)) {
      item = renderPreview(file);
    } else if (!isPreview && typeOfFn(itemRender)) {
      // todo
      item = itemRender(file, { onRemove: onHandleRemove, onCancel: onHandleCancel });
    } else {
      item = React.createElement(getFileSvg(file.type, file.mimeType, file.suffix, file.name), { className: 'icon' })
    }
  }

  const previewCls = isPreview ? `preview-${listType}-`  : '';

  const { downloadURL, classNames } = getFileInfo(file, { className, listType, isPreview });
  return (<div className={classNames} key={file.uid || file.name}>
    <a
      href={downloadURL}
      target="_blank"
      style={ { pointerEvents: downloadURL ? '' : 'none' } }
      rel="noopener noreferrer"
      className={`${prefix}-list-${previewCls}item-wrapper`}
    >
      <div className={`${prefix}-list-${previewCls}item-wrapper-icon`}>{ item }</div>
      <div className={`${prefix}-list-${previewCls}item-wrapper-name`}>
        { typeOfFn(fileNameRender) ? fileNameRender(file) : file.name}
        { state === 'error' && file.errorMsg ? (<div className={`${prefix}-list-item-error-msg`}>{file.errorMsg}</div>) : null }
      </div>

      <div className={`${prefix}-list-item-wrapper-options`}>
        { !isPreview ? typeOfFn(actionRender) ? actionRender(file) : <DeleteIcon onClick={onClick} /> : null }
      </div>
    </a>
  </div>)
}

export {
  TextAndImageList,
  RenderImage,
  CardList,
}
