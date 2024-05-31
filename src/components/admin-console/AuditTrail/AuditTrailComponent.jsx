import moment from "moment/moment";
import React, { useContext } from "react";
import ReactTable from "../../layouts/ReactTable";
import * as libphonenumber from "google-libphonenumber";
import CommonContext from "../../../context/commonContext/CommonContext";

let phoneUtils = libphonenumber.PhoneNumberUtil.getInstance();

let formatNumber = (number) => {
  return phoneUtils.format(
    phoneUtils.parse(number),
    libphonenumber.PhoneNumberFormat.INTERNATIONAL
  );
};

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
  "online_voice_routing_policy_id",
  "country_id",
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
  // "user_policy_obj",
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
];

const fieldsMapping = {
  // active: "status",
  reserved_phone_number_range_id: "reserved_phone_number_range",
  assigned_user_policy_id: "assigned_user_policy",
  phone_number_range_id: "phone_number_range",
  teams_app_permission_policy_id: "teams_app_permission_policy",
  teams_calling_policy_id: "teams_calling_policy",
  caller_policy_id: "caller_policy",
  teams_app_setup_policy_id: "teams_app_setup_policy",
  teams_call_park_policy_id: "teams_call_park_policy",
  teams_app_park_policy_id: "teams_app_park_policy",
  teams_meeting_policy_id: "teams_meeting_policy",
  teams_live_events_policy_id: "teams_live_events_policy",
  teams_messaging_policy_id: "teams_messaging_policy",
  online_voice_routing_policy_id: "online_voice_routing_policy",
};

const FormatChanges = (key, value, data) => {
  let dial = data?.PhoneNumberRange?.dial || data?.PhoneNumber?.dial;
  let Changes = data?.changes ? JSON.parse(data?.changes) : {};
  let visibleCondition = (subKey) =>
    subKey === "Number"
      ? !fieldsToOmitForNestedObj?.includes(subKey)
      : !fieldsToOmitForNestedObj?.includes(subKey) &&
        Changes?.before[key][subKey] !== Changes?.after[key][subKey];

  let obj = {
    range_from: () =>
      value !== "-" && dial ? formatNumber(dial + value) : value,
    range_to: () =>
      value !== "-" && dial ? formatNumber(dial + value) : value,
    description: () => (
      <div
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      />
    ),
  };

  return obj[key]
    ? obj[key]()
    : typeof value === "object" && value !== null
    ? Object.entries(value)?.map(
        ([subKey, subValue]) =>
          visibleCondition(subKey) && (
            <p className="mb-1 text-truncate">
              {(fieldsMapping[subKey]
                ? fieldsMapping[subKey]
                : subKey
              )?.replace(/_/g, " ")}{" "}
              : {FormatChanges(subKey, subValue, data)}{" "}
            </p>
          )
      )
    : value === true
    ? "true"
    : value;
};

const AuditTrailComponent = () => {
  const { globalLocation } = useContext(CommonContext);

  const columns = React.useMemo(
    () => [
      {
        Header: "UPDATED BY",
        accessor: "created_by_dn",
        minWidth: 180,
        apiURL: `/admin/user`,
        apiParams: {
          type: "ad",
          location_id: globalLocation?.id,
        },
        label: "displayName",
        width: 180,
      },
      {
        Header: "USER",
        accessor: "user",
        minWidth: 180,
        width: 180,
        apiURL: `/admin/user`,
        label: "displayName",
        apiParams: {
          type: "ad",
          location_id: globalLocation?.id,
        },
        Cell: ({ row }) => (
          <p>
            {row?.original?.reference_model === "AssignedUserPolicies"
              ? JSON.parse(row?.original?.changes)?.after?.display_name
              : row?.original?.user}
          </p>
        ),
      },
      {
        Header: "COUNTRY",
        accessor: "PhoneNumberRange.Location.Country.country",
        minWidth: 150,
        apiURL: "/admin/location/country",
        width: 150,
        sortable: false,
        Cell: ({ row }) => {
          return (
            <p className="text-truncate">
              {row?.original?.PhoneNumberRange
                ? row?.original?.PhoneNumberRange?.Location?.Country?.country
                : row?.original?.ReservedPhoneNumberRange?.Location?.Country
                    ?.country}
            </p>
          );
        },
      },
      {
        Header: "ACTION",
        accessor: "action",
        minWidth: 120,
        width: 120,
        nofilter: true,
      },
      {
        Header: "ITEM",
        accessor: "reference_model",
        minWidth: 200,
        width: 220,
        options: [
          "PhoneNumber",
          "PhoneNumberRange",
          "ReservedPhoneNumberRange",
          "AssignedUserPolicies",
          "Location",
        ],
      },
      {
        Header: "SUB ITEM(S)",
        accessor: "subitem",
        minWidth: 200,
        nofilter: true,
        width: 280,
        sortable: false,
        Cell: ({ row }) => {
          let Model =
            row?.original?.PhoneNumberRange ||
            row?.original?.ReservedPhoneNumberRange;
          return Model ? (
            <p className="mb-0 text-truncate">
              {formatNumber(Model?.dial + Model?.range_from)}
              &nbsp; to &nbsp; <br />
              {formatNumber(Model?.dial + Model?.range_to)}
            </p>
          ) : (
            <></>
          );
        },
      },
      {
        Header: "CHANGES",
        accessor: "changes",
        minWidth: 200,
        nofilter: true,
        width: 280,
        sortable: false,
        Cell: ({ row }) => {
          let changes = row?.original?.changes
            ? JSON.parse(row?.original?.changes)
            : {};

          let visibleCondition = (key) =>
            key === "Number"
              ? !fieldsToOmit?.includes(key)
              : !fieldsToOmit?.includes(key) &&
                changes?.before[key] !== changes?.after[key];

          return (
            <div
              style={{
                height: "100%",
                width: "100%",
                whiteSpace: "normal",
                padding: "5px 0px",
              }}
            >
              <u className="text-primary">Before:</u>
              {row?.original?.changes &&
                Object?.entries(changes?.before)?.map(([key, value]) => {
                  return (
                    visibleCondition(key) && (
                      <p className="mb-1 text-truncate">
                        {key !== "user_policy_obj"
                          ? `${(fieldsMapping[key]
                              ? fieldsMapping[key]
                              : key
                            )?.replace(/_/g, " ")} : `
                          : ""}
                        {FormatChanges(key, value, row?.original)}{" "}
                      </p>
                    )
                  );
                })}
              <br />
              <u className="text-primary">After:</u>
              {row?.original?.changes &&
                Object?.entries(changes?.after)?.map(([key, value]) => {
                  return (
                    visibleCondition(key) && (
                      <p className="mb-1 text-truncate">
                        {key !== "user_policy_obj"
                          ? `${(fieldsMapping[key]
                              ? fieldsMapping[key]
                              : key
                            )?.replace(/_/g, " ")} : `
                          : ""}
                        {FormatChanges(key, value, row?.original)}{" "}
                      </p>
                    )
                  );
                })}
            </div>
          );
        },
      },
      {
        Header: "TIMELINE",
        accessor: "updated_at",
        minWidth: 180,
        width: 180,
        sortable: false,
        nofilter: true,
        Cell: ({ row }) => (
          <p className="mb-0 text-truncate ">
            {moment(row?.original?.updated_at).format("DD/MM/YYYY , H:mm:s a")}
          </p>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ReactTable
      url={`/admin/audittrials`}
      downloadExcel
      title={"AUDIT TRAIL"}
      showFilter={false}
      columns={columns}
      rows={[]}
      rowHeight={"auto"}
    />
  );
};

export default AuditTrailComponent;
