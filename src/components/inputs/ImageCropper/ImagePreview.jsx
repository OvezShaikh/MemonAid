import React, { useEffect, useState } from "react";
import { Dialog } from "../../layout/dialogBox";


const ImagePreviewDialog = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [openCrop , setOpenCrop ] = useState(true)

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(selectedFile);
    onChange(selectedFile); 
  };

  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Dialog maxWidth='sm' title={"Preview Image"} onClose={() => setOpenCrop(false)}>
      {() => (
        <>
          {fileDataURL &&
        <div className="img-preview-wrapper">
          <img src={fileDataURL} alt="preview" />
        </div>
      }
      </>
      )}
    </Dialog>
  );
};

export default ImagePreviewDialog;
