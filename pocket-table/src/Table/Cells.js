import styled from '@emotion/styled';

const CellDiv = styled.div`
  display: table-cell;
  height: 100%;
  width: 100%;
  position: relative;
  background: none;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  padding-left: 8px;
`;

const Cell = ({ cell, ...props }) => {
  const content = cell.renderCell();
  return <CellDiv {...props}>{content}</CellDiv>;
};

const Cells = ({
  cells,
  cellEventHandler,
  onCellEventsFallback,
  prioritizeCellHandler,
}) => {
  const addHandlers = () => {
    const handlerMapper = (cell) => {
      let eventHandler = {};
      const defaultEventHandler = cellEventHandler[cell.column.id];
      if (defaultEventHandler) {
        eventHandler = defaultEventHandler;
      } else {
        // enable row event handler via onCellEvents() callback
        // if cell handler is prioritized but no handler
        // is provided by user
        if (prioritizeCellHandler) {
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

Cells.whyDidYouRender = {
  logOnDifferentValues: true,
  logOwnerReasons: true,
  customName: 'Cells',
};

export default Cells;
