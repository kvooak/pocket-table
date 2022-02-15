import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';
import muiAvatar from '@mui/material/Avatar';
import CONSTANTS from '../../constants';

const CustomChip = styled(Chip)({
  marginTop: '2px',
  marginBottom: '2px',
  marginRight: '4px',
  borderRadius: '4px',
  transition: 'all 0.1s',
  fontWeight: '400',
  color: 'rgba(55, 53, 47, 0.8)',
  height: '18px',
  '& .MuiChip-avatarSmall': {
    borderRadius: '5px',
    height: '15px',
    width: '15px',
  },
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
