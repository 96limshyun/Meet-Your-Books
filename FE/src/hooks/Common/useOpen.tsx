import { useState } from "react";

const useOpen = (status:boolean = false) => {
    const [isOpen, setOpen] = useState(status);

    const toggleOpen = () => setOpen((prev) => !prev);

    const handleUseOpenClick = (status: boolean) => setOpen(status)
    return {
        isOpen,
        setOpen,
        toggleOpen,
        handleUseOpenClick
    };
};

export default useOpen;
