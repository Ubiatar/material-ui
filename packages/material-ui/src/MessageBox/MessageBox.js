import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import FaForward from 'ubiatar-material-ui-icons/Mail';
import IoDoneAll from 'ubiatar-material-ui-icons/DoneAll';
import MdIosTime from 'ubiatar-material-ui-icons/AccessTime';
import MdCheck from 'ubiatar-material-ui-icons/Check';
import PhotoMessage from './PhotoMessage';
import FileMessage from './FileMessage';
import SystemMessage from './SystemMessage';
import LocationMessage from './LocationMessage';
import { Avatar, Typography } from '../';
import { withStyles } from '../styles';

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
      justifyContent: 'flex-end',
    },
    box: {
      position: 'relative',
      backgroundColor: theme.palette.background.messageBox.left,
      borderRadius: 8,
      boxShadow: '-1px 1px 7px 0px rgba(0, 0, 0, .2)',
      borderTopLeftRadius: 0,
      marginLeft: 15,
      marginRight: 5,
      marginTop: 3,
      flexDirection: 'column',
      marginBottom: 3,
      padding: '6px 9px 8px 9px',
      float: 'left',
      minWidth: 140,
    },
    avatarContainer: {
      width: 30,
      height: 30,
      marginTop: 5,
    },
    boxRight: {
      backgroundColor: theme.palette.background.messageBox.right,
      float: 'right',
      marginLeft: 5,
      marginRight: 20,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 5,
    },
    boxClearPadding: {
      paddingBottom: 3,
    },
    boxClearNotch: {
      borderRadius: '5px 5px 5px 5px !important',
    },
    boxBody: {
      margin: 0,
      padding: 0,
      position: 'relative',
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
      // boxShadow: '0 0 5px 0 rgba(164, 164, 164, 1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      top: 0,
      bottom: 0,
      margin: 'auto',
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
      right: -50,
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
        textDecoration: 'underline',
      },
    },
    boxTitleClear: {
      marginBottom: 5,
    },
    boxText: {
      wordBreak: 'break-word',
    },
    boxTimeNonCopiable: {
      '&before': {
        content: 'attr(data-text)',
      },
    },
    boxTime: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 10,
      // position: 'absolute',
      right: -4,
      bottom: -5,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    boxTimeBlock: {
      /* position: relative; */
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
      color: '#fff',
    },
    boxStatus: {
      marginLeft: 3,
      fontSize: 15,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        width: '.5em',
        height: '.5em',
      },
    },
    boxRightNotch: {
      position: 'absolute',
      right: -9,
      top: 0,
      width: 9,
      height: 9,
      fill: theme.palette.background.messageBox.right,
      filter: 'drop-shadow( 2px 0px 1px rgba(0, 0, 0, .2))',
    },
    boxLeftNotch: {
      position: 'absolute',
      left: -9,
      top: 0,
      width: 9,
      height: 9,
      fill: theme.palette.background.messageBox.left,
      filter: 'drop-shadow( -1px -1px 1px rgba(0, 0, 0, .05))',
    },
  };
};

export function MessageBox(props) {
  const { classes } = props;

  const positionCls = classNames(classes.box, {
    [classes.boxRight]: props.position === 'right',
  });
  const thatAbsoluteTime =
    props.type !== 'text' && props.type !== 'file' && !(props.type === 'location' && props.text);

  const dateText =
    props.date && !isNaN(props.date) && (props.dateString || moment(props.date).fromNow());

  const className = classNames(classes.container, props.className, {
    [classes.flexEnd]: props.position === 'right',
  });
  return (
    <div className={className} onClick={props.onClick}>
      {props.renderAddCmp instanceof Function && props.renderAddCmp()}
      {props.position === 'left' &&
        props.avatar && (
          <Avatar alt="User" src={props.avatar} className={classNames(classes.avatarContainer)} />
        )}
      {props.type === 'system' ? (
        <SystemMessage text={props.text} />
      ) : (
        <div
          className={classNames(
            positionCls,
            { [classes.boxClearPadding]: thatAbsoluteTime },
            { [classes.boxClearNotch]: !props.notch },
          )}
        >
          <div className={classNames(classes.boxBody)}>
            {props.forwarded === true && (
              <div
                className={classNames(
                  classes.boxForward,
                  { [classes.boxForwardRight]: props.position === 'left' },
                  { [classes.boxForwardLeft]: props.position === 'right' },
                )}
                onClick={props.onForwardClick}
              >
                <FaForward />
              </div>
            )}

            {props.title && (
              <div
                style={props.titleColor && { color: props.titleColor }}
                onClick={props.onTitleClick}
                className={classNames(classes.boxTitle, {
                  [classes.boxTitleClear]: props.type === 'text',
                })}
              >
                {props.title && <span>{props.title}</span>}
              </div>
            )}

            {props.type === 'text' && (
              <Typography className={classNames(classes.boxText)}>{props.text}</Typography>
            )}

            {props.type === 'location' && (
              <LocationMessage
                onOpen={props.onOpen}
                data={props.data}
                target={props.target}
                href={props.href}
                apiKey={props.apiKey}
                src={props.src}
                zoom={props.zoom}
                markerColor={props.markerColor}
                text={props.text}
              />
            )}

            {props.type === 'photo' && (
              <PhotoMessage
                onOpen={props.onOpen}
                onDownload={props.onDownload}
                onLoad={props.onLoad}
                data={props.data}
                width={props.width}
                height={props.height}
                text={props.text}
              />
            )}

            {props.type === 'file' && (
              <FileMessage
                onOpen={props.onOpen}
                onDownload={props.onDownload}
                data={props.data}
                text={props.text}
              />
            )}

            <Typography
              className={classNames(
                classes.boxTime,
                { [classes.boxTimeBlock]: thatAbsoluteTime },
                { [classes.boxTimeNonCopiable]: !props.copiableDate },
              )}
              data-text={props.copiableDate ? undefined : dateText}
            >
              {props.date &&
                !isNaN(props.date) &&
                (props.dateString || moment(props.date).fromNow())}
              {props.status && (
                <span className={classNames(classes.boxStatus)}>
                  {props.status === 'waiting' && <MdIosTime />}

                  {props.status === 'sent' && <MdCheck />}

                  {props.status === 'received' && <IoDoneAll />}

                  {props.status === 'read' && <IoDoneAll color="primary" />}
                </span>
              )}
            </Typography>
          </div>

          {props.notch &&
            (props.position === 'right' ? (
              <svg
                className={classNames(classes.boxRightNotch)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 0v20L20 0" />
              </svg>
            ) : (
              <div>
                <svg
                  className={classNames(classes.boxLeftNotch)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
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
            ))}
        </div>
      )}
    </div>
  );
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
  avatar: '',
  renderAddCmp: null,
  copiableDate: false,
};

export default withStyles(styles, { name: 'MessageBox' })(MessageBox);
