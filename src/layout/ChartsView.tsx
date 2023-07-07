import { ReactElement, useContext, useEffect, useState } from "react";
import Table from "./components/Table";
import {
  AppEvents,
  AppSettingsContext,
  AvailableExpensesDates,
  Expense,
  MonthlyExpanses,
  YearlyExpanses,
} from "../types";
import { TreeSelect, TreeSelectChangeEvent } from "primereact/treeselect";
import TreeNode from "primereact/treenode";
import { IpcRendererEvent } from "electron";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chart } from "primereact/chart";
import { SettingsContext } from "../../src/lib/SettingsContext";
import { dateFormatter } from "../../src/lib/dateFormatter";

const { ipcRenderer } = window.require("electron");

const ChartsView = (): ReactElement => {
  const [isLoadingDates, setIsLoadingDates] = useState<boolean>(true);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState<boolean>(true);
  const [expenseDates, setExpenseDates] = useState<Array<TreeNode> | null>(
    null
  );
  const [selectedExpenseDate, setSelectedExpenseDate] = useState<string | null>(
    null
  );
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { settings }: AppSettingsContext = useContext(SettingsContext);

  ipcRenderer.once(
    AppEvents.LOAD_AVAILABLE_EXPENSES_DATES_RESPONSE,
    (event: IpcRendererEvent, data: AvailableExpensesDates | null) => {
      if (!data) {
        setTimeout(() => {
          setIsLoadingDates(false);
        }, 1500);
        return;
      }

      const formattedData = data.map((year): YearlyExpanses => {
        return {
          key: year.key,
          label: year.label,
          children: year.children.map((month): MonthlyExpanses => {
            return {
              key: month.key,
              label: dateFormatter(
                new Date(month.key),
                settings.dateType.format
              ),
            };
          }),
          selectable: false,
        };
      });

      setExpenseDates(formattedData);
      setTimeout(() => {
        setIsLoadingDates(false);
      }, 1500);
    }
  );

  ipcRenderer.once(
    AppEvents.LOAD_EXPENSES_RESPONSE,
    (event: IpcRendererEvent, data: string | null) => {
      if (!data) {
        setTimeout(() => {
          setIsLoadingExpenses(false);
        }, 1500);
        return;
      }
      const { data: parsedData } = JSON.parse(data) as { data: Array<Expense> };

      const expenseTypes = [...new Set(parsedData.map((item) => item.type))];
      const expenseAmounts = new Array();

      expenseTypes.forEach((type) => {
        expenseAmounts.push(
          parsedData
            .filter((item) => item.type === type && item)
            .map((item) => item.amount)
            .reduce((sum, item) => sum + item, 0)
        );
      });

      const documentStyle = getComputedStyle(document.documentElement);
      const preformattedChartData = {
        labels: expenseTypes,
        datasets: [
          {
            data: expenseAmounts,
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--yellow-500"),
              documentStyle.getPropertyValue("--green-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--yellow-400"),
              documentStyle.getPropertyValue("--green-400"),
            ],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      };

      setChartData(preformattedChartData);
      setChartOptions(options);

      setTimeout(() => {
        setIsLoadingExpenses(false);
      }, 1500);
    }
  );

  useEffect(() => {
    ipcRenderer.send(AppEvents.LOAD_AVAILABLE_EXPENSES_DATES);
  }, [setExpenseDates]);

  useEffect(() => {
    selectedExpenseDate &&
      ipcRenderer.send(AppEvents.LOAD_EXPENSES, selectedExpenseDate);
  }, [selectedExpenseDate]);

  return (
    <div className="flex flex-column align-items-center mt-4">
      {isLoadingDates ? (
        <div className="w-full h-10 flex flex-column align-items-center">
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
              placeholder="Select date"
            />
          </div>
          {selectedExpenseDate ? (
            <>
              {isLoadingExpenses && !chartData ? (
                <div className="w-full h-5 flex flex-column align-items-center">
                  <ProgressSpinner
                    className="mt-8"
                    style={{ width: "50px", height: "50px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </div>
              ) : (
                <Chart
                  type="pie"
                  data={chartData}
                  options={chartOptions}
                  className="w-full md:w-30rem"
                />
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ChartsView;
