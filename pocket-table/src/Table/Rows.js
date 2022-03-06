import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Cells from './Cells';

const RowGroupDiv = styled.div`
  display: table-row-group;
  height: 100%;
`;

const RowDiv = styled.div`
  display: table-row;
  width: 100%;
  height: 100%;
`;

const Row = ({
  row,
  rowEventHandler,
  cellEventHandler,
  prioritizeCellHandler,
  ...props
}) => {
  const cells = row.getAllCells();
  const prioritizedrowEventHandler = useMemo(() => {
    if (prioritizeCellHandler) return {};
    return rowEventHandler;
  }, [prioritizeCellHandler, rowEventHandler]);

  const {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
  } = prioritizedrowEventHandler;

  const handleMouseEnter = (...args) => {
    onMouseEnter && onMouseEnter(...args);
  };

  const handleMouseLeave = (...args) => {
    onMouseLeave && onMouseLeave(...args);
  };

  return (
    <RowDiv
      {...props}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Cells
        cells={cells}
        // TODO: pass row data instead of cell data when this
        //       callback is called.
        onCellEventsFallback={rowEventHandler}
        cellEventHandler={cellEventHandler}
        prioritizeCellHandler={prioritizeCellHandler}
      />
    </RowDiv>
  );
};

const Rows = React.memo(({
  tableBodyProps,
  rows,
  rowEventHandler,
  cellEventHandler,
  prioritizeCellHandler,
}) => {
  return (
    <RowGroupDiv {...tableBodyProps}>
      {rows.map((row) => (
        <Row
          {...row.getRowProps()}
          rowEventHandler={rowEventHandler}
          cellEventHandler={cellEventHandler}
          prioritizeCellHandler={prioritizeCellHandler}
          row={row}
        />
      ))}
    </RowGroupDiv>
  );
});

export default Rows;
