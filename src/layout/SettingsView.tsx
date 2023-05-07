import {
  ChangeEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import {
  AppEvents,
  AppSettings,
  AppSettingsContext,
  CurrencyFormat,
  CurrencyType,
  DateFormat,
  DateType,
} from "../types";
import { SettingsContext } from "../lib/SettingsContext";
import { IpcRendererEvent } from "electron";

const { ipcRenderer } = window.require("electron");

const SettingsView = (): ReactElement => {
  const { settings, setSettings }: AppSettingsContext =
    useContext(SettingsContext);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [nameField, setNameField] = useState<string | null>(null);
  const [dateFormatField, setDateFormatField] = useState<DateFormat | null>(
    null
  );
  const [currencyField, setCurrencyField] = useState<CurrencyFormat | null>(
    null
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

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
    {
      label: "Save",
    },
  ];
  const dateFormats: Array<DateFormat> = [
    { name: DateType.DDMMYYYY, format: DateType.DDMMYYYY },
    { name: DateType.MMDDYYYY, format: DateType.MMDDYYYY },
    { name: DateType.YYYYMMDD, format: DateType.YYYYMMDD },
    { name: DateType.ASIA_YYYYMMDD, format: DateType.ASIA_YYYYMMDD },
  ];

  const currencies: Array<CurrencyFormat> = [
    { name: CurrencyType.EUR, format: "EUR" },
    { name: CurrencyType.USD, format: "USD" },
    { name: CurrencyType.YEN, format: "YEN" },
    { name: CurrencyType.PLN, format: "PLN" },
  ];

  const disableSaveButton = () => {
    if (nameField && dateFormatField && currencyField) {
      return false;
    } else {
      return true;
    }
  };

  const saveSettings = (): void => {
    setIsSaving(true);
    ipcRenderer.send(AppEvents.SAVE_SETTINGS, {
      username: nameField,
      dateType: dateFormatField,
      currencyType: currencyField,
    });

    ipcRenderer.once(
      AppEvents.SAVE_SETTINGS_RESPONSE,
      (event: IpcRendererEvent, data: AppSettings | null) => {
        setTimeout(() => {
          setSettings(data);
          setIsSaving(false);
        }, 1000);
      }
    );
  };

  useEffect(() => {
    setNameField(settings.username);
    setDateFormatField(settings.dateType);
    setCurrencyField(settings.currencyType);
  }, [settings]);

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
              value={nameField ? nameField : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNameField(event.target.value)
              }
            />
            <small id="username-help" className="mt-2">
              Enter your name.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-chevron-right"
              rounded
              aria-label="Filter"
              size="small"
              onClick={() => {
                setActiveStep(1);
              }}
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
              value={dateFormatField}
              onChange={(event: ListBoxChangeEvent) =>
                setDateFormatField(event.value)
              }
            />
            <small id="dateformat-help" className="mt-2">
              Select date format you want to use.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-chevron-right"
              rounded
              aria-label="Filter"
              size="small"
              onClick={() => {
                setActiveStep(2);
              }}
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
              value={currencyField}
              onChange={(event: ListBoxChangeEvent) =>
                setCurrencyField(event.value)
              }
            />
            <small id="dateformat-help" className="mt-2">
              Select currency you want to use.
            </small>
          </div>
          <div className="ml-5 mb-5">
            <Button
              icon="pi pi-chevron-right"
              rounded
              aria-label="Filter"
              size="small"
              onClick={() => {
                setActiveStep(3);
              }}
            />
          </div>
        </div>
      ) : null}

      {activeStep === 3 ? (
        <div className="card flex justify-content-center align-items-center mt-3">
          <Button
            label={isSaving ? "... saving" : "Save settings"}
            icon={isSaving ? "pi pi-spin pi-spinner" : "pi pi-check"}
            disabled={disableSaveButton() || isSaving}
            onClick={saveSettings}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SettingsView;
