import { createContext } from "react";
import { AppSettingsContext } from "../types";

export const SettingsContext = createContext<AppSettingsContext>({
  settings: {
    username: null,
    dateType: null,
    currencyType: null,
  },
});
