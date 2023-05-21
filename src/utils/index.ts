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

/**
 * 获取对象的类型
 * @param  {*} obj
 * @return {String}
 */
export function typeOf(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, '');
}

/**
 * 是否是纯净对象
 * @param  {*}  obj
 * @return {Boolean}
 * @reference https://github.com/jonschlinkert/is-plain-object
 */
export function isPlainObject(obj) {
  if (typeOf(obj) !== 'Object') {
    return false;
  }

  const ctor = obj.constructor;

  if (typeof ctor !== 'function') {
    return false;
  }

  const prot = ctor.prototype;

  if (typeOf(prot) !== 'Object') {
    return false;
  }

  if (!prot.hasOwnProperty('isPrototypeOf')) {
    return false;
  }
  return true;
}
