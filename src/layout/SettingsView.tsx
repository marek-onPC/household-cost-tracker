import { ReactElement, useState } from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import { CurrencyFormat, CurrencyType, DateFormat, DateType } from "../types";

const SettingsView = (): ReactElement => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedDateFormat, setSelectedDateFormat] =
    useState<DateType | null>(null);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyType | null>(null);

  const settingsSteps: Array<MenuItem> = [
    {
      label: "Basic",
      command: (event: MenuItemCommandEvent) => {
        console.log(event);
      },
    },
    {
      label: "Date format",
      command: (event: MenuItemCommandEvent) => {
        console.log(event);
      },
    },
    {
      label: "Currency",
      command: (event: MenuItemCommandEvent) => {
        console.log(event);
      },
    },
  ];
  const dateFormats: Array<DateFormat> = [
    { name: DateType.DDMMYYYY, format: DateType.DDMMYYYY },
    { name: DateType.MMDDYYYY, format: DateType.MMDDYYYY },
    { name: DateType.YYYYMMDD, format: DateType.YYYYMMDD },
    { name: DateType.ASIA_YYYYMMDD, format: DateType.ASIA_YYYYMMDD },
  ];

  const currencies: Array<CurrencyFormat> = [
    { name: CurrencyType.EUR, format: CurrencyType.EUR },
    { name: CurrencyType.USD, format: CurrencyType.USD },
    { name: CurrencyType.YEN, format: CurrencyType.YEN },
    { name: CurrencyType.PLN, format: CurrencyType.PLN },
  ];

  return (
    <div>
      <Steps
        model={settingsSteps}
        activeIndex={activeStep}
        onSelect={(event: StepsSelectEvent) => setActiveStep(event.index)}
        readOnly={false}
      />
      {activeStep === 0 ? (
        <div className="card flex justify-content-center align-items-center mt-3">
          <div className="flex flex-column gap-2">
            <InputText
              id="username"
              aria-describedby="username-help"
              placeholder="Name"
            />
            <small id="username-help" className="mt-2">
              Enter your name.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-check"
              rounded
              aria-label="Filter"
              size="small"
            />
          </div>
        </div>
      ) : null}

      {activeStep === 1 ? (
        <div className="card flex justify-content-center align-items-center mt-3">
          <div className="card flex flex-column gap-2 justify-content-center">
            <ListBox
              value={selectedDateFormat}
              onChange={(event: ListBoxChangeEvent) =>
                setSelectedDateFormat(event.value.format)
              }
              options={dateFormats}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
            <small id="dateformat-help" className="mt-2">
              Select date format you want to use.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-check"
              rounded
              aria-label="Filter"
              size="small"
            />
          </div>
        </div>
      ) : null}

      {activeStep === 2 ? (
        <div className="card flex justify-content-center align-items-center mt-3">
          <div className="card flex flex-column gap-2 justify-content-center">
            <ListBox
              value={selectedCurrency}
              onChange={(event: ListBoxChangeEvent) =>
                setSelectedCurrency(event.value.value)
              }
              options={currencies}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
            <small id="dateformat-help" className="mt-2">
              Select currency you want to use.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-check"
              rounded
              aria-label="Filter"
              size="small"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SettingsView;
