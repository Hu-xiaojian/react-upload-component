// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/hubingjie/Desktop/react-upload-component/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/hubingjie/Desktop/react-upload-component/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/hubingjie/Desktop/react-upload-component/node_modules/@umijs/preset-dumi/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/hubingjie/Desktop/react-upload-component/README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "order": null,
          "filePath": "README.md",
          "updatedTime": 1687514189000,
          "slugs": [
            {
              "depth": 1,
              "value": "Project Title",
              "heading": "project-title"
            },
            {
              "depth": 1,
              "value": "Description",
              "heading": "description"
            },
            {
              "depth": 1,
              "value": "Getting Started",
              "heading": "getting-started"
            },
            {
              "depth": 3,
              "value": "Installation",
              "heading": "installation"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "License",
              "heading": "license"
            },
            {
              "depth": 2,
              "value": "Acknowledgments",
              "heading": "acknowledgments"
            }
          ],
          "title": "Project Title"
        },
        "title": "Project Title"
      },
      {
        "path": "/demo/card-list",
        "component": require('/Users/hubingjie/Desktop/react-upload-component/docs/demo/card-list.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/card-list.md",
          "updatedTime": 1688887093623,
          "slugs": [
            {
              "depth": 2,
              "value": "CardList",
              "heading": "cardlist"
            }
          ],
          "title": "CardList",
          "hasPreviewer": true,
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "CardList - rc-upload"
      },
      {
        "path": "/demo/cropper-upload",
        "component": require('/Users/hubingjie/Desktop/react-upload-component/docs/demo/cropper-upload.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/demo/cropper-upload.md",
          "updatedTime": 1688887191184,
          "slugs": [
            {
              "depth": 2,
              "value": "CropperUpload",
              "heading": "cropperupload"
            }
          ],
          "title": "CropperUpload",
          "hasPreviewer": true,
          "group": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "CropperUpload - rc-upload"
      },
      {
        "path": "/demo",
        "meta": {},
        "exact": true,
        "redirect": "/demo/card-list"
      }
    ],
    "title": "rc-upload",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
