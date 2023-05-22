import type { Common } from './common';
/**
 * @desc 上传配置
 */
export interface UploaderConfig extends Common {
  /**
   * @desc 文件名称
   */
  name: string;
}

/**
 * @desc 上传实例
 */
export interface UploaderInstance {
  setConfig(config: UploaderConfig): void;
  startUpload(fileList: Array<File>): void
  abortUpload(file: File): void;
  upload(file: File): void;
  post(file: File, config: UploaderConfig): void;
}
