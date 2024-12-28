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
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={onCancel}
            okText="확인"
            cancelText="취소"
            getContainer={false}
            width={400}
        >
            {message}
        </Modal>
    );
};
export default ModalComponent;
