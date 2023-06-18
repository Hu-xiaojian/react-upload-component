import type { ReactNode } from 'react';

/**
 * @desc upload基础属性
 */
export interface Base {
  id: string;

  /**
   * @desc 文件大小，字节为单位（8bit -> 1byte, 1024byte -> 1kb, 1kb -> 1024mb, ...）
   */
  size: number;

  /**
   * @desc 文件名称
   */
  name: string;

  /**
   * @desc 子级
   */
  children: ReactNode;

  /**
   * @desc 是否禁用
   */
  disabled: boolean;

  /**
   * @desc 是否多选
   * https://caniuse.com/?search=multiple ie10+
   */
  multiple: boolean;

  /**
   * @desc 是否支持文件夹上传
   * https://caniuse.com/?search=directory
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
   * The webkitdirectory attribute on the <input type="file"> element allows entire directory with file contents (and any subdirectories) to be selected.
   */
  webkitdirectory: boolean;

  /**
   * todo
   * @desc 调用系统设备媒体
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
   */
  capture: string;

  /**
   * todo
   * @desc 文件上传类型 (image/png, image/jpeg, .jpg, .jpeg, .png, ...)
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
   */
  accept: string;
}
