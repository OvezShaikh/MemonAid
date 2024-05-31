import * as Yup from "yup";
import serverAPI from "../config/serverAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const Initial_value = {
    email: "",
    password: "",
  };

  const formValidation = Yup.object().shape({
    email: Yup.string()
      .email("invalid email! please enter correct email")
      .required("email is required")
      .nullable(),
    password: Yup.string().required("password is required").nullable(),
  });

  const navigate = useNavigate();

  const loginData = async (data) => {
    try {
      const res = await serverAPI.post("/accounts/login/nt/", data);
      toast.success("Logged in Successfully ", {
        position: "top-center",
      });
      const userinfo = res.data.user_info;
      const info = JSON.stringify(userinfo);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_info", info);
      // navigate("/");
      window.location.href = "/Home";
    } catch (error) {
      toast.error("please enter valid credentials", {
        position: "top-center",
      });
    }
  };

  return {
    loginData,
    Initial_value,
    formValidation,
  };
};

export default useLogin;
