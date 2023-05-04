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
          event.reply(AppEvents.SAVE_SETTINGS_RESPONSE, data);
        }
      );
    }
  );
};

export const loadSettingsEvent = () => {
  ipcMain.on(AppEvents.LOAD_SETTINGS, (event: Electron.IpcMainEvent) => {
    fs.readFile(USER_DATA_PATH + "/config.json", "utf8", (error, data) => {
      if (error) {
        event.reply(AppEvents.LOAD_SETTINGS_RESPONSE, null);
      } else {
        let settingsData: string | null;
        try {
          settingsData = JSON.parse(data);
        } catch (error) {
          settingsData = null;
        }
        event.reply(AppEvents.LOAD_SETTINGS_RESPONSE, settingsData);
      }
    });
  });
};
