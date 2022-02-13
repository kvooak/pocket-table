# react-pocket-table

A React table component built on `react-table` and `Material UI` with flexibility in mind.

<a href="https://npm.im/react-pocket-table"><img src="https://badgen.net/npm/license/react-pocket-table"></a>
<a href="https://npm.im/react-pocket-table"><img src="https://badgen.net/npm/v/react-pocket-table"></a>

## Install

```bash
# npm
npm install react-pocket-table --save
# yarn
yarn add react-pocket-table
```

## Basic Usage Example

```JSX
import { useState, useMemo } from "react";
import { ArrayCell, Table, mapColumnsToReactTable } from "react-pocket-table";
import apiGetUserData from './apiGetUserData';

const createColumns = ({ custom }) => {
  const customColumns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Organization", accessor: "organization" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => <ArrayCell cell={cell} />,
      custom,
    },
  ];
  return mapColumnsToReactTable(customColumns);
};

export default function App() {
  const [data, setData] = useState(apiGetUserData());
  const columns = useMemo(
    () =>
      createColumns({
        custom: {
          type: "array",
          hasMenu: true,
          menuOptions: [],
          menuEventHandlers: {},
      }),
    []
  );

  const table = useMemo(() => ({ columns, data }), [columns, data]);

  const handleOnRowClick = () => {
    // logic
  };

  const handleOnRowMouseEnter = () => {
    // logic
  };

  const handleOnRowMouseLeave = () => {
    // logic
  };


  const rowEventHandlers = {
    onClick: handleOnRowClick,
    onMouseEnter: handleOnRowMouseEnter,
    onMouseLeave: handleOnRowMouseLeave,
    // onMouseDown: () => {},
    // onMouseUp: () => {},
    // onFocus: () => {},
    // onBlur: () => {},
  };

  const handleOnCellClick = () => {
    // logic
  };

  const cellEventHandlers = {
    name: {
      onClick: () => handleOnCellClick(),
      // onMouseEnter: () => {},
      // onMouseLeave: () => {},
      // onMouseDown: () => {},
      // onMouseUp: () => {},
      // onFocus: () => {},
      // onBlur: () => {},
    },
    // other data properties...
  };

  return (
    <Table
      {...table}
      rowEventHandlers={rowEventHandlers}
      cellEventHandlers={cellEventHandlers}
      prioritizeCellHandlers={false} // default true
      highlightRowOnHover={false} // default true
    />
  );
`

```
