import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import muiPaper from '@mui/material/Paper';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import BaseTag from './Visuals/BaseTag';

const EditValueAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  background: rgba(55, 53, 47, 0.06);
  cursor: text;
`;

const CellValueDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 8px 10px 0 10px;
`;

const OptionDiv = styled.div``;

const SearchValueInput = styled.input`
  background: none;
  outline: none;
  border: none;
  line-height: 24px;
  height: 24px;
  font-size: 0.8rem;
  padding: 0 10px;
`;

const Paper = muiStyled(muiPaper)({
  textAlign: 'center',
  color: 'inherit',
  width: '300px',
});

const CellValue = ({ value, onDeleteItem }) => {
  const [tempValue, setTempValue] = useState(value);
  const handleDeleteItem = (value, index) => {
    const newValue = [...tempValue];
    newValue.splice(index, 1);
    setTempValue(newValue);
    onDeleteItem([value, index, tempValue, newValue]);
  };

  const items = useMemo(
    () => (
      <CellValueDiv>
        {tempValue.map((item, index) => (
          <BaseTag
            key={item}
            value={item}
            index={index}
            onDelete={handleDeleteItem}
          />
        ))}
      </CellValueDiv>
    ),
    [tempValue, handleDeleteItem],
  );
  return items;
};

const ArrayMenu = ({ anchorEl, cellKey, cellValue, onMenuEvent }) => {
  const open = Boolean(anchorEl);
  const id = open ? `array-menu-${cellKey}` : undefined;

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Paper elevation={6}>
        <EditValueAreaDiv>
          <CellValue value={cellValue} onDeleteItem={onMenuEvent} />
          <SearchValueInput
            spellCheck={false}
            placeholder="Type to search value"
            autoFocus
          />
        </EditValueAreaDiv>
        <OptionDiv>Options</OptionDiv>
      </Paper>
    </Popper>
  );
};

export default ArrayMenu;
