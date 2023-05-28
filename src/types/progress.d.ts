import type { ReactNode } from 'react';

/**
 * @desc 进度道具
 */
export interface ProgressProps {
  className: string;

  /**
   * @desc 进度条状态
   */
  state: 'normal' | 'success' | 'error';

  /**
   * @desc 色彩阶段变化模式，color > progressive > state
   */
  progressive: boolean;

  /**
   * @desc 线条颜色
   */
  color: string;

  /**
   * @desc 背景样式
   */
  backgroundColor: string;

  /**
   * @desc 形态
   */
  shape: 'circle' | 'line';

  /**
   * @desc 文本渲染
   */
  textRender: (percent: number) => string | ReactNode;
}
