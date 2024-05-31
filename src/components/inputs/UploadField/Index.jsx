import React, { useRef } from "react";
import { FormLabel, InputBase } from "@mui/material";
import { colors } from "../../../constants/theme";
import { RxCross2 } from "react-icons/rx";
import { useField, ErrorMessage } from "formik";
import images from "../../../constants/images";

const UploadField = ({
  variant,
  multiple = false,
  label = "",
  name,
  placeholder,
  onChange,
  required,
  ...otherProps
}) => {
  const ref = useRef(null);
  const [field, meta, handlers] = useField(name);

  const handleFileChange = (event) => {
    const file = multiple ? event.target.files : event.target.files[0];

    if (file) {
      handlers.setValue(file);
      handlers.setTouched(true);
    }
  };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: variant ? variant : "outlined",
  };

  return (
    <div className="">
      {label && (
        <FormLabel
          className="text-capitalize font-medium d-flex align-items-center"
          sx={{
            padding: "4px 8px 12px 8px",
            color: colors.text.main,
            fontSize: "1.2rem",
            fontWeight: 700,
            fontFamily: "satoshi",
            fontStyle: "normal",
            height: "32px",
          }}
        >
          {label}
          {required ? <span className="text-red-600">*</span> : ""}
        </FormLabel>
      )}

      <div className="flex w-full desktop:h-[64px] max-desktop:h-[64px] max-tablet:h-[48px] Upload_field">
        <InputBase
          multiple={multiple}
          value={field.value ? field.value.name : ""}
          placeholder={placeholder}
          label={label}
          sx={{
            "& .MuiInputBase-input": {
              padding: "10px",
              fontSize: "1rem",
            },
          }}
          fullWidth
          inputProps={{
            readOnly: true,
            placeholder: placeholder,
            value: field.value ? field.value.name : "",
          }}
          {...configTextfield}
          disabled
        />
        <>
          <input
            type="file"
            multiple={multiple}
            ref={ref}
            style={{ display: "none" }}
            id={`file - input - ${name}`} // Unique ID for each input
            onChange={handleFileChange}
          />

          <label
            htmlFor={`file - input - ${name}`} // Matching ID for the corresponding input
            className="flex justify-center gap-2 items-center"
          >
            {field.value ? (
              <RxCross2
                size={25}
                color="gray"
                onClick={() => {
                  handlers.setValue();
                }}
              />
            ) : (
              ""
            )}
            {/* You may want to add onClick for focusing on the input */}
            <img
              width={64}
              height={64}
              className="flex justify-stretch ml-1"
              src={images.UploadFile}
              alt=""
              onClick={() => ref?.current?.focus()}
            />
          </label>
        </>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div
            style={{
              fontFamily: "satoshi",
              color: "red",
              fontSize: "1rem",
              paddingLeft: "5px",
            }}
          >
            {msg}
          </div>
        )}
      />
    </div>
  );
};

export default UploadField;
