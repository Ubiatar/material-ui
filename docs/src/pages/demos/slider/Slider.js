import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Slider, {Rail, Handles, Handle} from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: 20,
    margin: 20
  }
});

class Demo extends React.Component {
  state = {
    value: 10
  }

  render () {
    const {classes} = this.props
    const {value} = this.state

    return (
      <div>
        <Paper className={classes.paper}>
          <Slider onUpdate={console.log} />
        </Paper>
        <Paper className={classes.paper}>
          <Slider
            label="UAC/h"
            values={[value]}
            onUpdate={values => this.setState({value: values[0]})}
            domain={[5, 5000]}
            decimals={2}
            hasInput
            handleColor='primary'
            trackColor='secondary'
          />
        </Paper>
      </div>
    )
  }
}

function SliderDemo(props) {
  const {classes} = props;
  return (
    <Demo classes={classes} />
  );
}

SliderDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SliderDemo);
