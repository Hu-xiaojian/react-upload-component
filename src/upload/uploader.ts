import { emptyFn, isPlainObject } from '@/utils';
import uuid from '@/utils/uuid';
import defaultRequest from '@/upload/default-request';
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
  this.reqs = Object.create(null);
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
    value: function (fileList) {
      const filesArr = fileList.length ? Array.prototype.slice.call(fileList) : [fileList];
      filesArr.forEach(file => {
        file.uid = file.uid || uuid();
        this.upload(file);
      });
    }
  },
  abortUpload: {
    value: function (file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file && file.uid) {
          uid = file.uid;
        }
        if (reqs[uid]) {
          reqs[uid].abort();
          delete reqs[uid];
        }
      } else {
        Object.keys(reqs).forEach(uid => {
          if (reqs[uid] && reqs[uid].abort) {
            reqs[uid].abort();
          }
          delete reqs[uid];
        });
      }
    }
  },
  upload: {
    value: function (file) {
      const { beforeUpload, action, name, headers, timeout, withCredentials, method, data, onError } = this.config as UploaderConfig;
      const before = beforeUpload(file, {
        action,
        name,
        headers,
        timeout,
        withCredentials,
        method,
        data,
      });
      if (before !== false) {
        if (before === false) {
          const err = new Error('BEFORE_UPLOAD_ERROR');
          err.code = 'BEFORE_UPLOAD_ERROR';
          return onError(err, null, file);
        }
        this.post(file, isPlainObject(before) ? before : undefined);
      } else {
        let err;
        if (before) {
          err = before;
        } else {
          err = new Error('BEFORE_UPLOAD_ERROR');
          err.code = 'BEFORE_UPLOAD_ERROR';
        }
        onError(err, null, file);
      }
    }
  },
  post: {
    value: function (file, config = {}) {
      const requestConfig = {
        ...this.config,
        ...config,
      } as UploaderConfig;
      const {
        action,
        name,
        headers,
        timeout,
        withCredentials,
        onProgress,
        onSuccess,
        onError,
        method,
        data,
        customRequest,
      } = requestConfig;
      let _data = data;
      if (typeof data === 'function') {
        _data = data(file);
      }
      const { uid } = file;
      const request = typeof customRequest === 'function' ? customRequest : defaultRequest;
      this.reqs[uid] = request({
        action,
        filename: name,
        file,
        data: _data,
        timeout,
        headers,
        withCredentials,
        method,
        onProgress: e => {
          onProgress(e, file);
        },
        onSuccess: res => {
          delete this.reqs[uid];
          onSuccess(res, file);
        },
        onError: (err, res) => {
          delete this.reqs[uid];
          onError(err, res, file);
        },
      });
    }
  }
});

export default Uploader;
