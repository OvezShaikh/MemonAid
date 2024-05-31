import { RowDelete } from "@carbon/icons-react";
import { useQueryClient } from "react-query";
import Typography from "@mui/material/Typography";
import { Confirm } from "../confirm";
import SecondaryButton from "../../../inputs/secondaryButton";
import { useDelete } from "../../../../Hooks";
import PrimaryButton from "../../../inputs/PrimaryButton";
import { RiDeleteBin6Line } from "react-icons/ri";

export const DeleteBox = ({
  data,
  iconDelete,
  title,
  children,
  url,
  refetchUrl,
  onSuccess,
  onClick,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDelete({
    url,
    name: title || "",
    refetch: () => {
      queryClient.refetchQueries({
        queryKey: [refetchUrl ? refetchUrl : url],
        // stale: true,
        exact: false,
        // predicate: (query) => !query?.options?.params?.download,
      });
    },
  });

  return (
    <Confirm
      isLoading={isLoading}
      onClose={onClose}
      button={
        iconDelete ? (
          <RiDeleteBin6Line className="text-black bg-white  size-5" size={16} />
        ) : (
          <SecondaryButton
            variant="text"
            sx={{ border: "1px solid red" }}
            startIcon={<RowDelete />}
            color="red"
            className="text-capitalize"
            onClick={() => onClick && onClick()}
          >
            <Typography
              className="text-capitalize xl:text-sm 2xl:text-semi-base ms-2"
              sx={{
                lineHeight: "18px",
                fontFamily: "satoshi",
                fontWeight: "500",
                fontSize: {
                  xs: "0.8rem",
                  lg: "0.9rem",
                },
              }}
            >
              Remove
            </Typography>
          </SecondaryButton>
        )
      }
      submitHandler={(onClose) => {
        mutate(data, {
          onSuccess: () => {
            onClose();
            onSuccess && onSuccess();
          },
        });
      }}
      title={`Delete ${title}` || "Delete"}
    >
      <p className="m-0">
        {children || "Are you sure do you want to delete this item?"}
      </p>
    </Confirm>
  );
};
