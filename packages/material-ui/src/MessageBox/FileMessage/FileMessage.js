import React, { Component } from 'react';
// import './FileMessage.css';

import FaCloudDownload from 'ubiatar-material-ui-icons/CloudDownload'
import FaFile from 'ubiatar-material-ui-icons/InsertDriveFile'
import CircularProgress from '../../CircularProgress'
import withStyles from "../../styles/withStyles";

import Button from '../../Button'

/*const ProgressBar = require('react-progress-bar.js');
const Circle = ProgressBar.Circle;*/

export const styles = theme => {
  return {
    boxFile: {
      paddingBottom: 13
    },
    button: {
      background: '#e9e9e9',
      display: 'flex',
      borderRadius: 5,
      marginTop: -3,
      marginRight: -6,
      marginLeft: -6,
      alignItems: 'center',
      minHeight: 52,
      maxWidth: 500,
      padding: '5px 0',
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',
      border:'none'
    },
    boxFileIcon: {
      fontSize: 30,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
  },
    boxFileSize: {
      fontSize: 10,
      marginTop: 3,
      maxWidth: 52,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
  },
    boxFileText: {
      fontSize: 13.6,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
  },

    boxFileButtons: {
      fontSize: 30,
      alignItems: 'center',
      display: 'flex'
  },

    boxFileLoading:  {
      fontSize: 15,
      width: 40,
      height: 40
  }

  }
}

export class FileMessage extends Component {

    onClick(e) {
        if (!this.props.data.status)
            return;

        if (!this.props.data.status.download && this.props.onDownload instanceof Function)
            this.props.onDownload(e);
        else if (this.props.data.status.download && this.props.onOpen instanceof Function)
            this.props.onOpen(e);
    }

    render() {
      const {classes} = this.props
        let progressOptions = {
            strokeWidth: 5,
            color: '#333',
            trailColor: '#aaa',
            trailWidth: 5,
            step: (state, circle) => {
                circle.path.setAttribute('trail', state.color);
                circle.path.setAttribute('trailwidth-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0)
                    circle.setText('');
                else
                    circle.setText(value);
            }
        };

        return (
            <div className={classNames(classes.boxFile)}>
                <Button className={classNames(classes.button)}
                        onClick={this.onClick.bind(this)}>
                    <div className={classNames(classes.boxFileIcon)}>
                        <FaFile
                            color='#aaa'/>
                        <div className={classNames(classes.boxFileSize)}>
                            {this.props.data.size}
                        </div>
                    </div>
                    <div className={classNames(classes.boxFileText)}>
                        {this.props.text}
                    </div>
                    <div className={classNames(classes.boxFileIcon)}>
                        {
                            this.props.data.status &&
                            !this.props.data.status.download &&
                            !this.props.data.status.click &&
                            <FaCloudDownload
                                color='#aaa'/>
                        }
                        {
                            this.props.data.status &&
                            typeof this.props.data.status.loading === 'number' &&
                            this.props.data.status.loading !== 0 &&
                            <CircularProgress
                                value={this.props.data.status.loading}
                                // options={progressOptions}
                                // containerClassName={'rce-mbox-file--loading'} />
                                className={classNames(classes.boxFileLoading)}/>
                        }
                    </div>
                </Button>
            </div>
        );
    }
}

FileMessage.defaultProps = {
    text: '',
    data: {},
    onClick: null,
    onDownload: null,
    onOpen: null,
};

export default withStyles(styles, { name: 'FileMessage' })(FileMessage);
