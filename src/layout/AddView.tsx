import { useState, ReactElement, useContext, ChangeEvent, useRef } from "react";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SettingsContext } from "../lib/SettingsContext";
import { AppEvents, Expense, ExpenseDropdown, ExpenseType } from "../types";
import { IpcRendererEvent } from "electron";
import { Toast } from "primereact/toast";

const { ipcRenderer } = window.require("electron");

const AddView = (): ReactElement => {
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const [expense, setExpense] = useState<string>("");
  const [expenseType, setExpenseType] = useState<ExpenseType | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { settings } = useContext(SettingsContext);

  const toast = useRef<Toast>(null);

  const expenses: Array<ExpenseDropdown> = [
    { name: ExpenseType.OTHER },
    { name: ExpenseType.HOUSING_RENT },
    { name: ExpenseType.TRANSPORTATION },
    { name: ExpenseType.FOOD_SUPPLIES },
    { name: ExpenseType.UTILITIES },
    { name: ExpenseType.MEDICAL_HEALTH },
    { name: ExpenseType.DINING_OUT },
  ];

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Expense added",
      life: 2000,
    });
  };

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Error with adding expense",
      life: 3000,
    });
  };

  const addExpense = (): void => {
    if (!!date && !!expense && !!amount) {
      setIsSaving(true);

      ipcRenderer.send(AppEvents.SAVE_EXPENSE, {
        date: date,
        expense: expense,
        type: expenseType,
        amount: amount,
      } as Expense);

      ipcRenderer.once(
        AppEvents.SAVE_EXPENSE_RESPONSE,
        (event: IpcRendererEvent, data: boolean) => {
          setTimeout(() => {
            setIsSaving(false);

            if (data) {
              showSuccess();
            } else {
              showError();
            }
            setDate(null);
            setExpense("");
            setExpenseType(null);
            setAmount(null);
          }, 1000);
        }
      );
    }
  };

  return (
    <div className="flex flex-column align-items-center mt-4">
      <Toast ref={toast} position="bottom-right" />
      <div className="flex flex-wrap justify-content-center">
        <Calendar
          className="mx-2"
          value={date}
          placeholder={settings.dateType.format}
          onChange={(event: CalendarChangeEvent) => setDate(event.value)}
          showIcon
          dateFormat={settings.dateType.format}
          maxDate={new Date()}
        />
        <InputText
          className="mx-2"
          value={expense}
          placeholder="Expense name"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setExpense(event.target.value)
          }
        />
      </div>
      <div className="flex flex-wrap justify-content-center mt-4">
        <Dropdown
          className="w-full md:w-14rem mx-2"
          value={{ name: expenseType }}
          onChange={(event: DropdownChangeEvent) =>
            setExpenseType(event.value.name)
          }
          options={expenses}
          optionLabel="name"
          placeholder="Select an expense type"
        />
        <InputNumber
          className="mx-2"
          inputId="currency-us"
          value={amount}
          placeholder={settings.currencyType.format}
          onChange={(event: InputNumberChangeEvent) => setAmount(event.value)}
          mode="currency"
          currency={settings.currencyType.format}
          locale="en-US"
        />
      </div>
      <Button
        className="mt-5"
        label={isSaving ? "... adding" : "Add"}
        icon={isSaving ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        disabled={!date || !expense || !amount || isSaving}
        onClick={addExpense}
      />
    </div>
  );
};

export default AddView;
