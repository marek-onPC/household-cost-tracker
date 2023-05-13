import { ReactElement } from "react";
import Table from "./components/Table";
import { ExpenseType } from "../types";

const ReviewView = (): ReactElement => {
  return (
    <div className="flex flex-column align-items-center mt-4">
      <Table expenses={[
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
      ]} />
    </div>
  );
};

export default ReviewView;
