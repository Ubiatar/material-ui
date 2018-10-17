import React, { Component } from 'react';
// import './SystemMessage.css';
import withStyles from "../../styles/withStyles";

import classNames from 'classnames'

export const styles = theme => {
  return {
    container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
    smsg: {
    position: 'relative',
    background: 'white',
    borderRadius: 10,
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,.2)',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0px',
    padding: '6px 9px 8px 9px',
    float: 'left',
    maxWidth: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
    smsgText: {
    textAlign: 'center',
    display: 'inline-block',
    fontSize: 15
  }
}
}

export class SystemMessage extends Component {
    render() {
      const { classes } = this.props
        return (
            <div className={classNames(classes.container, this.props.className)}>
                <div
                    className={classNames(classes.smsg)}>
                    <div className={classNames(classes.smsgText)}>
                        {this.props.text}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { name: 'SystemMessage' })(SystemMessage);
