import { ReactElement } from "react";
import Table from "./components/Table";

const ReviewView = (): ReactElement => {
  return (
    <div className="flex flex-column align-items-center mt-4">
      <Table />
    </div>
  );
};

export default ReviewView;
