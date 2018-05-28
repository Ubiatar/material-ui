import React from 'react';
import RCSlider, { Handles } from 'react-compound-slider'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    userSelect: 'none',
    position: 'relative',
    width: '100%',
    minWidth: 100,
    height: 6,
    backgroundColor: theme.palette.background.op30,
    borderRadius: 3
  },
  handle: {
    position: 'absolute',
    marginLeft: -15,
    marginTop: -8,
    zIndex: 2,
    width: 20,
    height: 20,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.slider,
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorAction: {
    color: theme.palette.action.active,
  },
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  colorError: {
    color: theme.palette.error.main,
  },
});

const Handle = ({ // your handle component
  handle: { id, value, percent }, // you get an id, the value and the percentage to place it.
  getHandleProps,
  className
}) => {
  return (
    <div style={{
      left: `${percent}%`,
    }} className={className} {...getHandleProps(id)} />
  )
}

function Slider(props) {
  const {
    values,
    mode,
    step,
    domain,
    classes,
    className: classNameProp,
    color, ...other
  } = props;

  const className = classNames(
    'material-Sliders',
    classes.root,
    {
      [classes[`color${capitalize(color)}`]]: color !== 'inherit',
    },
    classNameProp,
  );

  return (
    <RCSlider
      className={className}
      domain={domain}  // [min, max]
      step={step}
      mode={mode} // 1 = allow-crossing of handles, 2 = no crossing
      values={values} // one value would be a value slider, two a range slider, etc
      {...other}
    >
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map(handle => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
                className={classes.handle}
              />
            ))}
          </div>
        )}
      </Handles>
    </RCSlider>
  );
}

Slider.propTypes = {
  /**
   * The name of the Slider font ligature.
   */
  children: PropTypes.node,
  handles: PropTypes.func,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['inherit', 'secondary', 'action', 'disabled', 'error', 'primary']),
};

Slider.defaultProps = {
  color: 'inherit',
  values: [10],
  mode: 2,
  step: 1,
  domain: [0, 100]
};

Slider.muiName = 'Slider';

export default withStyles(styles, { name: 'MuiSlider' })(Slider);
