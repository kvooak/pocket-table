import { useEffect, useState } from 'react';
import { createTable } from '@tanstack/react-table';
import { CellWithMenu, HeaderWithMenu } from './WithMenu';
import { BaseHeader } from '.';

// make sure that each column will have
// header, cell, id properties
export const mapColumnsToReactTable = ({
  createColumn,
  customColumns,
}) => {
  const isEmpty = (obj) => {
    return (
      [null, undefined].includes(obj) ||
      (Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype)
    );
  };

  const reactTableColMapper = (col) => {
    const { id, header: Header, cell: Cell, custom } = col;
    let renderHeader = () => <BaseHeader title={id} />;
    let renderCell = (info) => info.value;

    if (!isEmpty(custom)) {
      const { type, cellMenu, header } = custom;
      if (cellMenu) {
        const { menuOptions, menuEventHandlers: cellMenuEventHandlers } =
          cellMenu;
        renderCell = ({ cell }) => (
          <CellWithMenu
            cell={cell}
            callback={Cell}
            type={type}
            menuOptions={menuOptions}
            onMenuEvent={cellMenuEventHandlers}
          />
        );
      }

      if (header) {
        const {
          allowTypeChange,
          allowSort,
          allowInsertColumn,
          allowHide,
          allowDuplicate,
          allowDelete,
          menuEventHandlers: headerMenuEventHandlers,
        } = header;

        renderHeader = ({ column }) => (
          <HeaderWithMenu
            column={column}
            callback={Header}
            type={type}
            allowInsertColumn={allowInsertColumn}
            allowTypeChange={allowTypeChange}
            allowSort={allowSort}
            allowHide={allowHide}
            allowDuplicate={allowDuplicate}
            allowDelete={allowDelete}
            onMenuEvent={headerMenuEventHandlers}
          />
        );
      }
    }
    const reactTableColumn = createColumn(id, {
      cell: renderCell,
      header: renderHeader,
    });
    return reactTableColumn;
  };
  return customColumns.map(reactTableColMapper);
};

export const createReactTable = ({
  data,
  columns: customColumns,
  defaultColumn,
}) => {
  const table = createTable();
  const { createColumn, useTable } = table;
  const columns = mapColumnsToReactTable({
    createColumn,
    customColumns,
  });
  const instance = useTable({
    data,
    columns,
    defaultColumn,
  });
  return instance;
};

export const useKeyPress = (element = window) => {
  const [key, setKey] = useState(null);
  const eventHandler = (event) => {
    setKey(event.key);
  };

  useEffect(() => {
    element.addEventListener('keydown', eventHandler);
    return () => {
      element.removeEventListener('keydown', eventHandler);
      setKey(null);
    };
  }, [key]);

  return key;
};
