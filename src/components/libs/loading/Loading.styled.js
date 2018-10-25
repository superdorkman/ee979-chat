import styled from 'styled-components';

export const Svg = styled.svg`
  z-index: 1;
`;

export const Rect = styled.rect`
  fill: ${props => props.theme.main};
`;

export const Path = styled.path`
  fill: ${props => props.theme.main};
`;