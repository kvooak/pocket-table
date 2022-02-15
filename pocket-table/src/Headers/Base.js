import styled from '@emotion/styled';

const HeaderDiv = styled.div`
  display: table-header;
  font-weight: 600;
  cursor: pointer;
  color: rgba(55, 53, 47, 0.8);
  background: white;
  border-bottom: 1px solid rgba(55, 53, 47, 0.1);
  border-right: 1px solid rgba(55, 53, 47, 0.1);
  margin: 0;
  padding: 0.5rem;
  &:hover {
    transition: all 0.1s;
    background: rgba(242, 241, 238, 0.6);
  }
`;

const BaseHeader = ({ title }) => {
  return <HeaderDiv>{title}</HeaderDiv>;
};

export default BaseHeader;
