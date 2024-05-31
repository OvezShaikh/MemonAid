import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const Avatar = ({img}) => {
  const [dialogs, setdialogs] = useState(false);
  return(
  <div>
    <div className="profile_img text-center p-4">
      <div className="div">
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "58%",
            objectFit: "cover",
            margin:'auto',
            backgroundColor:'gray'
          }}
          src={img}
          alt=""
        />
      </div>
    </div>
  </div>
  );
};

export default Avatar
