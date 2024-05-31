import { Add, Filter, TrashCan } from "@carbon/icons-react";
import { Badge, Box, Grid, IconButton } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { colors } from "../../constants/theme";
import InputField from "../inputs/InputAdminField/Index";
import PrimaryButton from "../inputs/PrimaryButton";
import SecondaryButton from "../inputs/secondaryButton";
import SelectField from "../inputs/AdminSelectField/Index";
import { Dialog } from "../layout/dialogBox";
import * as yup from "yup";
import MultipleSelectField from "../inputs/MultipleSelectField";
import OperatorSelectField from "../inputs/operatorSelectField";

const ApplyFilters = ({ allColumns, title, filters, setFilters }) => {
  const validationSchema = yup.object().shape({
    filters: yup.array().of(
      yup.object().shape({
        column: yup
          .object({
            Header: yup.string().required("Column is required!"),
          })
          .nullable()
          .required("Column is required!"),
        operator: yup
          .object({
            label: yup.string(),
            // .required("Operator is required!"),
          })
          .nullable(),
      })
    ),
  });

  return (
    <>
      <Dialog
        title={title ? title : "Apply Filters"}
        button={
          <Badge
            invisible={filters?.length < 1}
            badgeContent={filters?.length}
            color="warning"
            sx={{ "& .MuiBadge-badge": { color: "#fff" } }}
          >
            <SecondaryButton
              className="me-2 border-0"
              startIcon={
                <Filter
                  color={colors.primary.dark}
                  size={"20"}
                  className="me-1"
                />
              }
              variant="text"
              sx={{ color: colors.primary.dark }}
            >
              {filters?.length > 0 ? "View/Edit Filters" : "Apply Filters"}
            </SecondaryButton>
          </Badge>
        }
        maxWidth="md"
      >
        {({ onClose }) => (
          <Grid container className="max-tablet:flex max-tablet:flex-col">
            <Formik
              initialValues={{
                filters:
                  filters?.length > 0
                    ? filters
                    : [
                        {
                          column: {},
                          operator: {},
                          value: [],
                          id: Date.now(),
                        },
                      ],
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setFilters(values?.filters);
                localStorage.setItem(
                  `filters-of-${title?.replace(/ /g, "-")}`,
                  JSON.stringify(values?.filters)
                );
                onClose();
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="w-100">
                  <Grid
                    container
                    item
                    xs={12}
                    className="px-3 max-tablet:flex max-tablet:flex-col"
                  >
                    <FieldArray name="filters">
                      {({ push, remove }) => (
                        <>
                          {values?.filters.map((filter, index) => (
                            <Grid
                              container
                              columnSpacing={{ xs: 4, lg: 2, md: 4 }}
                              display={"flex"}
                              justifyContent={"space-between"}
                              className="mb-3"
                              key={filter?.id}
                            >
                              <Grid item xs={12} md={12} lg={4} xl={4}>
                                <SelectField
                                  name={`filters[${index}].column`}
                                  label="Column"
                                  value={values?.filters[index]?.column}
                                  getOptionLabel={(option) =>
                                    option?.Header || ""
                                  }
                                  onChange={(value, reason) => {
                                    if (reason === "clear") {
                                      setFieldValue(
                                        `filters[${index}].value`,
                                        []
                                      );
                                    }
                                    setFieldValue(
                                      `filters[${index}].column`,
                                      value
                                    );
                                  }}
                                  options={
                                    allColumns.map((i) => ({
                                      Header: i.Header,
                                      accessor: i.accessor,
                                      id: i.id,
                                    })) || []
                                  }
                                  // options={
                                  //   allColumns
                                  //     ? allColumns
                                  //         ?.filter((item) => !item?.nofilter)
                                  //         ?.map((item) =>
                                  //           item?.Header === "Range Start"
                                  //             ? { ...item, Header: "Range" }
                                  //             : item
                                  //         )
                                  //         ?.filter(
                                  //           (item) =>
                                  //             !values?.filters?.some(
                                  //               (i) =>
                                  //                 i?.column?.Header ===
                                  //                 item?.Header
                                  //             )
                                  //         )
                                  //     : []
                                  // }
                                />
                              </Grid>
                              {!values?.filters[index]?.column?.apiURL && (
                                <Grid item xs={12} md={12} lg={4} xl={4}>
                                  <OperatorSelectField
                                    label="operator"
                                    value={values?.filters[index]?.operator}
                                    getOptionLabel={(option) =>
                                      option?.label || ""
                                    }
                                    name={`filters[${index}].operator`}
                                  />
                                </Grid>
                              )}

                              <Grid item xs={12} md={12} lg={4} xl={4}>
                                {values?.filters[index]?.column?.apiURL ||
                                values?.filters[index]?.column?.options ? (
                                  <MultipleSelectField
                                    name={`filters[${index}].value`}
                                    id={`value${index}`}
                                    label="Value"
                                    options={
                                      values?.filters[index]?.column?.options
                                        ? values?.filters[index]?.column
                                            ?.options
                                        : []
                                    }
                                    url={values?.filters[index]?.column?.apiURL}
                                    urlParams={
                                      // values?.filters[index]?.column?.apiParams
                                      values?.filters?.some(
                                        (item) =>
                                          item?.column?.Header === "Location"
                                      ) &&
                                      values?.filters[index]?.column?.Header ===
                                        "Range"
                                        ? {
                                            ...values?.filters[index]?.column
                                              ?.apiParams,
                                            location_id: values?.filters
                                              ?.filter(
                                                (item) =>
                                                  item?.column?.Header ===
                                                  "Location"
                                              )?.[0]
                                              ?.value?.map((item) => item?.id),
                                            location_type: "multiple",
                                          }
                                        : values?.filters[index]?.column
                                            ?.apiParams
                                    }
                                    value={values?.filters[index]?.value}
                                    getOptionLabel={(option) =>
                                      option[
                                        values?.filters[index]?.column
                                          ?.Header === "Range"
                                      ]
                                        ? `${option?.range_from} - ${option?.range_to}`
                                        : option[
                                            values?.filters[index]?.column
                                              ?.label
                                          ] ||
                                          option[
                                            values?.filters[
                                              index
                                            ]?.column?.Header?.toLowerCase()
                                          ] ||
                                          option[
                                            values?.filters[index]?.column?.id
                                          ] ||
                                          option ||
                                          ""
                                    }
                                  />
                                ) : (
                                  <InputField
                                    label="value"
                                    name={`filters[${index}].value`}
                                  />
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                display="flex"
                                alignItems="center"
                              >
                                <IconButton
                                  onClick={() => remove(index)}
                                  className="mt-3"
                                >
                                  <TrashCan size={20} color={"red"} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}

                          <Grid item xs={12} className="mt-2">
                            <SecondaryButton
                              className="text-capitalize"
                              color="black"
                              startIcon={<Add size={24} />}
                              onClick={() =>
                                push({
                                  column: {},
                                  operator: {},
                                  value: [],
                                  id: Date.now(),
                                })
                              }
                            >
                              Add Filter
                            </SecondaryButton>
                          </Grid>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid xs={12} item className="border-top mt-5 pt-3">
                    <Box className="d-flex justify-content-end mt-8">
                      <SecondaryButton
                        type="button"
                        color="black"
                        className="me-2"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cancel
                      </SecondaryButton>
                      <PrimaryButton
                        variant="contained"
                        className="text-capitalize me-4 px-4 "
                        type="submit"
                      >
                        Save Changes
                      </PrimaryButton>
                    </Box>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        )}
      </Dialog>
    </>
  );
};

export default ApplyFilters;
