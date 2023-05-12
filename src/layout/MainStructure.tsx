import { ReactElement, useEffect, useMemo, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppEvents, AppSettings, AppSettingsContext } from "../types";
import SettingsView from "./SettingsView";
import { SettingsContext } from "../lib/SettingsContext";
import { IpcRendererEvent } from "electron";
import AddView from "./AddView";
import ReviewView from "./ReviewView";

const { ipcRenderer } = window.require("electron");

const MainStructure = (): ReactElement => {
  const [settingsValue, setSettingsValue] = useState<AppSettings>({
    username: null,
    dateType: null,
    currencyType: null,
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  const closeApp = (): void => {
    ipcRenderer.send(AppEvents.CLOSE_APP);
  };

  const settingsContentProvider = useMemo<AppSettingsContext>(
    () => ({
      settings: settingsValue,
      setSettings: setSettingsValue,
    }),
    [settingsValue, setSettingsValue]
  );

  const shouldGrantAccess = () => {
    return (
      !settingsValue.currencyType ||
      !settingsValue.dateType ||
      !settingsValue.username
    );
  };

  useEffect(() => {
    ipcRenderer.send(AppEvents.LOAD_SETTINGS);

    ipcRenderer.once(
      AppEvents.LOAD_SETTINGS_RESPONSE,
      (event: IpcRendererEvent, data: AppSettings | null) => {
        if (!data) {
          setTimeout(() => {
            setIsLoadingSettings(false);
          }, 1000);
          return;
        }

        settingsContentProvider.setSettings(data);
        setTimeout(() => {
          setIsLoadingSettings(false);
        }, 1000);
      }
    );
  }, [settingsContentProvider.setSettings]);

  return (
    <SettingsContext.Provider value={settingsContentProvider}>
      {isLoadingSettings ? (
        <div className="w-full h-screen flex flex-column align-items-center ">
          <h1
            className="text-5xl font-light mt-8 text-indigo-200"
            style={{ letterSpacing: "1.25px" }}>
            Household Cost Tracker
          </h1>
          <ProgressSpinner
            className="mt-8"
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div className="fadein">
          <div className="w-full flex mb-3 justify-content-end">
            <Button
              icon="pi pi-power-off"
              rounded
              aria-label="Quit"
              onClick={closeApp}
            />
          </div>
          <TabView activeIndex={shouldGrantAccess() ? 2 : 0}>
            <TabPanel
              header="Add expenses"
              leftIcon="pi pi-money-bill mr-3"
              disabled={shouldGrantAccess()}>
              <AddView />
            </TabPanel>
            <TabPanel
              header="Review monthly expenses"
              leftIcon="pi pi-wallet mr-3"
              disabled={shouldGrantAccess()}>
              <ReviewView />
            </TabPanel>
            <TabPanel
              header="Settings"
              leftIcon="pi pi-cog mr-3"
              className="ml-auto">
              <SettingsView />
            </TabPanel>
          </TabView>
        </div>
      )}
    </SettingsContext.Provider>
  );
};

export default MainStructure;
