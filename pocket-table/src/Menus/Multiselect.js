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
import BaseTag from '../Cells/Visuals/BaseTag';
import { useKeyPress } from '../utils';

const EditValueAreaDiv = styled.div`
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  background: rgba(242, 241, 238, 0.6);
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
  display: flex;
  white-space: pre;
  justify-content: flex-start;
  align-items: center;
  line-height: 28px;
  height: 28px;
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
  font-size: 0.9rem;
  padding: 4px 8px;
`;

const Paper = muiStyled(muiPaper)({
  color: 'inherit',
  width: '300px',
});

const CellValueInput = React.memo(
  ({ cellValue, onKeyDown, onKeyCommand, ...props }) => {
    const ref = useRef();
    const keyPress = useKeyPress(ref.current);
    const [input, setInput] = useState(null);
    useEffect(() => {
      if (keyPress && ['Backspace', 'Enter'].includes(keyPress)) {
        let type;
        let index;
        let newValue;
        const oldValue = cellValue;
        // block action if pressed Enter when there is no input
        // and if pressed Backspace where there is input
        if (!input && keyPress === 'Backspace') {
          type = 'delete';
          index = cellValue.length - 1;
          newValue = cellValue.slice(0, -1);
        } else if (input && keyPress === 'Enter') {
          type = 'add';
          index = cellValue.length;
          newValue = [...cellValue, input];
        }
        const event = { type, value: input, index, newValue, oldValue }
        event.type && onKeyCommand(event);
      }
    }, [keyPress, input]);

    const handleKeyDown = (event) => {
      setInput(event.target.value);
      onKeyDown({ input: event.target.value });
    };

    return <StyledInput ref={ref} {...props} onInput={handleKeyDown} />;
  },
);

const CellValue = ({ value, onDeleteByClick }) => {
  const handleDeleteItem = (itemValue, itemIndex) => {
    const newValue = [...value];
    newValue.splice(itemIndex, 1);
    onDeleteByClick({
      type: 'delete',
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
    const type = isNew ? 'create' : 'add';
    onChange({ type, value, index });
  };

  return (
    <OptionItemDiv
      role="button"
      ariaPressed="false"
      tabIndex="0"
      onClick={handleAddValue}
    >
      <Typography variant="subtitle2" component="span">
        {isNew && 'Create '}
      </Typography>
      <BaseTag key={value} value={value} clickable />
    </OptionItemDiv>
  );
};

const Options = ({ options, searchKey, cellValue, onSelect }) => {
  handleCellValueChange = ({ type, value, index }) => {
    const newValue = [...cellValue];
    newValue.splice(index, 0, value);
    onSelect({
      type,
      value,
      index,
      newValue,
      oldValue: cellValue,
    });
  };

  const optionComponents = useMemo(() => {
    let selectFromList = [];
    let createNew = null;
    const optionList = options.filter((option) => !cellValue.includes(option));
    if (optionList.length) {
      selectFromList = optionList.map((value, index) => (
        <OptionItem
          key={value}
          value={value}
          index={index}
          onChange={handleCellValueChange}
        />
      ));
    }

    if (!selectFromList.length && searchKey && !cellValue.includes(searchKey)) {
      createNew = (
        <OptionItem
          isNew
          key={`create-${searchKey}`}
          value={searchKey}
          onChange={handleCellValueChange}
        />
      );
    }

    const components = [...selectFromList, createNew];
    return components;
  }, [searchKey, options, cellValue]);

  return optionComponents;
};

Option.defaultProps = {
  options: [],
};

Option.propTypes = {
  options: PropTypes.instanceOf(Array),
};

const MultiselectMenu = React.memo(
  ({ cell, options, onChange: onChangeCellValue }) => {
    const { column, row, value: cellValue } = cell;
    const dataKey = column.id;
    const [searchKey, setSearchKey] = useState(null);
    const [tempValue, setTempValue] = useState(cellValue);

    const handleValueChange = useCallback(
      (event) => {
        event.dataKey = dataKey;
        event.rowIndex = row.index;
        onChangeCellValue(event);
        setSearchKey(null);
      },
      [setSearchKey, onChangeCellValue],
    );

    const displayOptions = useMemo(() => {
      const searchResult = options.filter((value) => {
        if (!searchKey) return value;
        return tempValue.includes(searchKey);
      });
      if (!searchResult) return options;
      return searchResult;
    }, [searchKey, tempValue]);

    const updateTempState = (event) => {
      const { newValue } = event;
      setTempValue(newValue);
    };

    const handleCommand = useCallback(
      (action) => {
        let event = { ...action };
        const { type, value } = event;
        if (type === 'add' && value && tempValue.includes(value)) {
          event = undefined;
        }
        event && updateTempState(event);
        event && handleValueChange(event);
      },
      [updateTempState, tempValue, setSearchKey, handleValueChange],
    );

    const handleInputChange = useCallback(
      ({ input }) => setSearchKey(input),
      [setSearchKey],
    );

    return (
      <Paper>
        <EditValueAreaDiv>
          <CellValue value={tempValue} onDeleteByClick={handleCommand} />
          <CellValueInput
            key={tempValue.length}
            cellValue={tempValue}
            spellCheck={false}
            placeholder="Search for an option"
            onKeyDown={handleInputChange}
            onKeyCommand={handleCommand}
            autoFocus
          />
        </EditValueAreaDiv>
        <OptionAreaDiv>
          <OptionAreaTitleDiv title="Select an option or create one" />
          <Options
            options={displayOptions}
            searchKey={searchKey}
            cellValue={tempValue}
            onSelect={handleCommand}
          />
        </OptionAreaDiv>
      </Paper>
    );
  },
);

MultiselectMenu.propTypes = {
  cell: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.instanceOf(Object).isRequired,
};

export default MultiselectMenu;
