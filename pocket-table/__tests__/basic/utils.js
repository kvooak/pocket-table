export const handleOnRowClick = () => {};
export const handleOnRowMouseEnter = () => {};
export const handleOnRowMouseLeave = () => {};
export const handleOnCellClick = () => {};

export const rowEventHandler = {
  onClick: () => handleOnRowClick(),
  onMouseEnter: () => handleOnRowMouseEnter(),
  onMouseLeave: () => handleOnRowMouseLeave(),
  onMouseDown: () => {},
  onMouseUp: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

export const cellEventHandler = {
  name: {
    onClick: () => handleOnCellClick(),
  },
  email: {
    onClick: () => handleOnCellClick(),
  },
};

export const menuOptions = [
  'admin',
  'super',
  'staff',
  'creator',
  'active',
  'inactive',
];
