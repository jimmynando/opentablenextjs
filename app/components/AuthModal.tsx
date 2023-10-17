"use client";

import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import * as constants from "./constants";
import AuthForm from "./AuthForm";

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

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (
    signinContent: string | React.ReactNode,
    signupContent: string | React.ReactNode
  ) => {
    return isSignIn ? signinContent : signupContent;
  };

  const handleSubmit = () => {}

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
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
          <div className="p-2 h-[500px]">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-small">
                {renderContent(
                  constants.SIGN_IN_TITLE,
                  constants.SIGN_UP_TITLE
                )}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(constants.SIGN_IN_TEXT, constants.SIGN_UP_TEXT)}
              </h2>
              <AuthForm inputs={inputs} handleChangeInput={handleChangeInput} isSignIn={isSignIn} />
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
                {renderContent(
                  constants.SIGN_IN_TITLE,
                  constants.SIGN_UP_TITLE
                )}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
