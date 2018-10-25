import styled from 'styled-components';

const Area = styled.div`
  position: absolute;
  -webkit-app-region: no-drag;
`;

export const AreaTop = Area.extend`
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
`;

export const AreaBottom = Area.extend`
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
`;

export const AreaLeft = Area.extend`
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
`;

export const AreaRight = Area.extend`
  top: 0;  
  bottom: 0;
  right: 0;
  width: 4px;
`;