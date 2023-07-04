import React from 'react';

export default class Base extends React.Component<any, any> {
  abort(file) {
    this.uploaderRef.abort(file);
  }
  startUpload() {
    this.uploaderRef.startUpload();
  }

  saveUploaderRef = ref => {
    if (ref && typeof ref.getInstance === 'function') {
      this.uploaderRef = ref.getInstance();
    } else {
      this.uploaderRef = ref;
    }
  };

  isUploading() {
    return this.uploaderRef.isUploading();
  }
}
