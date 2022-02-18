import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Cells from './Cells';

const RowGroupDiv = styled.div`
  display: table-row-group;
`;

const RowDiv = styled.div`
  display: table-row;
  width: 100%;
`;

const Row = ({
  row,
  rowEventHandlers,
  cellEventHandlers,
  prioritizeCellHandlers,
  ...props
}) => {
  const cells = row.getAllCells();
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
        onCellEventsFallback={rowEventHandlers}
        cellEventHandlers={cellEventHandlers}
        prioritizeCellHandlers={prioritizeCellHandlers}
      />
    </RowDiv>
  );
};

Row.whyDidYouRender = {
  logOnDifferentValues: true,
  logOwnerReasons: true,
  customName: 'Row',
};


const Rows = React.memo(({
  tableBodyProps,
  rows,
  rowEventHandlers,
  cellEventHandlers,
  prioritizeCellHandlers,
}) => {
  return (
    <RowGroupDiv {...tableBodyProps}>
      {rows.map((row) => (
        <Row
          {...row.getRowProps()}
          rowEventHandlers={rowEventHandlers}
          cellEventHandlers={cellEventHandlers}
          prioritizeCellHandlers={prioritizeCellHandlers}
          row={row}
        />
      ))}
    </RowGroupDiv>
  );
});

Rows.whyDidYouRender = {
  logOnDifferentValues: true,
  logOwnerReasons: true,
  customName: 'Rows',
};

export default Rows;
