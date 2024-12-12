import { toast } from "react-toastify";
import { MESSAGE_TOAST_ERROR_TYPE } from "../utilities/Constants.d";

export const useShowMessageToast = () => {

      const ShowMessageToast = (messageError: string, toastTypeError: string) => {
            switch (toastTypeError) {
                  case MESSAGE_TOAST_ERROR_TYPE.INFO:
                        toast.info(messageError, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        break;
                  case MESSAGE_TOAST_ERROR_TYPE.SUCCESS:
                        toast.success(messageError, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        break;
                  case MESSAGE_TOAST_ERROR_TYPE.WARNING:
                        toast.warning(messageError, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        break;
                  case MESSAGE_TOAST_ERROR_TYPE.ERROR:
                        toast.error(messageError, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        break;

                  default:
                        break;
            }
      }

      return { ShowMessageToast };
};