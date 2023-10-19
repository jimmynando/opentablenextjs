import axios from "axios";
import { useContext } from "react";

import { AuthenticationContext } from "../app/context/AuthContext";

interface User {
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

const useAuth = () => {
  const authCtx = useContext(AuthenticationContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
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

      handleClose();
    } catch (error: any) {
      authCtx.setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async (data: User, handleClose: () => void) => {
    authCtx.setAuthState({
      ...authCtx,
      loading: true,
    });

    try {
      const response = await axios.post("/api/auth/signup", { ...data });

      authCtx.setAuthState({
        error: null,
        data: response.data,
        loading: false,
      });

      handleClose();
    } catch (error: any) {
      authCtx.setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  return {
    signin,
    signup,
  };
};

export default useAuth;
