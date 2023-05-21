/**
 * clone form https://fusion.design/pc/component/upload?themeid=2#Upload%20Selecter
 */

import React from 'react';
import Upload from '@/upload';
import type { OriginalUpload as OriginalUploadX, ValueItem, DragUploadProps } from '@/types';
import { fileToObj, checkValue, emptyFn, getTargetFile } from '@/utils';

interface OriginalUploadProps extends OriginalUploadX, DragUploadProps {}

interface OriginalUploadState {
  value: Array<ValueItem>;
  uploading?: boolean;
}

/**
 * @desc 原始上传
 */
class OriginalUpload extends React.Component<OriginalUploadProps, OriginalUploadState> {
  uploadRef: React.Ref<any>;
  constructor (props) {
    super(props);
    const value = checkValue(props);
    this.state = {
      value,
      uploading: false,
    };
  }

  static defaultProps: object;


  static getDerivedStateFromProps (nextProps, prevState) {
    // 上传中不允许做受控修改
    if ('value' in nextProps && nextProps.value !== prevState.value && !prevState.uploading) {
      return {
        value: !Array.isArray(nextProps.value) ? [] : nextProps.value,
      };
    }
    return null;
  }

  /**
   * @desc 文件上传回调
   */
  onHandleSelect = (files) => {
    const { onSelect, maxCount, autoUpload, afterSelect } = this.props;
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

    // NOTE：不触发更新，文件上传成功后setState
    this.state.value = _value;

    // 自动上传文件
    if (autoUpload) {
      this.uploadFiles(uploadFiles);
    }

    onSelect(uploadFiles, _value);
    excessFiles.forEach(it => {
      // 超出最大文件数量
      const err = new Error('EXCESS_MAX_COUNT');
      err.code = 'EXCESS_MAX_COUNT';
      this.onHandleError(err, null, it);
    });

    if (!autoUpload) {
      uploadFiles.forEach(it => {
        const validateResult = afterSelect(it);
        if (!validateResult) {
          const err = new Error('CHECk_FAILURE');
          this.onHandleError(err, null, it);
        }
      });
      this.onHandleChange(_value, uploadFiles);
    }

  };

  /**
   * @desc 更新文件列表状态
   */
  updateFilesState = () => {
    const inProgress = this.state.value.some(i => i.state === 'uploading');
    if (!inProgress) {
      this.state.uploading = false;
    }
  }


  /**
   * @desc 是否在更新
   */
  isUploading() {
    return this.state.uploading;
  }

  /**
   * @desc 文件上传
   * @param files
   */
  uploadFiles = files => {
    this.state.uploading = true;
    const fileList = files.filter(file => {
        if (file.state === 'selected') {
          file.state = 'uploading';
          return true;
        }
        return false;
      }).map(file => {
        return file.originalFileObj;
      });
    fileList.length && this.uploadRef.startUpload(fileList);
  }

  /**
   * @desc 文件错误信息
   * @param err 错误信息
   * @param response 接口错误
   * @param file 错误文件
   */
  onHandleError = (err, response, file) => {
    const value = this.state.value;
    const targetFile = getTargetFile(value, file);

    if (!targetFile) return;

    // NOTE：合并会对同一个对象操作，不需要setState更新，重新赋值需要setState更新
    Object.assign(targetFile, {
      ...targetFile,
      state: 'error',
      error: err,
      response,
    });

    this.updateFilesState();

    this.onHandleChange(value, targetFile);
    this.props.onError(targetFile, value);
  }

  /**
   * @desc 文件发生变化
   * @param value 所有文件列表
   * @param file 当前上传文件列表
   */
  onHandleChange = (value, file) => {
    this.setState({ value }, () => {
      this.props.onChange(value, file);
    })
  }

  /**
   * @desc 文件上传成功
   * @param response 响应数据
   * @param file 当前文件
   */
  onHandleSuccess = (response, file) => {
    const { formatter } = this.props;

    if (formatter) {
      response = formatter(response, file);
    }

    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      e.code = 'RESPONSE_FAIL';
      return this.onHandleError(e, response, file);
    }

    if (response.success === false) {
      const err = new Error(response.message || 'RESPONSE_FAIL');
      err.code = 'RESPONSE_FAIL';
      return this.onHandleError(err, response, file);
    }

    const value = this.state.value;
    const targetItem = getTargetFile(value, file);
    if (!targetItem) return;

    // NOTE：合并会对同一个对象操作，不需要setState更新，重新赋值需要setState更新
    Object.assign(targetItem, {
      state: 'done',
      response,
      url: response.url,
      downloadURL: response.downloadURL || response.url, // 下载地址(可选)
    });

    this.updateFilesState();

    this.onHandleChange(value, targetItem);
    this.props.onSuccess(targetItem, value);
  };

  /**
   * @desc 文件上传进度
   * @param e 上传事件
   * @param file 上传文件
   */
  onHandleProgress = (e, file) => {
    this.state.uploading = true;

    const value = this.state.value;
    const targetItem = getTargetFile(value, file);

    if (!targetItem) {
      return;
    }

    // NOTE：合并会对同一个对象操作，不需要setState更新，重新赋值需要setState更新
    Object.assign(targetItem, {
      state: '',
      percent: e.percent,
    });

    this.setState({
      value,
    });

    this.props.onProgress(value, targetItem);
  };

  /**
   * @desc 文件投放
   * @param files
   */
  onDrop = files => {
    this.onHandleSelect(files);
    this.props.onDrop(files);
  };

  /**
   * 取消上传
   * @param {File} file
   */
  abort = file => {
    const fileList = this.state.value;
    const targetItem = getTargetFile(fileList, file);
    const index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      this.onHandleChange(fileList, targetItem);
    }
    this.uploadRef.abortUpload(file); // 取消上传时调用组件的 `abort` 方法中断上传
  };

  /**
   * @desc 开始上传
   */
  startUpload() {
    this.uploadFiles(this.state.value);
  }

  handleUploadRef = ref => (this.uploadRef = ref)

  render (): React.ReactNode {
    const {
      children,
      disabled,
      draggable,
      maxCount,
      beforeUpload,
      name,
      ...others
    } = this.props;

    const { value } = this.state;
    const _maxCount = value.length >= maxCount;
    return (<Upload
      { ...others }
      name={name}
      beforeUpload={beforeUpload}
      draggable={draggable}
      disabled={disabled || _maxCount}
      onSelect={this.onHandleSelect}
      onDrop={this.onDrop}
      onProgress={this.onHandleProgress}
      onSuccess={this.onHandleSuccess}
      onError={this.onHandleError}
      ref={this.handleUploadRef}
    >
      {
        children
      }
    </Upload>);
  }
}

OriginalUpload.defaultProps = {
  autoUpload: true,
  name: 'file',
  method: 'post',
  onSelect: emptyFn,
  afterSelect: emptyFn,
  onChange: emptyFn,
  onError: emptyFn,
  onDrop: emptyFn,
  onProgress: emptyFn,
  onSuccess: emptyFn,
  beforeUpload: emptyFn,
  withCredentials: false,
}

export default OriginalUpload;
