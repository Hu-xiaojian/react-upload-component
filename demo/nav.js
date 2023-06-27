import { TextList, CardList, ImageList, IconList, UploadDraggable } from './component';

const navs = [
  {
    title: '文字列表',
    component: TextList,
  },
  {
    title: '图片列表',
    component: ImageList,
  },
  {
    title: '图标列表',
    component: IconList,
  },
  {
    title: '卡片列表',
    component: CardList,
  },
  {
    title: '拖拽上传',
    component: UploadDraggable,
  },
];

export default navs;
