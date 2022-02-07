import React, { useMemo } from 'react';
import AvatarTag from './Visuals/AvatarTag';
import BaseTag from './Visuals/BaseTag';

export default function ArrayCell({ cell }) {
  const { row } = cell;
  const values = useMemo(
    () =>
      cell.value.map((value) => (
        <>
          <BaseTag key={`${row.id}-${value}-base1`} value={value} />
          <AvatarTag key={`${row.id}-${value}-avatar`} value={value} />
        </>
      )),
    [cell],
  );
  return values;
}
