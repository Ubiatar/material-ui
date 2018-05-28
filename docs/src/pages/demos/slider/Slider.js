import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Slider, {Rail, Handles, Handle} from '@material-ui/core/Slider';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function doSomething(event) {
  // eslint-disable-next-line no-console
  console.log(event.currentTarget.getAttribute('data-something'));
}

function SliderDemo(props) {
  const {classes} = props;
  return (
    <div>
      <Slider onUpdate={console.log} />
    </div>
  );
}

SliderDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SliderDemo);
