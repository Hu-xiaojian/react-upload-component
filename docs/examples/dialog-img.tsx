import React from 'react';
import { Dialog } from "@alifd/next";

const DialogImg = ({ src, visible, onClose }) => {
  return (<Dialog
    visible={visible}
    isFullScreen
    onOk={onClose}
    onCancel={onClose}
    onClose={onClose}
  >
    <img src={src} alt=""/>
  </Dialog>);
};

export default DialogImg;
