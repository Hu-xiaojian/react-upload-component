import uuid from './uuid';
import type { ValueItem } from '@/types';

/**
 * @desc 空函数
 * @return void
 */
export const emptyFn = () => {};

/**
 * @desc File to Object
 * @param file
 * return
 */
export const fileToObj = (file): ValueItem => {
  // 添加文件项唯一标识
  if (!file.uid) {
    file.uid = uuid();
  }

  return {
    error: file.error,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    originalFileObj: file,
    percent: 0,
    state: 'selected',
    size: file.size,
    type: file.type,
    uid: file.uid,
  };
}

/**
 * @desc 检查文件列表
 * @param props
 * @return {Array}
 */
export const checkValue = props => {
  let value = props.value;
  if (!value) {
    value = props.defaultValue;
  }
  value = Array.isArray(value) ? value : [];
  return value;
}

/**
 * @desc 获取目标文件
 * @param files 文件列表
 * @param file 目标
 */
export const getTargetFile = (files, file) => {
  const key = file.uid ? 'uid' : 'name';
  return files.find(it => it[key] === file[key]);
}
