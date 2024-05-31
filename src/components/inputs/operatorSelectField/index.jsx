import { ErrorMessage, useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete, FormLabel, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../constants/theme";

const useStyles = makeStyles({
  textField: {
    "& .MuiInput-root": {
      margin: "0px",
      fontSize: "0.9rem",
      border: `1px solid #E2E2E2`,
      background: "#fff",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
    },

    "& input::placeholder": {
      fontSize: "0.9rem",
    },
  },
  root: {
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      padding: "3px",
      marginTop: "7px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid #e2e2e2`,
    },
  },
});

const OperatorSelectField = ({
  name,
  value,
  sx,
  disable,
  onChange,
  info,
  placeholder,
  onInputChange,
  noLabel,
  sideBarSelectfield,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { textField, root } = useStyles();
  const configTextfield = {
    ...field,
    ...otherProps,
    name,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  const { setFieldValue, setTouched, touched } = useFormikContext();

  let options = [
    { value: "=", label: "Equals" },
    { value: ">", label: "Greater Than" },
    { value: "<", label: "Less Than" },
    { value: ">=", label: "Greater Than Equal To" },
    { value: "<=", label: "Less Than Equal To" },
  ];

  return (
    <div>
      {!noLabel && (
        <FormLabel
          className="text-capitalize font-medium d-flex align-items-center "
          sx={{
            color: colors.text.main,
            fontSize: "1rem",
            fontFamily: "satoshi",
            height: "22px",
            fontWeight: 700,
          }}
        >
          {configTextfield?.label}{" "}
        </FormLabel>
      )}
      <Autocomplete
        {...configTextfield}
        value={value}
        sx={{
          ...sx,
          width: "100%",
          "& .MuiFormControl-root .MuiInputBase-root ": {
            height: 50,
            // width: 300
          },
        }}
        options={options}
        disabled={disable}
        className={root}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(_, value, reason) =>
          onChange ? onChange(value, reason) : setFieldValue(name, value)
        }
        onBlur={() => setTouched({ ...touched, [name]: true })}
        defaultValue={options[0]}
        renderInput={(props) => (
          <TextField
            className={textField}
            variant="outlined"
            {...props}
            onChange={(e) => {
              props?.onChange && props?.onChange(e);
              onInputChange && onInputChange(e);
            }}
            placeholder={placeholder}
          />
        )}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "0.7rem" }}>
            {typeof msg === "object" ? Object?.values(msg)[0] : msg}
          </div>
        )}
      />
    </div>
  );
};

export default OperatorSelectField;
