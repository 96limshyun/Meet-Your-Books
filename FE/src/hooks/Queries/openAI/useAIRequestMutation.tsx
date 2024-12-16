import { useMutation } from "@tanstack/react-query";

import { openAI_API } from "@/services";

const fetchOpenAIRequest = async (message: string) => {
    const response = await openAI_API.post({ message });
    if (!response.ok) {
        throw new Error("ai 요청 실패");
    }
    const data = await response.json();
    return data;
};

const useAIRequestMutation = () => {
    return useMutation({
        mutationFn: (message: string) => fetchOpenAIRequest(message),
    });
};

export default useAIRequestMutation;
