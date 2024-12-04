
export const fetchAPI = async (url: string, option: RequestInit) => {
    try{
        const response = await fetch(url, option)
        return response;
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fetch API error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}