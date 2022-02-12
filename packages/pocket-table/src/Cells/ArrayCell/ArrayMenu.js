import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import muiPaper from '@mui/material/Paper';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import BaseTag from './Visuals/BaseTag';

const EditValueAreaDiv = styled.div`
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  background: rgba(55, 53, 47, 0.06);
  cursor: text;
`;

const CellValueDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 8px 10px 0 10px;
`;

const OptionAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const OptionItemDiv = styled.div`
  justify-content: flex-start;
  line-height: 24px;
  height: 24px;
  padding-left: 10px;
  transition: all 0.08s;
  cursor: pointer;
  &:hover {
    background: rgba(55, 53, 47, 0.06);
  }
`;

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
  color: 'inherit',
  width: '300px',
});

const CellValue = ({ value, onChange }) => {
  const handleDeleteItem = (itemValue, itemIndex) => {
    const newValue = [...value];
    newValue.splice(itemIndex, 1);
    onChange({
      action: 'delete',
      value: itemValue,
      index: itemIndex,
      newValue,
      oldValue: value,
    });
  };

  const items = useMemo(
    () => (
      <CellValueDiv>
        {value.map((item, index) => (
          <BaseTag
            key={item}
            value={item}
            index={index}
            onDelete={handleDeleteItem}
          />
        ))}
      </CellValueDiv>
    ),
    [value, handleDeleteItem],
  );
  return items;
};

const OptionAreaTitleDiv = ({ title }) => {
  const style = {
    color: 'rgba(55, 53, 47, 0.7)',
    padding: '0 12px 4px 12px',
    fontSize: '0.8rem',
    cursor: 'default',
  };

  return (
    <Typography variant="h6" component="div" style={style}>
      {title}
    </Typography>
  );
};

const OptionItem = ({ value, index, onChange }) => {
  const handleAddValue = () => {
    onChange({ action: 'add', value, index });
  };

  return (
    <OptionItemDiv role="button" onClick={handleAddValue}>
      <BaseTag key={value} value={value} clickable />
    </OptionItemDiv>
  );
};

const Options = ({ options, cellValue, onChange }) => {
  const [optionValue, setOptionValue] = useState(options);
  useEffect(() => {
    setOptionValue(options.filter((option) => !cellValue.includes(option)));
  }, [cellValue, options]);

  handleCellValueChange = ({ action, value, index }) => {
    const newValue = [...cellValue];
    newValue.splice(index, 0, value);
    onChange({
      action,
      value,
      index,
      newValue,
      oldValue: cellValue,
    });
  };

  const optionComponents = optionValue.map((value, index) => (
    <OptionItem
      key={value}
      value={value}
      index={index}
      onChange={handleCellValueChange}
    />
  ));
  return optionComponents;
};

const ArrayMenu = ({
  anchorEl,
  cell,
  options,
  onMenuEvent,
}) => {
  const { column, row, value } = cell;
  const cellKey = cell.getCellProps();
  const open = Boolean(anchorEl);
  const dataKey = column.id;
  const id = open ? `array-menu-${cellKey}` : undefined;
  const { onChange } = onMenuEvent;

  const handleOnChange = (event) => {
    event.dataKey = dataKey;
    event.rowIndex = row.index;
    onChange(event);
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Paper elevation={6}>
        <EditValueAreaDiv>
          <CellValue value={value} onChange={handleOnChange} />
          <SearchValueInput
            spellCheck={false}
            placeholder="Type to search option"
            autoFocus
          />
        </EditValueAreaDiv>
        <OptionAreaDiv>
          <OptionAreaTitleDiv title="Select an option or create one" />
          <Options
            options={options}
            cellValue={value}
            onChange={handleOnChange}
          />
        </OptionAreaDiv>
      </Paper>
    </Popper>
  );
};

ArrayMenu.defaultProps = {
  anchorEl: null,
};

ArrayMenu.propTypes = {
  anchorEl: PropTypes.instanceOf(Object),
  cell: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  onMenuEvent: PropTypes.instanceOf(Object).isRequired,
};

export default ArrayMenu;
