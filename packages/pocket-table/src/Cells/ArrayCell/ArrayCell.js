import React, { useMemo } from 'react';
import AvatarTag from './Visuals/AvatarTag';
import BaseTag from './Visuals/BaseTag';

export default function ArrayCell({ cell }) {
  const { row } = cell;
  const values = useMemo(
    () =>
      cell.value.map((value, index) => (
        <>
          <BaseTag key={`${row.id} ${index}`} value={value} />
          <AvatarTag key={`${row.id}`} value={value} />
        </>
      )),
    [cell],
  );
  return values;
}
