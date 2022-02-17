import styled from '@emotion/styled';

const HeaderGroupDiv = styled.div`
  display: table-header-group;
`;

// TODO: wait for react-table v8 stable release for resizing function
// const Resizer = styled.div`
//   display: inline-block;
//   background: rgba(55, 53, 47, 0.1);
//   width: 3px;
//   height: 100%;
//   position: absolute;
//   right: 0;
//   top: 0;
//   transform: translateX(50%);
//   z-index: 1;
//   ${'' /* prevents from scrolling while dragging on touch devices */}
//   touch-action:none;
//   transition: all 0.1s;
//   &.resizing {
//     width: 8px;
//   }
// `;

const HeaderDiv = styled.div`
  display: table-cell;
  height: 100%;
`;

const Header = ({ header, ...props }) => {
  const { width, minWidth, maxWidth } = header.column;
  const rendered = header.renderHeader();
  return (
    <HeaderDiv {...props} style={{ width, minWidth, maxWidth }}>
      {rendered}
      {/* TODO: Check again when v8 release with new resizing logic */}
      {/* <Resizer
        {...header.column.getResizerProps()}
        className={`${header.column.isResizing ? 'resizing' : ''}`}
      /> */}
    </HeaderDiv>
  );
};

const Headers = ({ headers }) => {
  return (
    <HeaderGroupDiv>
      {headers.map((header) => (
        <Header header={header} {...header.getHeaderProps()} />
      ))}
    </HeaderGroupDiv>
  );
};

export default Headers;
