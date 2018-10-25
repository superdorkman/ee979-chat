import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  from { fill: rgba(245,245,245,1); }
  to { fill: rgba(245,245,245,0.3); }
`
export const Wrapper = styled.div`
  width: 100%;
`;

export const Svg = styled.svg`
  width: 100%;
  height: 100%;

  circle, rect {
    animation: ${blink} .6s ease-in-out alternate infinite;
  }
`;

