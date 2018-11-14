import React, { Component } from 'react';
import classNames from 'classnames';
import FaCloudDownload from 'ubiatar-material-ui-icons/CloudDownload';
import { CircularProgress, Typography } from '../../';
import withStyles from '../../styles/withStyles';

export const styles = theme => {
  return {
    boxPhoto: {
      marginTop: -3,
      marginRight: -6,
      marginLeft: -6,
      padding: '6px 9px 8px 9px',
      margin: 'auto',
    },
    boxText: {
      padding: '5px 0px',
      maxWidth: 300,
      margin: 'auto',
    },
    boxImg: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 5,
      maxHeight: 320,
      maxWidth: 320,
    },
    boxImgBlock: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxImgImg: {
      maxHeight: 320,
      maxWidth: 320,
      userSelect: 'none',
      borderRadius: 5,
      display: 'block',
    },
    boxPhotoDownload: {
      color: '#efe',
      display: 'flex',
      justifyContent: 'center',
      background: 'none',
      fontSize: '3.2em',
      outline: 'none',
      border: '1px solid #eee',
      borderRadius: '100%',
      height: 100,
      width: 100,
      '&:hover': {
        opacity: '.7',
      },
      '&:active': {
        opacity: '.3',
      },
    },
  };
};

export class PhotoMessage extends Component {
  render() {
    const { classes } = this.props;
    const progressOptions = {
      strokeWidth: 2.3,
      color: '#efe',
      trailColor: '#aaa',
      trailWidth: 1,
      step: (state, circle) => {
        circle.path.setAttribute('trail', state.color);
        circle.path.setAttribute('trailwidth-width', state.width);

        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      },
    };

    return (
      <div className={classNames(classes.boxPhoto)}>
        <div
          className={classNames(classes.boxImg)}
          style={
            this.props.data.width &&
            this.props.data.height && {
              width: this.props.data.width,
              height: this.props.data.height,
            }
          }
        >
          <img
            className={classNames(classes.boxImgImg)}
            src={this.props.data.uri}
            alt={this.props.data.alt}
            onClick={this.props.onOpen}
            onLoad={this.props.onLoad}
          />
          {this.props.data.status &&(
            <div className={classNames(classes.boxImgBlock)}>
              {this.props.data.status === 'loading' && (
                <CircularProgress />
              )}
            </div>
          )}
        </div>
        {this.props.text && <Typography className={classNames(classes.boxText)}>{this.props.text}</Typography>}
      </div>
    );
  }
}

PhotoMessage.defaultProps = {
  text: '',
  data: {},
  onDownload: null,
  onOpen: null,
  onLoad: null,
};

export default withStyles(styles, { name: 'PhotoMessage' })(PhotoMessage);
