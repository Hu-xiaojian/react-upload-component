import uuid from './uuid';
import type { ValueItem } from '@/types';

/**
 * @desc 空函数
 * @return void
 */
export const emptyFn = (value?: any) => {};

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


/**
 * @desc 计算size
 * @param size
 * @return string 1024K
 */
export const sizeCalculator = (size): string => {
  let fileSize = parseFloat(size, 10);
  // fileSize为浮点数 用 < 0.000001 替代 === 0
  if (isNaN(fileSize) || fileSize < 0.0000001) {
    return 0;
  }
  const SIZE_SUFFIX = ['B', 'K', 'M', 'G', 'T', 'P'];
  let suffixIndex = 0;

  // 在Mac上实验发现 取1024造成显示的大小和实际大小不一致
  // 因为单位制不同 见 https://superuser.com/questions/938234/size-of-files-in-windows-os-its-kb-or-kb
  const BIT_NUMBER_SYSTEM = 1024;
  while (fileSize >= BIT_NUMBER_SYSTEM && suffixIndex < SIZE_SUFFIX.length) {
    suffixIndex++;
    fileSize /= BIT_NUMBER_SYSTEM;
  }

  const suffix = SIZE_SUFFIX[suffixIndex];
  fileSize = fileSize.toFixed(2);

  return `${fileSize}${suffix}`;
}

/**
 * @desc 是否是函数
 * @param fn 函数
 * @return {boolean}
 */
export const typeOfFn = fn => typeof fn === 'function';

/**
 * 判断对象是否是一个promise，即是否可以用.then
 * @param  {*}  obj
 * @return {Boolean}
 */
export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 用于执行回调方法后的逻辑
 * @param  {*} ret            回调方法执行结果
 * @param  {Function} success 执行结果返回非false的回调
 * @param  {Function} [failure=noop] 执行结果返回false的回调
 */
export function promiseCall(ret, success, failure = emptyFn) {
  if (isPromise(ret)) {
    return ret
      .then(result => {
        success(result);
        return result;
      })
      .catch(e => {
        failure(e);
        // throw e;
      });
  }

  return ret !== false ? success(ret) : failure(ret);
}


export const errorCode = {
  EXCESS_MAX_COUNT: 'EXCESS_MAX_COUNT',
  BEFORE_UPLOAD_ERROR: 'BEFORE_UPLOAD_ERROR',
  RESPONSE_FAIL: 'RESPONSE_FAIL',
};
