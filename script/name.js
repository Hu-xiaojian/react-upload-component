const names = [
  {
    title: '文字列表',
    name: 'text-list',
  },
  {
    title: '图片列表',
    name: 'image-list',
  },
  {
    title: '图标列表',
    name: 'icon-list',
  },
  {
    title: '卡片列表',
    name: 'card-list',
  },
  {
    title: '拖拽上传',
    name: 'upload-dragger',
  },
  {
    title: '限制数量',
    name: 'max-count',
  },
  {
    title: '文件大小、宽高限制',
    content: '设置图片最大宽度为 1200，最大占据磁盘空间大小为2M。思路是在 beforeUpload 这个阶段，获取到文件对象，判断文件对象是否符合要求。',
    name: 'file-size',
  },
  {
    title: '额外内容',
    name: 'extra-list',
  },
  {
    title: '裁剪上传',
    content: '通过转换 dataURL to Blob to File, 构造文件对象',
    name: 'cropper-upload',
  },
  {
    title: '卡片上传',
    name: 'card-upload',
  },
  {
    title: '文字上传',
    name: 'list-upload',
  },
];

module.exports = names;
