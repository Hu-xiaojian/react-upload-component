import { emptyFn } from './utils';
import type { UploaderConfig, UploaderInstance } from '@/types';
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
