import warning from 'warning';
import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import ubiatarPrimary from '../colors/ubiatarPrimary';
import ubiatarDarkPrimary from '../colors/ubiatarDarkPrimary';
import pink from '../colors/pink';
import grey from '../colors/grey';
import red from '../colors/red';
import common from '../colors/common';
import { getContrastRatio, darken, lighten } from './colorManipulator';

export const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: '#2B2A3B',
    // Secondary text.
    secondary: '#666',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
    // Anchot link color
    link: '#6cccff',
    // Text hints.
    hint: 'rgba(0, 0, 0, 0.38)',
    //Accept or Success
    success: '#53A182',
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    slider: ubiatarPrimary[300],
    default: grey[50],
    appBar: common.white,
    chip: grey[300],
    avatar: grey[400],
    op30: 'rgba(0, 0, 0, .6)',
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.14)',
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.10)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
};

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.6)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    link: '#6cccff',
    hint: 'rgba(255, 255, 255, 0.4)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: ubiatarDarkPrimary[500],
    slider: common.white,
    default: ubiatarDarkPrimary[600],
    appBar: grey[900],
    chip: grey[700],
    avatar: grey[600],
    op30: 'rgba(255, 255, 255, .6)',
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.1)',
    hoverOpacity: 0.1,
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

export default function createPalette(palette: Object) {
  const {
    primary = {
      light: ubiatarPrimary[300],
      main: ubiatarPrimary[500],
      dark: ubiatarPrimary[700],
      op50: ubiatarPrimary.op50,
    },
    secondary = {
      light: ubiatarDarkPrimary[300],
      main: ubiatarDarkPrimary[500],
      dark: ubiatarDarkPrimary[700],
    },
    terziary = {
      light: '#ccc',
      main: '#ccc',
      dark: '#ccc',
    },
    error = {
      light: '#ea656c',
      main: '#ea656c',
      dark: '#ea656c',
    },
    success = {
      light: '#53A182',
      main: '#53A182',
      dark: '#53A182',
    },
    type = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette;

  function getContrastText(background) {
    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      warning(
        contrast >= 3,
        [
          `Material-UI: the contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
          'falls below the WACG recommended absolute minimum contrast ratio of 3:1.',
          'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
        ].join('\n'),
      );
    }

    return contrastText;
  }

  function augmentColor(color, mainShade, lightShade, darkShade) {
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
  }

  augmentColor(primary, 500, 300, 700);
  augmentColor(secondary, 'A400', 'A200', 'A700');
  augmentColor(error, 500, 300, 700);

  const types = { dark, light };

  warning(types[type], `Material-UI: the palette type \`${type}\` is not supported.`);

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common,
      // The palette type, can be light or dark.
      type,
      // The colors used to represent primary interface elements for a user.
      primary,
      // The colors used to represent secondary interface elements for a user.
      secondary,
      // The colors used to represent terziary interface elements for a user.
      terziary,
      // The colors used to represent interface elements that the user should be made aware of.
      error,
      // The colors used to represent positive interface elements.
      success,
      // The grey colors.
      grey,
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold,
      // Take a background color and return the color of the text to maximize the contrast.
      getContrastText,
      // Generate a rich color object.
      augmentColor,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // The light and dark type object.
      ...types[type],
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );

  return paletteOutput;
}
