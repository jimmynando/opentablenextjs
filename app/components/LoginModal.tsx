"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function LoginModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignIn ? signinContent : signupContent;
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          "bg-blue-400 text-white",
          ""
        )}  border p-1 px-4 rounded mr-3`}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-small">
                {renderContent("Sign in", "Create Account")}
              </p>
            </div>
            <div className="w-100 m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(
                  "Log Into Your Account",
                  "Create Your OpenTable Account"
                )}
              </h2>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
