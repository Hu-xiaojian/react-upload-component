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
