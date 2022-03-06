import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import Rows from './Rows';
import Headers from './Headers';
import { createReactTable } from '../utils';
import BaseHeader from '../Headers/Base';

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
    columnEventHandler: customColumnEventHandler,
    data,
    rowEventHandler,
    cellEventHandler,
    prioritizeCellHandler,
  }) => {
    const defaultColumn = {
      minWidth: 40,
      width: 300,
      maxWidth: 300,
    };

    const [bufferData, setBufferData] = useState(data);
    // buffer for insert / deleting columns;
    const [bufferColumns, setBufferColumns] = useState(customColumns);
    const [action, setAction] = useState(null);

    useEffect(() => setBufferData(data), [data]);
    useEffect(() => setBufferColumns(customColumns), [customColumns]);

    const createAction = ({ eventName, type, property, ...data }) => {
      return { eventName, property, data: { ...data } };
    };

    const emitAction = (action) => {
      customColumnEventHandler[action.eventName](action);
    };

    useEffect(() => {
      action && emitAction(action);
      return () => setAction(null);
    }, [bufferData, action]);

    const onSort = ({ type, columnId }) => {
      const compare = (a, b) => {
        if (a[columnId] > b[columnId]) return 1;
        if (a[columnId] < b[columnId]) return -1;
        return 0;
      };
      let sorted = [...bufferData];
      if (type === 'sort-desc') {
        sorted = sorted.sort(compare);
      }

      if (type === 'sort-asc') {
        sorted = sorted.sort(compare).reverse();
      }
      setBufferData(sorted);
      setAction(
        createAction({
          eventName: onSort.name,
          type,
          property: columnId,
          newValue: sorted,
          oldValue: bufferData,
        }),
      );
    };

    const onInsert = ({ type, columnId  }) => {
      let inserted = [...bufferData];
      let index = bufferColumns.findIndex((col) => col.id === columnId );
      const newColumnId = nanoid(11);
      const insertColumn = (row) => {
        const newRow = { ...row };
        // TODO: new column has default type as text
        newRow[newColumnId] = '';
        return newRow;
      };
      if (type === 'insert-left') {
        inserted = inserted.map(insertColumn);
      }

      if (type === 'insert-right') {
        inserted = inserted.map(insertColumn);
        index = index + 1;
      }

      setBufferData(inserted);
      setBufferColumns((prev) => {
        const newColumns = [...prev];
        const newColumn = {
          header: () => <BaseHeader title="New column" />,
          id: newColumnId,
        };
        if (index === newColumns.length) {
          newColumns.push(newColumn);
        } else {
          newColumns.splice(index, 0, newColumn);
        }
        return newColumns;
      });
      setAction(
        createAction({
          eventName: onInsert.name,
          type,
          property: columnId,
          newValue: inserted,
          oldValue: bufferData,
          generatedId: newColumnId,
          insertedAtIndex: index,
        }),
      );
    };

    // TODO: merge customColumnEventHandler with this default handler
    const columnEventHandler = {
      onTypeChange: () => {},
      onSort,
      onInsert,
      onHide: () => {},
      onDuplicate: () => {},
      onDelete: () => {},
    };

    const table = createReactTable({
      data: bufferData,
      columns: bufferColumns,
      defaultColumn,
      columnEventHandler,
    });

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

Table.propTypes = {
  columnEventHandler: PropTypes.instanceOf(Object),
  rowEventHandler: PropTypes.instanceOf(Object),
  cellEventHandler: PropTypes.instanceOf(Object),
  prioritizeCellHandler: PropTypes.bool,
};

export default Table;
