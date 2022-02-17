import styled from '@emotion/styled';

const CellDiv = styled.div`
  display: table-cell;
  position: relative;
  background: white;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
`;

const Cell = ({ cell, ...props }) => {
  const content = cell.renderCell();
  return <CellDiv {...props}>{content}</CellDiv>;
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

export default Cells;
