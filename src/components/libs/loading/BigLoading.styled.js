import styled, { keyframes } from 'styled-components';

const refreshing = keyframes`
  0% { opacity: .2; }
  100% { opacity: 1; }
` 

export const Wrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 16vw;
  border-radius: 1vw;
  background-color: rgba(0,0,0,.7);
`;

export const Svg = styled.svg`

  path {
    stroke-width: 86px;
    stroke: #fff;
    fill: #fff;
    transition: all .3s;
    animation: ${refreshing} 0.8s linear infinite;

    &:nth-child(2) { animation-delay: .11s; }
    &:nth-child(3) { animation-delay: .22s; }
    &:nth-child(4) { animation-delay: .33s; }
    &:nth-child(5) { animation-delay: .44s; }
    &:nth-child(6) { animation-delay: .55s; }
    &:nth-child(7) { animation-delay: .66s; }
    &:nth-child(8) { animation-delay: 0.77s; }
  }

`;
