import { toast } from "react-toastify";

const errorHandle = (error) => {
  if (error?.response) {
    if (error?.response?.status === 401) {
      toast.error(`401 Unauthorized User`);
      localStorage.removeItem("token");
      localStorage.removeItem("userObj");
      window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);
    } else if (error?.response?.status === 500) {
      const msg =
        typeof error?.response?.data.msg === "object"
          ? error?.response?.data.msg[0]
          : error?.response?.data.msg;
      toast.error(<div dangerouslySetInnerHTML={{ __html: msg }} />);
    } else if (error?.response?.data.msg) {
      toast.error(error?.response?.data.msg);
    }
  } else if (error.message) {
    toast.error(error.message || "Client Error");
  }
};
export default errorHandle;
