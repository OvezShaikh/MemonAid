import { ErrorMessage, useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete, FormLabel, TextField, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../constants/theme";

const useStyles = makeStyles({
  textField: {
    // minHeight: '5px',
    "& .MuiInput-root": {
      margin: "0px",
      height: "10px",
      fontSize: "0.6rem",

      border: " 1px solid #E2E2E2",
      background: "#fff",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
    },

    "& input::placeholder": {
      fontSize: "1rem",
    },
    "& .Mui-disabled": {
      fontSize: "1rem !important",
    },
  },
  root: {
    "& .MuiInputBase-root.MuiOutlinedInput-root ": {
      // padding: "15px 15px",
      fontSize: "1rem",

      // marginTop: "5px",
      // "&:focus": {
      //     boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.15)',
      //     borderColor: 'black',

      // },
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root .MuiAutocomplete-input": {
      height: "15px",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: " 1px solid #e2e2e2",
      // height: '10px'
    },
  },
});

const SelectField = ({
  name,
  options,
  value,
  sx,
  disable,
  onChange,
  required = false,
  info,
  placeholder,
  onInputChange,
  noLabel,
  sideBarSelectfield,
  label,
  color,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { textField, root } = useStyles();

  let textFieldConfig = {
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": {
        padding: "0px 0px",
      },
      ...otherProps.sx,
    },
    ...otherProps,
  };
  let setFieldTouched = (field, isTouched, shouldValidate = true) => {};
  let setFieldValue = (name, value, shouldValidate = true) => {};

  if (name) {
    //eslint-disable-next-line
    const [field, meta] = useField(name || "");
    //eslint-disable-next-line
    const ctx = useFormikContext();

    setFieldValue = ctx.setFieldValue;
    setFieldTouched = ctx.setFieldTouched;
    textFieldConfig = {
      ...field,
      ...textFieldConfig,
    };
    if (meta && meta.touched && meta.error) {
      textFieldConfig.error = true;
      textFieldConfig.helperText = meta.error;
    }
  }
  const onChangeInner = (e, value, option) => {
    if (name && setFieldValue) {
      setFieldValue(name, value);
      setFieldTouched(name, true, true);
    }
    if (onChange) {
      return onChange(e, value, option);
    }
  };

  const { values } = useFormikContext();

  return (
    <>
      <Autocomplete
        {...textFieldConfig}
        value={value}
        sx={{
          ...sx,
          width: "100%",
          "&.Mui-focused .MuiFormControl-root .MuiOutlinedInput-notchedOutline":
            {
              boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15)`,
              borderColor: "black",
            },
        }}
        options={options ? options : []}
        disabled={disable}
        // getOptionLabel={(option) => option?.location}
        className={root}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(_, value, reason) => {
          onChange ? onChange(value, reason) : setFieldValue(name, value);
        }}
        onBlur={() => setFieldTouched(name, true)}
        renderInput={(props) => (
          <>
            {label && (
              <FormLabel
                className="text-capitalize font-medium d-flex align-items-center"
                sx={{
                  padding: "4px 8px 4px 8px",
                  color: color || colors.text.main, // Use color prop if provided, else fallback to default color
                  fontSize: "1rem",
                  fontWeight: 700,
                  fontFamily: "satoshi",
                  fontStyle: "normal",
                }}
              >
                {label}
                {required ? <span className="text-red-600">*</span> : ""}
              </FormLabel>
            )}

            <TextField
              className={textField}
              variant="outlined"
              {...props}
              onChange={onChangeInner}
              disabled={disable}
              // onChange={(e) => {
              //   props?.onChange && props?.onChange(e);
              //   onInputChange && onInputChange(e);
              // }}
              placeholder={placeholder}
            />
          </>
        )}
      />

      <ErrorMessage
        name={name}
        render={(msg) => (
          <div
            style={{
              color: "red",
              fontSize: "1rem",
              paddingLeft: "5px",
              fontFamily: "satoshi",
            }}
          >
            {typeof msg === "object" ? Object?.values(msg)[0] : msg}
          </div>
        )}
      />
    </>
  );
};

export default SelectField;
