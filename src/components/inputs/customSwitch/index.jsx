import React from "react";

import "./CustomSwitch.css";

const CustomSwitch = ({
  name,
  disable,
  value,
  onText,
  offText,
  onLabel = "Active",
  offLabel = "InActive",
  hideLabel,
  ...otherProps
}) => {
  return (
    <div className="d-flex align-items-center">
      <label className="switch">
        <input
          type="checkbox"
          id="togBtn"
          disabled={disable}
          checked={value}
          {...otherProps}
        />
        <div className="slider round">
          <span className="on">{onText}</span>
          <span className="off">{offText}</span>
        </div>
      </label>

      {!hideLabel && (
        <div className="d-flex align-items-center ms-2">
          {value === true && <p className="m-0">{onLabel}</p>}
          {value === false && <p className="m-0">{offLabel}</p>}
        </div>
      )}
    </div>
  );
};

export default CustomSwitch;
