import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { CSSProperties } from "react";

type NotificationType = "success" | "error" | "info" | "warning";

const defaultStyles: Record<NotificationType, CSSProperties> = {
  success: {
    backgroundColor: "#ECF9EC",
    border: "1px solid #39B53B",
    fontSize: "14px",
    borderRadius: "6px",
  },
  error: {
    backgroundColor: "#FFF1F0",
    border: "1px solid #FFA39E",
    fontSize: "14px",
    borderRadius: "6px",
  },
  info: {
    backgroundColor: "#E6F7FF",
    border: "1px solid #91D5FF",
    fontSize: "14px",
    borderRadius: "6px",
  },
  warning: {
    backgroundColor: "#FFFBE6",
    border: "1px solid #FFE58F",
    fontSize: "14px",
    borderRadius: "6px",
  },
};

export const showNotification = (
  type: NotificationType,
  message: string,
  description: string = "",
  placement: NotificationPlacement = "bottomRight"
): void => {
  notification[type]({
    message,
    description,
    placement,
    style: defaultStyles[type],
  });
};
