import React from 'react';
import OriginalUpload from '@/upload/original-upload';
import { emptyFn, errorCode, fileToObj, promiseCall } from "@/utils";
import type { OriginalUploadProps } from '@/types';

class SelectUpload extends OriginalUpload<OriginalUploadProps> {
  static displayName: string;

  constructor (props) {
    super(props);
  }

  /**
   * @desc 重写文件上传回调
   */
  onHandleSelect = (files) => {
    const { onSelect, maxCount, autoUpload } = this.props;
    const { value } = this.state;
    // 文件数量
    const total = value.length + files.length;
    // 最大数量 - 当前文件数量 = 剩余文件位置
    const diff = maxCount - value.length;
    // 没有多余位置不上传
    if (diff <= 0) return;

    const filesObjArr = (files || []).map(it => fileToObj(it));

    // 要上传的文件列表
    let uploadFiles = filesObjArr;
    // 超出的文件列表
    let excessFiles = [];
    if (total > maxCount) {
      uploadFiles = filesObjArr.slice(0, diff);
      excessFiles = filesObjArr.slice(diff);
    }

    const _value = [ ...value, ...filesObjArr ]

    // 自动上传文件
    if (autoUpload) {
      // NOTE：不触发更新，文件上传成功后setState
      this.state.value = _value;
      this.uploadFiles(uploadFiles);
    }

    onSelect(uploadFiles, _value);
    excessFiles.forEach(it => {
      // 超出最大文件数量
      const err = new Error(errorCode.EXCESS_MAX_COUNT);
      err.code = errorCode.EXCESS_MAX_COUNT;
      this.onHandleError(err, null, it);
    });
  }

  /**
   * @desc 重写开始上传
   * 处理不自动上传
   */
  startUpload = (files) => {
    const { value } = this.state;
    const { autoUpload, afterSelect } = this.props;
    const _files = files.length ?  Array.prototype.slice.call(files) : [files];
    const filesObjArr = _files.map(it => fileToObj(it));
    const _value = [ ...value, ...filesObjArr ];
    if (!autoUpload) {
      _value.forEach(it => {
        const validateResult = afterSelect(it);
        promiseCall(validateResult, emptyFn, error => {
          this.onHandleError(error, null, it);
        });
      });
      this.setState({ value: _value }, () => {
        this.props.onChange(_value, _value);
        this.uploadFiles(_value);
      })
    }
  }
}

SelectUpload.displayName = 'SelectUpload';
SelectUpload.defaultProps = {
  ...OriginalUpload.defaultProps,
  children: <button className="upload-btn">文件上传</button>,
}

export default SelectUpload;
