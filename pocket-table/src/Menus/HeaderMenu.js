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

const SelectItem = ({ icon, text, onClick }) => {
  return (
    <SelectDiv onClick={onClick}>
      <SelectIconDiv>{icon}</SelectIconDiv>
      <SelectTextDiv>{text}</SelectTextDiv>
    </SelectDiv>
  );
};

const TypeSection = ({ type, onClick }) => {
  const typeTitle = 'Type title';
  return (
    <SelectItem
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
        onClick={onClick}
        icon={<SortAscIcon fontSize="small" />}
        text="Sort ascending"
      />
      <SelectItem
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
        onClick={onClick}
        icon={<InsertLeftIcon fontSize="small" />}
        text="Insert column left"
      />
      <SelectItem
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
      onClick={onClick}
      icon={<DuplicateIcon fontSize="small" />}
      text="Duplicate"
    />
  );
};

const DeleteSection = ({ onClick }) => {
  return (
    <SelectItem
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
  // onMenuEvent,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? `header-menu-${column.id}` : undefined;
  // const { onChange } = onMenuEvent;

  const handleSelect = () => {
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
