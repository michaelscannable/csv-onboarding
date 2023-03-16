import { type ChangeEvent } from "react";
import { type CellEvent } from "ag-grid-community";

const CheckboxComponent = ({ value, column, node }: CellEvent) => {
  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const colId = column?.getColId();
    node.setDataValue(colId, checked);
  };

  return (
    <input
      type="checkbox"
      onChange={checkboxHandler}
      checked={value as boolean}
    />
  );
};

export default CheckboxComponent;
