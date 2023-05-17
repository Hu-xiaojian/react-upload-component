import type { Common, CommonComponent } from './common';
import type { Base } from './upload-base';
/**
 * @desc 拖拽上传
 */
export interface DragUploadProps extends Base, Common, CommonComponent {
  /**
   * @desc 是否拖拽上传
   */
  draggable: boolean;

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
