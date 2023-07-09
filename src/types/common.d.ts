import type { ReactNode, CSSProperties } from 'react';
import type { ResponseUpload, ValueItem } from './helper';
import type { ProgressProps } from './progress';
import type { Base } from './upload-base';
/**
 * @desc base 共享接口
 */
export interface Common {

  /**
   * @desc 上传地址
   */
  action: string;

  /**
   * @desc 上传额外参数
   * @param {File} file 文件对象
   */
  data:  (file) => object | object;

  /**
   * @desc 上传请求头
   */
  headers: object;

  /**
   * @desc 请求携带 cookie
   */
  withCredentials: boolean;

  /**
   * @desc 文件上传中调用
   * @param {Array<ValueItem>} values 所有文件
   * @param {ValueItem} file 文件对象
   */
  onProgress: (values: Array<ValueItem>, file: ValueItem) => void;

  /**
   * @desc 文件上传成功回调
   * @param {Object} res 响应信息
   * @param {File} file 文件对象
   */
  onSuccess: (res, file) => void;

  /**
   * @desc 文件上传失败回调
   * @param {Error} error 上传失败信息、响应信息及文件
   * @param {Object} response 接口错误信息
   * @param {file} file 文件
   */
  onError: (error, response, file) => void;

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


export interface CommonComponentHelper {
  className: string;
  style: CSSProperties;
}

/**
 * @desc 共享组件接口
 */
export interface CommonComponent extends CommonComponentHelper, Base, Common {
  progressProps: ProgressProps;

  /**
   * @desc 自动上传 ture = beforeUpload
   */
  autoUpload: boolean;

  /**
   * @desc 上传文件前调用
   * @param {File} file 文件对象
   * @param {Object} config 配置信息
   * @return {boolean} false 停止上传
   */
  beforeUpload: (file, config) => boolean;

  /**
   * @desc 选择文件后，autoUpload为false时调用，为true时调用beforeUpload
   * @param {ValueItem} file
   * @return {Boolean} false阻止上传
   */
  afterSelect: (file: ValueItem) => boolean;

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
   * todo
   * @desc 渲染预览态
   * @param value 文件项
   * @return ReactNode
   */
  renderPreview: (value: ValueItem) => ReactNode;

  /**
   * todo
   * @desc 自定义文件项渲染
   */
  itemRender: (value: ValueItem) => ReactNode;

  /**
   * @desc 行为渲染
   */
  actionRender: (value: ValueItem) => ReactNode;

  /**
   * @desc 文件发生变化
   * @param value
   * @param files
   * @return void
   */
  onChange: (value: Array<ValueItem>, files: Array<ValueItem>) => void;

  /**
   * @desc 选择新文件上传并替换
   */
  reUpload: boolean;

  /**
   * @desc 自定义文件名称渲染
   * @return ReactNode
   */
  fileNameRender: (file: ValueItem) => ReactNode;

  /**
   * @desc 删除文件回调
   * @return {boolean} true删除
   */
  onRemove: (file: ValueItem) => boolean;

  /**
   * @desc 取消上传，true中断上传
   */
  onCancel: (file: ValueItem) => boolean;

  /**
   * @desc 是否预览
   */
  isPreview: boolean;

  /**
   * @desc 选择文件回调
   * @param files 当前上传文件列表
   * @param value 所有文件列表
   */
  onSelect: (files: Array<ValueItem>, value: Array<ValueItem>) => void;
}
