import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import withStyles from '../styles/withStyles';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';
import * as defaultUtils from '../utils/utils';
import DayWrapper from './DayWrapper';
import Day from './Day';

const moment = extendMoment(Moment);

/* eslint-disable no-unused-expressions */
export class Calendar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    datesEnabled: PropTypes.array.isRequired,
    datesSelected: PropTypes.array,
    dayClasses: PropTypes.object,
    headerClasses: PropTypes.object,
    leftArrowIcon: PropTypes.node,
    maxDate: DomainPropTypes.date,
    minDate: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    renderDay: PropTypes.func,
    rightArrowIcon: PropTypes.node,
    /** @ignore */
    theme: PropTypes.object.isRequired,
    utils: PropTypes.object,
  };

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
  };

  state = {
    currentMonth: this.getStartOfMonth(this.props.datesEnabled[0]),
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentMonth: this.getStartOfMonth(nextProps.datesEnabled[0]),
    });
  }

  onDateSelect = day => this.props.onChange(day.clone());

  getStartOfMonth(date) {
    return this.props.utils.getStartOfMonth(date || moment());
  }

  handleChangeMonth = newMonth => {
    this.setState({ currentMonth: newMonth });
  };

  validateMinMaxDate = day => {
    const { minDate, maxDate } = this.props;
    const startOfDay = date => moment(date).startOf('day');

    return (
      (minDate && day.isBefore(startOfDay(minDate))) ||
      (maxDate && day.isAfter(startOfDay(maxDate)))
    );
  };

  shouldDisableDate = day => {
    const { datesEnabled } = this.props;
    return (
      _.findIndex(datesEnabled, date => date.isSame(day, 'day')) < 0 || this.validateMinMaxDate(day)
    );
  };

  moveToDay = day => {
    if (day && !this.shouldDisableDate(day)) {
      this.props.onChange(day);
    }
  };

  handleKeyDown = event => {
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
    const { utils } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    return weeks.map(week => (
      <div key={`week-${week[0].toString()}`} className={this.props.classes.week}>
        {this.renderDays(week)}
      </div>
    ));
  };

  renderDays = week => {
    const { datesSelected, dayClasses, renderDay, utils } = this.props;

    const currentMonthNumber = utils.getMonthNumber(this.state.currentMonth);
    const now = moment();

    return week.map(day => {
      const dayInCurrentMonth = utils.getMonthNumber(day) === currentMonthNumber;
      const disabled = this.shouldDisableDate(day)

      let dayComponent = (
        <Day
          classes={dayClasses}
          current={day.isSame(now, 'day')}
          hidden={!dayInCurrentMonth}
          disabled={disabled}
          selected={_.findIndex(datesSelected, date => date.isSame(day, 'day')) >= 0}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(day, dayInCurrentMonth, dayComponent);
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
        {dates ? null : <EventListener target="window" onKeyDown={this.handleKeyDown} />}

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
