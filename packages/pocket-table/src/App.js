import { useMemo } from 'react';
import ArrayCell from './Cells/ArrayCell/ArrayCell';
import users from './data/users';
import Table from './Table/Table';
import { mapColumnsToReactTable } from './utils';

const COLUMNS = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Organization', accessor: 'organization' },
  {
    Header: 'Status',
    accessor: 'status',
    //Cell: ({ cell }) => <div>{cell.toString()}</div>,
    Cell: ({ cell }) => <ArrayCell cell={cell} />,
    // ignore custom if Cell is provided by user
    custom: {
      // TODO: throw error if wrong type is provided
      //       ignore if Cell is provided & hasMenu isn't
      //       type is required if hasMenu: true
      type: 'array',
      hasMenu: true, // TODO: default true, hook Menu to a Cell wrapper if Cell is provided
      menuEventHandlers: {}, // TODO: onChange.
    },
  },
];

export default function App() {
  const data = users;
  const CONVERTED_COLUMNS = useMemo(
    () => mapColumnsToReactTable(COLUMNS),
    [mapColumnsToReactTable],
  );
  const table = { columns: CONVERTED_COLUMNS, data };

  const handleOnRowClick = (args) => {
    // console.log(args);
    console.log('test on row click');
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
    console.log('test on cell click');
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
