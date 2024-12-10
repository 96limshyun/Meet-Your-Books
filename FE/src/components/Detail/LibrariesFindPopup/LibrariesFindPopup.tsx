import { Overlay } from "@components/Common";
import { useRef } from "react";

import useOnClickOutside from "@/hooks/Common/useOnClickOutside";

interface LibrariesFindPopupProps {
    closePopup: () => void;
}
const LibrariesFindPopup = ({ closePopup }: LibrariesFindPopupProps) => {
    const inSideRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(inSideRef, closePopup);
    return (
        <Overlay>
            <div ref={inSideRef}>팝업</div>
        </Overlay>
    );
};

export default LibrariesFindPopup;
