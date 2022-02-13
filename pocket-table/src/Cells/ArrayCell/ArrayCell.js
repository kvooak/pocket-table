import React, { useMemo } from 'react';
import AvatarTag from './Visuals/AvatarTag';
import BaseTag from './Visuals/BaseTag';

const ArrayCell = React.memo(({ cell }) => {
  const { row } = cell;

  const values = useMemo(
    () =>
      cell.value.map((value) => (
        <BaseTag key={`${row.id}-${value}`} value={value} />
      )),
    [cell],
  );
  return values;
});

export default ArrayCell;
