import React from 'react';
import styled from '@emotion/styled';
import AvatarTag from './Visuals/AvatarTag';
import BaseTag from './Visuals/BaseTag';

const ValueDiv = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  height: 100%;
`;

const MultiselectCell = React.memo(({ cell }) => {
  const { row } = cell;
  const value = cell.value.length
    ? cell.value.map((value) => (
        <BaseTag key={`${row.id}-${value}`} value={value} />
      ))
    : null;
  return <ValueDiv>{value}</ValueDiv>;
});

export default MultiselectCell;
