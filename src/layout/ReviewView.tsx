import { ReactElement, useEffect, useState } from "react";
import Table from "./components/Table";
import { AppEvents, AvailableExpensesDates, ExpenseType } from "../types";
import { TreeSelect, TreeSelectChangeEvent } from "primereact/treeselect";
import TreeNode from "primereact/treenode";
import { IpcRendererEvent } from "electron";
import { ProgressSpinner } from "primereact/progressspinner";

const { ipcRenderer } = window.require("electron");

const ReviewView = (): ReactElement => {
  const [isLoadingDates, setIsLoadingDates] = useState<boolean>(true);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(true);
  const [expenseDates, setExpenseDates] = useState<Array<TreeNode> | null>(
    null
  );
  const [selectedExpenseDate, setSelectedExpenseDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    setExpenseDates([
      {
        key: "2022",
        label: "2022",
        selectable: false,
        children: [
          {
            key: "2022-5",
            label: "2022-5",
          },
          {
            key: "2022-6",
            label: "2022-6",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    ipcRenderer.send(AppEvents.LOAD_AVAILABLE_EXPENSES_DATES);

    ipcRenderer.once(
      AppEvents.LOAD_AVAILABLE_EXPENSES_DATES_RESPONSE,
      (event: IpcRendererEvent, data: AvailableExpensesDates | null) => {
        if (!data) {
          setTimeout(() => {
            setIsLoadingDates(false);
          }, 500);
          return;
        }

        setExpenseDates(data);
        setTimeout(() => {
          setIsLoadingDates(false);
        }, 500);
      }
    );
  }, [setExpenseDates]);

  return (
    <div className="flex flex-column align-items-center mt-4">
      {isLoadingExpenses ? (
        <div className="w-full h-screen flex flex-column align-items-center">
          <ProgressSpinner
            className="mt-8"
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <>
          <div className="card flex justify-content-center">
            <TreeSelect
              value={selectedExpenseDate}
              options={expenseDates}
              onChange={(event: TreeSelectChangeEvent) =>
                setSelectedExpenseDate(event.value.toString())
              }
              className="md:w-20rem w-full mb-5"
              placeholder="Select date"></TreeSelect>
          </div>
          <Table
            expenses={[
              {
                date: new Date(),
                expense: "Watch",
                type: ExpenseType.OTHER,
                amount: 1231,
              },
              {
                date: new Date(),
                expense: "Black Watch",
                type: ExpenseType.HOUSING_RENT,
                amount: 4231321,
              },
              {
                date: new Date(),
                expense: "Watch asdasd",
                type: ExpenseType.OTHER,
                amount: 123111,
              },
            ]}
          />
        </>
      )}
    </div>
  );
};

export default ReviewView;