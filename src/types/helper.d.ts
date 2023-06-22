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
  error?: string;
  message?: string;
  errorMessage?: string;
  errorMsg?: string;
}

/**
 * @desc 文件状态
 */
type State = 'done' | 'error' | 'uploading' | 'selected';

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
   * @desc 错误信息
   */
  error?: string;

  /**
   * @desc 最后修改时间戳
   */
  lastModified: number;

  /**
   * @desc 最后修改时间
   */
  lastModifiedDate?: object,

  /**
   * @desc 上传百分百
   */
  percent: number;

  /**
   * @desc 原始file对象
   */
  originalFileObj: File;

  /**
   * @desc 文件类型
   */
  mimeType?: string;

  /**
   * @desc 文件后缀
   */
  suffix?: string;
}
