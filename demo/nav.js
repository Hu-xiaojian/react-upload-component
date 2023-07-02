import { TextList, CardList, ImageList, IconList, UploadDraggable, MaxCount, FileSize } from './component';

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
  {
    title: '限制数量',
    component: MaxCount,
  },
  {
    title: '文件大小、宽高限制',
    content: '设置图片最大宽度为 1200，最大占据磁盘空间大小为2M。思路是在 beforeUpload 这个阶段，获取到文件对象，判断文件对象是否符合要求。',
    component: FileSize,
  },
];

export default navs;
