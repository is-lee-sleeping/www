import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '30rem',
    maxWidth: '100%',
    margin: '10rem auto',
  },
};

const dateTimeOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  timeZoneName: 'short',
};

const YesNo = ({ sleeping, timestamp, toggleHandler, classes }) => (
  <Card raised className={classes.root}>
    <CardContent>
      <Typography variant="display4" align="center" color="textPrimary">
        {sleeping ? 'Yes' : 'No' }.
      </Typography>
      <Typography variant="caption" align="center" color="textSecondary">
        Last updated {timestamp.toLocaleString('en-us', dateTimeOptions)}.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={toggleHandler}>Update</Button>
    </CardActions>
  </Card>);

export default withStyles(styles)(YesNo);
