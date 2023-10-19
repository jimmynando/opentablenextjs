"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import * as constants from "./constants";
import AuthForm from "./AuthForm";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { error, loading, data, setAuthState } = useContext(
    AuthenticationContext
  );
  const [open, setOpen] = useState(false);
  const { signin, signup } = useAuth();
  const [inputs, setInputs] = useState(initialState);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.city &&
        inputs.phone &&
        inputs.email &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInputs(initialState);
    setAuthState({ error: null, data: null, loading: false });
    setOpen(false);
  };

  const renderContent = (
    signinContent: string | React.ReactNode,
    signupContent: string | React.ReactNode
  ) => {
    return isSignIn ? signinContent : signupContent;
  };

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          constants.SIGN_IN_BUTTON_STYLE,
          ""
        )}  border p-1 px-4 rounded mr-3`}
      >
        {renderContent(
          constants.SIGN_IN_BUTTON_TEXT,
          constants.SIGN_UP_BUTTON_TEXT
        )}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[500px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[500px]">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent(
                    constants.SIGN_IN_TITLE,
                    constants.SIGN_UP_TITLE
                  )}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    constants.SIGN_IN_TEXT,
                    constants.SIGN_UP_TEXT
                  )}
                </h2>
                <AuthForm
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  onClick={handleClick}
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                >
                  {renderContent(
                    constants.SIGN_IN_TITLE,
                    constants.SIGN_UP_TITLE
                  )}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
