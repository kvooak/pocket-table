import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import ArrayMenu from './Cells/ArrayCell/ArrayMenu';

// use as anchor for cell menu
const MenuAnchor = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const CellWithMenu = ({ callback, cell, type, menuOptions, onMenuEvent }) => {
  const { key } = cell.getCellProps();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleShowMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const Menu = useMemo(() => {
    if (type === 'array')
      return (
        <ArrayMenu
          cell={cell}
          options={menuOptions}
          anchorEl={anchorEl}
          onMenuEvent={onMenuEvent}
        />
      );
    return null;
  }, [cell, menuOptions, type, anchorEl]);

  return (
    <>
      <MenuAnchor
        id={`menu-anchor-${key}`}
        className="menu-anchor"
        onClick={handleShowMenu}
      >
        {callback({ cell })}
      </MenuAnchor>
      {Menu}
    </>
  );
};

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
      // custom cell with type
      return null;
    }
    // has both Cell and extra, ignore type,
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
