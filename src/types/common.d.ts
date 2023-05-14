import type { ReactNode } from 'react';
import type { ResponseUpload, ValueItem } from './helper';
/**
 * @desc 共享接口
 */
export interface Common {
  /**
   * @desc 上传地址
   */
  action: string;

  /**
   * @desc 文件上传类型 (image/png, image/jpeg, .jpg, .jpeg, .png, ...)
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
   */
  accept: string;

  /**
   * @desc 上传额外参数
   */
  data:  () => object | object;

  /**
   * @desc 上传请求头
   */
  headers: object;

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

  /**
   * todo
   * @desc 分片
   */
  fragment: boolean;

  /**
   * todo
   * @desc 自定义分片
   */
  customFragment: Function;
}

/**
 * @desc 共享组件接口
 */
export interface CommonComponent {
  /**
   * @desc 文件列表最大数量
   */
  maxCount: number;

  /**
   * @desc 文件列表
   */
  value: Array<ValueItem>;

  /**
   * @desc 默认文件列表
   */
  defaultValue: Array<ValueItem>;

  /**
   * @desc 数据格式化函数，处理接口响应数据
   * @param response 接口响应数据
   * @param file 本次上传文件
   * @return ValueItem
   */
  formatter: (response: ResponseUpload, file: File) => ValueItem;

  /**
   * @desc 是否为预览态
   */
  preview: boolean;

  /**
   * todo
   * @desc 渲染预览态
   * @param value 文件项
   * @return ReactNode
   */
  renderPreview: (value: ValueItem) => ReactNode | ReactNode;

  /**
   * todo
   * @desc 文件项渲染
   */
  itemRender: (value: ValueItem) => ReactNode | ReactNode;

  /**
   * todo
   * @desc 行为渲染
   */
  actionRender: (value: ValueItem) => ReactNode | ReactNode;
}
