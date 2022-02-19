import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Popover from '@mui/material/Popover';
import MultiselectMenu from './Menus/Multiselect';
import HeaderMenu from './Menus/HeaderMenu';

const MenuAnchor = styled.div`
  display: inline;
  width: 100%;
  height: 100%;
  bottom: 0;
  background: none;
`;

const CellMenu = React.memo(
  ({ cell, type, options, anchorEl, onClose, onChange }) => {
    const { key: cellKey } = cell.getCellProps();
    const open = Boolean(anchorEl);
    const id = open ? `multiselect-menu-${cellKey}` : undefined;

    const menuComponent = useMemo(() => {
      if (type === 'multiselect')
        return (
          <MultiselectMenu
            cell={cell}
            options={options}
            anchorEl={anchorEl}
            onClose={onClose}
            onChange={onChange}
          />
        );
      return null;
    }, []);

    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {menuComponent}
      </Popover>
    );
  },
);

export const CellWithMenu = React.memo(
  ({ callback, cell, type, menuOptions, onMenuEvent }) => {
    const { key } = cell.getCellProps();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleShowMenu = useCallback(
      (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      },
      [anchorEl, setAnchorEl],
    );

    const [menuEvent, setMenuEvent] = useState(null);
    const queueChange = (event) => {
      setMenuEvent(event);
    };

    useEffect(() => {
      !anchorEl && menuEvent && onMenuEvent.onChange(menuEvent);
    }, [anchorEl]);

    const cellMenuComponent = useMemo(() => {
      if (!anchorEl) return null;
      return (
        <CellMenu
          cell={cell}
          type={type}
          options={menuOptions}
          anchorEl={anchorEl}
          onClose={handleShowMenu}
          onChange={queueChange}
        />
      );
    }, [anchorEl, handleShowMenu]);

    return (
      <>
        <MenuAnchor id={`menu-anchor-${key}`} onClick={handleShowMenu}>
          {callback({ cell })}
        </MenuAnchor>
        {cellMenuComponent}
      </>
    );
  },
);

CellWithMenu.whyDidYouRender = {
  logOnDifferentValues: true,
  logOwnerReasons: true,
  customName: 'CellWithMenu',
};

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
