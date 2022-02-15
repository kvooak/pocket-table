import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import MultiselectMenu from './Menus/Multiselect';

// use as anchor for cell menu
const MenuAnchor = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const CellMenu = React.memo(
  ({ cell, type, options, anchorEl, onClose, onMenuEvent }) => {
    if (type === 'multiselect')
      return (
        <MultiselectMenu
          cell={cell}
          options={options}
          anchorEl={anchorEl}
          onClose={onClose}
          onMenuEvent={onMenuEvent}
        />
      );
    return null;
  },
);

const CellWithMenu = React.memo(
  ({ callback, cell, type, menuOptions, onMenuEvent }) => {
    const { key } = cell.getCellProps();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleShowMenu = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
      <>
        <MenuAnchor id={`menu-anchor-${key}`} onClick={handleShowMenu}>
          {callback({ cell })}
        </MenuAnchor>

        <CellMenu
          cell={cell}
          type={type}
          options={menuOptions}
          anchorEl={anchorEl}
          onClose={handleShowMenu}
          onMenuEvent={onMenuEvent}
        />
      </>
    );
  },
);

CellWithMenu.defaultProps = {
  menuOptions: [],
};

CellWithMenu.propTypes = {
  menuOptions: PropTypes.instanceOf(Array),
};

const HeaderMenu = ({
  column,
  type,
  allowInsertColumn,
  allowSort,
  allowTypeChange,
  anchorEl,
  onClose,
  onMenuEvent,
}) => {
  return null;
};

const HeaderWithMenu = ({
  callback,
  column,
  type,
  allowInsertColumn,
  allowSort,
  allowTypeChange,
  onMenuEvent,
}) => {
  const { key } = column.getHeaderProps();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleShowMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <MenuAnchor id={`menu-anchor-${key}`} onClick={handleShowMenu}>
        {typeof callback === 'string' ? callback : callback({ column })}
      </MenuAnchor>

      <HeaderMenu
        column={column}
        type={type}
        allowInsertColumn={allowInsertColumn}
        allowSort={allowSort}
        allowTypeChange={allowTypeChange}
        anchorEl={anchorEl}
        onClose={handleShowMenu}
        onMenuEvent={onMenuEvent}
      />
    </>
  );
};

HeaderWithMenu.defaultProps = {
  allowTypeChange: false,
  allowSort: false,
  allowInsertColumn: false,
  callback: ({ column }) => {},
};

HeaderWithMenu.propTypes = {
  allowTypeChange: PropTypes.bool,
  allowSort: PropTypes.bool,
  allowInsertColumn: PropTypes.bool,
  callback: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

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
          onMenuEvent={headerMenuEventHandlers}
        />
      );
    }
    return {
      ...col,
      Cell: renderCell || col.Cell,
      Header: renderHeader || col.Header,
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
