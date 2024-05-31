import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDownloadFile } from "../../../Hooks/useDownloadFile";
import PrimaryButton from "../../inputs/PrimaryButton";
import { DeleteBox } from "../dialogBox/delete";
import SecondaryButton from "../../inputs/secondaryButton";
import { Download } from "@carbon/icons-react";
import { useMediaQuery } from "@mui/material";

function YourComponent({ imageUrl, id, iconShow }) {
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isMaxTablet = useMediaQuery("(max-width: 600px)");

  const toggleFullScreen = () => {
    const isSmallScreen =
      document.documentElement.classList.contains("small-screen");

    if (isSmallScreen) {
      setIsFullScreen(!isFullScreen);
    } else {
      setIsFullScreen(!isFullScreen);
    }
  };

  const url = `/admin-dashboard/cause-edit/${id}`;

  const { refetch: downloadFile, isFetching: downloadingFile } =
    useDownloadFile(
      imageUrl,
      {
        download: true,
      },
      () => {
        console.log("File download successful");
      }
    );

  const downloadImage = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "image.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDeleteSuccess = () => {
    setIsImageDeleted(true);
  };

  return (
    <>
      {!isImageDeleted && (
        <div
          className="w-[218px] h-[100px] bg-[#F5F8FC] flex justify-end"
          style={{
            border: "1px solid blue",
            borderRadius: "2px",
            position: "relative",
          }}
        >
          <img
            src={imageUrl}
            alt="Documents"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={toggleFullScreen}
          />
          {!isFullScreen && (
            <div className="absolute right-1 top-2">
              {iconShow ? (
                ""
              ) : (
                <DeleteBox
                  url={`/admin-dashboard/documents`}
                  data={id}
                  iconDelete={true}
                  title={"document"}
                  onSuccess={handleDeleteSuccess}
                  refetchUrl={"/admin-dashboard/documents"}
                >
                  <p>Are you sure to delete this document!</p>
                  <p className="text-red-500">
                    Once you delete this document you can't undo that document!
                  </p>
                </DeleteBox>
              )}
            </div>
          )}
        </div>
      )}
      {isFullScreen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center "
          style={{ zIndex: 1234567 }}
        >
          <div className="relative flex justify-center">
            <img
              src={imageUrl}
              alt="Documents "
              className="min-w-[500px] min-h-[800px] max-tablet:min-w-[200px] max-tablet:min-h-[400px] max-tablet:max-w-[300px] max-tablet:max-h-[500px] max-w-[70%] max-h-[70%]"
              onClick={toggleFullScreen}
            />
            <div className="absolute max-tablet:-top-8 right-0 top-0 desktop:m-4">
              <RiCloseLine
                className="cursor-pointer text-black bg-white hover:bg-slate-100 rounded-full"
                style={{ fontSize: "1.5rem" }}
                onClick={toggleFullScreen}
              />
            </div>
            <div className="absolute max-tablet:-top-10 left-0   top-0 desktop:m-4">
              <PrimaryButton onClick={() => downloadImage()}>
                <Download className="me-1" />
                {"Download"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default YourComponent;
