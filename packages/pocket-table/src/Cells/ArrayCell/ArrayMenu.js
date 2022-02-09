import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

const ArrayMenu = ({ anchorEl, cellKey }) => {
  const open = Boolean(anchorEl);
  const id = open ? `array-menu-${cellKey}` : undefined;

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        Array Menu
      </Box>
    </Popper>
  );
};

export default ArrayMenu;
