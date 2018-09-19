import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RoundedRaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="raised" className={classes.button} rounded>
        Default
      </Button>
      <Button variant="raised" color="primary" className={classes.button} rounded>
        Primary
      </Button>
      <Button variant="raised" color="secondary" className={classes.button} rounded>
        Secondary
      </Button>
      <Button variant="raised" color="secondary" disabled className={classes.button} rounded>
        Disabled
      </Button>
      <Button variant="raised" href="#raised-buttons" className={classes.button} rounded>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button} rounded>
          Upload
        </Button>
      </label>
    </div>
  );
}

RoundedRaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoundedRaisedButtons);
