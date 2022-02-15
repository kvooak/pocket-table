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
    if (type === 'array')
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
        <MenuAnchor
          id={`menu-anchor-${key}`}
          className="menu-anchor"
          onClick={handleShowMenu}
        >
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

export const mapColumnsToReactTable = (columns) => {
  const isEmpty = (obj) => {
    return (
      [null, undefined].includes(obj) ||
      (Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype)
    );
  };

  const reactTableColMapper = (col) => {
    const { Cell, custom } = col;
    if (isEmpty(custom)) return col;
    if (!Cell) {
      // no cell but has custom, return complete
      // custom cell with auto-detected type
      return null;
    }
    // has both Cell and custom, ignore type,
    // use anchor wrapper for cell menu
    const { type, hasMenu, menuOptions, menuEventHandlers } = custom;
    if (!hasMenu) return col;
    return {
      ...col,
      Cell: ({ cell }) => (
        <CellWithMenu
          callback={Cell}
          cell={cell}
          type={type}
          menuOptions={menuOptions}
          onMenuEvent={menuEventHandlers}
        />
      ),
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
