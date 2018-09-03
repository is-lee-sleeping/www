import React from 'react';
import classNames from 'classnames';
import { last, range, reverse } from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    margin: '.1rem',
  },
  block: {
    backgroundColor: '#FFF',
    height: '1rem',
    width: '1rem',
    margin: '.1rem',
    borderRadius: '.2rem',
  },
  sleeping: {
    backgroundColor: '#E1F5FE',
  }
};

const toHours = date => Math.floor(date.valueOf() / (1000 * 60 * 60));
const fromHours = hours => new Date(hours * (1000 * 60 * 60));

const dateTimeOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  timeZoneName: 'short',
};

const Blocks = ({ events, classes }) => {
  if (!events.length) return null;

  const first = last(events).timestamp;

  const eventData = reverse(events)
    .reduce((acc, event) => acc.set(toHours(event.timestamp), event.sleeping), new Map());

  const blockData = range(toHours(first), toHours(new Date()))
    .reduce((acc, hour) => {
      const timestamp = fromHours(hour);
      const sleeping = eventData.has(hour) ? eventData.get(hour) : last(acc).sleeping;
      const isEvent = eventData.has(hour) ? true : false;
      return acc.concat({ timestamp, sleeping, isEvent });
    }, []);
  blockData.reverse();

  return (
    <div className={classes.root}>
      {blockData.map(b =>
        <Tooltip title={b.timestamp.toLocaleString('en-us', dateTimeOptions)} key={b.timestamp.valueOf()}>
          <div className={classNames(classes.block, { [classes.sleeping]: b.sleeping })} />
        </Tooltip>)}
    </div>);
};

export default withStyles(styles)(Blocks);
