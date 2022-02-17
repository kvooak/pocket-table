import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Rows from './Rows';
import Headers from './Headers';
import { createReactTable } from '../utils';

const TableDiv = styled.div`
  display: table;
  font-family: 'ui-sans-serif';
  font-size: 0.8rem;
  margin-top: 20px;
  border: 1px solid rgba(55, 53, 47, 0.1);
  border-bottom: 0;
  display: inline-block;
  width: 100%;
  flex: 1 1 600px;
  background: white;
`;
export default function Table({
  columns: customColumns,
  data,
  rowEventHandlers,
  cellEventHandlers,
  prioritizeCellHandlers,
}) {
  const defaultColumn = {
    minWidth: 40,
    width: 300,
    maxWidth: 600,
  };

  const table = createReactTable({
    data,
    columns: customColumns,
    defaultColumn,
  });

  const { getTableProps, getTableBodyProps, getRows, getHeaderGroups } = table;
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
        rowEventHandlers={rowEventHandlers}
        cellEventHandlers={cellEventHandlers}
        prioritizeCellHandlers={prioritizeCellHandlers}
      />
    </TableDiv>
  );
}

Table.defaultProps = {
  rowEventHandlers: {},
  cellEventHandlers: {},
  prioritizeCellHandlers: true,
};

Table.propTypes = {
  rowEventHandlers: PropTypes.instanceOf(Object),
  cellEventHandlers: PropTypes.instanceOf(Object),
  prioritizeCellHandlers: PropTypes.bool,
};
