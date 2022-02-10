import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
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
