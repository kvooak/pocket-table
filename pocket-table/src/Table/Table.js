import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Rows from './Rows';
import Headers from './Headers';
import { createReactTable } from '../utils';

const TableDiv = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  font-size: inherit;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif, 'ui-sans-serif';
  color: rgba(55, 53, 47, 0.96);
  margin-top: 20px;
  border: 1px solid rgba(55, 53, 47, 0.1);
  border-bottom: 0;
  background: white;
`;
const Table = React.memo(
  ({
    columns: customColumns,
    data,
    columnEventHandler,
    rowEventHandler,
    cellEventHandler,
    prioritizeCellHandler,
  }) => {
    const defaultColumn = {
      minWidth: 40,
      width: 300,
      maxWidth: 300,
    };

    const [sorting, setSorting] = useState([]);
    const table = createReactTable({
      data,
      columns: customColumns,
      defaultColumn,
      state: {
        sorting: true,
      },
      onSortingChange: setSorting,
    });
    console.log(table)

    const { getTableProps, getTableBodyProps, getRows, getHeaderGroups } =
      table;
    const tableProps = getTableProps();
    const tableBodyProps = getTableBodyProps();
    const rows = getRows();
    const headerGroups = getHeaderGroups();
    const { headers } = headerGroups[0];

    return (
      <TableDiv {...tableProps}>
        <Headers headers={headers} />
        <Rows
          tableBodyProps={tableBodyProps}
          rows={rows}
          rowEventHandler={rowEventHandler}
          cellEventHandler={cellEventHandler}
          prioritizeCellHandler={prioritizeCellHandler}
        />
      </TableDiv>
    );
  },
);

Table.defaultProps = {
  columnEventHandler: {},
  rowEventHandler: {},
  cellEventHandler: {},
  prioritizeCellHandler: true,
};

// Table.whyDidYouRender = {
//   logOnDifferentValues: true,
//   logOwnerReasons: true,
//   customName: 'Table',
// };

Table.propTypes = {
  columnEventHandler: PropTypes.instanceOf(Object),
  rowEventHandler: PropTypes.instanceOf(Object),
  cellEventHandler: PropTypes.instanceOf(Object),
  prioritizeCellHandler: PropTypes.bool,
};

export default Table;
