import hassMedia from '../utils/hassMedia';

const Font = `
  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Thin.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIDisplay-Thin.woff')}) format('woff');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-UltralightItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-UltralightItalic.woff')}) format('woff');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Ultralight.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-Ultralight.woff')}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-BoldItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-BoldItalic.woff')}) format('woff');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Semibold.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Semibold.woff')}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-MediumItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-MediumItalic.woff')}) format('woff');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Heavy.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Heavy.woff')}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Bold.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIText-Bold.woff')}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Ultralight.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Ultralight.woff')}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Bold.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIDisplay-Bold.woff')}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Medium.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Medium.woff')}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-SemiboldItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-SemiboldItalic.woff')}) format('woff');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Black.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Black.woff')}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Medium.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIText-Medium.woff')}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Heavy.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIText-Heavy.woff')}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Semibold.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-Semibold.woff')}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-LightItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-LightItalic.woff')}) format('woff');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Regular.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIText-Regular.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-RegularItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-RegularItalic.woff')}) format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-HeavyItalic.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIText-HeavyItalic.woff')}) format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Regular.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Regular.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Display';
    src: url(${hassMedia('fonts/SFUIDisplay-Light.woff2')}) format('woff2'),
      url(${hassMedia('fonts/SFUIDisplay-Light.woff')}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF UI Text';
    src: url(${hassMedia('fonts/SFUIText-Light.woff2')}) format('woff2'), url(${hassMedia('fonts/SFUIText-Light.woff')}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
`;

export default Font;
