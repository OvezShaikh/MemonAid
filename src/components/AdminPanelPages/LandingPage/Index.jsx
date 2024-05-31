import React from "react";
import InputField from "../../inputs/InputField/index";
import SelectField from "../../inputs/SelectField/index";
import PrimaryButton from "../../inputs/PrimaryButton";
import CheckBox from "../../inputs/checkBox";
import { FormLabel } from "@mui/material";
import { colors } from "../../../constants/theme";
import { Formik, Form } from "formik";
import images from "../../../constants/images";
import ReactQuilTextField from "../../inputs/ReactQuilTextField/Index";
import SuccessButton from "../../inputs/SuccessButton/Index";
import { PiCheckFat } from "react-icons/pi";
import { pink, red } from "@mui/material/colors";
import ErrorIcon from "@mui/icons-material/Error";
import ImageEditor from "../../layout/ImageEditor/Index";
import Attachments from "../../layout/Attachments/Index";
import { useState } from "react";

const InputStyle = {
  padding: "20px",
  border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};
const imageUrlFromBackend =
  "data:image/jpeg;base64,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";

function Index() {
  const [imageUrl, setImageUrl] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFRUYGRgaGBgYGhoYGBgaGhgYGBgaGRoaGBwcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjYkJCs0NDY2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALEBHQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAwECBAUGB//EADkQAAEDAgMECAUEAgEFAAAAAAEAAhEDIQQxQRJRYXEFIlKBkaHR8BMUMpKxBmLB4ULxFSNTcoKy/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALBEAAgIBAwMDAwMFAAAAAAAAAAECESEDEjEEE0EiUWEUkaEFQnEVIzJSgf/aAAwDAQACEQMRAD8A+TseQpN10MRhHDNnG2ixERmFommaz05RdMvRiCD3KGUpMKWmcldpJysfymNU6GMoltyYniPwpczkfJUBn6s+Ofih7SDYqcmuEsLBDsONx9FmfSIW2lWj6itDgHCzxyMeR1RbXIu1GStcnKa4qWt1WmtRM6dxSmkixVowcWnTGPgwY4JlPDzeQBvKVKlgMyJQ0aJq8qxjxIIGnmsTwuiynORvySH0N+9JBOLeTLTNwVsfRsHaFIDIK30q7Q0sdkbtO47uRTeBacU7TwZDVgRqqHepqNl3imsp9XvhMVNuh+HEgjh/az1KUStNFhkAZgyr1GmTIzHkp4Zu47omN4BaL3iElqa9u5KGapGD5HFshIfktFHcqOYgJK1ZmhS0qXNVqQumjKslnsS015S4TG+SrwqkWTHBVcEEsoxspxsFNNh0HsqXsjNAVixGzK6WFbsQcoafNYmG40T31paecD1UtWaabUXYrEPkczKzhsprm2VC+ECbt2x9LE/+XirVagP0kcQshaQpISoruSqmSQRl4KzHb57lDHxvWho3T5ICKvgWDJzPemlh1mVX4aY185oLS9wps0KH0IyunhivVZZKzXZjJla+NEuJOa0ihItmqtokFO0Q4SxfAksK14XDTmmGNVJdIAGYRZpGEYu3kz4inExoYSmui575/K6TMPInyVquGaGzpqlfgrtN+pYOa9sxAPelOYVpa0tJbeFpp0AU7M9jkIwuGm58/wCEVeo4gQW5iOK14l+xZu6RwScMzbhuWg/vzQvcval6VyWwDuuHbuYCdiiCTExMzqTu5KcXR2C1g+odZ3hYK1KkC3NTjk3jFpPTOa+ne2SVVp3nRa8SyDAV6TAWOnfPkndKznencnEwMtdMYJlWNEjkmUYVMhRd0zDVaq0QnYkJTbBNGE1UijyrsbaUuJTn5QmSsiiqgKxCEyRzK2zlnP8ApJe6VRXSHbeC7W2JPD1VaTSfeQV3mx7o8FLGZjKw8SgpRyD2zkqupN3+Cs1si2iz1M1DLapcFmmc0MbHJUa5NaUyU7LVGRqDxCbQeB3pb3znf8qgJQXuUXaNNip+GlNctm1LRlMaT5pPBrGpcht2j+FQ3VXlRRdcfyihuWaY6ky8LUynNvBZ3G9vfehrzndQzaLSdF67IKZQbbcrE7Weau2mRCVmih6rXAtry0hVc8kxock0gG0KatMti3cFSYOLr4LYbCbTgHeJSq31m0AQO4WT2VpETBV6lPa628AH3vU27yabIyjUTDUp6xPFUw745rc2j1SLpDMMJmVUWZS0pJpo07W20PIuLHkq0KRBIBV8M/YJ/B13wtjmgwW5HPepbrB0RimrfPk5lTDEyTnuSmN2XQ+wIWikNp0HMT7CdicM0kck7rDMdm71ROdiARYXAy4hKczKE7EsLbbsuSJ6seCpcGMo3J2Z6tKVkqsW90xByWZzLxvKqJhqRRFLDHYL9xhKcF38RhtimG74PkuI5iIy3WVraHapPmhQbOSoWLbhmXuDAH+lmqG9lV5OZxxZnIVg1XayUx0JkJFWiZPJOpM2p4m/IKNieq3P8J9PqsIzvpGSiXBvpxzngQx+zI0IM/wsVXNNe8pClImc/CJhXaoa9MseCohEICtsHNDRGiodFgzJaGUjGnvcq0HgWcJB8uKY5kQJnOD7ySZrFJZK1WkC4SV12bIA2htNIAHWFjF1hq4W20zLmD+OSlM0np+UUY7Ja7EW9lYGv0hOpm9j4puIQnWDWam7vn0XQwtTaAkXGXsLl0XdbetzCBkBM2I3e96zlE7dGebbFOeWPuLTcLazZc4DaAERfPu3rFin3mb/AJVsMWky4kEZIatDjOpNeLNTsKAZE9xVWYgNgeI0jwVn4oCwOf53FVGH22yCJGlvGNVOa9Rs6v8At8j8RTBBdOYELNgLkx9Q0WukzZGzYgg7hHOLarDQGy8jI70ReGg1LUk6/kfVwpcXEC41Rh2FtnfTIGc+UBbMMyoTf6SDCc9jS2TbllPCMlDl4NVpJ+rhnCxDYeDMZ+/Na6WKcXfTtTYmMgq9I4cm4GXvNasBScGEbTTlkQfwSVo2nGzlhGS1XFY8nMxjNB7CzPqWjculjKUaQf4K5uzzTi8GWtBqTIgkC5KTk9vAhdLDt/aO9Z6jOsTG5WpGUtNqmdjpj6BG4fhee2F3cY8vptPALAGQMllo4R1dat8017IyYt4b1Wm035rCQn12GVWmxdEcI8qduVAynZVcxPcICq5ylyK7eBVNhBBORMKcTVnLkqPfKoQir5E5bVSEuUFqYWqibMKDZUwmQiEytpUEpnxJzUbKkNQNWXsck5rtPZWcNTBKdFpjHAxY23KaWKIscp00VFXYRVj3NO0aq8ZjXXLvWZ7NZlWAUtQo0De7kii4jVa2YrxWZwUBiGkxxlKOEbmO2hI8FRzt/wDrks7SU6m8ze6W00WpYmo4gxK34DFlptnHvvWasySltsbEEd/8hDimhRnKErTPSYfFMcQ2QHHKJA7wd6XisBBDjkezc9wWDBuBERff6LrPxQazYMHOSc44ELCUalg9OOvGcPUZamIa1ogm3+JPmpoVGPHWcZM2E7swuZiCCbJDHlpkEhadtNHM+rallWjqVq5HUfPppfgtuBwzXMlj+twtuXBq1HO6xJJOafgK7wYEj3qlKHpwEOoT1Latfk71TCy2XZ3EmMxoVi/407JLBN96s/H7DSJknfYepSMN0wWG3LK0ctVioS5R2S19JtKRjfIsQQQhhkR5r0FSm2o0HYAcdRMELmPwhHIajK/EJqSarhkvRae5O0Q1+0wNjXyUPa0y2chbitD6OwwkmIsD/iZ4ysNNhngBJPD3CItU6HqJ2k1yYK4lZnG601DJnjlqstYrTdg86cKbZDnKuatTpklMfSjNTuyPZJqxGyquTnMUFkK9xk4GchV2E5xVSEnJkbUP+Ej4S6LaKn5dPca9o5opKfhLpDDI+WT3i7LOcKasKa3/AC6t8snvH2mYRTU/CW8UEwUEbhrRZzhSR8FdIYZT8sjeHZZzfgqfhLpjDKlemGNLjojegek0rOd8NKfVa0wXCd2qw4npVzpDRsjK1z4rnc/evcpcznlJXg7jukGCZJJ4DNYqnSTjk0AeJWAqQJUObE5SkaW9JVBdro5AKW9JVZJ2iZEXgjwKQynKsKShyZSUvcsMbU7R7wPRWHSD5m3KLJfw1QsvmmpP3JcWb6PSejx3j0W3D9INNtqOdvNcEqQfeatTYlJxZ6Vjw+4O15pnwDuXmaFdzCHMMHf/AAdF6DorpX4jg14AJ1mJ7j/Ce9m+nOMnUuTp4LFuZbMbjuXZovY8yI2gL6G3fuuuY7DQhjSDr5rKUVLKPT0taWl6XlD+mLsERIzkZnS29c6oNmmLHrCSSD/AXcovEbTjJk2tPvJJxzWEWgxcczosVujivJ2PZO3aujy7i3Qgc80gtJPuy246BaPZSGUH5xA3n3daqR509P1Vz/A6kNgTqlCk5xlXpgzJPvlmnGTvjgIQmW43FLwZ30g3VZajwtb6RSvg3vbvVJnPOLeEqMoBOiNkrWSBkElz1VmLhR320kwUk8NRsrKzuUEJFJT8JODVcNRuL2Iz/CV20eCeGqwCW4agjP8ABV20Vpa1MYxTvKUEIZRVxh1paxPa0KXMtQRiGGXD/Vb9ilA2ZcYubxrsjU+q9UTC8r07+n31qwe02Ih0kAN2cgLE35FOEs5OfqYvY1FW2eNoYfavIA4mL896vTY3Xa2p1sLTY7jluyK19J4H4VQU3OB+klrZJAOgtnF0us9pAYGNadr6y51hFg4kx6Qt7PF206fJb5Zjg0M+oi7bkzJmd1t/DmodgjNhJuSGyYA4opS36QQf8ocC0gXaWunPPImy6FDFA5ghwjZAygznnfLzUSdG2nC2ZMPhSYjzGROXkt2G6P3tJMGwtaM76T70XQ6OwpfoLNbmf2mBnHGN67rOjn/WwbO1YBs2EDjf6fErmnq0enp9NFrJ4x+AOYBjfGmsCbhY34QlxGZgk7pE2nJe2xXRRaNghoJlwcbRAiAcrxPcRmVwK5DXdYDZl4dsF2RIkC/LXTxuGpZlraCStHIbgJbtSIAkxnESRB15bwlVmssG7rkTv1Ha4X5rdisS4kta3ZEnZJMGAZG1Ag6Wyk8Vz3tEFwIEQeses46xw9890zz5Roq2m1xMdUR/kbcp1N7WUYd5p1GmQNk65RN5ibJlaoHAkMa3KNkERGcifMDRJYxzyGtaS4mBxJ0GgVGfnB9FwzNtoMgjOQU8U4sAk9A9H/BotaSScyJEBxzA4LqFgsYWDlk9tJuKbVMzUuj3OvkE44BoF3SeY/2ukKzS2AALa71y6uHe6esO4yO9ZT1ZfwdWho6by2c/E4SnMwCdy5+JuYtbdl3+i67sEG5unjB9IhZ3YZgyI8D/AAs4ydndJQapHFdTJMD+/wCldlB+QHeuoKbNxPcU1j4yYfABa9w5Hp5wmckdHPO9NHQx1Hius2sRp5kqj8Q85DwB/JR3fYT6a8tHJqdFgZx4eqyuwrRu8l0q7ah/xPiFz6uHfOg7wtFqfJy6ug1wjrhymV4L5l/bf97vVW+Zf23/AHO9Vv2/k4F1vwe8EK0rwYxT+2/73eqn5h/bf9zvVLt/I/rfg94HKwevBDEP7b/ud6qRWf23fcfVHavyV9b8H0BhT2L50Kr+277irio/tu+4pdj5KXW/H5PpLGpwYvmjaj+077irNc/tO8Sk+mfuUusT8fk+h1EMavBsL+0fErSwP7R8SjsNeTWOvu8HqsZ0NSqElzGkkESBDoIjMXWEfpyiA1oaeqLHaJ33M2Jv7Fly2U37ynMpO3+f9JKDXkfbhJ24m6p+m2Cm9rHPbtCdluwZ2bgbJEG4GoJymMuTU/TdZjC8kFgkkWaQDHW2chraf8e5b2MO8+K00id6mUZe5UemjdrAdC9E1s2gggTcObIIiJI1BI7l9K/S9Sm1kPADg2OsADHhy8F4rCv4rH+puk3sbT2XES5wnhAXJKLUk0aa+lu06vB3+n8EatQ/CBa2HXuGxNxuPJeLxH6frPf1Wk3glwLQBlMuF9fpnK0r1tWuSIk2EBc6s528o0oy5NFoeja2cnD/AKJkzVqzlIa0HIW6zgbAzpuXQH6Pw4BGzY2zvG7az80qpUf2neJ9VlqV6vbf9x9V07ZPyYPpoR8Wdan+ksPLf+m3qgtGZEHtXvzK3N6Kp07Ma1utgBc8l5N9at23/e71SH4mt23/AHu9Udmb/cJbIu1Gv+HtPhDgoNMLwdTFVe2/7nLM/F1f+4/73Jrp5e5M+ogvDPoL3BuqyPxf7o7gvBvxVQ5vf9zvVKdXf23/AHFKXSSlywj1+nD9r+57l2Jn/I++QSDif3eX9rxJrv7bvuKoaz+277il9G15Kf6rDxF/c9yMUO049/oFLsUB7v5rwhxD+2/7iqnEP7bvuPqj6V+4f1WNf4v7nvDjkt+P9yvCmu/tu+4qhrO7bvuKpdJ8mcv1Vf6/k9nVxnELI7FDteS8r8V3bd4lRtu7R8SqXT15MpfqSf7SAphRKkLrPJRIClQFIKQ7LhWASw5WBTKTGNV2lKDlcP4popMe0+7JjZ9grMH8kxruCClI2Mf79haqT/c3XPY/mnMfzPc0pNG0NSjqNefYTw/n3gj+FzG1QNR9npATWVRw32MeAlZuJ0w1WdFtRWZVg5rnVcaxou4bjtTPJcut02BIYO/RZSRu+ohHlntaFfiPfJcL9Y4jq094c7/5/pcB3T1XQgeKyYjGvfG07ai91nsd2yNXrISg4xu2fTqWJlufvuUPfx/C+d0um6rRAdI4ick6n+pKwN4I7wlGDRquv0ms2e0quWJ9T37C49L9SNdZwLcr3PO6eMe1ws6Z4wDP/tc8FrFe4pdTCS9LNb38/NJqP3z3gDzssz6w48QAe7MpT38PJoWyic09Zk1X8vH+1me/3f0Uvefdx+El7/crRI5ZTshx95Jbioc/kluf7ugyciSqFBcqEoJskqpCC5VlImwIUEIJUFAmyFBUyhBJEoUBSEASrBVlUNYBJtIBwUrK6uVRzydVLkh2bC8DVHzLd/ksKEbmG42nFN4o+cHZKxIRuYbmbh0h+3zTG9KftP3f0uagJbmNSaOoelj2fP0ASK2Pe60wNwkf7WRCTbZW6T8kucTmSUSoQkKywcjaVUJUO2X21UuUIQFsJQHRkhCYjSzHPFptxAV/+SfrB8fVY1Up2wcn7m49IHsjzVfnj2QsaE9zFuZr+c/aj5vh5rIhG5itmv5kcVYVWnVYkJ7mFm7aCgrGHEZFXbWKFJBY8oS21AVeVadiAqJQoQBQ1FBqJaFnuYElxKhCFIAhCEACEIQAIQhAAhCEATKFCAgdlkKFKCgRKEJUAIUKJTE2ShQhArJJUIQgQIQhAAhCEACEIQAIQhAApBUIQBcPKn4iWhPcwBCEJACEIQAIQhAAhCEACEIQAIQhAAhCEASFKEIKQIQhAyCoQhBDBCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgD//2Q=="
  );

  const handleDelete = () => {
    // For demonstration purposes, we'll just set imageUrl to null
    setImageUrl(null);
  };

  return (
    <Formik>
      <Form className="flex flex-col items-center">
        <div className="flex w-[100%] mt-2 gap-14">
          <div className="flex flex-col w-[70%] gap-10 items-center">
            <div className="flex flex-col items-center">
              <div className="flex">
                <h1 className="text-[18px] font-[satoshi] font-medium text-[#000000] underline pr-2">
                  Cause
                </h1>
                <img src={images.CausesDetails} alt="" />
              </div>
              <p className="text-[18px] font-[satoshi] font-medium text-[#000000] ">
                Note: Labels in red color indicates that the field is changed.{" "}
              </p>
            </div>
            <div className="w-full">
              <InputField
                sx={InputStyle}
                name={"Title of Campaign:"}
                label={"Title of Campaign:"}
                required={"true"}
                placeholder={"Minimum 50 INR"}
              />
            </div>
            <SelectField
              name={"Choose a category:"}
              label={"Choose a category:"}
              required
            />
            <div className="w-full">
              <InputField
                sx={InputStyle}
                name={"Amount to be raised:"}
                label={"Amount to be raised:"}
                placeholder={"Minimum 50 INR"}
              />
            </div>
            <SelectField name={"Location:"} label={"Location:"} />
            <div className="flex w-[100%] gap-4">
              <div className="w-[50%]">
                <InputField
                  sx={InputStyle}
                  type={"date"}
                  name={"raised"}
                  label={"Accept Donations until (Select end date):"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>
              <div className="w-[50%] checkmark-div max-desktop:w-[46%] max-tablet:w-[100%]">
                <FormLabel
                  className="text-capitalize mb-4 font-medium d-flex align-items-center"
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
                  <span className="text-red-600">*</span>
                </FormLabel>
                <CheckBox
                  sx={{
                    paddingLeft: "15px",
                    "&.Mui-checked": {
                      color: red[500],
                    },
                  }}
                  name="zakat_eligible"
                  label={"Yes"}
                />
              </div>
            </div>
            <div className="w-full">
              <FormLabel
                className="font-medium d-flex align-items-center desktop:text-[1.2rem] max-desktop:text-[1rem]"
                style={{
                  padding: "4px 8px 8px 8px",
                  color: colors.text.main,

                  fontWeight: 700,
                  fontFamily: "satoshi",
                  fontStyle: "normal",
                  // height: '22px',
                  fontSize: "1.1rem",
                }}
              >
                About the Campaign:
                <span className="text-red-600">*</span>
              </FormLabel>
              <div className="h-[332px] summary-div">
                <ReactQuilTextField
                  theme="snow"
                  name="summary"
                  // value={values.summary}
                  // placeholder="Summarize in 100 words max."
                  style={{ "& .ql-editor": { minHeight: "50px" } }}
                  // onChange={(value) => setFieldValue('summary', value)}
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <InputField
                name={"summery"}
                label={"Summary"}
                required={"true"}
                multiline
                info
                CustomInfoIcon={
                  <ErrorIcon
                    className="ms-1"
                    style={{
                      color: "red",
                      cursor: "pointer",
                      height: "18px",
                    }}
                  />
                }
                infoText={"Please be careful while adding AD Path."}
                rows={5}
                placeholder="Placeholder text"
                sx={{
                  padding: "20px",
                  border: "1px solid #e2e2e2",
                  // },
                  "&:focus-within": {
                    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
                    borderColor: "black",
                  },
                  "& input": { height: "100px" },
                }}
              />
            </div>
            <div className="w-full flex flex-col">
              <FormLabel
                className="font-medium d-flex align-items-center desktop:text-[1.2rem] max-desktop:text-[1rem]"
                style={{
                  padding: "4px 8px 16px 8px",
                  color: colors.text.main,

                  fontWeight: 700,
                  fontFamily: "satoshi",
                  fontStyle: "normal",
                  height: "22px",
                  fontSize: "1.1rem",
                }}
              >
                Attachments:
                <span className="text-red-600">*</span>
              </FormLabel>
              <div className="flex gap-4">
                {/* <div className="w-[218px] h-[100px] bg-[#F5F8FC] flex  justify-end" style={{ border: '1px solid blue ', borderRadius: '2px' }}><RiDeleteBin6Line className='m-1' /></div>
                                <div className="w-[218px] h-[100px] bg-[#F5F8FC] flex  justify-end" style={{ border: '1px solid blue', borderRadius: '2px' }}><RiDeleteBin6Line className='m-1' /></div>
                                <div className="w-[218px] h-[100px] bg-[#F5F8FC] flex  justify-end" style={{ border: '1px solid blue', borderRadius: '2px' }}><RiDeleteBin6Line className='m-1' /></div> */}
                <Attachments imageUrl="data:image/jpeg;base64,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" />
                <Attachments imageUrl="data:image/jpeg;base64,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" />
                <Attachments imageUrl="another_image_url_here" />
              </div>
            </div>
          </div>
          {/* <div className="w-[30%]">
                        <div className="max-w-[400px] w-full min-h-[600px] bg-[#F7FAFF]" style={{ border: "2px dashed blue", borderRadius: '12px' }}></div>
                    </div> */}
          <div className="w-[30%]">
            <ImageEditor
              sx={{ maxWidth: "400px", minHeight: "600px" }}
              imageUrl={imageUrlFromBackend}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-5">
          <button
            onClick={() => {}}
            className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
          >
            <h1 className="text-[#000000] font-medium text-[0.9rem] font-[satoshi]">
              Cancel
            </h1>
          </button>
          <SuccessButton
            onClick={() => {}}
            text={"Save & Approve"}
            icon={<PiCheckFat className="w-4 h-4 mt-1" />}
          />
          <PrimaryButton onClick={() => {}}>
            <h1 className="text-white font-semibold font-[satoshi]">
              Reject Modification Request
            </h1>
          </PrimaryButton>
        </div>
      </Form>
    </Formik>
  );
}

export default Index;
