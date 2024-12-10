import { Overlay } from "@components/Common";
import { useRef } from "react";

import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import useGetQuery from "@/hooks/Queries/useGetQuery";
interface LibrariesFindPopupProps {
    closePopup: () => void;
    isbn13: string
}
const LibrariesFindPopup = ({ closePopup, isbn13 }: LibrariesFindPopupProps) => {
    const {data, isLoading} = useGetQuery("libSrchByBook", "libraries", `&isbn=${isbn13}&region=11`)
    const inSideRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(inSideRef, closePopup);

    console.log(data)

    return (
        <Overlay>
            {!isLoading && <div ref={inSideRef}>팝업</div>}
            
        </Overlay>
    );
};

export default LibrariesFindPopup;
