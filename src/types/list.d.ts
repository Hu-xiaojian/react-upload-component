import type { ReactNode } from 'react';
import type { ValueItem } from './helper';
import type { CardUploadProps } from './card-upload';
import type { ProgressProps } from './progress';
type ListType = 'text' | 'image' | 'card';
/**
 * @desc list
 */
export interface ListProps extends CardUploadProps {
  progressProps: ProgressProps;
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
   * @desc upload original-upload this
   */
  upload: {
    abort(file: ValueItem): void;
    removeFile(file: ValueItem): void;
  };

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
   * @desc 取消上传，true中断上传
   */
  onCancel: (file: ValueItem) => boolean;

  /**
   * @desc 选择新文件上传并替换
   */
  reUpload: boolean;
}
