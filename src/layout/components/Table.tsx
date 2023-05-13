import { ReactElement } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Expense } from "../../types";

const Table = (props: { expenses: Array<Expense> }): ReactElement => {
  const dateBodyTemplate = (rowData: Expense) => {
    return `${rowData.date}`;
  };

  const expenseBodyTemplate = (rowData: Expense) => {
    return `${rowData.expense}%`;
  };

  const typeBodyTemplate = (rowData: Expense) => {
    return `${rowData.type}`;
  };

  const amountBodyTemplate = (rowData: Expense) => {
    return `${formatCurrency(rowData.amount)}`;
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const total = () => {
    let total = 0;

    for (let sale of props.expenses) {
      total += sale.amount;
    }

    return formatCurrency(total);
  };

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Date" sortable field="date" />
        <Column header="Expense" field="expense" />
        <Column header="Type" sortable field="type" />
        <Column header="Amount" sortable field="amount" />
      </Row>
    </ColumnGroup>
  );

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={total} />
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="card">
      <DataTable
        value={props.expenses}
        headerColumnGroup={headerGroup}
        footerColumnGroup={footerGroup}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="date" body={dateBodyTemplate} />
        <Column field="expense" body={expenseBodyTemplate} />
        <Column field="expenseType" body={typeBodyTemplate} />
        <Column field="amount" body={amountBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default Table;
