export interface Alert {
  header: string;
  subHeader?: string;
  message?: string;
  buttons: (string | AlertButton)[];
}

export interface AlertButton {
  text: string,
  role?: AlertButtonRole,
  handler?: (value: any) => AlertButtonOverlayHandler | Promise<AlertButtonOverlayHandler>;
}

type AlertButtonRole = null | "confirm" | "cancel";

type AlertButtonOverlayHandler = boolean | void | { [key: string]: any };
