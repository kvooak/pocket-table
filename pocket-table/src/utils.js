import { useEffect, useState } from 'react';
import { CellWithMenu, HeaderWithMenu } from './WithMenu';

export const mapColumnsToReactTable = (columns) => {
  const isEmpty = (obj) => {
    return (
      [null, undefined].includes(obj) ||
      (Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype)
    );
  };

  const reactTableColMapper = (col) => {
    const { Header, Cell, custom } = col;
    if (isEmpty(custom)) return col;
    // has both Cell and custom, ignore type,
    // use anchor wrapper for cell menu
    const { type, cellMenu, header } = custom;
    let renderHeader;
    let renderCell;
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
    return {
      ...col,
      Cell: renderCell || col.Cell,
      Header: renderHeader,
    };
  };
  return columns.map(reactTableColMapper);
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
