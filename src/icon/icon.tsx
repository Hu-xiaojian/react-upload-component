/* eslint-disable */
import React from 'react';

/**
 * @desc doc
 */
export const DOC = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="a">
      <stop stop-color="#15BC83" offset="0%"/>
      <stop stop-color="#0DB078" offset="100%"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 37.637A2.363 2.363 0 0 1 30.252 40H2.363A2.363 2.363 0 0 1 0 37.637V2.363A2.363 2.363 0 0 1 2.363 0h20.652l9.6 9.6v28.037Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" fill="#FFF"
          transform="translate(3.692)">
      <tspan x="4.308" y="28">DOC</tspan>
    </text>
    <path d="M36.308 9.6H29.07a2.363 2.363 0 0 1-2.363-2.363V0l9.6 9.6Z" fill="#15BC83"/>
    <path d="M36.308 9.6H29.07a2.363 2.363 0 0 1-2.363-2.363V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
  </g>
</svg>);
DOC.mimeType = [ 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ];
DOC.suffix = [ 'doc', 'docx' ];

/**
 * @desc exl
 */
export const EXL = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <radialGradient cx="84.588%" cy="71.963%" fx="84.588%" fy="71.963%" r="79.981%"
                    gradientTransform="matrix(-.8185 -.46845 .5764 -.66956 1.123 1.598)" id="a">
      <stop stop-color="#FFAB00" offset="0%"/>
      <stop stop-color="#FF7E33" offset="100%"/>
    </radialGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" letter-spacing="1"
          fill="#FFF" transform="translate(3.692)">
      <tspan x="5.308" y="28">EXL</tspan>
    </text>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#F25643"/>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".558"/>
  </g>
</svg>);
EXL.mimeType = [];
EXL.suffix = [ 'exl' ];

/**
 * @desc jpg
 */
export const JPG = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="a">
      <stop stop-color="#F25643" offset="0%"/>
      <stop stop-color="#EC4C38" offset="100%"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" fill="#FFF"
          transform="translate(3.692)">
      <tspan x="5.308" y="28">JPG</tspan>
    </text>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#F25643"/>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
  </g>
</svg>);
JPG.mimeType = [ 'image/jpeg', 'image/pjpeg' ];
JPG.suffix = [ 'jpg' ];

/**
 * @desc pdf
 */
export const PDF = (props) => (
  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" { ...props }>
    <defs>
      <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="a">
        <stop stop-color="#F25643" offset="0%"/>
        <stop stop-color="#EC4C38" offset="100%"/>
      </linearGradient>
      <linearGradient x1="20.385%" y1="21.145%" x2="20.385%" y2="80.375%" id="c">
        <stop stop-color="#FFF" offset="0%"/>
        <stop stop-color="#FAFAFA" offset="100%"/>
      </linearGradient>
      <path
        d="m9.8 19.74.233.008c.608.04 1.106.239 1.495.597.438.403.657.969.657 1.698 0 .627-.195 1.173-.586 1.638-.39.465-.99.697-1.799.697H7.274v3.396H6.185v-8.033H9.8Zm6.607 0 .233.007c.993.052 1.772.442 2.337 1.17.543.707.815 1.613.815 2.718 0 .853-.16 1.624-.481 2.313-.565 1.218-1.537 1.826-2.915 1.826h-3.243v-8.033h3.254Zm10.014 0v.985h-4.485v2.44h3.943v.956h-3.943v3.653h-1.088v-8.033h5.573Zm-10.244.936h-1.93v6.169h1.941l.213-.005c.274-.012.505-.049.695-.11.423-.142.77-.416 1.039-.82.215-.325.37-.74.465-1.247.055-.303.082-.584.082-.843 0-.995-.198-1.768-.593-2.318-.396-.55-1.033-.826-1.912-.826Zm-6.738 0H7.274v2.784h2.165l.204-.007c.396-.025.725-.127.986-.305.304-.208.456-.574.456-1.1 0-.59-.218-.991-.656-1.203-.24-.113-.57-.17-.99-.17Z"
        id="b"/>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path
        d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
        fill="url(#a)" transform="translate(3.692)"/>
      <g transform="translate(3.692)">
        <use fill="#FFF" xlinkHref="#b"/>
        <use fill="url(#c)" xlinkHref="#b"/>
      </g>
      <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#F25643"/>
      <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
    </g>
  </svg>);
PDF.mimeType = [ 'application/pdf' ];
PDF.suffix = [ 'pdf' ];

/**
 * @desc png
 */
export const PNG = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <radialGradient cx="84.588%" cy="71.963%" fx="84.588%" fy="71.963%" r="79.981%"
                    gradientTransform="matrix(-.8185 -.46845 .5764 -.66956 1.123 1.598)" id="a">
      <stop stop-color="#457AFF" offset="0%"/>
      <stop stop-color="#1B58F4" offset="100%"/>
    </radialGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" fill="#FFF"
          transform="translate(3.692)">
      <tspan x="5.308" y="28">PNG</tspan>
    </text>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#457AFF"/>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
  </g>
