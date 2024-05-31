import React, { useEffect, useState } from "react";
import { Field, Form, Formik, useFormikContext } from "formik";
import InputField from "../../../../components/inputs/InputField";
import { FormLabel } from "react-bootstrap";
import { colors } from "../../../../constants/theme";
import DropZone from "../../../../components/inputs/ImageCropper/CropDrop";
import SelectField from "../../../../components/inputs/SelectField";
import CheckBox from "../../../../components/inputs/checkBox";
import Box from "@mui/material/Box";
import SecondaryButton from "../../../../components/inputs/secondaryButton";
import PrimaryButton from "../../../../components/inputs/PrimaryButton";
import moment from "moment";
import "../CreateCampaigns.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImageCropper } from "../../../../components/inputs/ImageCropper/ImageCropper";
import { ImagePreviewDialog } from "../../../../components/inputs/PreviewImage/PreviewImage";

const InputStyle = {
  padding: "20px",
  border: "1px solid #e2e2e2",
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const styleSecondaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};
const stylePrimaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};

const Test = ({ handleBack, handleNext }) => {
  const [category, setCategory] = useState([]);
  const [srcImg, setSrcImg] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [data, setCity] = useState(false);

  const formik = useFormikContext();

  const onChange = (e) => {
    let files;

    if (e) {
      files = e;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrcImg(reader.result);
    };
    reader.readAsDataURL(files[0]);

    setOpenCrop(true);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BE_BASE_URL}/campaign/campaign-category?page=1&limit=20`
      )
      .then((res) => {
        setCategory(res.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((res) => {
        setCity(res.data.data, "==========>Response");
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);
  const { setFieldValue, values } = useFormikContext();

  const isFormValid = () => {
    // Check if the required fields are empty
    return (
      !!values.campaign_image &&
      !!values.title &&
      !!values.goal_amount &&
      !!values.location &&
      !!values.category &&
      !!values.end_date
    );
  };

  return (
    <Form className="flex flex-col  campagin-form">
      <Box className="desktop:py-[80px] max-desktop:py-[53px] flex flex-col items-center">
        <DropZone
          name="campaign_image"
          onChange={onChange}
          initialPreview={srcImg}
        />

        {openCrop && (
          <>
            <ImageCropper
              srcImg={srcImg}
              setOpenCrop={setOpenCrop}
              setsrcImg={setSrcImg}
            />
          </>
        )}

        {srcImg && <ImagePreviewDialog croppedImage={srcImg} />}
      </Box>
      <div className="campaign-input-div">
        <InputField
          name="title"
          sx={InputStyle}
          required={true}
          label="Campaign Title:"
          placeholder="Max 250 words"
        />
      </div>
      <div className="campaign-input-div">
        <InputField
          name="goal_amount"
          type="number"
          sx={InputStyle}
          required={true}
          label="Amount to be raised:"
        />
      </div>
      <div className="campaign-input-div">
        <InputField
          name="location"
          sx={InputStyle}
          required={true}
          label="Location:"
        />
      </div>

      <div className="campaign-input-div">
        <SelectField
          name="category"
          required={true}
          label="Choose a Category:"
          options={category.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
        {/* {Array.isArray(data) && (
          <SelectField
            name="location"
            required={true}
            label="Location:"
            options={data.map((item) => ({
              label: item.country,
              value: item.iso2,
            }))}
          />
        )} */}
      </div>

      <div className="flex desktop:gap-5 w-full campaign-input-div max-desktop:gap-x-0 max-tablet:flex-col max-tablet:gap-y-[10px]">
        <div className="w-[50%] checkmark-div max-desktop:w-[46%] max-tablet:w-[100%]">
          <FormLabel
            className="text-capitalize font-medium d-flex align-items-center"
            style={{
              padding: "4px 8px 8px 8px",
              color: colors.text.main,
              fontSize: "1.2rem",
              fontWeight: 700,
              fontFamily: "satoshi",
              fontStyle: "normal",
              height: "22px",
            }}
          >
            Is the Campaign Zakaat eligible?
          </FormLabel>
          <CheckBox
            sx={{ paddingLeft: "15px" }}
            name="zakat_eligible"
            label={"Yes"}
          />
          <span className="checkmark"></span>
        </div>
        <div className="w-[50%] campaign-input-div campaign-date-div max-tablet:w-[100%]">
          <InputField
            type="date"
            name="end_date"
            sx={InputStyle}
            inputProps={{ min: moment().format("YYYY-MM-DD") }}
            required={true}
            label="Accept Donations until (Select end date):"
          />
        </div>
      </div>
      <div className="flex mt-4 desktop:gap-x-[40px] max-desktop:gap-x-[24px]">
        <SecondaryButton sx={styleSecondaryButton}>
          <Link to="/">Back</Link>
        </SecondaryButton>

        <PrimaryButton
          sx={stylePrimaryButton}
          onClick={() => {
            if (isFormValid()) {
              handleNext();
            }
          }}
          disabled={!isFormValid()}
        >
          Next
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default Test;
