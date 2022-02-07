import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';

const CustomChip = styled(Chip)({
  marginTop: '2px',
  marginRight: '2px',
  borderRadius: '4px',
  transition: 'background 100ms, color 100ms',
  fontWeight: '600',
  color: 'rgba(55, 53, 47, 0.8)',
});

const NEUTRAL_BACKGROUND = 'gainsboro';
const NEUTRAL_COLOR = 'inherit';

const Tag = ({ value, backgroundColor, color }) => {
  const label = useMemo(() => value.toUpperCase(), []);
  const sx = {
    backgroundColor: backgroundColor || NEUTRAL_BACKGROUND,
    color: color || NEUTRAL_COLOR,
  };

  return <CustomChip label={label} size="small" sx={sx} />;
};

export default function ArrayCell({ cell }) {
  const { row } = cell;
  const values = useMemo(
    () =>
      cell.value.map((value) => (
        <Tag key={`${row.id}-${value}`} value={value} />
      )),
    [cell],
  );
  return values;
}
