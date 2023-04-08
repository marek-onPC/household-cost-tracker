import { app, ipcMain } from "electron";
import { AppEvents } from "../types";

export const closeAppEvent = () => {
  ipcMain.on(AppEvents.CLOSE_APP, () => {
    app.exit();
  });
};
