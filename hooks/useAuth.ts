import axios from "axios";
import { useContext } from "react";

import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
  const authCtx = useContext(AuthenticationContext);

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    authCtx.setAuthState({
      ...authCtx,
      loading: true,
    });
    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      authCtx.setAuthState({
        ...authCtx,
        data: response.data,
        loading: false,
      });
    } catch (error: any) {
      authCtx.setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async () => {};

  return {
    signin,
    signup,
  };
};

export default useAuth;
