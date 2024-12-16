import { Modal } from "antd";

interface ModalComponentProps {
    isModalOpen: boolean;
    callBack: () => void;
    onCancel: () => void;
    message: string;
}

export const ModalComponent = ({
    isModalOpen,
    callBack,
    onCancel,
    message,
}: ModalComponentProps) => {
    const handleOk = () => {
        callBack();
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={onCancel}>
                {message}
            </Modal>
        </div>
    );
};

export default ModalComponent;
