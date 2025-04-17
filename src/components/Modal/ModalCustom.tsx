import React from "react";
import { Modal, ModalProps } from "antd";

interface ModalCustomProps extends ModalProps {
  title:string;
  isModalOpen: boolean;
  handleOk?: (data?: unknown) => void; 
  handleCancel: () => void;
  children?: React.ReactNode;
}
const ModalCustom = ({
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  ...rest
}: ModalCustomProps) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        {...rest}
      >
        <div className="py-4">
        {children}
        </div>
      </Modal>
    </>
  );
};

export default ModalCustom;
