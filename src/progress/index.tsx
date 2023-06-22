import React from 'react';
import classnames from 'classnames';
import { prefix } from '@/manifest';
import type { ProgressProps } from '@/types';
import './index.scss';

const VIEWBOX_WIDTH = 100; // width of viewBox
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2;
const DEFAULT_STROKE_WIDTH = 8;

const viewBox = `0 0 ${ VIEWBOX_WIDTH } ${ VIEWBOX_WIDTH }`;

const getPath = radius => {
  return `M ${ HALF_VIEWBOX_WIDTH },${ HALF_VIEWBOX_WIDTH } m 0,-${ radius } a ${ radius },${ radius } 0 1 1 0,${ 2 * radius } a ${ radius },${ radius } 0 1 1 0,-${ 2 * radius }`;
}

const computeOverlayStrokeDashOffset = percent => {
  const overlayRadius = HALF_VIEWBOX_WIDTH - 8 / 2 - (8 - 8) / 2;
  const overlayLen = Math.PI * 2 * overlayRadius;
  return (((VIEWBOX_WIDTH - percent) / VIEWBOX_WIDTH) * overlayLen);
}

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
  const {
    shape = 'line',
    percent,
    textRender,
    className,
    color,
    backgroundColor,
    progressive,
    state,
    hasBorder,
    ...others
  } = props;
  const suffixText = textRender ? textRender(percent) : `${percent}%`;

  const cls = React.useMemo(() => {
    let type = 'line';
    if (shape === 'circle') {
      type = 'circle';
    }
    const classNames = classnames({
      [`${ prefix }-progress-${ type }`]: true,
      [`${ prefix }-progress-${ type }-show-info`]: suffixText,
      [`${ prefix }-progress-${ type }-show-border`]: hasBorder,
      [className]: className,
    });
    const Cls = classnames({
      [`${ prefix }-progress-${ type }-overlay`]: true,
      [`${ prefix }-progress-${ type }-overlay-${ state }`]: !color && !progressive && state,
    });
    return {
      classNames,
      Cls
    }
  }, [ shape, suffixText, hasBorder ]);

  const progressiveColor = React.useMemo(() => {
    if (!color && progressive) {
      if (percent <= 30) {
        return '#ff3000';
      } else if (percent > 30 && percent < 80) {
        return '#ff9300';
      } else if (percent >= 80) {
        return '#46BC15';
      }
    }
    return '';
  }, [ percent ]);

  const styleKey = [ shape === 'circle' ? 'stroke' : 'backgroundColor' ];
  const lineStyle = {
    width: `${ percent > 100 ? 100 : percent < 0 ? 0 : percent }%`,
    backgroundColor: color || progressiveColor,
  };
  const underlayStyle = { [styleKey]: backgroundColor };

  const circle = React.useMemo(() => {
    if (shape === 'circle') {
      const overlayRadius = HALF_VIEWBOX_WIDTH - 8 / 2 - (8 - 8) / 2;
      const overlayPath = getPath(overlayRadius);
      const overlayLen = Math.PI * 2 * overlayRadius;
      const overlayStrokeDasharray = `${ overlayLen }px ${ overlayLen }px`;
      return {
        overlayPath,
        overlayStrokeDasharray
      }
    }
    return {};
  }, [ shape ]);

  const overlayStrokeDashoffset = `${ computeOverlayStrokeDashOffset(percent) }px`;

  return (<div
    aria-valuenow={ percent }
    aria-valuemin="0"
    aria-valuemax="100"
    className={ cls.classNames }
    { ...others }
  >
    { shape === 'circle' ? (<svg
      className={ `${ prefix }-progress-circle-container` }
      viewBox={ viewBox }
    >
      <path
        className={ `${ prefix }-progress-circle-underlay` }
        d={ getPath(HALF_VIEWBOX_WIDTH - DEFAULT_STROKE_WIDTH / 2) }
        fillOpacity="0"
        style={ underlayStyle }
      />
      <path
        className={ cls.Cls }
        // color > progressive > state情况默认有样式
        style={ { [styleKey]: color || progressiveColor } }
        d={ circle.overlayPath }
        fillOpacity="0"
        strokeDasharray={ circle.overlayStrokeDasharray }
        strokeDashoffset={ overlayStrokeDashoffset }
        stroke={ color }
      />
    </svg>) : (<div className={ `${ prefix }-progress-line-container` }>
      <div
        className={ `${ prefix }-progress-line-underlay` }
        style={ underlayStyle }
      >
        <div className={ cls.Cls } style={ lineStyle }/>
      </div>
    </div>) }
    { suffixText ? (<div className={ `${ prefix }-progress-${ shape }-text` }>
        { suffixText }
      </div>) : null }
  </div>);
}

Progress.displayName = 'Progress';
export default Progress;
