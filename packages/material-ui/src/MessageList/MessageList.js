import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KeyboardArrowDown } from 'ubiatar-material-ui-icons';
import MessageBox from '../MessageBox';
import { withStyles } from '../styles';

export const styles = theme => {
  return {
    container: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'auto',
    },
    mList: {
      display: 'block',
      overflow: 'auto',
      position: 'relative',
      // flex: 1
    },
    downButton: {
      position: 'absolute',
      right: 10,
      bottom: 15,
      width: 40,
      height: 40,
      background: '#fff',
      boxShadow: ' 0 1px 1px 0 rgba(0,0,0,0.05), 0 2px 5px 0 rgba(0,0,0,0.1)',
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      cursor: 'pointer',
      transition: '200ms',
      '&hovwer': {
        opacity: '0.7',
      },
    },
    downButtonBadge: {
      position: 'absolute',
      right: -5,
      top: -5,
      background: 'red',
      width: 20,
      height: 20,
      borderRadius: '100%',
      fontSize: 12,
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'center',
      fontWeight: '700',
    },
  };
};

export class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: 0,
      downButton: false,
    };
  }

  componentWillReceiveProps() {
    if (!this.mlistRef) return;
    this.setState(
      {
        scrollBottom: this.getBottom(this.mlistRef),
      },
      this.checkScroll.bind(this),
    );
  }

  getBottom(e) {
    return e.scrollHeight - e.scrollTop - e.offsetHeight;
  }

  checkScroll() {
    const e = this.mlistRef;
    if (!e) return;

    if (
      this.props.toBottomHeight === '100%' ||
      this.state.scrollBottom < this.props.toBottomHeight
    ) {
      // scroll to bottom
      e.scrollTop = e.scrollHeight;
    } else if (this.props.lockable === true) {
      e.scrollTop = e.scrollHeight - e.offsetHeight - this.state.scrollBottom;
    }
  }

  onOpen(item, i, e) {
    if (this.props.onOpen instanceof Function) this.props.onOpen(item, i, e);
  }

  onDownload(item, i, e) {
    if (this.props.onDownload instanceof Function) this.props.onDownload(item, i, e);
  }

  onClick(item, i, e) {
    if (this.props.onClick instanceof Function) this.props.onClick(item, i, e);
  }

  onTitleClick(item, i, e) {
    if (this.props.onTitleClick instanceof Function) this.props.onTitleClick(item, i, e);
  }

  onForwardClick(item, i, e) {
    if (this.props.onForwardClick instanceof Function) this.props.onForwardClick(item, i, e);
  }

  loadRef(ref) {
    this.mlistRef = ref;
    if (this.props.cmpRef instanceof Function) this.props.cmpRef(ref);
  }

  onScroll(e) {
    const bottom = this.getBottom(e.target);
    this.state.scrollBottom = bottom;
    if (this.props.toBottomHeight === '100%' || bottom > this.props.toBottomHeight) {
      if (this.state.downButton !== true) {
        this.state.downButton = true;
        this.setState({
          downButton: true,
          scrollBottom: bottom,
        });
      }
    } else if (this.state.downButton !== false) {
      this.state.downButton = false;
      this.setState({
        downButton: false,
        scrollBottom: bottom,
      });
    }

    if (this.props.onScroll instanceof Function) {
      this.props.onScroll(e);
    }
  }

  toBottom(e) {
    if (!this.mlistRef) return;
    this.mlistRef.scrollTop = this.mlistRef.scrollHeight;
    if (this.props.onDownButtonClick instanceof Function) {
      this.props.onDownButtonClick(e);
    }
  }

  render() {
    const { classes, dataSource, ...other } = this.props;
    return (
      <div className={classNames([classes.container, this.props.className])}>
        <div
          ref={this.loadRef.bind(this)}
          onScroll={this.onScroll.bind(this)}
          className={classNames(classes.mList)}
        >
          {dataSource.map((x, i) => (
            <MessageBox
              {...other}
              key={x._id || i}
              {...x}
              hasAfter={dataSource[i + 1] && dataSource[i + 1].position === x.position}
              hasBefore={dataSource[i - 1] && dataSource[i - 1].position === x.position}
              onOpen={this.props.onOpen && (e => this.onOpen(x, i, e))}
              onDownload={this.props.onDownload && (e => this.onDownload(x, i, e))}
              onTitleClick={this.props.onDownload && (e => this.onTitleClick(x, i, e))}
              onForwardClick={this.props.onForwardClick && (e => this.onForwardClick(x, i, e))}
              onClick={this.props.onClick && (e => this.onClick(x, i, e))}
            />
          ))}
        </div>
        {this.props.downButton === true &&
          this.state.downButton &&
          this.props.toBottomHeight !== '100%' && (
            <div className={classNames(classes.downButton)} onClick={this.toBottom.bind(this)}>
              <KeyboardArrowDown />
              {this.props.downButtonBadge && (
                <span className={classNames(classes.downButtonBadge)}>
                  {this.props.downButtonBadge}
                </span>
              )}
            </div>
          )}
      </div>
    );
  }
}

MessageList.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

MessageList.defaultProps = {
  onClick: null,
  onTitleClick: null,
  onForwardClick: null,
  onDownButtonClick: null,
  onOpen: null,
  onDownload: null,
  dataSource: [],
  lockable: false,
  toBottomHeight: 300,
  downButton: true,
  downButtonBadge: null,
  avatar: '',
};

export default withStyles(styles, { name: 'MessageList' })(MessageList);
