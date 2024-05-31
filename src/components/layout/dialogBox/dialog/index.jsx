import { Close } from "@carbon/icons-react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import { colors } from "../../../../constants/theme";

export const Dialog = ({
  button,
  title,
  children,
  buttonOnClick,
  maxWidth = "md",
  onClose: onCloseCall,
}) => {
  const [container, setContainer] = useState(null);
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    button?.props?.onClick && button?.props?.onClick();
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    onCloseCall && onCloseCall();
  };
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
        <div className="p-0">
          <div className="relative">
            <DialogTitle
              sx={{
                color: "#242424",
              }}
              className="dailog-heading d-flex justify-content-between pt-3 pb-1 border-bottom"
            >
              <span className="text-uppercase">{title}</span>
              <IconButton onClick={onClose}>
                <Close size={24} fill={colors.primary.dark} />
              </IconButton>
            </DialogTitle>
            <DialogContent className="overflow-y-auto  mt-5 ps-0 pe-0">
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
