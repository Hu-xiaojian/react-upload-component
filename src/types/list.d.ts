import type { UploaderInstance } from './upload-config';
import type { ValueItem } from './helper';
type ListType = 'text' | 'image' | 'card';
/**
 * @desc list
 */
export interface ListProps {
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
}
