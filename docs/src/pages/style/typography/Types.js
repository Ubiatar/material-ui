import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
  light: {
    background:
      'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAIAAAC3eAIWAAAAEklEQVR4AWP4fvkRw69fv3BhAG+IFy/ne6sFAAAAAElFTkSuQmCC)', // eslint-disable-line max-len
  },
};

function Types(props) {
  return (
    <div
      style={{
        ...styles.root,
        ...(props.theme.palette.type === 'light' ? styles.light : {}),
      }}
    >
      <Typography variant="display4" gutterBottom>
        Display 4
      </Typography>
      <Typography variant="display3" gutterBottom>
        Display 3
      </Typography>
      <Typography variant="display2" gutterBottom>
        Display 2
      </Typography>
      <Typography variant="display1" gutterBottom>
        Display 1
      </Typography>
      <Typography variant="headline" gutterBottom>
        Headline
      </Typography>
      <Typography variant="headlineSmall" gutterBottom>
        HeadlineSmall
      </Typography>
      <Typography variant="subheading" gutterBottom>
        Subheading
      </Typography>
      <Typography variant="subheadingBold" gutterBottom>
        SubheadingBold
      </Typography>
      <Typography variant="title" gutterBottom>
        Title
      </Typography>
      <Typography variant="highbold" gutterBottom align="left">
        highbold
      </Typography>
      <Typography variant="smallTitle" gutterBottom>
        smallTitle
      </Typography>
      <Typography variant="body6" gutterBottom>
        Body 6
      </Typography>
      <Typography variant="body5" gutterBottom>
        Body 5
      </Typography>
      <Typography variant="body4" gutterBottom>
        Body 4
      </Typography>
      <Typography variant="body3" gutterBottom>
        Body 3
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2
      </Typography>
      <Typography variant="body1" gutterBottom align="left">
        Body 1
      </Typography>
      <Typography variant="caption" gutterBottom align="center">
        Caption
      </Typography>
      <Typography href='http://ubiatar.com' variant="link" gutterBottom align="center">
        Link
      </Typography>
      <Typography gutterBottom noWrap>
        {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
      </Typography>
      <Typography variant="button" gutterBottom>
        Button
      </Typography>
      <Typography color='primary' variant="body4" gutterBottom align="left">
        PRIMARY
      </Typography>
      <Typography color='secondary' variant="body4" gutterBottom align="left">
        SECONDARY
      </Typography>
      <Typography color='terziary' variant="body4" gutterBottom align="left">
        TERZIARY
      </Typography>
    </div>
  );
}

Types.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Types);
