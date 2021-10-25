import { toast } from "react-toastify";
export const useNotify = (message, type) => {
  toast(message, {
    position: "top-center",
    autoClose: 7000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: type,
    theme: "colored",
    progress: undefined,
  });
};
