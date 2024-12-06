import { useState } from "react";

import { ViewType } from "@/types/booksType";
import useBookLogic from "@/hooks/Book/useBookLogic";

const BookDisplay = () => {
    const [viewMode, setViewMode] = useState<ViewType>("grid");
    const {query} = useBookLogic()
    return <div>BookDisplay</div>;
};

export default BookDisplay;
