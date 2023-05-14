/**
 * @desc 基础URL
 */
interface BaseUrl {
  /**
   * @desc 返回结果
   */
  url: string;

  /**
   * @desc 图片预览地址
   */
  imgURL?: string;

  /**
   * @desc 文件下载地址
   */
  downloadURL?: string;
}

/**
 * @desc response 返回结构
 */
export interface ResponseUpload extends BaseUrl {
  /**
   * @desc 成功
   */
  success: boolean;

  /**
   * @desc 错误信息，success为false展示
   */
  message?: string;
}

type State = 'done' | 'error' | 'loading' | 'select';

/**
 * @desc 文件项
 */
export interface ValueItem {
  /**
   * @desc 文件状态
   */
  state?: State;

  /**
   * @desc 文件名称
   */
  name: string;

  /**
   * @desc 文件类型
   */
  type: string;

  /**
   * @desc 文件大小
   */
  size: string;

  /**
   * @desc 文件唯一标识
   */
  uid: string;

  /**
   * @desc 原始file对象
   */
  originalFileObj: File;
}
