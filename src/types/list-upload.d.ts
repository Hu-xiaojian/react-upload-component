import type { ValueItem } from './helper';
import type { CommonComponent } from './common';

/**
 * @desc 列表上传
 */
export interface ListUploadProps extends CommonComponent {
  listType: 'image' | 'text' | 'icon';

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
