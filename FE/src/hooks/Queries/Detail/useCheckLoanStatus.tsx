import { useMutation } from "@tanstack/react-query";

const BACK_END_API_URL = import.meta.env.VITE_BACK_END_API_URL;

const fetchCheckLoanStatus = async (libCode: string, isbn13: string) => {
  const url = `${BACK_END_API_URL}libraryOpenAPI?path=bookExist&query=${encodeURIComponent(`libCode=${libCode}&isbn13=${isbn13}`)}`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("대출 상태 확인 API 호출 실패");
  }

  const data = await response.json();
  return data;
};

const useCheckLoanStatus = (isbn13: string) => {
  return useMutation({
    mutationFn: (libCode: string) => fetchCheckLoanStatus(libCode, isbn13),
    onError: (error) => {
      console.error("대출 상태 확인 중 오류 발생:", error);
    }
  });
};

export default useCheckLoanStatus;
