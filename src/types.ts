import { Dispatch, SetStateAction } from "react";

export enum AppEvents {
  CLOSE_APP = "close_app",
  SAVE_SETTINGS = "save_settings",
  SAVE_SETTINGS_RESPONSE = "save_settings_response",
  LOAD_SETTINGS = "load_settings",
  LOAD_SETTINGS_RESPONSE = "load_settings_response",
}

export enum DateType {
  DDMMYYYY = "dd.mm.yy",
  MMDDYYYY = "mm.dd.yyy",
  YYYYMMDD = "yy.mm.dd",
  ASIA_YYYYMMDD = "年yy月mm日dd",
}

export type CurrencyCode = "USD" | "EUR" | "YEN" | "PLN";

export enum CurrencyType {
  USD = "US Dollar",
  EUR = "Euro",
  YEN = "Japanese Yen",
  PLN = "Polish zloty",
}

export interface DateFormat {
  name: DateType;
  format: DateType;
}

export interface CurrencyFormat {
  name: CurrencyType;
  format: CurrencyCode;
}

export interface AppSettings {
  username: string | null;
  dateType: DateFormat | null;
  currencyType: CurrencyFormat | null;
}

export interface AppSettingsContext {
  settings: AppSettings;
  setSettings?: Dispatch<SetStateAction<AppSettings>>;
}
