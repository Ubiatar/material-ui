import React, { Component } from 'react';
import classNames from 'classnames';
import FaCloudDownload from 'ubiatar-material-ui-icons/CloudDownload';
import CircularProgress from '../../CircularProgress';
import withStyles from '../../styles/withStyles';

export const styles = theme => {
  return {
    boxPhoto: {
      marginTop: -3,
      marginRight: -6,
      marginLeft: -6,
    },
    boxText: {
      padding: '5px 0px',
      maxWidth: 300,
      margin: 'auto',
    },
    boxImg: {
      height: '100%',
      width: '100%',
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      justifyContent: 'center',
      borderRadius: 5,
      maxHeight: 300,
      maxWidth: 300
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
    },
    boxImgImg: {
      height: '100%',
      minHeight: '100%',
      userSelect: 'none',
    },

    boxImgBlockItem: {
      margin: 'auto',
      cursor: 'pointer',
      width: 100,
      height: 100,
    },
    boxImgContent: {
      minWidth: '100%',
      maxWidth: '100%'
    },

    boxPhotoDownload: {
      color: '#efe',
      display: 'flex',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
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
            className={classNames(classes.boxImgContent)}
            //style={{maxWidth: '100%', maxHeight: '100%'}}
            src={this.props.data.uri}
            alt={this.props.data.alt}
            onClick={this.props.onOpen}
            onLoad={this.props.onLoad}
          />
          {this.props.data.status &&
            !this.props.data.status.download && (
              <div className={classNames(classes.boxImgBlock)}>
                {!this.props.data.status.click && (
                  <button
                    onClick={this.props.onDownload}
                    //className="rce-mbox-photo--img__block-item rce-mbox-photo--download">
                    className={classNames([classes.boxImgBlockItem, classes.boxPhotoDownload])}
                  >
                    <FaCloudDownload />
                  </button>
                )}
                {typeof this.props.data.status.loading === 'number' &&
                  this.props.data.status.loading !== 0 && (
                    <CircularProgress
                      value={this.props.data.status.loading}
                      className={classNames(classes.boxImgBlockItem)}
                    />
                  )}
              </div>
            )}
        </div>
        {this.props.text && <div className={classNames(classes.boxText)}>{this.props.text}</div>}
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
