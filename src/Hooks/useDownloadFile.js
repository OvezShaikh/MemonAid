import { useGetAll } from "./useGetAll";
import errorHandle from "../utils/errorHandle";

export const useDownloadFile = (path, params, onSuccess) => {
  return useGetAll({
    key: path,
    params: params,
    select: (data) => data?.data,
    enabled: false,
    onSuccess: async (data) => {
      let a = document.createElement("a");

      a.href = `${process.env.REACT_APP_API_URL}${data?.data?.slice(8)}`;

      a.target = "_blank";

      a.download = data?.data.split("/")[data?.data.split("/")?.length - 1];
      
      a.click();
      onSuccess && onSuccess();
    },
    onError(err) {
      errorHandle(err);
    },
  });
};


