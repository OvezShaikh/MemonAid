import React, { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { SET_LOGIN, UNSET_LOGIN } from "../ActionTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import setAuthToken from "../../utils/setAuthToken";
import { useGetAll } from "../../hooks";

const AuthState = ({ children }) => {
  const InitialState = {
    isLogin: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    user: localStorage.getItem("userObj")
      ? JSON.parse(localStorage.getItem("userObj"))
      : null,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(AuthReducer, InitialState);

  const { refetch } = useGetAll({
    key: "/admin/tooltip",
    enabled: false,
    onSuccess: (data) => {
      localStorage.setItem("tooltipData", JSON.stringify(data?.rows));
    },
  });

  const Login = (data) => {
    setAuthToken(data.access_token);
    localStorage.setItem("userObj", JSON.stringify(data?.userObj));
    localStorage.setItem("token", data?.access_token);
    dispatch({ type: SET_LOGIN, payload: data?.userObj });
    refetch();
    navigate("/all-numbers");
    return true;
  };

  // const Logout = () => {
  //   setAuthToken(null);
  //   dispatch({ type: UNSET_LOGIN });
  //   navigate("/sign-in");
  //   location.pathname = "/";
  //   location.search = "";
  //   queryClient.removeQueries();
  // };

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) queryClient.removeQueries();
    //eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider
      value={{
        Login,
        // Logout,
        isLogin: state.isLogin,
        user: state?.user,
        token: state?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
