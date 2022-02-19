import muiPaper from '@mui/material/Paper';
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import Popover from '@mui/material/Popover';
import TypeIcon from '@mui/icons-material/FormatListBulleted';
import SortAscIcon from '@mui/icons-material/ArrowUpward';
import SortDescIcon from '@mui/icons-material/ArrowDownward';
import InsertLeftIcon from '@mui/icons-material/ArrowBack';
import InsertRightIcon from '@mui/icons-material/ArrowForward';
import HideIcon from '@mui/icons-material/VisibilityOffOutlined';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const Paper = muiStyled(muiPaper)({
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif,"ui-sans-serif"',
  fontSize: 'inherit',
  fontWeight: '400',
  color: 'inherit',
  width: '240px',
});

const SelectDiv = styled.div`
  display: flex;
  white-space: pre-line;
  justify-content: flex-start;
  line-height: 28px;
  height: 28px;
  padding-left: 10px;
  transition: all 0.08s;
  cursor: pointer;
  &:hover {
    background: rgba(55, 53, 47, 0.06);
  }
`;

const SelectIconDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  color: rgba(55, 53, 47, 0.8);
  padding-right: 10px;
`;

const SelectTextDiv = styled.div`
  font-size: 0.8rem;
`;

const SelectItem = ({ id, icon, text, onClick }) => {
  return (
    <SelectDiv id={id} onClick={onClick}>
      <SelectIconDiv>{icon}</SelectIconDiv>
      <SelectTextDiv>{text}</SelectTextDiv>
    </SelectDiv>
  );
};

const TypeSection = ({ type, onClick }) => {
  const typeTitle = 'Type title';
  return (
    <SelectItem
      id="type"
      onClick={onClick}
      icon={<TypeIcon fontSize="small" />}
      text={typeTitle}
    />
  );
};

const SortSection = ({ onClick }) => {
  return (
    <>
      <SelectItem
        id="sort-asc"
        onClick={onClick}
        icon={<SortAscIcon fontSize="small" />}
        text="Sort ascending"
      />
      <SelectItem
        id="sort-desc"
        onClick={onClick}
        icon={<SortDescIcon fontSize="small" />}
        text="Sort descending"
      />
    </>
  );
};

const HideSection = ({ onClick }) => {
  return (
    <SelectItem
      id="hide"
      onClick={onClick}
      icon={<HideIcon fontSize="small" />}
      text="Hide"
    />
  );
};

const InsertColumnSection = ({ onClick }) => {
  return (
    <>
      <SelectItem
        id="insert-left"
        onClick={onClick}
        icon={<InsertLeftIcon fontSize="small" />}
        text="Insert column left"
      />
      <SelectItem
        id="insert-right"
        onClick={onClick}
        icon={<InsertRightIcon fontSize="small" />}
        text="Insert column right"
      />
    </>
  );
};

const DuplicateSection = ({ onClick }) => {
  return (
    <SelectItem
      id="duplicate"
      onClick={onClick}
      icon={<DuplicateIcon fontSize="small" />}
      text="Duplicate"
    />
  );
};

const DeleteSection = ({ onClick }) => {
  return (
    <SelectItem
      id="delete"
      onClick={onClick}
      icon={<DeleteIcon fontSize="small" />}
      text="Delete"
    />
  );
};

const HeaderMenu = ({
  column,
  type,
  allowInsertColumn,
  allowSort,
  allowTypeChange,
  allowHide,
  allowDuplicate,
  allowDelete,
  anchorEl,
  onClose,
  onMenuEvent,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? `header-menu-${column.id}` : undefined;
  const { onTypeChange, onSort, onInsert, onHide, onDuplicate, onDelete } =
    onMenuEvent;

  const handleSelect = (event) => {
    const { id } = event.currentTarget;
    const action = (type) => ({ type, sortBy: column.id });
    if (id === 'type') {
      onTypeChange(action(id));
    } else if (['sort-asc', 'sort-desc'].includes(id)) {
      onSort(action(id));
    } else if (['insert-left', 'insert-right'].includes(id)) {
      onInsert(action(id));
    } else if (id === 'hide') {
      onHide(action(id));
    } else if (id === 'duplicate') {
      onDuplicate(action(id));
    } else if (id === 'delete') {
      onDelete(action(id));
    }
    onClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Paper>
        {allowTypeChange && <TypeSection onClick={handleSelect} />}
        {allowSort && <SortSection onClick={handleSelect} />}
        {allowInsertColumn && <InsertColumnSection onClick={handleSelect} />}
        {allowHide && <HideSection onClick={handleSelect} />}
        {allowDuplicate && <DuplicateSection onClick={handleSelect} />}
        {allowDelete && <DeleteSection onClick={handleSelect} />}
      </Paper>
    </Popover>
  );
};

export default HeaderMenu;
