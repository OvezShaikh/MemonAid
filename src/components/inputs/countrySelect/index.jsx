import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import ReactFlagsSelect from "react-flags-select";
import { colors } from "../../../constants/theme";
import { FormLabel } from "@mui/material";

const CountrySelect = ({
  name,
  options,
  value,
  size,
  sx,
  disable,
  onChange,
  info,
  required,
  label,
  placeholder,
  countriesList,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    name,
    variant: "outlined",
  };

  const { setFieldValue, values } = useFormikContext();

  return (
    <>
      <FormLabel
        className="text-capitalize  d-flex mb-1 ml-2 align-items-center"
        sx={{
          color: "#383A42",
          fontSize: size || "1.2rem",
          fontWeight: 700,
          ...sx,
        }}
      >
        {label}
        {required ? <span className="text-red-600">*</span> : ""}
      </FormLabel>
      <ReactFlagsSelect
        selected={field.value}
        onSelect={(value) => {
          setFieldValue(name, value);
          onChange && onChange(value);
        }}
        searchable
        searchPlaceholder="Search countries"
        id="react-flag-select"
        style={{ border: "1px solid red" }}
        {...configTextfield}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "0.7rem" }}>{msg}</div>
        )}
      />
    </>
  );
};

export default CountrySelect;
