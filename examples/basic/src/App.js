import { useState, useMemo } from "react";
import { ArrayCell, Table, mapColumnsToReactTable } from "react-pocket-table";
import users from "./data/users";

const createColumns = ({ custom }) => {
  const customColumns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Organization", accessor: "organization" },
    {
      Header: "Status",
      accessor: "status",
      //Cell: ({ cell }) => <div>{cell.toString()}</div>,
      Cell: ({ cell }) => <ArrayCell cell={cell} />,
      // ignore custom if Cell is provided by user
      custom,
    },
  ];
  return mapColumnsToReactTable(customColumns);
};

export default function App() {
  const [data, setData] = useState(users);
  const columns = useMemo(
    () =>
      createColumns({
        custom: {
          // TODO: throw error if wrong type is provided
          //       ignore if Cell is provided & hasMenu isn't
          //       type is required if hasMenu: true
          type: "array",
          hasMenu: true, // TODO: default true, hook Menu to a Cell wrapper if Cell is provided
          menuOptions: [
            "admin",
            "super",
            "staff",
            "creator",
            "active",
            "inactive",
          ],
          menuEventHandlers: {
            onChange: ({
              dataKey,
              rowIndex,
              action,
              value,
              index,
              newValue,
              oldValue,
            }) => {
              setData((prev) => {
                const next = [...prev];
                next[rowIndex][dataKey] = newValue;
                return next;
              });
            },
          },
        },
      }),
    []
  );

  const table = useMemo(() => ({ columns, data }), [columns, data]);

  const handleOnRowClick = (args) => {
    // console.log(args);
    console.log("test on row click");
  };

  const handleOnRowMouseEnter = (args) => {
    // console.log(args);
    // console.log('test on row mouse enter');
  };

  const handleOnRowMouseLeave = (args) => {
    // console.log(args);
    // console.log('test on row mouse leave');
  };

  const handleOnCellClick = () => {
    console.log("test on cell click");
  };

  const rowEventHandlers = {
    onClick: (...args) => handleOnRowClick(args),
    onMouseEnter: (...args) => handleOnRowMouseEnter(args),
    onMouseLeave: (...args) => handleOnRowMouseLeave(args),
    onMouseDown: () => {},
    onMouseUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  const cellEventHandlers = {
    name: {
      onClick: () => handleOnCellClick(),
    },
    email: {
      onClick: () => handleOnCellClick(),
    },
  };

  return (
    <>
      <h1>Pocket Table</h1>
      <Table
        {...table}
        rowEventHandlers={rowEventHandlers}
        cellEventHandlers={cellEventHandlers}
        prioritizeCellHandlers={true} // default true
        highlightRowOnHover={true} // default true
      />
    </>
  );
}
