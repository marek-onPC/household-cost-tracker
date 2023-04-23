import { ChangeEvent, ReactElement, useContext, useState } from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import {
  AppSettingsContext,
  CurrencyFormat,
  CurrencyType,
  DateFormat,
  DateType,
} from "../types";
import { SettingsContext } from "../lib/SettingsContext";

const SettingsView = (): ReactElement => {
  const { settings, setSettings }: AppSettingsContext =
    useContext(SettingsContext);
  const [activeStep, setActiveStep] = useState<number>(0);

  const settingsSteps: Array<MenuItem> = [
    {
      label: "Basic",
    },
    {
      label: "Date format",
    },
    {
      label: "Currency",
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
              maxLength={20}
              value={settings.username ? settings.username : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  username: event.target.value,
                }))
              }
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
              options={dateFormats}
              optionLabel="name"
              className="w-full md:w-14rem"
              value={settings.dateType}
              onChange={(event: ListBoxChangeEvent) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  dateType: event.value,
                }))
              }
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
              options={currencies}
              optionLabel="name"
              className="w-full md:w-14rem"
              value={settings.currencyType}
              onChange={(event: ListBoxChangeEvent) =>
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  currencyType: event.value,
                }))
              }
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
