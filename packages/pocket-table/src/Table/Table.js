import React, { useMemo, useState } from 'react';
import { useBlockLayout, useResizeColumns, useTable } from 'react-table';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const CustomTable = styled.div`
  display: table;
  margin-top: 20px;
  font-weight: 500;
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

const CustomTableHeaderGroup = styled.div``;

const CustomHeader = styled.div`
  position: relative;
  font-weight: 600;
  cursor: pointer;
  color: rgba(55, 53, 47, 0.8);
  background: white;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  border-right: 1px solid rgba(55, 53, 47, 0.1);
  margin: 0;
  padding: 0.5rem;
  &.hover {
    transition: 100ms;
    margin-top: -1px;
    background: rgba(55, 53, 47, 0.08);
  }
`;
const CustomRow = styled.div`
  width: 100%;
  flex: 1 1;
  &.hover {
    .cell {
      margin-top: -1px;
      border-bottom: 1px solid rgba(55, 53, 47, 0.6);
      border-top: 1px solid rgba(55, 53, 47, 0.6);
    }
  }
`;

const CustomCell = styled.div`
  position: relative;
  background: white;
  border-left: 1px solid rgba(55, 53, 47, 0);
  border-right: 1px solid rgba(55, 53, 47, 0);
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  margin: 0;
  padding: 0.5rem;
  height: 100%;
  width: 100%;
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
  &.resizing {
    width: 8px;
  }
`;

const Header = ({ column, ...props }) => {
  const content = column.render('Header');
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = () => {
    setHovered(!hovered);
  };
  return (
    <CustomHeader
      className={`header ${hovered ? 'hover' : ''}`}
      role="button"
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
      {...props}
    >
      {content}
      <Resizer
        {...column.getResizerProps()}
        className={`${column.isResizing ? 'resizing' : ''}`}
      />
    </CustomHeader>
  );
};

const LinkWrapper = ({ path, children }) => {
  const style = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'inline-block',
  };
  // if (path)
  //   return (
  //     <Link to={path} style={style}>
  //       {children}
  //     </Link>
  //   );
  return <>{children}</>;
};

const Cell = ({ cell, ...props }) => {
  const content = cell.render('Cell');
  return (
    <LinkWrapper path={props.path}>
      <CustomCell className="cell" {...props}>
        {content}
      </CustomCell>
    </LinkWrapper>
  );
};

const Row = ({ row, ...props }) => {
  const { _id: path } = row.original;
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = () => {
    setHovered(!hovered);
  };

  return (
    <CustomRow
      {...props}
      className={`${hovered ? 'hover' : ''}`}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      {row.cells.map((cell) => (
        <Cell
          className={`cell ${hovered ? 'row-hover' : ''}`}
          {...cell.getCellProps()}
          cell={cell}
          path={path}
        />
      ))}
    </CustomRow>
  );
};

export default function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 40,
      width: 300,
      maxWidth: 600,
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout,
      useResizeColumns,
    );

  const tableProps = useMemo(() => getTableProps(), [getTableProps]);
  const tableBodyProps = useMemo(
    () => getTableBodyProps(),
    [getTableBodyProps],
  );

  return (
    <CustomTable {...tableProps}>
      <CustomTableHeaderGroup>
        {headers.map((column) => (
          <Header {...column.getHeaderProps()} column={column} />
        ))}
      </CustomTableHeaderGroup>

      <CustomTableRowGroup {...tableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return <Row {...row.getRowProps()} row={row} />;
        })}
      </CustomTableRowGroup>
    </CustomTable>
  );
}
