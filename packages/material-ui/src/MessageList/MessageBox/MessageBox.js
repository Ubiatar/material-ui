import React, { Component } from 'react';

import PhotoMessage from './PhotoMessage/PhotoMessage';
import FileMessage from './FileMessage/FileMessage';
import SystemMessage from './SystemMessage/SystemMessage';
import LocationMessage from './LocationMessage/LocationMessage';

import {
  Avatar,
  Typography
} from '@material-ui/core'

import FaForward from 'ubiatar-material-ui-icons/src/Mail'

import IoDoneAll from 'ubiatar-material-ui-icons/src/DoneAll'
import MdIosTime from 'ubiatar-material-ui-icons/src/AccessTime'
import MdCheck from 'ubiatar-material-ui-icons/src/Check'

import moment from 'moment'
import classNames from 'classnames'
import withStyles from "../../styles/withStyles";

export const styles = theme => {
  return {
    container: {
      flexDirection: 'row',
      display: 'flex',
      overflow: 'hidden',
      minWidth: 200,
      '&:hover .boxForwardRight': {
        opacity: 1,
        visibility: 'visible',
      },
      '&:hover .boxForwardLeft': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    flexEnd: {
      justifyContent: 'flex-end'
    },
    box: {
      position: 'relative',
      background: 'white',
      borderRadius: 8,
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .2)',
      borderTopLeftRadius: 0,
      marginLeft: 15,
      marginRight: 5,
      marginTop: 3,
      flexDirection: 'column',
      marginBottom: 3,
      padding: '6px 9px 8px 9px',
      float: 'left',
      minWidth: 140
    },
    avatarContainer: {
      width: 30,
      height: 30,
      marginTop: 5
    },
    boxRight: {
      backgroundColor: theme.palette.primary.light,
      float: 'right',
      marginLeft: 5,
      marginRight: 20,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 5
    },
    boxClearPadding: {
      paddingBottom: 3
  },
    boxClearNotch: {
    borderRadius: '5px 5px 5px 5px !important'
  },
    boxBody: {
      margin: 0,
      padding: 0,
      position: 'relative'
    },
    boxForward: {
      width: 30,
      height: 30,
      borderRadius: 20,
      background: '#fff',
      position: 'absolute',
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 5px 0 rgba(164, 164, 164, 1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      top: 0,
      bottom: 0,
      margin: 'auto'
    },
    boxForwardLeft: {
      display: 'flex',
      opacity: 0,
      visibility: 'hidden',
      left: -50,
  },
    boxForwardRight: {
      display: 'flex',
      opacity: 0,
      visibility: 'hidden',
      right: -50
  },
    boxTitle: {
      margin: 0,
      marginBottom: 8,
      fontWeight: 500,
      fontSize: 13,
      color: '#4f81a1',
      userSelect: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&hover': {
        textDecoration: 'underline'
      }
  },
    boxTitleClear: {
      marginBottom: 5
    },
    boxText: {
      wordBreak: 'break-word',
  },
    boxTimeNonCopiable: {
      '&before': {
        content: 'attr(data-text)'
      }
    },
    boxTime: {
    textAlign:'right',
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 12,
    // position: 'absolute',
    right: -4,
    bottom: -5,
    marginTop: 5
  },
    boxTimeBlock: {
    /*position: relative;*/
    right: 0,
    bottom: 0,
    left: 0,
    marginRight: -6,
    marginLeft: -6,
    paddingTop: 5,
    paddingRight: 3,
    paddingBottom: 2,
    background: 'linear-gradient(to top, rgba(0,0,0,0.33), transparent)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    color: '#fff'
  },
    boxStatus: {
    marginLefteft: 3,
    fontSize: 15
  },
  boxRightNotch: {
    position: 'absolute',
    right: -9,
    top: 0,
    width: 9,
    height: 9,
    fill: theme.palette.primary.light,
    filter: 'drop-shadow( 2px 0px 1px rgba(0, 0, 0, .2))'
  },
  boxLeftNotch: {
    position: 'absolute',
    left: -9,
    top: 0,
    width: 9,
    height: 9,
    fill: 'white'
  }
  };
};

