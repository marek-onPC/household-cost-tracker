import { ReactElement } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { AppEvents } from "../types";
import SettingsView from "./SettingsView";

const { ipcRenderer } = window.require("electron");

const MainStructure = (): ReactElement => {
  const closeApp = (): void => {
    ipcRenderer.send(AppEvents.CLOSE_APP);
  };

  return (
    <>
      <div className="w-full flex mb-3 justify-content-end">
        <Button
          icon="pi pi-power-off"
          rounded
          aria-label="Quit"
          onClick={closeApp}
        />
      </div>
      <TabView>
        <TabPanel header="Add expenses" leftIcon="pi pi-money-bill mr-3">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel header="Review monthly expenses" leftIcon="pi pi-wallet mr-3">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel
          header="Settings"
          leftIcon="pi pi-cog mr-3"
          className="ml-auto">
          <SettingsView />
        </TabPanel>
      </TabView>
    </>
  );
};

export default MainStructure;
