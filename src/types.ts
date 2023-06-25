import { Dispatch, SetStateAction } from "react";

export enum AppEvents {
  CLOSE_APP = "close_app",
  SAVE_SETTINGS = "save_settings",
  SAVE_SETTINGS_RESPONSE = "save_settings_response",
  LOAD_SETTINGS = "load_settings",
  LOAD_SETTINGS_RESPONSE = "load_settings_response",
  SAVE_EXPENSE = "save_expense",
  SAVE_EXPENSE_RESPONSE = "save_expense_response",
  LOAD_EXPENSES = "load_expenses",
  LOAD_EXPENSES_RESPONSE = "load_expenses_response",
  LOAD_AVAILABLE_EXPENSES_DATES = "load_available_expenses_dates",
  LOAD_AVAILABLE_EXPENSES_DATES_RESPONSE = "load_available_expenses_dates_response",
}

export enum ExpenseType {
  OTHER = "Other",
  HOUSING_RENT = "Housing and Rent",
  TRANSPORTATION = "Transportation",
  FOOD_SUPPLIES = "Food and daily supplies",
  UTILITIES = "Utilities",
  MEDICAL_HEALTH = "Medical and Health",
  DINING_OUT = "Dining out and restaurants",
  ENTERTAINMENT = "Entertainment",
}

export interface ExpenseDropdown {
  name: ExpenseType;
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

export interface Expense {
  date: Date;
  expense: string;
  type: ExpenseType;
  amount: number;
}

export interface ExpenseFileStructure {
  data: Array<Expense>;
}

export type MonthlyExpanses = {
  key: string;
  label: string;
};

export type YearlyExpanses = {
  key: string;
  label: string;
  selectable?: boolean;
  children?: Array<MonthlyExpanses>;
};

export type AvailableExpensesDates = Array<YearlyExpanses>;
