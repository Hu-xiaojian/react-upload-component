import React from 'react';

interface ProgressProps {
  /**
   * @desc 百分百
   */
  percent: number;
}

/**
 * @desc 进度
 */
const Progress: React.FunctionComponent<ProgressProps> = (props: ProgressProps): React.ReactElement => {
  return (<div>todo</div>);
}

Progress.displayName = 'Progress';
export default Progress;
