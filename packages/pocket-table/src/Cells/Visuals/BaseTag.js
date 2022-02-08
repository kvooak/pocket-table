import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import CONSTANTS from '../../constants';

const CustomChip = styled(Chip)({
  marginTop: '2px',
  marginRight: '2px',
  borderRadius: '4px',
  transition: 'background 100ms, color 100ms',
  fontWeight: '600',
  color: 'rgba(55, 53, 47, 0.8)',
});

const BaseTag = ({ value, clickable, backgroundColor, color }) => {
  const label = useMemo(() => value.toUpperCase(), []);
  const sx = {
    backgroundColor: backgroundColor || CONSTANTS.NEUTRAL_BACKGROUND,
    color: color || CONSTANTS.NEUTRAL_COLOR,
  };

  return (
    <CustomChip label={label} clickable={clickable} size="small" sx={sx} />
  );
};

BaseTag.defaultProps = {
  clickable: false,
};

BaseTag.propTypes = {
  clickable: PropTypes.bool,
};

export default BaseTag;
