import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import React from "react";
import { colors } from "../../../constants/theme";
import { red } from "@mui/material/colors";

const RadioGroup = ({ label, options, onChange, sx, ...otherProps }) => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "col",
        alignItems: "start",
        "& .MuiFormLabel-root.Mui-focused": {
          color: colors.text.main,
        },
      }}
    >
      <FormLabel
        className="text-capitalize font-medium d-flex a mb-1 me-4"
        sx={{
          color: colors.text.main,
          fontSize: "1rem !important",
          fontWeight: 700,
          fontFamily: "satoshi",
          height: "22px",
          ...sx,
        }}
        id={`demo-radio-buttons-group-label-${label}`}
      >
        {label}
      </FormLabel>
      <MuiRadioGroup
        {...otherProps}
        aria-labelledby={`demo-radio-buttons-group-label-${label}`}
        name={`radio-buttons-group-${label}`}
        onChange={(e, value) => {
          onChange && onChange(value);
        }}
      >
        {options?.map((item) => (
          <FormControlLabel
            className="text-sm md:text-base d-flex "
            id={Math.random() < 0.5 ? "select" : undefined}
            {...otherProps?.formControlProps}
            key={item?.value?.toString()}
            value={item.value}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "0.9rem",
                fontFamily: "satoshi",
                fontWeight: 500,
                // padding: "9px",
              },
            }}
            control={
              <Radio
                value={item.value}
                color="warning"
                sx={{
                  // color: red[500],
                  "&.Mui-checked": {
                    color: red[500],
                  },
                }}
              />
            }
            label={item.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
