import type { ReactNode } from 'react';
import type { UploaderInstance } from './upload-config';
import type { ValueItem } from './helper';
import type { CardUploadProps } from './card-upload';
type ListType = 'text' | 'image' | 'card';
/**
 * @desc list
 */
export interface ListProps extends CardUploadProps {
  /**
   * @desc 类名
   */
  className: string;
  /**
   * @desc 列表类型
   */
  listType: ListType;

  /**
   * @desc 文件列表
   */
  value: Array<ValueItem>;

  /**
   * @desc upload
   */
  upload: UploaderInstance;

  /**
   * @desc 是否预览
   */
  isPreview: boolean;

  /**
   * @desc 删除文件回调
   */
  onRemove: (file: File) => void;

  /**
   * @desc 自定义文件名称渲染
   * @return ReactNode
   */
  fileNameRender: (file: ValueItem) => ReactNode;

  /**
   * @desc 上传中
   */
  onProgress: () => void;

  /**
   * todo
   * @desc 自定义渲染
   * @param file 文件
   */
  itemRender: (file: ValueItem) => ReactNode;

  /**
   * @desc 操作区渲染
   */
  actionRender: (file: ValueItem) => ReactNode;

  /**
   * @desc 取消上传
   */
  onCancel: () => void;

  /**
   * @desc 选择新文件上传并替换
   */
  reUpload: boolean;
}
