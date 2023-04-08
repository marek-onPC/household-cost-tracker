import { ReactElement, useState } from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import { DateFormat } from "../types";

const SettingsView = (): ReactElement => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedDateFormat, setSelectedDateFormat] =
    useState<DateFormat | null>(null);

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
      label: "Currencies",
      command: (event: MenuItemCommandEvent) => {
        console.log(event);
      },
    },
  ];
  const dateFormats: DateFormat[] = [
    { name: "DD.MM.YYYY", format: "DD.MM.YYYY" },
    { name: "MM.DD.YYYY", format: "MM.DD.YYYY" },
    { name: "YYYY.MM.DD", format: "YYYY.MM.DD" },
    { name: "年YYYY月MM日DD", format: "年YYYY月MM日DD" },
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
                setSelectedDateFormat(event.value)
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
    </div>
  );
};

export default SettingsView;
