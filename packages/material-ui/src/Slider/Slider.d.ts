import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface SliderProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, SliderClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
}

export type SliderClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary';

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
