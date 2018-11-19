import React, { Component } from 'react';
import classNames from 'classnames';
import { LinearProgress, Typography } from '../../';
import withStyles from '../../styles/withStyles';
import Fullscreen from 'ubiatar-material-ui-icons/Fullscreen';

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
      margin: 'auto',
    },
    boxImg: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 5,
      height: 240,
      '&:hover $hover': {
        opacity: 1,
      },
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
      height: '100%',
      width: 'auto',
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
    progress: {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    hover: {
      cursor: 'pointer',
      opacity: 0,
      transition: 'opacity ease-in .2s',
    },
    fullscreen: {
      fill: 'white',
      width: '3em',
      height: '3em',
      animation: 'mui-zoom-in-out 1.5s infinite linear',
    },
    '@keyframes mui-zoom-in-out': {
      '50%': {
        transform: 'scale(1.4)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
  };
};

export class PhotoMessage extends Component {
  render() {
    const { classes } = this.props;

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
            onLoad={this.props.onLoad}
          />
          {this.props.data.status === 'download' && (
            <div
              className={classNames(classes.boxImgBlock, classes.hover)}
              onClick={this.props.onOpen}
            >
              <Fullscreen className={classes.fullscreen} />
            </div>
          )}
          {this.props.data.status === 'loading' && (
            <div className={classNames(classes.boxImgBlock)}>
              <LinearProgress className={classes.progress} />
            </div>
          )}
        </div>
        {this.props.text && (
          <Typography className={classNames(classes.boxText)}>{this.props.text}</Typography>
        )}
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
