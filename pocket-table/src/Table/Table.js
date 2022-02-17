import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useBlockLayout, useResizeColumns } from 'react-table';
import { createTable } from '@tanstack/react-table';
import styled from '@emotion/styled';

const CustomTable = styled.div`
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

const CustomTableRowGroup = styled.div`
  display: table-row-group;
`;

const CustomTableHeaderGroup = styled.div`
  display: table-header-group;
`;

const CustomRow = styled.div`
  width: 100%;
  flex: 1 1;
  &.hover {
    .cell {
      background: rgba(55, 53, 47, 0.04);
      transition: all 0.1s;
    }
  }
`;

const CustomCell = styled.div`
  position: relative;
  background: white;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
`;

const Resizer = styled.div`
  display: inline-block;
  background: rgba(55, 53, 47, 0.1);
  width: 3px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  ${'' /* prevents from scrolling while dragging on touch devices */}
  touch-action:none;
  transition: all 0.1s;
  &.resizing {
    width: 8px;
  }
`;

const HeaderDiv = styled.div`
  display: table-cell;
  height: 100%;
`;

const Header = ({ header, ...props }) => {
  const { width, minWidth, maxWidth } = header.column;
  const rendered = header.renderHeader();
  return (
    <HeaderDiv {...props} style={{ width, minWidth, maxWidth }}>
      {rendered}
      {/* TODO: Check again when v8 release with new resizing logic */}
      {/* <Resizer
        {...header.column.getResizerProps()}
        className={`${header.column.isResizing ? 'resizing' : ''}`}
      /> */}
    </HeaderDiv>
  );
};

const Cell = ({ cell, ...props }) => {
  const content = cell.render('Cell');
  return <CustomCell {...props}>{content}</CustomCell>;
};

const Cells = ({
  cells,
  cellEventHandlers,
  onCellEventsFallback,
  prioritizeCellHandlers,
}) => {
  const addHandlers = () => {
    const handlerMapper = (cell) => {
      let eventHandler = {};
      const defaultEventHandler = cellEventHandlers[cell.column.id];
      if (defaultEventHandler) {
        eventHandler = defaultEventHandler;
      } else {
        // enable row event handler via onCellEvents() callback
        // if cell handler is prioritized but no handler
        // is provided by user
        if (prioritizeCellHandlers) {
          // TODO: pass row data instead of cell data when this
          //       callback is called.
          eventHandler = onCellEventsFallback;
        }
      }
      const cellProps = {
        ...cell.getCellProps(),
        ...eventHandler,
      };
      return <Cell className="cell" {...cellProps} cell={cell} />;
    };
    return cells.map(handlerMapper);
  };
  const cellsWithHandlers = addHandlers();
  return cellsWithHandlers;
};

const Row = ({
  row,
  rowEventHandlers,
  cellEventHandlers,
  prioritizeCellHandlers,
  highlightRowOnHover,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  const prioritizedRowEventHandlers = useMemo(() => {
    if (prioritizeCellHandlers) return {};
    return rowEventHandlers;
  }, [prioritizeCellHandlers, rowEventHandlers]);

  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
  } = prioritizedRowEventHandlers;

  const handleMouseEnter = (...args) => {
    if (highlightRowOnHover) setHovered((prev) => !prev);
    onMouseEnter && onMouseEnter(...args);
  };

  const handleMouseLeave = (...args) => {
    if (highlightRowOnHover) setHovered((prev) => !prev);
    onMouseLeave && onMouseLeave(...args);
  };

  return (
    <CustomRow
      {...props}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`${hovered ? 'hover' : ''}`}
    >
      <Cells
        cells={row.cells}
        // TODO: pass row data instead of cell data when this
        //       callback is called.
        onCellEventsFallback={rowEventHandlers}
        cellEventHandlers={cellEventHandlers}
        prioritizeCellHandlers={prioritizeCellHandlers}
      />
    </CustomRow>
  );
};

export default function Table({
  columns: customColumns,
  data,
  rowEventHandlers,
  cellEventHandlers,
  prioritizeCellHandlers,
  highlightRowOnHover,
}) {
  const table = createTable();
  const { createGroup, createColumn, createColumns, useTable } = table;
  const defaultColumn = {
    minWidth: 40,
    width: 300,
    maxWidth: 600,
  };

  const columns = createColumns(
    customColumns.map((col) => {
      const { header, id, cell, custom } = col;
      return createColumn(id, {
        id,
        cell,
        header,
      });
    }),
  );

  const instance = useTable({
    data,
    columns,
    defaultColumn,
  });
  // console.log(instance)

  const {
    getTableProps,
    getTableBodyProps,
    getRows,
    getAllColumns,
    getHeaderGroups,
  } = instance;
  const tableProps = getTableProps();
  const tableBodyProps = getTableBodyProps();
  const rows = getRows();
  const headerGroups = getHeaderGroups();
  const { headers } = headerGroups[0];

  return (
    <CustomTable {...tableProps}>
      <CustomTableHeaderGroup>
        {headers.map((header) => (
          <Header header={header} {...header.getHeaderProps()} />
        ))}
      </CustomTableHeaderGroup>

      <CustomTableRowGroup {...tableBodyProps}>
        {rows.map((row) => {
          return (
            <Row
              {...row.getRowProps()}
              rowEventHandlers={rowEventHandlers}
              cellEventHandlers={cellEventHandlers}
              prioritizeCellHandlers={prioritizeCellHandlers}
              highlightRowOnHover={highlightRowOnHover}
              row={row}
            />
          );
        })}
      </CustomTableRowGroup>
    </CustomTable>
  );
}

Table.defaultProps = {
  rowEventHandlers: {},
  cellEventHandlers: {},
  prioritizeCellHandlers: true,
  highlightRowOnHover: true,
};

Table.propTypes = {
  rowEventHandlers: PropTypes.instanceOf(Object),
  cellEventHandlers: PropTypes.instanceOf(Object),
  prioritizeCellHandlers: PropTypes.bool,
  highlightRowOnHover: PropTypes.bool,
};
