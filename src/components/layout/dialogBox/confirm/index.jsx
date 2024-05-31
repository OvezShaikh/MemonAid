import { Close } from "@carbon/icons-react";
import {
  Box,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { colors } from "../../../../constants/theme";
import PrimaryButton from "../../../inputs/PrimaryButton";
import SecondaryButton from "../../../inputs/secondaryButton";

export const Confirm = ({
  button,
  title,
  children,
  isLoading,
  submitHandler,
  onClose: onCloseCall,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    button?.props?.onClick && button?.props?.onClick();
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    onCloseCall && onCloseCall();
  };

  return (
    <>
      {cloneElement(button, { onClick: onOpen })}
      <MuiDialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
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
            <DialogContent className="overflow-y-auto mt-3 px-4">
              {typeof children === "function"
                ? children({ onClose })
                : children}

              <Grid xs={12} item className="border-top mt-4">
                <Box className="d-flex justify-content-end mt-2">
                  <SecondaryButton
                    className="px-4 text-capitalize me-4"
                    sx={{ border: `1px solid ${colors.primary.dark}` }}
                    color="black"
                    onClick={onClose}
                  >
                    Close
                  </SecondaryButton>

                  {submitHandler && (
                    <PrimaryButton
                      isLoading={isLoading}
                      size="small"
                      className="ml-4 text-capitalize "
                      onClick={() => submitHandler(onClose)}
                    >
                      Confirm
                    </PrimaryButton>
                  )}
                </Box>
              </Grid>
            </DialogContent>
          </div>
        </div>
      </MuiDialog>
    </>
  );
};
