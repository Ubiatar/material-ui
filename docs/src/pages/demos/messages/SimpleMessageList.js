import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MessageList from '@material-ui/core/MessageList';
import moment from 'moment';

const styles = {
  root: {
    width: '100%',
    flex: 1,
  },
  container1: {
    width: '100%',
    flex: 1,
    position: 'relative',
    height: '400px',
  },
  container2: {
    width: '100%',
    flex: 1,
    position: 'relative',
    height: '400px',
  },
  messagesList: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  boxText: {
    color: 'blue',
  },
};

function SimpleMessageList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container1}>
        <MessageList
          classes={{
            boxText: classes.boxText,
          }}
          className='message-list'
          avatar="/static/images/remy.jpg"
          newMessagesIndex={7}
          newMessagesComp={<div>nuovi messaggi</div>}
          dataSource={[
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'waiting',
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'waiting',
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'waiting',
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'sent',
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'received',
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date(),
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm'),
              status: 'read',
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date()
            },
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm')
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date()
            },
            ]}
        />
      </div>
      <div className={classes.container2}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          avatar="/static/images/remy.jpg"
          dataSource={[
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet',
              dateString: moment().format('h:mm')
            },
            {
              position: 'left',
              type: 'text',
              text: 'Consectetur ',
              date: new Date()
            },
          ]}
        />
      </div>
    </div>
  );
}

SimpleMessageList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMessageList);
