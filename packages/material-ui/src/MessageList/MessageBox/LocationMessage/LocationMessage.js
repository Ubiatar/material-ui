import React, { Component } from 'react';
import './LocationMessage.css';
import withStyles from "../../../styles/withStyles";
import {MessageBox} from "../MessageBox";

const classNames = require('classnames');

const STATIC_URL = 'https://maps.googleapis.com/maps/api/staticmap?markers=color:MARKER_COLOR|LATITUDE,LONGITUDE&zoom=ZOOM&size=270x200&scale=2&key=KEY';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=LATITUDE,LONGITUDE&zoom=ZOOM';

export const styles = theme => {
  return {
    boxLocation: {
    position: 'relative',
    width: 250,
    height: 150,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
    marginRight: -6,
    marginLeft: -6,
    borderRadius: 5
  },

  boxLocationImage: {
    width: '100%'
  },

    boxLocationText: {
    padding: '5px 0',
    width: 250,
    marginLeft: -6,
    marginRight: -6
  }

}
}

export class LocationMessage extends Component {
    constructor(props) {
        super(props);

        this.className = this.className.bind(this);
    }

    buildURL(url) {
        let center = this.props.data || {};

        return url.replace('LATITUDE', center.latitude)
                  .replace('LONGITUDE', center.longitude)
                  .replace('MARKER_COLOR', this.props.markerColor)
                  .replace('ZOOM', this.props.zoom)
                  .replace('KEY', this.props.apiKey);
    }

    className() {
        let className = classNames(classes.boxLocation, this.props.className);

        if (this.props.text) {
            className = classNames(className, 'rce-mbox-location-has-text');
        }

        return className;
    }

    render() {
      const { classes } = this.props
        return (
            <div className='rce-container-lmsg'>
                <a
                    onClick={this.props.onOpen}
                    target={this.props.target}
                    href={this.props.href || this.props.src || this.buildURL(MAP_URL)}
                    className={this.className()}>
                    <img className={classNames(classes.boxLocationImage)}
                        src={
                            this.props.src ||
                            this.buildURL(STATIC_URL)
                        }/>
                </a>
                {
                    this.props.text &&
                    <div className={classNames(classes.boxLocationText)}>
                        {this.props.text}
                    </div>
                }
            </div>
        );
    }
}

LocationMessage.defaultProps = {
    target: '_blank',
    apiKey: '',
    zoom: 14,
    markerColor: 'red',
}

export default withStyles(styles, { name: 'LocationMessage' })(LocationMessage);
