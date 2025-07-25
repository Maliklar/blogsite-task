import { ExternalToast } from "sonner";

type Variants = "success" | "warning" | "error";
export const ToastStyles: {
  [key in Variants]: ExternalToast;
} = {
  success: {
    position: "top-right",
    style: { background: "rgb(142, 194, 77)", color: "white" },
  },
  warning: {
    position: "top-right",
    style: { background: "#ED6C02", color: "white" },
  },
  error: {
    position: "top-right",
    style: { background: "#D32F2F", color: "white" },
  },
};
