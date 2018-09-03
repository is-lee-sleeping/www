import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '25rem',
    maxWidth: '100%',
    margin: '10rem auto',
  },
  button: {
    marginTop: theme.spacing.unit,
  }
});

const UpdateModal = ({ open, updateHandler, toggleHandler, classes }) => (
  <Modal className={classes.root} open={open} onClose={toggleHandler}>
    <Paper className={classes.paper}>
      <Typography variant="title" gutterBottom>
        Is Lee sleeping?
      </Typography>
      <Button variant="contained" color="primary" fullWidth size='large' className={classes.button} onClick={() => { updateHandler(true); toggleHandler(); }}>
        Yes
      </Button>
      <Button variant="contained" color="secondary" fullWidth size='large' className={classes.button} onClick={() => { updateHandler(false); toggleHandler(); }}>
        No
      </Button>
      <Button fullWidth size='large' className={classes.button} onClick={toggleHandler}>
        Cancel
      </Button>
    </Paper>
  </Modal>);

export default withStyles(styles)(UpdateModal);
