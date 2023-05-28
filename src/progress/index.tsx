import React from 'react';
import classnames from 'classnames';
import { prefix } from '@/manifest';
import type { ProgressProps } from '@/types';
import './index.scss';

interface InteriorProgressProps extends ProgressProps {
  /**
   * @desc 百分百
   */
  percent: number;

}

/**
 * @desc 进度
 */
const Progress: React.FunctionComponent<InteriorProgressProps> = (props: InteriorProgressProps): React.ReactElement => {
  const { shape = 'line', percent, textRender, className, color, backgroundColor, progressive, state, hasBorder, ...others } = props;
  // 圆
  if (shape === 'circle') {
   return
  }

  const suffixText = textRender ? textRender(percent): '';
  const classNames = classnames({
    [`${prefix}-progress-line`]: true,
    [`${prefix}-progress-line-show-info`]: suffixText,
    [`${prefix}-progress-line-show-border`]: hasBorder,
    [className]: className,
  });
  const lineStyle = {
    width: `${percent > 100 ? 100 : percent < 0 ? 0 : percent}%`,
    backgroundColor: color,
  };

  const lineCls = classnames({
    [`${prefix}-progress-line-overlay`]: true,
    [`${prefix}-progress-line-overlay-${state}`]:
    !color && !progressive && state,
    [`${prefix}-progress-line-overlay-started`]:
    !color && progressive && percent <= 30,
    [`${prefix}-progress-line-overlay-middle`]:
    !color && progressive && percent > 30 && percent < 80,
    [`${prefix}-progress-line-overlay-finishing`]:
    !color && progressive && percent >= 80,
  });


  const underlayStyle = { backgroundColor: backgroundColor };

  // 线
  return (<div
    aria-valuenow={percent}
    aria-valuemin="0"
    aria-valuemax="100"
    className={classNames}
    {...others}
  >
    <div className={`${prefix}-progress-line-container`}>
      <div
        className={`${prefix}-progress-line-underlay`}
        style={underlayStyle}
      >
        <div className={lineCls} style={lineStyle} />
      </div>
    </div>
    {suffixText ? (
      <div className={`${prefix}-progress-line-text`}>
        {suffixText}
      </div>
    ) : null}
  </div>);
}

Progress.displayName = 'Progress';
export default Progress;
