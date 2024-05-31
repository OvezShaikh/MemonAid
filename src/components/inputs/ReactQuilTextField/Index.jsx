import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorMessage } from "formik";

const QuillEditor = ({ value, onChange, placeholder, name }) => {
  const colorOptions = [
    "#000000",
    "#111111",
    "#222222",
    "#ff0000",
    "#ff3333",
    "#ff6666",
    "#00ff00",
    "#33ff33",
    "#66ff66",
    "#0000ff",
    "#3333ff",
    "#6666ff",
    "#ee2d",
    "#fff",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: colorOptions }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ direction: "rtl" }],
    ],
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
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

export default QuillEditor;
