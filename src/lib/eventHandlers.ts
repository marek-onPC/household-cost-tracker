import { app, ipcMain } from "electron";
import { AppEvents, AppSettingsContext } from "../types";
import fs from "fs";
import { USER_DATA_PATH } from "../constants";

export const closeAppEvent = () => {
  ipcMain.on(AppEvents.CLOSE_APP, () => {
    app.exit();
  });
};

export const saveSettingsEvent = () => {
  ipcMain.on(
    AppEvents.SAVE_SETTINGS,
    (event: Electron.IpcMainEvent, data: AppSettingsContext) => {
      const mtime = new Date().toISOString();

      fs.writeFile(
        USER_DATA_PATH + "/config.json",
        JSON.stringify({ ...data, mtime: mtime }),
        () => {
          event.reply(AppEvents.SAVE_SETTINGS_RESPONSE, USER_DATA_PATH);
        }
      );
    }
  );
};
