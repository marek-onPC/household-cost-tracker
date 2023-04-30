import { app, ipcMain } from "electron";
import { AppEvents, AppSettingsContext } from "../types";

export const closeAppEvent = () => {
  ipcMain.on(AppEvents.CLOSE_APP, () => {
    app.exit();
  });
};

export const saveSettingsEvent = () => {
  ipcMain.on(
    AppEvents.SAVE_SETTINGS,
    (event: Electron.IpcMainEvent, data: AppSettingsContext) => {
      console.log(data);
    }
  );
};
