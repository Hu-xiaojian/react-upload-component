import React from 'react';
import CardUpload from '@/upload-wrapper/card-upload';
import ListUpload from '@/upload-wrapper/list-upload';
import DragUpload from '@/upload-wrapper/drag-upload';

const UPLOAD_COMPS = {
  'card': CardUpload,
  'list': ListUpload,
  'drag': DragUpload,
};

interface UploadProps {
  /**
   * @desc 上传组件类型
   */
  uploadType: 'card' | 'list' | 'drag';
}

function Upload(props: UploadProps) {
  const { uploadType = 'card', ...other } = props;
  const Com = UPLOAD_COMPS[uploadType];
  if (!Com) {
    throw new Error('uploadType is not an expected parameter');
  }
  return <Com {...other} />;
}

export default Upload;
