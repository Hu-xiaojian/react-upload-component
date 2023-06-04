/**
 * @desc 卡片上传
 */
import type { ValueItem } from './helper';

export interface CardUploadProps {
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
  onImageError: (file: ValueItem, error: object) => void
}
