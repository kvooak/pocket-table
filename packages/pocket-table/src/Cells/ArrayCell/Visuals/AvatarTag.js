import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import muiAvatar from '@mui/material/Avatar';
import CONSTANTS from '../../../constants';

const CustomChip = styled(Chip)({
  marginTop: '2px',
  marginRight: '2px',
  borderRadius: '4px',
  transition: 'background 100ms, color 100ms',
  fontWeight: '600',
  color: 'rgba(55, 53, 47, 0.8)',
});

const CustomAvatar = styled(muiAvatar)({
  fontWeight: '600',
  color: 'black',
  backgroundColor: 'snow',
  borderRadius: '2px',
});

const Avatar = ({ avatar, ...props }) => {
  return <CustomAvatar {...props}>{avatar}</CustomAvatar>;
};

Avatar.defaultProps = {
  variant: 'square',
};

Avatar.propTypes = {
  variant: PropTypes.string,
};

const AvatarTag = ({ value, avatar, clickable, backgroundColor, color }) => {
  const label = useMemo(() => value.toUpperCase(), []);
  const sx = {
    backgroundColor: backgroundColor || CONSTANTS.NEUTRAL_BACKGROUND,
    color: color || CONSTANTS.NEUTRAL_COLOR,
  };

  return (
    <CustomChip
      avatar={<Avatar avatar={avatar} />}
      label={label}
      size="small"
      clickable={clickable}
      sx={sx}
    />
  );
};

AvatarTag.defaultProps = {
  clickable: false,
};

AvatarTag.propTypes = {
  clickable: PropTypes.bool,
};

export default AvatarTag;
