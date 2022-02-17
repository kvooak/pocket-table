import { useState, useMemo } from 'react';
import { BaseHeader, MultiselectCell, Table } from '../../src/index';
import users from './data/users';
import { rowEventHandlers, cellEventHandlers, menuOptions } from './utils';

export const createColumns = ({ menuEventHandlers }) => {
  const customColumns = [
    {
      header: () => <BaseHeader title="Name" />,
      id: 'name',
    },
    {
      header: () => <BaseHeader title="Email" />,
      id: 'email',
    },
    {
      header: () => <BaseHeader title="Organization" />,
      id: 'organization',
    },
    {
      header: () => <BaseHeader title="Status" />,
      id: 'status',
      cell: ({ cell }) => <MultiselectCell cell={cell} />,
      // ignore custom if Cell is provided by user
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
          menuEventHandlers,
        },
      },
    },
  ];
  return customColumns;
};

export default function App() {
  const [data, setData] = useState(users);
  const columns = useMemo(() => {
    const menuEventHandlers = {
      onChange: (event) => {
        const { dataKey, rowIndex, newValue } = event;
        setData((prev) => {
          const next = [...prev];
          next[rowIndex][dataKey] = newValue;
          return next;
        });
      },
    };
    return createColumns({ menuEventHandlers });
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
