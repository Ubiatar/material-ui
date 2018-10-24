import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import MessageList from "@material-ui/core/MessageList"
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

function SimplePhotoMessage(props) {
  const { classes } = props;
  return (
    <MessageList
      className='message-list'
      lockable={true}
      toBottomHeight={'100%'}
      avatar="/static/images/remy.jpg"
      dataSource={[
        {
          position: 'right',
          type: 'photo',
          text: null,
          data: {
          uri: "/static/images/remy.jpg",
        },
          date: new Date()
        }
      ]}
    />
  );
}

SimplePhotoMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePhotoMessage);
