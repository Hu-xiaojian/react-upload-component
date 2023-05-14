import React from 'react';
import BaseUpload from '@/upload/original-upload';
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
  const { uploadType, ...other } = props;
  const Com = UPLOAD_COMPS[uploadType];
  if (!Com) {
    return <BaseUpload { ...other }/>
  }
  return <Com {...other} />;
}

export default Upload;