export class MessageBox extends Component {
    render() {
      const { classes } = this.props;

        let positionCls = classNames(classes.box, { [classes.boxRight]: this.props.position === 'right' });
        let thatAbsoluteTime = this.props.type !== 'text' && this.props.type !== 'file' && !(this.props.type === 'location' && this.props.text);


        const dateText = this.props.date && !isNaN(this.props.date) && (
            this.props.dateString ||
            moment(this.props.date).fromNow()
        );

        const className = classNames(classes.container, this.props.className, {[classes.flexEnd]: this.props.position === 'right'})
        return (
            <div
                className={className}
                onClick={this.props.onClick}>
                {
                    this.props.renderAddCmp instanceof Function &&
                    this.props.renderAddCmp()
                }
              {
                (this.props.position === 'left' && this.props.avatar) &&
                <Avatar alt="User" src={this.props.avatar} className={classNames(classes.avatarContainer)}/>
              }
                {
                    this.props.type === 'system' ?
                        <SystemMessage
                            text={this.props.text} />
                        :
                        <div
                            className={classNames(
                                positionCls,
                                {[classes.boxClearPadding]: thatAbsoluteTime},
                                {[classes.boxClearNotch]: !this.props.notch}
                            )}>
                            <div className={classNames(classes.boxBody)}>
                                {
                                    this.props.forwarded === true &&
                                    <div
                                        className={classNames(
                                            classes.boxForward,
                                            { [classes.boxForwardRight]: this.props.position === 'left' },
                                            { [classes.boxForwardLeft]: this.props.position === 'right' }
                                        )}
                                        onClick={this.props.onForwardClick}>
                                            <FaForward />
                                    </div>
                                }

                                {
                                    (this.props.title) &&
                                    <div
                                        style={this.props.titleColor && { color: this.props.titleColor }}
                                        onClick={this.props.onTitleClick}
                                        className={classNames(classes.boxTitle, {
                                            [classes.boxTitleClear]: this.props.type === 'text',
                                        })}>
                                        {
                                            this.props.title &&
                                            <span>{this.props.title}</span>
                                        }
                                    </div>
                                }

                                {
                                    this.props.type === 'text' &&
                                    <Typography className={classNames(classes.boxText)}>
                                        {this.props.text}
                                    </Typography>
                                }

                                {
                                    this.props.type === 'location' &&
                                    <LocationMessage
                                        onOpen={this.props.onOpen}
                                        data={this.props.data}
                                        target={this.props.target}
                                        href={this.props.href}
                                        apiKey={this.props.apiKey}
                                        src={this.props.src}
                                        zoom={this.props.zoom}
                                        markerColor={this.props.markerColor}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'photo' &&
                                    <PhotoMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        onLoad={this.props.onLoad}
                                        data={this.props.data}
                                        width={this.props.width}
                                        height={this.props.height}
                                        text={this.props.text} />
                                }

                                {
                                    this.props.type === 'file' &&
                                    <FileMessage
                                        onOpen={this.props.onOpen}
                                        onDownload={this.props.onDownload}
                                        data={this.props.data}
                                        text={this.props.text} />
                                }


                                <Typography
                                    className={classNames(
                                        classes.boxTime,
                                        { [classes.boxTimeBlock]: thatAbsoluteTime },
                                        { [classes.boxTimeNonCopiable]: !this.props.copiableDate },
                                    )}
                                    data-text={this.props.copiableDate ? undefined : dateText}>
                                    {
                                        this.props.date &&
                                        !isNaN(this.props.date) &&
                                        (
                                            this.props.dateString ||
                                            moment(this.props.date).fromNow()
                                        )
                                    }
                                    {
                                        this.props.status &&
                                        <span className={classNames(classes.boxStatus)}>
                                            {
                                                this.props.status === 'waiting' &&
                                                <MdIosTime />
                                            }

                                            {
                                                this.props.status === 'sent' &&
                                                <MdCheck />
                                            }

                                            {
                                                this.props.status === 'received' &&
                                                <IoDoneAll />
                                            }

                                            {
                                                this.props.status === 'read' &&
                                                <IoDoneAll color='#4FC3F7'/>
                                            }
                                        </span>
                                    }
                                </Typography>
                            </div>

                            {
                                this.props.notch &&
                                (this.props.position === 'right' ?
                                    <svg className={classNames(classes.boxRightNotch)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M0 0v20L20 0" />
                                    </svg>
                                    :
                                    <div>
                                        <svg className={classNames(classes.boxLeftNotch)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <defs>
                                                <filter id="filter1" x="0" y="0">
                                                    <feOffset result="offOut" in="SourceAlpha" dx="-2" dy="-5" />
                                                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                                                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                                </filter>
                                            </defs>
                                            <path d="M20 0v20L0 0" filter="url(#filter1)" />
                                        </svg>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}

MessageBox.defaultProps = {
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    titleColor: null,
    onTitleClick: null,
    onForwardClick: null,
    date: new Date(),
    data: {},
    onClick: null,
    onOpen: null,
    onDownload: null,
    onLoad: null,
    forwarded: false,
    status: null,
    dateString: null,
    notch: true,
    avatar: "",
    renderAddCmp: null,
    copiableDate: false,
};

export default withStyles(styles, { name: 'MessageBox' })(MessageBox);

