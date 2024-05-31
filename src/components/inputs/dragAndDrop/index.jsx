import { Upload } from "@carbon/icons-react";
import { FiUpload } from "react-icons/fi";
import images from "../../../constants/images";

import {
  Button,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
// import { useFormikContext } from "formik";
import { useState } from "react";
import { colors } from "../../../constants/theme";
import { Label } from "@mui/icons-material";
import ReactDropZone from "react-dropzone";
import { useFormikContext } from "formik";
import "./dragAndDrop.css";

const DropZone = ({
  name,
  label,
  onChange,
  acceptedFiles,
  isLoading,
  ...otherProps
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [errors, setError] = useState([]);

  return (
    <ReactDropZone
      minSize={0}
      accept={{
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
      }}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if (!acceptedFiles.length) {
          let err = [];
          rejectedFiles.forEach((item) => {
            err = [...err, ...item.errors.map((error) => error.message)];
          });
          setError(err);
        }
        if (otherProps.multiple) {
          setFieldValue(name, acceptedFiles);
        } else {
          setFieldValue(name, acceptedFiles[0]);
        }
        if (acceptedFiles.length) {
          setFieldValue(acceptedFiles)
          onChange && onChange(acceptedFiles, rejectedFiles);
          setError([]);
        }
      }}
      {...otherProps}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div className="flex flex-col items-center justify-center">
          {label && <Label className="text-sm ml-3" text={label} />}
          <div
            {...getRootProps()}
            className="drop-zone"
            style={{
              backgroundImage: isDragActive ? "images.DashedImageUpload" : "images.DashedImageUpload",
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  size={20}
                  variant="indeterminate"
                  className="me-2"
                />

                <Typography color={colors.secondary.dark}>
                  Uploading...
                </Typography>
              </>
            ) : (
              <>
                {" "}
                <input {...getInputProps()} name="campaign_image" />
                {/* {Array.isArray(values[name]) || values[name] ? (
                    <Typography color="primary">
                      {Array.isArray(values[name]) ? values[name].length : 1} file
                      selected
                    </Typography>
                  ) : isDragActive ? (
                    <Typography color="secondary">Drop here...</Typography>
                  ) : (
                    <> */}
                <Button
                  color="warning"
                  sx={{
                    color: "#3366CC",
                    textDecorationLine: 'underline',
                    fontFamily: 'satoshi',
                    fontWeight: 500
                  }}
                  
                  startIcon={<img src={images.UploadIcon} />}
                  className="normal-case text-[20px] max-desktop:text-[15px] upload-an-img"
                >
                  Upload an Image
                </Button>{" "}
                <p className="max-w-[369px] font-[satoshi] text-center text-[20px] font-medium max-desktop:text-[15px] max-desktop:max-w-[276px] less-than-5" style={{ color: "rgba(0, 0, 0, 0.40)", }}>
                  &nbsp; The Image must be less than 5 MB. Recommended size is
                  850x550. Minimum height is 550 and minimum width is 850.
                  {/* </>
                )} */}
                </p>
              </>
            )}
          </div>
          <br />
          {errors[0] && (
            <FormHelperText className="text-danger text-center">
              {errors[0]}
            </FormHelperText>
          )}
        </div>
      )}
    </ReactDropZone >
  );
};

export default DropZone;
