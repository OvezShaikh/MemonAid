import { Button } from "../button";
import { Dialog } from "../dialog";
import PrimaryButton from '../PrimaryButton'

export const ImagePreviewDialog = ({ croppedImage }) => {
  return (
    <Dialog
      maxWidth="lg"
      title={"Preview Image"}
      button={
        <PrimaryButton
          className={`mt-4 capitalize xl:text-sm 2xl:text-semi-base`}
          variant={"contained"}
        >
          View Image
        </PrimaryButton>
      }
    >
      {() => (
        <>
          <img src={croppedImage} width={400} height={400} alt="" />
        </>
      )}
    </Dialog>
  );
};
