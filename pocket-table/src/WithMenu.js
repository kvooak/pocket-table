import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import MultiselectMenu from './Menus/Multiselect';
import HeaderMenu from './Menus/HeaderMenu';

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

export const CellWithMenu = React.memo(
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

export const HeaderWithMenu = ({
  callback,
  column,
  type,
  allowInsertColumn,
  allowSort,
  allowTypeChange,
  allowHide,
  allowDuplicate,
  allowDelete,
  onMenuEvent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleShowMenu = useCallback(
    (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    },
    [anchorEl, setAnchorEl],
  );

  return (
    <>
      <MenuAnchor id={`menu-anchor-${column.id}`} onClick={handleShowMenu}>
        {typeof callback === 'string' ? callback : callback({ column })}
      </MenuAnchor>

      <HeaderMenu
        column={column}
        type={type}
        allowInsertColumn={allowInsertColumn}
        allowSort={allowSort}
        allowTypeChange={allowTypeChange}
        allowHide={allowHide}
        allowDuplicate={allowDuplicate}
        allowDelete={allowDelete}
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
  allowHide: false,
  allowDuplicate: false,
  allowDelete: false,
  callback: ({ column }) => {},
};

HeaderWithMenu.propTypes = {
  allowTypeChange: PropTypes.bool,
  allowSort: PropTypes.bool,
  allowInsertColumn: PropTypes.bool,
  allowHide: PropTypes.bool,
  allowDuplicate: PropTypes.bool,
  allowDelete: PropTypes.bool,
  callback: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};
