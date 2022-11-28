import styled, { css } from 'styled-components';

export const BasicWrapper = styled.div<{ vCenter?: boolean }>`
  display: flex;
  gap: 16px;

  ${({ vCenter }) =>
    vCenter &&
    css`
      align-items: center;
    `}
`;

export const ButtonWrapper = styled.button`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

export const Title = styled.div`
  font-family: 'SF UI Text';
  font-weight: bold;
  font-size: 14px;
`;

export const State = styled.div`
  font-family: 'SF UI Text';
  font-weight: bold;
  font-size: 14px;
  color: #808080;
`;

export const CircleState = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: rgb(61, 204, 42);

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
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
