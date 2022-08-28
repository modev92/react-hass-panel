import styled, { css } from 'styled-components';

export const ButtonWrapper = styled.button`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const State = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #808080;
`;

export const MiscStateCss = css<{ state?: string }>`
  ${({ state }) =>
    state !== 'on' &&
    css`
      ${Title} {
        color: white;
      }
      ${State} {
        color: #aaa;
        font-weight: normal;
      }
    `}
`;
