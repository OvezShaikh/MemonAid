import { Button, FormHelperText, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Label from "../Label/Label";


const DropZone = ({ name, label, onChange, initialPreview, ...otherProps }) => {
  const { setFieldValue, values } = useFormikContext();
  const [errors, setError] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);


  return (
    <Dropzone
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
        onChange && onChange(acceptedFiles, rejectedFiles);
        setError([]);
      }}
      {...otherProps}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <>
          {label && <Label className="text-sm ml-3" text={label} />}
          <div
            {...getRootProps()}
            className="drop-zone mt-2"
            style={{
              background: isDragActive ? "#ECEFF1" : "#F7FAFF",
              border: isDragActive ? "2px dashed rgba(51, 102, 204, 1)" : "2px dashed rgba(51, 102, 204, 1)",
              borderRadius: "8px",
              // width: "350px",
              // height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : Array.isArray(values[name]) || values[name] ? (
              <Typography color="beige">
                {Array.isArray(values[name]) ? values[name].length : 1} file
                selected
              </Typography>
            ) : isDragActive ? (
              <Typography color="beige">Drop here...</Typography>
            ) : (
              <>
                <Button className="upload-img-text-button" startIcon={<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.5 11.5143V16.7643C18.5 17.1621 18.342 17.5436 18.0607 17.8249C17.7794 18.1062 17.3978 18.2643 17 18.2643H2C1.60218 18.2643 1.22064 18.1062 0.93934 17.8249C0.658035 17.5436 0.5 17.1621 0.5 16.7643V11.5143C0.5 11.3153 0.579018 11.1246 0.71967 10.9839C0.860322 10.8433 1.05109 10.7643 1.25 10.7643C1.44891 10.7643 1.63968 10.8433 1.78033 10.9839C1.92098 11.1246 2 11.3153 2 11.5143V16.7643H17V11.5143C17 11.3153 17.079 11.1246 17.2197 10.9839C17.3603 10.8433 17.5511 10.7643 17.75 10.7643C17.9489 10.7643 18.1397 10.8433 18.2803 10.9839C18.421 11.1246 18.5 11.3153 18.5 11.5143ZM5.75 5.51426H8.75V11.5143C8.75 11.7132 8.82902 11.9039 8.96967 12.0446C9.11032 12.1852 9.30109 12.2643 9.5 12.2643C9.69891 12.2643 9.88968 12.1852 10.0303 12.0446C10.171 11.9039 10.25 11.7132 10.25 11.5143V5.51426H13.25C13.3984 5.51438 13.5435 5.47046 13.667 5.38805C13.7904 5.30565 13.8867 5.18847 13.9435 5.05135C14.0003 4.91424 14.0151 4.76335 13.9861 4.61778C13.9572 4.47222 13.8856 4.33853 13.7806 4.23364L10.0306 0.483637C9.96097 0.413904 9.87825 0.358585 9.7872 0.320842C9.69616 0.283099 9.59856 0.263672 9.5 0.263672C9.40144 0.263672 9.30384 0.283099 9.2128 0.320842C9.12175 0.358585 9.03903 0.413904 8.96937 0.483637L5.21937 4.23364C5.11437 4.33853 5.04284 4.47222 5.01385 4.61778C4.98487 4.76335 4.99972 4.91424 5.05653 5.05135C5.11335 5.18847 5.20957 5.30565 5.33301 5.38805C5.45646 5.47046 5.60158 5.51438 5.75 5.51426Z" fill="#3366CC" />
                </svg>
                }>Upload an Image</Button>
                <p className="crop-text">The Image must be less than 5 MB. Recommended size is 850x550.
                  Minimum height is 550 and minimum width is 850. </p>
              </>

            )}
          </div>
          {errors[0] && (
            <FormHelperText className="text-red-600">
              {errors[0]}
            </FormHelperText>
          )}
        </>
      )}
    </Dropzone>
  );
};

export default DropZone;
