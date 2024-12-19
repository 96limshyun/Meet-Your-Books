import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";
const BACK_END_API_URL = import.meta.env.VITE_BACK_END_API_URL;

const fetchCheckLoanStatus = async (libCode: string, isbn13: string) => {
  const url = `${BACK_END_API_URL}libraryOpenAPI?path=bookExist&query=${encodeURIComponent(`libCode=${libCode}&isbn13=${isbn13}`)}`
  const response = await fetch(url);

  if (!response.ok) {
    throw new HTTPError(response.status);
  }

  const data = await response.json();
  return data;
};

const useCheckLoanStatus = (isbn13: string) => {
  return useMutation({
    mutationFn: (libCode: string) => fetchCheckLoanStatus(libCode, isbn13),
    throwOnError: true,
  });
};

export default useCheckLoanStatus;
