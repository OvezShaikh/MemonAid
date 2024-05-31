import { useMutation } from "react-query";
import { toast } from "react-toastify";
import serverAPI from "../config/serverAPI";
import errorHandle from "../utils/errorHandle";

export function useDelete({ url, name, refetch }) {
  const deleteItem = (id) => {
    return serverAPI.delete(url + "/" + id);
  };
  return useMutation(deleteItem, {
    onSuccess: () => {
      toast.success(`${name} Deleted Successfully`);
      refetch && refetch();
    },
    onError: (error) => {
      errorHandle(error);
    },
  });
}
