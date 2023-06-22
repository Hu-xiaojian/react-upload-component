import type { CommonComponent } from './common';
/**
 * @desc 拖拽上传
 */
export interface DragUploadProps extends CommonComponent {
  listType: 'image' | 'text' | 'icon';
  /**
   * @desc 拖过回调
   */
  onDragOver: Function;

  /**
   * @desc 拖拽离开回调
   */
  onDragLeave: Function;

  /**
   * @desc 投放回调
   */
  onDrop: Function;

}
