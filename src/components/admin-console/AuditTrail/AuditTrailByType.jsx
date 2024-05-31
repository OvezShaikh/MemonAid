import React, { useEffect, useRef, useState } from "react";
import SelectField from "../../inputs/SelectField";
import PrimaryButton from "../../inputs/PrimaryButton";
import { Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { PrimaryAccordion } from "../../layouts/accordion/primary";
import { useDebounce, useGetAll } from "../../../hooks";
import moment from "moment/moment";

const fieldsMapping = {
  // active: "status",
};

const AuditTrailByType = ({ byUser }) => {
  let fieldsToOmit = [
    "created_at",
    "updated_at",
    "updated_by_email",
    "updated_by_dn",
    "created_by_email",
    "created_by_dn",
    "id",
    "location_id",
    "dial",
    "reserved_phone_number_range_id",
    "assigned_user_policy_id",
    "phone_number_range_id",
    "active",
    "contact_number",
    "actual_number",
    "reserved_phone_number_range_id",
    "assigned_user_policy_id",
    "phone_number_range_id",
    "teams_app_permission_policy_id",
    "teams_calling_policy_id",
    "caller_policy_id",
    "teams_app_setup_policy_id",
    "teams_call_park_policy_id",
    "teams_app_park_policy_id",
    "teams_meeting_policy_id",
    "teams_live_events_policy_id",
    "teams_messaging_policy_id",
    "online_voice_routing_policy_id",
    "teams_profile",
    "range_from",
    "range_to",
  ];

  let fieldsToOmitForNestedObj = [
    "created_at",
    "updated_at",
    "updated_by_email",
    "updated_by_dn",
    "created_by_email",
    "created_by_dn",
    "id",
    "location_id",
    "dial",
    "reserved_phone_number_range_id",
    "assigned_user_policy_id",
    "phone_number_range_id",
    "teams_app_permission_policy_id",
    "teams_calling_policy_id",
    "caller_policy_id",
    "teams_app_setup_policy_id",
    "teams_call_park_policy_id",
    "teams_app_park_policy_id",
    "teams_meeting_policy_id",
    "teams_live_events_policy_id",
    "teams_messaging_policy_id",
    "online_voice_routing_policy_id",
    "teams_profile",
    "active",
  ];
  if (!byUser) {
    fieldsToOmit = [...fieldsToOmit, "Number"];
  }
  if (byUser) {
    fieldsToOmit = [...fieldsToOmit, "display_name", "email"];
    fieldsToOmitForNestedObj = [
      ...fieldsToOmitForNestedObj,
      "display_name",
      "email",
    ];
  }

  const [userSearch, setUserSearch] = useState("");
  const query = useDebounce(userSearch || "", 1000);

  const [auditData, setAuditData] = useState(null);
  const [location, setLocation] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [user, setUser] = useState(null);
  const params = byUser
    ? { type: "By User", user_email: user?.mail || user?.userPrincipalName }
    : { type: "By Number", phone_number_id: phoneNo?.id };

  const { refetch, isLoading } = useGetAll({
    key: `/admin/audittrial_by_type`,
    params: {
      location_id: location?.id,
      ...params,
    },
    select: (data) => data?.data?.data?.rows,
    enabled: false,
    onSuccess: (data) => setAuditData(data),
  });

  const { data: LocationData } = useGetAll({
    key: `/admin/location`,
    select: (data) => data?.data?.data?.rows,
  });

  const { data: PhoneData, refetch: refetchPhoneData } = useGetAll({
    key: `/numbers/ranges/PhoneNumbers`,
    params: { location_id: location?.id },
    select: (data) => data?.data?.data?.rows,
    enabled: false,
  });

  const { data: userData, refetch: refetchUserData } = useGetAll({
    key: `/admin/user`,
    params: { type: "ad", location_id: location?.id, search: query },
    select: (data) => data?.data?.data,
    enabled: false,
  });

  useEffect(() => {
    if (location?.id) {
      refetchPhoneData();
    }
    //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (query?.length >= 3) {
      refetchUserData();
    }
    //eslint-disable-next-line
  }, [query]);

  const keyFormatter = (value) => {
    return (
      <p className="text-capitalize mb-0">
        {fieldsMapping[value]
          ? fieldsMapping[value]
          : value?.replace(/_/g, " ")}
      </p>
    );
  };

  const checkVisibility = (changes) => {
    let show = null;

    changes?.before !== null &&
      changes?.before !== undefined &&
      Object.entries(changes?.before)?.map(([key, value]) =>
        typeof value === "object" && value !== null
          ? changes?.after[key] !== null &&
            changes?.after[key] !== undefined &&
            Object.entries(changes?.after[key])?.map(([subKey]) =>
              !fieldsToOmitForNestedObj?.includes(subKey) ? (show = true) : null
            )
          : !fieldsToOmit?.includes(key)
          ? (show = true)
          : null
      );
    return show;
  };

  return (
    <Grid container>
      <Grid item xs={12} className="border-bottom pb-4 mb-5">
        <Formik
          initialValues={{ location: {} }}
          onSubmit={() => {
            refetch();
          }}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <Grid
                container
                className="d-flex align-items-center"
                columnSpacing={2}
              >
                <Grid item xs={4} sm={4} md={3}>
                  <SelectField
                    name={"location"}
                    noLabel
                    options={LocationData ? LocationData : []}
                    onChange={(value) => {
                      setLocation(value);
                      setFieldValue("location", value);
                      setAuditData(null);
                    }}
                    getOptionLabel={(option) => option?.location || ""}
                    placeholder={"Select Location"}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={3}>
                  {byUser ? (
                    <SelectField
                      name={"user"}
                      noLabel
                      placeholder={"Select User"}
                      options={userData ? userData : []}
                      onChange={(value) => {
                        setFieldValue("user", value);
                        setUser(value);
                        setAuditData(null);
                      }}
                      onInputChange={(e) => setUserSearch(e.target.value)}
                      getOptionLabel={(option) => option?.displayName || ""}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {`${option?.displayName} (${
                            option?.mail
                              ? option?.mail
                              : option?.userPrincipalName
                          })`}
                        </Box>
                      )}
                      disable={
                        values?.location
                          ? Object?.keys(values?.location)?.length < 1
                          : true
                      }
                    />
                  ) : (
                    <SelectField
                      name={"phone"}
                      noLabel
                      placeholder={"Select Phone"}
                      options={PhoneData ? PhoneData : []}
                      onChange={(value) => {
                        setFieldValue("phone", value);
                        setPhoneNo(value);
                        setAuditData(null);
                      }}
                      getOptionLabel={(option) => option?.contact_number || ""}
                      disable={
                        values?.location
                          ? Object?.keys(values?.location)?.length < 1
                          : true
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={4} sm={4} md={3}>
                  <PrimaryButton
                    isLoading={isLoading}
                    onClick={() => submitForm()}
                    type="button"
                  >
                    Search
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={12}>
        {auditData &&
          auditData?.map((item) => {
            let changes = JSON.parse(item?.changes);
            if (byUser && item?.action === "Create") {
              return <></>;
            }

            return (
              <>
                {checkVisibility(changes) && (
                  <PrimaryAccordion
                    header={
                      <p className="m-0">
                        {item?.action}d by:{" "}
                        <span className="text-primary">
                          {`${item?.created_by_dn} (${item?.created_by_email})`}
                        </span>
                      </p>
                    }
                    headerRight={moment(item?.updated_at).format(
                      "hh:mm a | DD/MM/YYYY"
                    )}
                  >
                    <Grid
                      container
                      style={{
                        border: "1px solid #E5E5E5",
                        borderRadius: "4px",
                        padding: "1rem",
                      }}
                    >
                      {changes?.before !== null &&
                        changes?.before !== undefined &&
                        Object.entries(changes?.before)?.map(([key, value]) => (
                          <>
                            {typeof value === "object" && value !== null ? (
                              changes?.after[key] !== null &&
                              changes?.after[key] !== undefined &&
                              Object.entries(changes?.after[key])?.map(
                                ([subKey, subValue]) => (
                                  <>
                                    {!fieldsToOmitForNestedObj?.includes(
                                      subKey
                                    ) && (
                                      <Grid container item className="mb-2">
                                        <Grid
                                          item
                                          xs={12}
                                          className="mb-2 mt-2"
                                        >
                                          {keyFormatter(subKey)}
                                        </Grid>
                                        <Grid
                                          container
                                          item
                                          xs={12}
                                          className="border-bottom border-light"
                                        >
                                          <Grid item xs={12} md={6}>
                                            <p className="text-primary mb-0">
                                              Previous:
                                            </p>
                                            <p className="font-light">
                                              {changes?.before[key][subKey]}
                                            </p>
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                            <p className="text-primary mb-0">
                                              New:
                                            </p>
                                            <p className="font-light">
                                              {subValue}
                                            </p>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    )}
                                  </>
                                )
                              )
                            ) : (
                              <>
                                {!fieldsToOmit?.includes(key) && (
                                  <Grid container item className="mb-2">
                                    <Grid item xs={12} className="mb-2">
                                      {keyFormatter(key)}
                                    </Grid>
                                    <Grid
                                      container
                                      item
                                      xs={12}
                                      className="border-bottom border-light"
                                    >
                                      <Grid item xs={12} md={6}>
                                        <p className="text-primary mb-0">
                                          {" "}
                                          Previous:
                                        </p>
                                        <p className="font-light">{value}</p>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <p className="text-primary mb-0">
                                          {" "}
                                          New:
                                        </p>
                                        <p className="font-light">
                                          {changes?.after[key]}
                                        </p>
                                      </Grid>
                                    </Grid>{" "}
                                  </Grid>
                                )}
                              </>
                            )}
                          </>
                        ))}
                    </Grid>
                  </PrimaryAccordion>
                )}{" "}
              </>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default AuditTrailByType;
