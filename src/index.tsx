import React from 'react';
import BaseUpload from '@/upload/original-upload';
import CardUpload from '@/upload-wrapper/card-upload';
import ListUpload from '@/upload-wrapper/list-upload';
import DragUpload from '@/upload-wrapper/drag-upload';
import type { OriginalUpload } from '@/types';

function Upload(props: OriginalUpload) {
  return <BaseUpload { ...props }/>
}
Upload.Dragger = DragUpload;
Upload.Card = CardUpload;
Upload.List = ListUpload;

export default Upload;
