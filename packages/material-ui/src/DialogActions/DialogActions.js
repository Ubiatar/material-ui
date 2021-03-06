import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: '0 0 auto',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    padding: `0 ${theme.spacing.unit * 3}px \
      20px ${theme.spacing.unit * 3}px`,
  },
  action: {
    // margin: `0 ${theme.spacing.unit / 2}px`,
    minWidth: 150,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
});

function DialogActions(props) {
  const { disableActionSpacing, children, classes, className, ...other } = props;

  return (
    <div
      className={classNames(classes.root, className, {
        [classes.flexEnd]: Children.toArray(children).length === 1,
      })}
      {...other}
    >
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

DialogActions.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the dialog actions do not have additional margin.
   */
  disableActionSpacing: PropTypes.bool,
};

DialogActions.defaultProps = {
  disableActionSpacing: false,
};

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
