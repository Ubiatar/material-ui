import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Calendar from '@material-ui/core/DatePicker/Calendar'
import DatePicker from '@material-ui/core/DatePicker'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
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
  }
};

function SimpleCalendar(props) {
  const { classes } = props;
  const format = 'YYYY-MM-DD'
  const multiple = [moment('2018-10-24', format), moment('2018-10-29', format), moment('2018-10-26', format)]
  const single = moment()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Calendar
          date={single}
          leftArrowIcon={<KeyboardArrowLeft/>}
          rightArrowIcon={<KeyboardArrowRight/>}
        />
        <Calendar
          dates={multiple}
          disableBefore={moment().subtract(3, 'days')}
          disableAfter={moment().add(18, 'days')}
          leftArrowIcon={<KeyboardArrowLeft/>}
          rightArrowIcon={<KeyboardArrowRight/>}
        />
        <Calendar>
          date={single}
          leftArrowIcon={<KeyboardArrowLeft/>}
          rightArrowIcon={<KeyboardArrowRight/>}
        </Calendar>
      </div>
    </div>
  );
}

SimpleCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

SimpleCalendar.state = {
  date: moment()
}

export default withStyles(styles)(SimpleCalendar);
