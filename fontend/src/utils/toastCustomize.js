import { toast } from "react-toastify";

export const toastSuccess = (desc, category = "success") =>
  toast[`${category}`](`${desc}`, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
