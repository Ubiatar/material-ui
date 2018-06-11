import React, { Component } from 'react';
import { TextField, Typography } from '../'
import RCSlider, { Handles } from 'react-compound-slider'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  root: {
    userSelect: 'none',
    position: 'relative',
    width: '100%',
    minWidth: 100,
    height: 2,
    backgroundColor: theme.palette.background.op30,
    borderRadius: 1
  },
  label: {
    marginRight: '1.5em'
  },
  textField: {
    marginLeft: '1.5em',
    width: '8em'
  },
  input: {
    textAlign: 'center'
  },
  handle: {
    position: 'absolute',
    marginLeft: -15,
    marginTop: -9,
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

class Slider extends Component {
  state = {
    textValue: 0
  }

  componentDidMount () {
    this.setState({
      textValue: this.props.values[0]
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      textValue: props.values[0]
    })
  }

  render () {
    const {
      label,
      hasInput,
      values,
      mode,
      step,
      domain,
      decimals,
      onUpdate,
      classes,
      className: classNameProp,
      color, ...other
    } = this.props;

    const className = classNames(
      'material-Sliders',
      classes.root,
      {
        [classes[`color${capitalize(color)}`]]: color !== 'inherit',
      },
      classNameProp,
    );

    const {
      textValue
    } = this.state

    const toText = (value, decimals) => (parseInt(value, 10) / Math.pow(10, decimals)).toString()

    const toValues = (ev, decimals) => [parseInt(parseFloat(ev.target.value) * Math.pow(10, decimals), 10)]

    return (
      <div className={classes.container}>
        {
          label && <Typography className={classes.label}>{label}</Typography>
        }
        <RCSlider
          className={className}
          domain={domain}  // [min, max]
          step={step}
          mode={mode} // 1 = allow-crossing of handles, 2 = no crossing
          values={values} // one value would be a value slider, two a range slider, etc
          onUpdate={onUpdate}
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
        {
          hasInput && <TextField
            InputProps={{
              classes: {
                root: classes.input,
                input: classes.input,
              },
            }}
            value={toText(textValue, decimals)}
            onChange={ev => this.setState({
              textValue: toValues(ev, decimals)[0]
            })}
            onBlur={ev => onUpdate(toValues(ev, decimals))}
            onKeyPress={ev => ev.charCode === 13 && onUpdate(toValues(ev, decimals))}
            type="number"
            className={classes.textField}
          />
        }
      </div>
    );
  }
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
  label: PropTypes.string,
  hasInput: PropTypes.bool,
  decimals: PropTypes.number
};

Slider.defaultProps = {
  color: 'inherit',
  values: [10],
  mode: 2,
  step: 1,
  domain: [0, 100],
  label: null,
  hasInput: false,
  decimals: 0
};

Slider.muiName = 'Slider';

export default withStyles(styles, { name: 'MuiSlider' })(Slider);
