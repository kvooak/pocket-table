import ArrayCell from './Cells/ArrayCell';
import users from './data/users';
import Table from './Table/Table';

const COLUMNS = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Organization', accessor: 'organization' },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ cell }) => <ArrayCell cell={cell} />,
  },
];

export default function App() {
  const data = users;
  const table = { columns: COLUMNS, data };
  const handleOnRowClick = (args) => {
    // console.log(args)
    console.log('test on row click');
  };

  const handleOnCellClick = () => {
    console.log('test on cell click');
  };

  const rowEventHandlers = {
    onClick: (...args) => handleOnRowClick(args),
  };

  const cellEventHandlers = {
    name: {
      onClick: () => handleOnCellClick(),
    },
    email: {
      onClick: () => handleOnCellClick(),
    }
  }

  return (
    <>
      <h1>Pocket Table</h1>
      <Table
        {...table}
        rowEventHandlers={rowEventHandlers}
        cellEventHandlers={cellEventHandlers}
        prioritizeCellHandlers={true} // default true
      />
    </>
  );
}
