import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import muiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Paper = styled(muiPaper)({
  textAlign: 'center',
  color: 'inherit',
  width: '300px',
  padding: '12px',
})

const ArrayMenu = ({ anchorEl, cellKey }) => {
  const open = Boolean(anchorEl);
  const id = open ? `array-menu-${cellKey}` : undefined;

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Paper elevation={6}>Array Menu</Paper>
    </Popper>
  );
};

export default ArrayMenu;