</svg>);
PNG.mimeType = [ 'image/png' ];
PNG.suffix = [ 'png' ];

/**
 * @desc ppt
 */
export const PPT = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <radialGradient cx="84.588%" cy="71.963%" fx="84.588%" fy="71.963%" r="79.981%"
                    gradientTransform="matrix(-.8185 -.46845 .5764 -.66956 1.123 1.598)" id="a">
      <stop stop-color="#FFAB00" offset="0%"/>
      <stop stop-color="#FF7E33" offset="100%"/>
    </radialGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" fill="#FFF"
          transform="translate(3.692)">
      <tspan x="6.308" y="28">PPT</tspan>
    </text>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#F25643"/>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".558"/>
  </g>
</svg>);
PPT.mimeType = [ 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ];
PPT.suffix = [ 'ppt', 'pptx' ];

/**
 * @desc xls
 */
export const XLS = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="a">
      <stop stop-color="#15BC83" offset="0%"/>
      <stop stop-color="#0DB078" offset="100%"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 37.637A2.363 2.363 0 0 1 30.252 40H2.363A2.363 2.363 0 0 1 0 37.637V2.363A2.363 2.363 0 0 1 2.363 0h20.652l9.6 9.6v28.037Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" letter-spacing="1"
          fill="#FFF" transform="translate(3.692)">
      <tspan x="4.308" y="28">XLS</tspan>
    </text>
    <path d="M36.308 9.6H29.07a2.363 2.363 0 0 1-2.363-2.363V0l9.6 9.6Z" fill="#15BC83"/>
    <path d="M36.308 9.6H29.07a2.363 2.363 0 0 1-2.363-2.363V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
  </g>
</svg>);
XLS.mimeType = [ 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ];
XLS.suffix = [ 'xls', 'xlsx' ];

/**
 * @desc zip
 */
export const ZIP = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
  <defs>
    <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="a">
      <stop stop-color="#F25643" offset="0%"/>
      <stop stop-color="#EC4C38" offset="100%"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <path
      d="M32.615 38.11a1.89 1.89 0 0 1-1.89 1.89H1.89A1.89 1.89 0 0 1 0 38.11V1.89A1.89 1.89 0 0 1 1.89 0h21.125l9.6 9.6v28.51Z"
      fill="url(#a)" transform="translate(3.692)"/>
    <text font-family="PingFangSC-Semibold, PingFang SC" font-size="11" font-weight="500" letter-spacing="1"
          fill="#FFF" transform="translate(3.692)">
      <tspan x="7.308" y="28">ZIP</tspan>
    </text>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#F25643"/>
    <path d="M36.308 9.6h-7.71a1.89 1.89 0 0 1-1.89-1.89V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
  </g>
</svg>);
ZIP.mimeType = [ 'application/zip', 'application/x-zip-compressed' ];
ZIP.suffix = [ 'zip' ];

/**
 * @desc file(default)
 */
export const FILE = (props) => (<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" { ...props }>
    <defs>
      <linearGradient x1="125.027%" y1="50%" x2="29.375%" y2="50%" id="a">
        <stop stop-color="#FEFEFE" stop-opacity="0" offset="0%"/>
        <stop stop-color="#FCFCFC" offset="100%"/>
      </linearGradient>
      <linearGradient x1="125.027%" y1="50%" x2="29.375%" y2="50%" id="b">
        <stop stop-color="#FEFEFE" stop-opacity="0" offset="0%"/>
        <stop stop-color="#FCFCFC" offset="100%"/>
      </linearGradient>
      <linearGradient x1="125.027%" y1="50%" x2="29.375%" y2="50%" id="c">
        <stop stop-color="#FEFEFE" stop-opacity="0" offset="0%"/>
        <stop stop-color="#FCFCFC" offset="100%"/>
      </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h40v40H0V0Z"/>
      <g transform="translate(3.692)">
        <path
          d="M32.615 37.637A2.363 2.363 0 0 1 30.252 40H2.363A2.363 2.363 0 0 1 0 37.637V2.363A2.363 2.363 0 0 1 2.363 0h20.652l9.6 9.6v28.037Z"
          fill="#F25643"/>
        <rect fill="url(#a)" x="8.308" y="15" width="16" height="2" rx="1"/>
        <rect fill="url(#a)" x="8.308" y="21" width="16" height="2" rx="1"/>
        <rect fill="url(#b)" x="8.308" y="27" width="10" height="2" rx="1"/>
        <rect fill="url(#c)" x="20.308" y="27" width="4" height="2" rx="1"/>
        <path d="M32.615 9.6H25.38a2.363 2.363 0 0 1-2.364-2.363V0l9.6 9.6Z" fill="#F25643"/>
        <path d="M32.615 9.6H25.38a2.363 2.363 0 0 1-2.364-2.363V0l9.6 9.6Z" fill="#FFF" opacity=".32"/>
      </g>
    </g>
  </svg>);

export default {
  PDF,
  XLS,
  DOC,
  JPG,
  ZIP,
  EXL,
  PPT,
  PNG,
};
