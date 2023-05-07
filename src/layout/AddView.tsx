import { useState, ReactElement, useContext, ChangeEvent } from "react";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { SettingsContext } from "../lib/SettingsContext";

const AddView = (): ReactElement => {
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const [expense, setExpense] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { settings } = useContext(SettingsContext);

  const addExpense = (): void => {
    if (!!date && !!expense && !!amount) {
      console.log(
        `Date ${new Date(
          date.toString()
        ).toISOString()} | Expense ${expense} | Amount ${amount} `
      );
    }

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="flex flex-column align-items-center mt-4">
      <div className="flex flex-wrap justify-content-center">
        <Calendar
          className="mx-2"
          value={date}
          placeholder={settings.dateType.format}
          onChange={(event: CalendarChangeEvent) => setDate(event.value)}
          showIcon
          dateFormat={settings.dateType.format}
        />
        <InputText
          className="mx-2"
          value={expense}
          placeholder="Expense name"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setExpense(event.target.value)
          }
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
