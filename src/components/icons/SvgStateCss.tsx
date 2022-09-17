import { css } from 'styled-components';

const SvgStateCss = css<{ state?: string }>`
  svg {
    path.primary {
      fill: #ffc107;
    }
    path.secondary {
      fill: #414141;
    }
    path.dark {
      fill: #232323;
    }
  }

  ${({ state }) =>
    state !== 'on' &&
    css`
      svg {
        path.primary {
          fill: #aaa;
        }
        path.secondary {
          fill: #aaa;
        }
      }
    `}
`;

export default SvgStateCss;
