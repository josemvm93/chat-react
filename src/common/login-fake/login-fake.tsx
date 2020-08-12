import React, { useEffect } from 'react'
import { addUser } from '../../services/user'
import { useNavigate } from 'react-router-dom'
import { Grid, Paper, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function LoginFake() {
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    addUser().then(doc => {
        doc.get().then(doc1 => {
            navigate(doc1.id)
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return (
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center" 
            spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>Loading Fake Login</h1>
                    <CircularProgress />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default LoginFake