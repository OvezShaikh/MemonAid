import { Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Dialog } from "../dialogBox";
import SecondaryButton from "../inputs/secondaryButton";
import { colors } from "../../constants/theme";
import { ArrowDown, ArrowUp, Column, View } from "@carbon/icons-react";
import CustomSwitch from "../inputs/customSwitch";
import PrimaryButton from "../inputs/PrimaryButton";
import { Dialog } from "../layout/dialogBox";

const ManageColumns = ({
  visibleColumns,
  allColumns,
  setColumnOrder,
  toggleHideAllColumns,
  mutate,
  postTableMetaData,
  isLoading,
  setColumnOrderArr,
  isMobile,
}) => {
  const [hiddenColumns, setHiddenColumns] = useState([]);

  useEffect(() => {
    setHiddenColumns(
      allColumns?.filter(
        (item) => visibleColumns?.filter((i) => i.id === item?.id)?.length < 1
      )
    );
    //eslint-disable-next-line
  }, [visibleColumns, allColumns]);

  const Reorder = (arr, id, demote) => {
    arr.splice(demote ? id + 1 : id - 1, 0, arr.splice(id, 1)[0]);
    setColumnOrder(arr);
    setColumnOrderArr(arr);
  };

  return (
    <Dialog
      title={`Manage Columns`}
      button={
        <SecondaryButton
          className="me-2 max-tablet:text-[4px]  "
          startIcon={
            <Column color={colors.primary.dark} size={"20"} className="me-1" />
          }
        >
          {!isMobile && "Manage Columns"}
        </SecondaryButton>
      }
      maxWidth="lg"
    >
      {({ onClose }) => (
        <Grid container className="mt-2">
          <Grid container columnSpacing={4} rowSpacing={2} className="px-4">
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <SecondaryButton
                startIcon={
                  <View
                    size={20}
                    className="me-1"
                    color={colors.primary.dark}
                  />
                }
                className="me-2 max-tablet:text-red-200"
                onClick={() => toggleHideAllColumns(false)}
              >
                Show All Columns
              </SecondaryButton>
            </Grid>
            <Grid item xs={12}>
              <h6> VISIBLE COLUMNS:</h6>
              <table className="normal-table w-100">
                <thead
                  style={{
                    background: colors.primary.light,
                  }}
                >
                  <th style={{ width: "50%" }}>Column Header Name</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Column Order
                  </th>
                  <th className="text-center " style={{ width: "35%" }}>
                    Actions
                  </th>
                </thead>
                <tbody>
                  {visibleColumns?.map((column, index) => (
                    <tr key={column.id}>
                      <td>{column?.Header}</td>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <Grid container display={"flex"} alignItems="center">
                          <Grid
                            item
                            xs={3}
                            display="flex"
                            alignItems={"center"}
                          >
                            <CustomSwitch
                              {...column.getToggleHiddenProps()}
                              value={true}
                              onLabel="Hide"
                            />
                          </Grid>
                          <div className="border-end  py-3 mx-3"></div>
                          <Grid
                            item
                            xs={7}
                            display="flex"
                            alignItems={"center"}
                          >
                            {index !== 0 && (
                              <SecondaryButton
                                className="me-2 border-0"
                                startIcon={
                                  <ArrowUp
                                    color={colors.primary.dark}
                                    size={"20"}
                                    className="me-1"
                                  />
                                }
                                sx={{ color: colors.primary.dark }}
                                variant="text"
                                onClick={() =>
                                  Reorder(
                                    visibleColumns?.map((item) => item?.id),
                                    index
                                  )
                                }
                              >
                                Promote
                              </SecondaryButton>
                            )}
                            {index + 1 !== visibleColumns?.length && (
                              <SecondaryButton
                                className="me-2 border-0"
                                startIcon={
                                  <ArrowDown
                                    color={colors.primary.dark}
                                    size={"20"}
                                    className="me-1"
                                  />
                                }
                                variant="text"
                                sx={{ color: colors.primary.dark }}
                                onClick={() =>
                                  Reorder(
                                    visibleColumns?.map((item) => item?.id),
                                    index,
                                    true
                                  )
                                }
                              >
                                Demote
                              </SecondaryButton>
                            )}
                          </Grid>
                        </Grid>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>

            {/* INVISIBLE COLUMNS TABLE */}

            <Grid item xs={12}>
              <h6> INVISIBLE COLUMNS:</h6>
              <table className="normal-table w-100">
                <thead
                  style={{
                    background: colors.primary.light,
                  }}
                >
                  <th style={{ width: "50%" }}>Column Header Name</th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Column Order
                  </th>
                  <th className="text-center " style={{ width: "35%" }}>
                    Actions
                  </th>
                </thead>
                <tbody>
                  {hiddenColumns?.map((column, index) => (
                    <tr key={column.id}>
                      <td>{column?.Header}</td>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <Grid container display={"flex"} alignItems="center">
                          <Grid
                            item
                            xs={12}
                            display="flex"
                            alignItems={"center"}
                            justifyContent="center"
                          >
                            <CustomSwitch
                              {...column.getToggleHiddenProps()}
                              value={false}
                              offLabel="Unhide"
                            />
                          </Grid>
                        </Grid>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>

          <Grid xs={12} item className="border-top mt-4 pt-3">
            <Box className="d-flex justify-content-end mt-8">
              <SecondaryButton
                className="px-4 text-capitalize me-4"
                sx={{ border: `1px solid ${colors.primary.dark}` }}
                color="black"
                onClick={onClose}
              >
                Close
              </SecondaryButton>
              <PrimaryButton
                isLoading={isLoading}
                onClick={() =>
                  mutate(postTableMetaData(), { onSuccess: () => onClose() })
                }
                variant="contained"
                className="text-capitalize me-4 px-4 "
                type="submit"
              >
                Save Changes
              </PrimaryButton>
            </Box>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
};

export default ManageColumns;
