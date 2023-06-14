import type { ValueItem } from './helper';

/**
 * @desc 列表上传
 */
export interface ListUploadProps {
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
