import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import muiPaper from '@mui/material/Paper';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import BaseTag from './Visuals/BaseTag';
import Popover from '@mui/material/Popover';
import { useKeyPress } from '../../utils';

const EditValueAreaDiv = styled.div`
  padding-top: 8px;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  background: rgba(55, 53, 47, 0.06);
  cursor: text;
`;

const CellValueDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0 10px 0 10px;
`;

const OptionAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const OptionItemDiv = styled.div`
  white-space: pre-line;
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

const StyledInput = styled.input`
  background: none;
  outline: none;
  border: none;
  line-height: 24px;
  height: 24px;
  font-size: 0.8rem;
  padding: 0 8px;
`;

const Paper = muiStyled(muiPaper)({
  color: 'inherit',
  width: '300px',
});

const CellValueInput = ({ onKeyDown, ...props }) => {
  const ref = useRef();
  const keyPress = useKeyPress(ref.current);
  const [input, setInput] = useState(null);
  useEffect(() => {
    if (keyPress) {
      const isDelete = !input && keyPress === 'Backspace';
      onKeyDown({ isDelete });
    }
  }, [keyPress, input]);

  const handleKeyDown = (event) => {
    setInput(event.target.value);
    onKeyDown({ search: event.target.value });
  };

  return <StyledInput ref={ref} {...props} onInput={handleKeyDown} />;
};

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

  const items = useMemo(() => {
    if (!value.length) return null;
    return (
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
    );
  }, [value, handleDeleteItem]);
  return items;
};

const OptionAreaTitleDiv = ({ title }) => {
  const style = {
    color: 'rgba(55, 53, 47, 0.68)',
    padding: '0 12px 4px 10px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'default',
  };

  return (
    <Typography variant="h6" component="div" style={style}>
      {title}
    </Typography>
  );
};

const OptionItem = ({ value, isNew, index, onChange }) => {
  const handleAddValue = () => {
    const action = isNew ? 'create' : 'add';
    onChange({ action, value, index });
  };

  return (
    <OptionItemDiv role="button" onClick={handleAddValue}>
      <Typography variant="subtitle2" component="span">
        {isNew && 'Create '}
      </Typography>
      <BaseTag key={value} value={value} clickable />
    </OptionItemDiv>
  );
};

const Options = ({ options, searchKey, cellValue, onChange }) => {
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

  const optionComponents = useMemo(() => {
    if (!options.length && searchKey) {
      return (
        <OptionItem isNew value={searchKey} onChange={handleCellValueChange} />
      );
    }
    const remainingOptions = options.filter(
      (option) => !cellValue.includes(option),
    );
    return remainingOptions.map((value, index) => (
      <OptionItem
        key={value}
        value={value}
        index={index}
        onChange={handleCellValueChange}
      />
    ));
  }, [searchKey, options, cellValue]);

  return optionComponents;
};

const ArrayMenu = ({ anchorEl, cell, options, onClose, onMenuEvent }) => {
  const { column, row, value } = cell;
  const cellKey = cell.getCellProps();
  const open = Boolean(anchorEl);
  const dataKey = column.id;
  const id = open ? `array-menu-${cellKey}` : undefined;
  const { onChange } = onMenuEvent;
  const [searchKey, setSearchKey] = useState(null);

  const handleValueChange = (event) => {
    event.dataKey = dataKey;
    event.rowIndex = row.index;
    onChange(event);
    setSearchKey(null);
  };

  const displayOptions = useMemo(() => {
    const searchResult = options.filter((value) => {
      if (!searchKey) return value;
      return value.includes(searchKey);
    });
    if (!searchResult) return options;
    return searchResult;
  }, [searchKey]);

  const handleInputChange = ({ isDelete, search }) => {
    if (isDelete) {
      const deleteIndex = value.length - 1;
      const event = {
        action: 'delete',
        value: value[deleteIndex],
        index: deleteIndex,
        newValue: value.slice(0, -1),
        oldValue: value,
      };
      handleValueChange(event);
    }
    setSearchKey(search);
  };

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
      <Paper>
        <EditValueAreaDiv>
          <CellValue value={value} onChange={handleValueChange} />
          <CellValueInput
            spellCheck={false}
            placeholder="Search for an option"
            onKeyDown={handleInputChange}
            autoFocus
          />
        </EditValueAreaDiv>
        <OptionAreaDiv>
          <OptionAreaTitleDiv title="Select an option or create one" />
          <Options
            options={displayOptions}
            searchKey={searchKey}
            cellValue={value}
            onChange={handleValueChange}
          />
        </OptionAreaDiv>
      </Paper>
    </Popover>
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
  onClose: PropTypes.func.isRequired,
};

export default ArrayMenu;