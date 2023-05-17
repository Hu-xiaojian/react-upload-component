import React, { Component } from 'react';
import Upload from '@/upload/original-upload';
import type { DragUploadProps } from '@/types/drag-upload';

const DragChildren = React.memo(({children, className = ''}) => {
  return children || (<div className={`upload-drag ${className}`}>

  </div>)
});

class DragUpload extends Component<DragUploadProps, any> {
  render(): React.ReactNode {
    const {
      children,
      className
    } = this.props;

    return <Upload><DragChildren className={className}>{children}</DragChildren></Upload>;
  }
}

export default DragUpload;
