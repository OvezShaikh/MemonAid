// import CloseIcon from "./CloseIcon";
// import ImageCropper from "../Cropper/ImageCropper"
import { FaTimes } from "react-icons/fa";

const Modal = ({closeModal,setDataUrl , name ,setImage}) => {

  return (
    <div
      className="relative z-[9999999999999999999999999]"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-200 text-slate-600 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-800 hover:bg-gray-200 focus:outline-none absolute top-2 right-2"
              >
                <span className="sr-only">Close menu</span>
                <FaTimes />
              </button>
              {/* <ImageCrop  name ={name}closeModal={closeModal} setDataUrl={setDataUrl} setImage={setImage} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;