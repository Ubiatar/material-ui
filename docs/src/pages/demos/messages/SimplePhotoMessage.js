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
          type: 'photo',
          text: 'ok ok ok ',
          data: {
            uri: "https://corrieredelmezzogiorno.corriere.it/methode_image/2015/09/07/Campania/Foto/modella%20olandese.jpg?v=201509071110",
            status: 'loading'
          },
          date: new Date()
        },
        {
          position: 'right',
          type: 'photo',
          text: 'ok ok ok ',
          data: {
            uri: "https://wallpapershome.com/images/wallpapers/marlen-alvarez-720x1280-portrait-4k-16305.jpg"
          },
          date: new Date()
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
      ]}
    />
  );
}

SimplePhotoMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePhotoMessage);
