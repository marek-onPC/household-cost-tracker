import { Dispatch, SetStateAction } from "react";

export enum AppEvents {
  CLOSE_APP = "close_app",
  SAVE_SETTINGS = "save_settings",
  SAVE_SETTINGS_RESPONSE = "save_settings_response",
  LOAD_SETTINGS = "load_settings",
  LOAD_SETTINGS_RESPONSE = "load_settings_response",
}

export enum DateType {
  DDMMYYYY = "DD.MM.YYYY",
  MMDDYYYY = "MM.DD.YYYY",
  YYYYMMDD = "YYYY.MM.DD",
  ASIA_YYYYMMDD = "年YYYY月MM日DD",
}

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
  format: CurrencyType;
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
