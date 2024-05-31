import serverAPI from "../config/serverAPI";
import { useMutation } from "react-query";
import errorHandle from "../utils/errorHandle";

export function useCreateOrUpdate({
  url,
  method = "post",
  refetch,
  onSuccess,
}) {
  function sendData(data) {
    return serverAPI[method](url, data, {});
  }

  return useMutation(sendData, {
    onSuccess: (response, variables, context) => {
      onSuccess && onSuccess(response, variables, context);
      refetch && refetch();
    },
    onError: (data) => {
      errorHandle(data);
    },
  });
}
