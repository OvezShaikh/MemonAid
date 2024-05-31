import { ErrorMessage, useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete, FormLabel, TextField, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { colors } from "../../../constants/theme";
import SvgIcon from "@mui/material/SvgIcon";

const useStyles = makeStyles({
  textField: {
    fontFamily: "ellipsis",

    "& .MuiInput-root": {
      fontFamily: "ellipsis",

      margin: "0px",
      fontSize: "1.2rem",
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
      fontFamily: "ellipsis",

      fontSize: "1.2rem",
    },
    "& .Mui-disabled": {
      fontFamily: "ellipsis",

      fontSize: "1.2rem !important",
    },
  },
  root: {
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      fontFamily: "ellipsis",

      padding: "15px 15px",
      fontSize: "1.2rem",
      // marginTop: "5px",
      //   "&:focus": {
      //     boxShadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);,
      //   borderColor: 'black',

      // },
    },

    "& .MuiOutlinedInput-notchedOutline": {
      fontFamily: "ellipsis",

      border: " 1px solid #e2e2e2",
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
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { textField, root } = useStyles();

  let textFieldConfig = {
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": {
        padding: "7px 10px",
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

  // const configTextfield = {
  //   // ...field,
  //   ...otherProps,
  //   name,
  //   variant: "outlined",
  // };

  // let textFieldConfig = {
  //   fullWidth: true,
  //   sx: {
  //     "& .MuiInputBase-root": {
  //       padding: "7px 10px",
  //     },
  //     ...otherProps.sx,
  //   },
  //   ...otherProps,
  // };

  // if (meta && meta.touched && meta.error) {
  //   configTextfield.error = true;
  //   configTextfield.helperText = meta.error;
  // }
  // const { setFieldValue, setTouched, touched } = useFormikContext();

  // const tooltipData = localStorage.getItem("tooltipData")
  //   ? JSON.parse(localStorage.getItem("tooltipData"))?.filter(
  //       (item) =>
  //         item?.field_name?.toLowerCase() ===
  //         configTextfield?.label?.toLowerCase()
  //     )
  //   : null;

  return (
    <>
      <Autocomplete
        {...textFieldConfig}
        value={value}
        sx={{
          ...sx,
          fontFamily: "ellipsis",
          width: "100%",
          "&.Mui-focused .MuiFormControl-root .MuiOutlinedInput-notchedOutline":
            {
              boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);
          `,
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
                  padding: "8px 8px 16px 8px",
                  color: colors.text.main,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  fontFamily: "satoshi",
                  fontStyle: "normal",
                  height: "22px",
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
