import { ReactElement, useEffect, useState } from "react";
import Table from "./components/Table";
import { ExpenseType } from "../types";
import { TreeSelect, TreeSelectChangeEvent } from "primereact/treeselect";
import TreeNode from "primereact/treenode";

const ReviewView = (): ReactElement => {
  const [expenseDates, setExpenseDates] = useState<Array<TreeNode> | null>(
    null
  );
  const [selectedExpenseDate, setSelectedExpenseDate] = useState<string | null>(null);

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

  return (
    <div className="flex flex-column align-items-center mt-4">
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
    </div>
  );
};

export default ReviewView;
