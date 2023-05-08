import { emptyFn } from './utils';
export interface UploaderConfig {
  /**
   * @desc 文件名称
   */
  name: string;
  /**
   * @desc 上传地址
   */
  action: string;

  /**
   * @desc 上传额外参数
   */
  data: object;

  /**
   * @desc 上传请求头
   * @param {Object} file 文件对象
   */
  headers: (file) => object | object;

  /**
   * @desc 请求携带 cookie
   */
  withCredentials: boolean;

  /**
   * @desc 上传文件前调用
   * @param {Object} file 文件对象
   * @return {boolean} false 停止上传
   */
  beforeUpload: (file) => boolean;

  /**
   * todo
   * @desc 文件上传中调用
   * @param {Object} 上传的事件及文件
   */
  onProgress: () => void;

  /**
   * @desc 文件上传成功回调
   * @param {Object} value 响应信息及文件
   */
  onSuccess: (value) => void;

  /**
   * @desc 文件上传失败回调
   * @param {Object} value 上传失败信息、响应信息及文件
   */
  onError: (value) => void;

  /**
   * @desc 超时事件（单位ms）
   */
  timeout: number;

  /**
   * todo put
   * @desc 上传方法
   */
  method: 'post';

  /**
   * @desc 自定义上传，覆盖内置上传
   */
  customRequest: Function;
}

export interface UploaderInstance {
  setConfig(config: UploaderConfig): void;
  startUpload(): void
  abortUpload(): void;
  upload(): void;
  post(): void;
}
/**
 * @desc 上传
 * @param config
 * @constructor Uploader
 */
function Uploader (config: UploaderConfig): UploaderInstance {
  this.config = {
    beforeUpload: emptyFn,
    data: {},
    method: 'post',
    name: 'file',
    onProgress: emptyFn,
    onSuccess: emptyFn,
    onError: emptyFn,
    ...config,
  };
  return this;
}
// defineProperties 支持>=IE9
Object.defineProperties(Uploader.prototype, {
  setConfig: {
    value: function (config) {
      this.config = Object.assign(this.config, config);
    }
  },
  startUpload: {
    value: function () {

    }
  },
  abortUpload: {
    value: function () {

    }
  },
  upload: {
    value: function () {

    }
  },
  post: {
    value: function () {

    }
  }
});

export default Uploader;
