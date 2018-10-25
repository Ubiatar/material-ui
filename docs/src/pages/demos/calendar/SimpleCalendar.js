import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = {
  root: {
    width: '100%',
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    position: 'relative',
    height: '400px',
  }
};

function SimpleCalendar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container}>

      </div>
    </div>
  );
}

SimpleCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCalendar);
