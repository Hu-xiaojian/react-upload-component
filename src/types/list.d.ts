import type { ReactNode, CSSProperties } from 'react';
import type { ValueItem } from './helper';
import type { CommonComponent } from './common';
type ListType = 'text' | 'image' | 'card';

/**
 * @desc list
 */
export interface ListProps extends CommonComponent {

  /**
   * @desc 列表类型
   */
  listType: ListType;

  /**
   * @desc upload original-upload this
   */
  upload: {
    abort(file: ValueItem): void;
    removeFile(file: ValueItem): void;
  };

  /**
   * @desc 点击图片回调
   * @param file 文件
   */
  onPreview: (file: ValueItem) => void;

  /**
   * @desc 图片失败回调
   * @param file 文件
   * @param error 错误信息
   */
  onImageError: (file: ValueItem, error: object) => void;
}

/**
 * @desc 文字和图片列表道具
 */
export interface TextAndImageListProps {
  // 通用
  style: CSSProperties;
  file: ValueItem;
  listType: ListType;
  itemRender: (value: ValueItem) => ReactNode;
  fileNameRender: (file: ValueItem) => ReactNode;
  actionRender: (value: ValueItem) => ReactNode;
  progressProps: object;
  onHandleCancel: (file: ValueItem) => boolean;
  onHandleRemove: (file: ValueItem) => boolean;

  // 预览
  isPreview: boolean;
  renderPreview: (value: ValueItem) => ReactNode;


  // 渲染图片节点
  renderImageChildren?: ReactNode;
}

/**
 * @desc 渲染图片道具
 */
export interface RenderImageProps {
  file: ValueItem;
  isPreview: boolean;
  onPreview: (file: ValueItem) => void;
  onHandleImageError: (file: ValueItem, error: object) => void;
}

/**
 * @desc 卡片列表道具
 */
export interface CardListProps extends TextAndImageListProps {
  // 编辑
  onSelect: (oldFile: ValueItem, files: Array<File>) => void;
  reUpload: boolean;
  // todo name accept
  accept: string;
  name: string;
}

/**
 * @desc icon列表道具
 */
export interface IconListProps extends TextAndImageListProps {

}
