import { Close } from "@carbon/icons-react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { colors } from "../../../constants/theme";
import { cloneElement, useEffect, useState } from "react";

export const Dialog = ({
  button,
  title,
  children,
  buttonOnClick,
  maxWidth = "md",
}) => {
  const [container, setContainer] = useState(null);
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  useEffect(() => {
    setContainer(document.getElementById("main"));
  }, []);

  return (
    <>
      {cloneElement(button, {
        onClick: () => {
          onOpen();
          buttonOnClick && buttonOnClick();
        },
      })}

      <MuiDialog
        fullWidth
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
        container={container}
      >
        <div className="p-5">
          <div
            style={{ border: `1px solid ${colors.secondary.dark}60` }}
            className="relative"
          >
            <DialogTitle
              sx={{
                color: "#242424",
              }}
              className="dailog-heading xl:text-base 2xl:text-lg"
            >
              <span>{title}</span>
              <IconButton onClick={onClose}>
                <Close size={24} fill={colors.text.dark} />
              </IconButton>
            </DialogTitle>
            <DialogContent className="overflow-y-auto h-max-[70vh] my-5 mr-5">
              {typeof children === "function"
                ? children({ onClose })
                : children}
            </DialogContent>
          </div>
        </div>
      </MuiDialog>
    </>
  );
};
