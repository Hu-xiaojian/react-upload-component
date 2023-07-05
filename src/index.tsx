import React from 'react';
import BaseUpload from '@/upload/original-upload';
import CardUpload from '@/upload-wrapper/card-upload';
import ListUpload from '@/upload-wrapper/list-upload';
import DragUpload from '@/upload-wrapper/drag-upload';
import SelectUpload from '@/upload-wrapper/select-upload';
import type { OriginalUploadProps } from '@/types';

function Upload(props: OriginalUploadProps): React.ReactElement {
  return <BaseUpload { ...props }/>
}
Upload.Dragger = DragUpload;
Upload.Card = CardUpload;
Upload.List = ListUpload;
Upload.Selecter = SelectUpload;

export default Upload;
