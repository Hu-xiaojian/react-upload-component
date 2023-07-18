## 文件大小、宽高限制
           设置图片最大宽度为 1200，最大占据磁盘空间大小为2M。思路是在 beforeUpload 这个阶段，获取到文件对象，判断文件对象是否符合要求。
<code src="../examples/file-size.tsx"></code>