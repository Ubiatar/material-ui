import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import MessageList from "@material-ui/core/MessageList"
import moment from 'moment'

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleMessageList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
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
            date: new Date(),
          },
          {
            position: 'left',
            type: 'text',
            text: 'Consectetur adipisicing elit',
            dateString: moment().format('h:mm')
          },

          ]}
      />
    </div>
  );
}

SimpleMessageList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMessageList);
