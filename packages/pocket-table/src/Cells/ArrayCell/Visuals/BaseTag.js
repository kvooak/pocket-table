import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import CONSTANTS from '../../../constants';

const CustomChip = styled(Chip)({
  marginTop: '2px',
  marginBottom: '2px',
  marginRight: '4px',
  borderRadius: '4px',
  transition: 'all 0.1s',
  fontWeight: '400',
  color: 'rgba(55, 53, 47, 0.8)',
  height: '18px',
  '& .MuiChip-deleteIcon': {
    color: 'rgba(55, 53, 47, 0.5)',
    '&:hover': {
      color: 'rgba(55, 53, 47, 0.2)',
    },
  },
});

const BaseTag = ({
  value,
  index,
  clickable,
  onDelete,
  backgroundColor,
  color,
}) => {
  const label = useMemo(() => value.toUpperCase(), []);
  const sx = {
    backgroundColor: backgroundColor || CONSTANTS.NEUTRAL_BACKGROUND,
    color: color || CONSTANTS.NEUTRAL_COLOR,
  };
  const handleDeleteTag = () => {
    onDelete && onDelete(value, index);
  };

  return (
    <CustomChip
      label={label}
      clickable={clickable}
      onDelete={onDelete && handleDeleteTag}
      deleteIcon={<ClearIcon />}
      size="small"
      sx={sx}
    />
  );
};

BaseTag.defaultProps = {
  clickable: false,
  onDelete: null,
};

BaseTag.propTypes = {
  clickable: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default BaseTag;
