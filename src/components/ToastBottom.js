import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const ToastBottom = (props) => {
  return (
    <>
      <Toast isOpen={props.toast.display}>
        <ToastHeader icon={props.toast.color}>{props.toast.info}</ToastHeader>
        <ToastBody>{props.toast.message}</ToastBody>
      </Toast>
    </>
  );
};

export default ToastBottom;
