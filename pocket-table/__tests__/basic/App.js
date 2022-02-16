import { useState, useMemo } from 'react';
import {
  BaseHeader,
  MultiselectCell,
  Table,
  mapColumnsToReactTable,
} from '../../src/index';
import users from './data/users';
import { rowEventHandlers, cellEventHandlers, menuOptions } from './utils';

export const createColumns = ({ custom }) => {
  const customColumns = [
    {
      // Header: ({ column }) => <BaseHeader title="Name" />,
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: () => <BaseHeader title="Email" />,
      accessor: 'email',
    },
    {
      Header: () => <BaseHeader title="Organization" />,
      accessor: 'organization',
    },
    {
      Header: () => <BaseHeader title="Status" />,
      accessor: 'status',
      //Cell: ({ cell }) => <div>{cell.toString()}</div>,
      Cell: ({ cell }) => <MultiselectCell cell={cell} />,
      // ignore custom if Cell is provided by user
      custom,
    },
  ];
  return customColumns;
};

export default function App() {
  const [data, setData] = useState(users);
  const columns = useMemo(() => {
    const customColumns = createColumns({
      custom: {
        // TODO: throw error if wrong type is provided
        //       ignore if Cell is provided & hasMenu isn't
        //       type is required if hasMenu: true
        type: 'multiselect',
        header: {
          allowTypeChange: false,
          allowSort: true,
          allowInsertColumn: true,
          allowHide: true,
          allowDuplicate: true,
          allowDelete: true,
        },
        cellMenu: {
          menuOptions,
          menuEventHandlers: {
            onChange: (event) => {
              const { dataKey, rowIndex, newValue } = event;
              setData((prev) => {
                const next = [...prev];
                next[rowIndex][dataKey] = newValue;
                return next;
              });
            },
          },
        },
      },
    });
    return mapColumnsToReactTable(customColumns);
  }, []);

  const table = useMemo(() => ({ columns, data }), [columns, data]);

  return (
    <Table
      {...table}
      rowEventHandlers={rowEventHandlers}
      cellEventHandlers={cellEventHandlers}
      prioritizeCellHandlers={true}
      highlightRowOnHover={true}
    />
  );
}
