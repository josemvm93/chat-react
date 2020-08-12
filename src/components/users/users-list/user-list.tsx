import React, { useEffect, useState } from 'react'
import { userCollection } from '../../../services/user'
import { User } from '../../../common/models/user'
import { ListItem, ListItemText, CircularProgress, Paper, Grid, makeStyles, createStyles, Theme } from '@material-ui/core'
import { UserItem } from './user-item/user-item'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface UserListProps {
    userOrigin?: User
}

export function UserList ({userOrigin}: UserListProps) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const classes = useStyles()
    
    useEffect(() => {
        userCollection.onSnapshot(snap => {
            const usersTmp: User[] = []
            snap.docs.forEach(doc => {
                const user: User = doc.data() as User
                user.id = doc.id
                usersTmp.push(user)
            })
            setUsers(usersTmp)
            setLoading(false)
        })
      }, [])
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>Users</h1>
                    {
                        loading ? <CircularProgress /> : 
                        users.length > 0 ? 
                            users.map( (user, index) => (
                                <UserItem key={index} user={user} userOrigin={userOrigin}/>
                            ))
                        : (
                            <ListItem>
                                <ListItemText primary="'No users'"/>
                            </ListItem>)
                    }
                </Paper>
            </Grid>
        </Grid>
    )
}