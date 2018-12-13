import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';

import _ from 'lodash'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';
import * as defaultUtils from '../utils/utils';
import DayWrapper from './DayWrapper';
import Day from './Day';


const moment = extendMoment(Moment);

/* eslint-disable no-unused-expressions */
export class Calendar extends Component {
  static propTypes = {
    date: PropTypes.object,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    dayClasses: PropTypes.object,
    headerClasses: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    disableBefore: PropTypes.object,
    disableAfter: PropTypes.object,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    /** @ignore */
    theme: PropTypes.object.isRequired,
    utils: PropTypes.object,
    shouldDisableDate: PropTypes.func,

    dates: PropTypes.array,
  };

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
    shouldDisableDate: () => false,
  };

  state = {
    currentMonth: this.getStartOfMonth(
      this.props.dates ? this.props.dates[0] : this.props.date
    ),
  };

  getStartOfMonth( date ) {
    return this.props.utils.getStartOfMonth( date ? date : moment() )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentMonth: this.getStartOfMonth(nextProps.dates ? nextProps.dates[0] : nextProps.date),
    });
  }

  onDateSelect = (day) => {
    const { date } = this.props;
    const updatedDate = date ? day
      .clone()
      .hours(date.hours())
      .minutes(date.minutes()) : day.clone()

    this.props.onChange(updatedDate);
  };

  handleChangeMonth = (newMonth) => {
    this.setState({ currentMonth: newMonth });
  };

  validateMinMaxDate = (day) => {
    const { minDate, maxDate } = this.props;
    const startOfDay = date => moment(date).startOf('day');

    return (
      (minDate && day.isBefore(startOfDay(minDate))) ||
      (maxDate && day.isAfter(startOfDay(maxDate)))
    );
  };

  shouldDisableDate = (day) => {
    const { disablePast, disableFuture, disableBefore, disableAfter, shouldDisableDate } = this.props;
    return (
      (disableFuture && day.isAfter(moment(), 'day')) ||
      (disablePast && day.isBefore(moment(), 'day')) ||
      (disableAfter && day.isAfter(disableAfter, 'day')) ||
      (disableBefore && day.isBefore(disableBefore, 'day')) ||
      this.validateMinMaxDate(day) ||
      shouldDisableDate(day)
    );
  };

  moveToDay = (day) => {
    if (day && !this.shouldDisableDate(day)) {
      this.props.onChange(day);
    }
  }

  handleKeyDown = (event) => {
    const { theme, date } = this.props;

    switch (keycode(event)) {
      case 'up':
        this.moveToDay(date.clone().subtract(7, 'days'));
        break;
      case 'down':
        this.moveToDay(date.clone().add(7, 'days'));
        break;
      case 'left':
        theme.direction === 'ltr'
          ? this.moveToDay(date.clone().subtract(1, 'day'))
          : this.moveToDay(date.clone().add(1, 'day'));
        break;
      case 'right':
        theme.direction === 'ltr'
          ? this.moveToDay(date.clone().add(1, 'day'))
          : this.moveToDay(date.clone().subtract(1, 'day'));
        break;
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  };

  renderWeeks = () => {
    const { utils, dates, date } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    const selectedDates = dates
      ? dates.map( date => date.clone().startOf('day') )
      : date ? [date.clone().startOf('day')] : [];

    return weeks.map(week => (
      <div
        key={`week-${week[0].toString()}`}
        className={this.props.classes.week}
      >
        {this.renderDays(week, selectedDates)}
      </div>
    ));
  };


  renderDays = (week, selectedDates) => {
    const { dayClasses, renderDay, utils } = this.props;

    const currentMonthNumber = utils.getMonthNumber(this.state.currentMonth);
    const now = moment();

    return week.map((day) => {
      const disabled = this.shouldDisableDate(day);
      const dayInCurrentMonth =
        utils.getMonthNumber(day) === currentMonthNumber;

      let dayComponent = (
        <Day
          classes={dayClasses}
          current={day.isSame(now, 'day')}
          hidden={!dayInCurrentMonth}
          disabled={disabled}
          selected={_.findIndex(selectedDates, date => date.isSame(day, 'day')) >= 0}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(
          day,
          dayInCurrentMonth,
          dayComponent,
        );
      }

      return (
        <DayWrapper
          key={day.toString()}
          value={day}
          dayInCurrentMonth={dayInCurrentMonth}
          disabled={disabled}
          onSelect={this.onDateSelect.bind(this)}
        >
          {dayComponent}
        </DayWrapper>
      );
    });
  };

  render() {
    const { currentMonth } = this.state;
    const { classes, headerClasses, utils, dates } = this.props;
    return (
      <Fragment>
        {
          dates ? null : ( <EventListener target="window" onKeyDown={this.handleKeyDown} /> )
        }

        <CalendarHeader
          classes={headerClasses}
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
          utils={utils}
        />

        <div className={classes.calendar}>{this.renderWeeks()}</div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  calendar: {
    height: 36 * 6,
    marginTop: theme.spacing.unit * 1.5,
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles, {
  name: 'MuiPickersCalendar',
  withTheme: true,
})(Calendar);
