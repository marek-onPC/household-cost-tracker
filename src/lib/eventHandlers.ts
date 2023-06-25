import { app, ipcMain } from "electron";
import {
  AppEvents,
  AppSettingsContext,
  AvailableExpensesDates,
  Expense,
  ExpenseFileStructure,
  MonthlyExpanses,
  YearlyExpanses,
} from "../types";
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

export const saveExpenseEvent = () => {
  ipcMain.on(
    AppEvents.SAVE_EXPENSE,
    (event: Electron.IpcMainEvent, expenseData: Expense) => {
      const YEAR = expenseData.date.getFullYear();
      const MONTH = expenseData.date.getMonth() + 1;
      const DIR = `${USER_DATA_PATH}/expenses/${YEAR}`;

      if (!fs.existsSync(DIR)) {
        fs.mkdirSync(DIR, { recursive: true });
      }

      if (!fs.existsSync(DIR)) {
        fs.mkdirSync(DIR, { recursive: true });
      }

      fs.readFile(`${DIR}/${MONTH}.json`, "utf8", (err, data) => {
        if (err && err.code === "ENOENT") {
          fs.writeFile(
            `${DIR}/${MONTH}.json`,
            JSON.stringify({ data: [expenseData] } as ExpenseFileStructure),
            (err) => {
              if (err) {
                event.reply(AppEvents.SAVE_EXPENSE_RESPONSE, false);
              } else {
                event.reply(AppEvents.SAVE_EXPENSE_RESPONSE, true);
              }
            }
          );
        } else {
          const json = JSON.parse(data) as ExpenseFileStructure;
          json.data.push(expenseData);

          fs.writeFile(`${DIR}/${MONTH}.json`, JSON.stringify(json), (err) => {
            if (err) {
              event.reply(AppEvents.SAVE_EXPENSE_RESPONSE, false);
            } else {
              event.reply(AppEvents.SAVE_EXPENSE_RESPONSE, true);
            }
          });
        }
      });
    }
  );
};

export const loadAvailableExpensesDatesEvent = () => {
  ipcMain.on(
    AppEvents.LOAD_AVAILABLE_EXPENSES_DATES,
    (event: Electron.IpcMainEvent) => {
      const availableExpensesDates: AvailableExpensesDates | null = new Array();

      fs.readdirSync(`${USER_DATA_PATH}/expenses`).forEach((yearDir) => {
        if (!Number.isNaN(Number.parseInt(yearDir))) {
          const yearString = Number.parseInt(yearDir).toString();
          const monthlyExpanses: Array<MonthlyExpanses> | null = new Array();

          fs.readdirSync(`${USER_DATA_PATH}/expenses/${yearDir}`).forEach(
            (monthDir) => {
              if (!Number.isNaN(Number.parseInt(monthDir))) {
                const monthString = Number.parseInt(monthDir).toString();

                monthlyExpanses.push({
                  key: `${yearString}-${monthString}`,
                  label: monthString,
                });
              }
            }
          );

          availableExpensesDates.push({
            key: yearString,
            label: yearString,
            selectable: false,
            children: monthlyExpanses,
          });
        }
      });

      if (!availableExpensesDates) {
        event.reply(AppEvents.LOAD_AVAILABLE_EXPENSES_DATES_RESPONSE, {
          error: "No entries available",
        });
      } else {
        event.reply(
          AppEvents.LOAD_AVAILABLE_EXPENSES_DATES_RESPONSE,
          availableExpensesDates
        );
      }
    }
  );
};
