import React from 'react';
import Upload from '@/upload';
import type { OriginalUpload as OriginalUploadX, ValueItem, UploaderInstance } from '@/types';
import { fileToObj, checkValue, emptyFn, getTargetFile } from '@/upload/utils';

interface OriginalUploadProps extends OriginalUploadX {
}

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
    this.uploadRef = React.createRef();
  }

  static defaultProps = {
    onSelect: emptyFn,
    afterSelect: emptyFn,
    onChange: emptyFn,
    onError: emptyFn,
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

    // 自动上传文件
    if (autoUpload) {
      this.uploadFiles(uploadFiles);
    }

    onSelect(uploadFiles, [ ...value, ...filesObjArr ]);
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
      this.onHandleChange(value, uploadFiles);
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
    fileList.length && this.uploadRef.current.startUpload(fileList);
  }

  /**
   * @desc 文件错误信息
   * @param err 错误信息
   * @param response 接口错误
   * @param file 错误文件
   */
  onHandleError = (err, response, file) => {
    const value = this.state.value;
    let targetFile = getTargetFile(value, file);

    if (!targetFile) return;

    targetFile = {
      ...targetFile,
      state: 'error',
      error: err,
      response,
    }

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

  render (): React.ReactNode {
    const {
      children,
      ...others
    } = this.props;
    return (<Upload
      ref={this.uploadRef}
      { ...others }
      onSelect={this.onHandleSelect}
    >
      {
        children
      }
    </Upload>);
  }
}

export default OriginalUpload;
