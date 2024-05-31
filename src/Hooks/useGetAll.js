import { useQuery } from "react-query";
import serverAPI from "../config/serverAPI";
import setAuthToken from "../utils/setAuthToken";
import errorHandle from "../utils/errorHandle";

function getData(url, params) {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  return serverAPI.get(url, {
    params: params ? params : {},
  });
}

export function useGetAll(options) {
  let key = options?.params
    ? [options.key, JSON.stringify(options?.params)]
    : options?.key;

  return useQuery(key, () => getData(options.key, options?.params), {
    retry: false,
    select: (data) => data?.data,
    onError: (err) => errorHandle(err),

    ...options,
  });
}
