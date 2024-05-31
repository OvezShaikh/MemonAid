import { ErrorMessage, useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { Autocomplete, FormLabel, TextField, Checkbox } from "@mui/material";
import { makeStyles } from '@mui/styles';

import { colors } from "../../../constants/theme";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDebounce, useGetAll } from "../../../Hooks";
const generateUniqueId = require("generate-unique-id");

const useStyles = makeStyles({
  textField: {
    "& .MuiInput-root": {
      margin: "0px",
      fontSize: "0.9rem",
      background: "#fff",
      color: colors.primary.dark,
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
      padding: "3px 10px",
      marginTop: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `1px solid #e2e2e2`,
    },
    "& .MuiChip-root": {
      display: "none",
    },
  },
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultipleSelectField = ({
  name,
  options,
  value,
  sx,
  disable,
  onChange,
  placeholder,
  onInputChange,
  noLabel,
  sideBarSelectfield,
  urlParams,
  popperWidth,
  url,
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

  const [searchText, setsearchText] = useState("");

  const query = useDebounce(searchText || "", 1000);

  const { data: dynamicOptions, refetch } = useGetAll({
    key: url,
    enabled: Boolean(url && !url?.includes("user")),
    params: urlParams ? { ...urlParams, search: query } : { search: query },
    select: (data) => {
      if (url?.includes("user")) {
        let NewData = data?.data?.data?.map((item) => {
          return {
            ...item,
            id: parseInt(
              generateUniqueId({
                length: 5,
                useLetters: false,
              })
            ),
          };
        });

        return NewData;
      } else if (url?.includes("policy")) {
        return data?.data?.data?.online_voice_routing_profile;
      } else {
        return data?.data?.data?.rows;
      }
    },
  });

  useEffect(() => {
    if (query?.length >= 3) {
      refetch();
    }
    // eslint-disable-next-line
  }, [query]);

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  const { setFieldValue, setTouched, touched } = useFormikContext();

  return (
    <>
      {!noLabel && (
        <FormLabel
          className="text-capitalize font-medium d-flex align-items-center"
          sx={{ color: colors.text.main, fontSize: "0.8rem", height: "22px" }}
        >
          {configTextfield?.label}
        </FormLabel>
      )}
      <Autocomplete
        renderOption={(props, option, { selected }) => (
          <li key={props?.id} style={{ paddingRight: "20px" }} {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              key={props?.id}
            />
            {option?.range_from
              ? `${option?.range_from} - ${option?.range_to}`
              : props?.key || ""}
          </li>
        )}
        multiple
        {...configTextfield}
        value={value}
        sx={{ ...sx, width: "100%" }}
        options={dynamicOptions ? dynamicOptions : options ? options : []}
        disabled={disable}
        className={root}
        isOptionEqualToValue={(option, value) =>
          typeof option === "object"
            ? option?.mail
              ? option?.mail === value?.mail
              : option?.id === value?.id
            : option === value
        }
        onChange={(_, value, reason) =>
          onChange ? onChange(value, reason) : setFieldValue(name, value)
        }
        onBlur={() => setTouched({ ...touched, [name]: true })}
        renderInput={(props) => (
          <TextField
            className={textField}
            variant="outlined"
            {...props}
            onChange={(e) => {
              props?.onChange && props?.onChange(e);
              onInputChange && onInputChange(e);
              url?.includes("user") && setsearchText(e.target.value);
            }}
            placeholder={placeholder}
          />
        )}
        renderTags={(values) => `${values?.length} Selected`}
        disableCloseOnSelect
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "0.7rem" }}>
            {typeof msg === "object" ? Object?.values(msg)[0] : msg}
          </div>
        )}
      />
    </>
  );
};

export default MultipleSelectField;
