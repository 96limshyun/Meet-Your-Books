import { useEffect, useState } from "react";

import useBookLogic from "@/hooks/Book/useBookLogic";
import { ViewType } from "@/types/booksType";

const BookDisplay = () => {
    const [viewMode, setViewMode] = useState<ViewType>("grid");
    // const {data, isSuccess} = useBookLogic()
    useEffect(() => {
        const test = async () => {
            const response = await fetch(
                "http://data4library.kr/api/srchBooks?authKey=bc1a3c82651b5c3e65599b87bb74151e1cc1be37d1b6514a1287c7f42fd770bf&format=json&pageNo=2"
            );
            const data = await response.json()
            console.log(data)
        }

        test()
    }, []);
    return <div>BookDisplay</div>;
};

export default BookDisplay;
