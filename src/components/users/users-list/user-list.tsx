import React, { useEffect, useState } from 'react'
import { userCollection } from '../../../services/user'
import { User } from '../../../common/models/user'
import { ListItem, ListItemText, CircularProgress, Paper, Grid, makeStyles, createStyles, Theme, InputBase, IconButton } from '@material-ui/core'
import { UserItem } from './user-item/user-item'
import SearchIcon from '@material-ui/icons/Search';


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
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
  }),
);

interface UserListProps {
    userOrigin?: User,
    searchEnabled?: boolean
}

export function UserList ({userOrigin, searchEnabled= true}: UserListProps) {
    const classes = useStyles()

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [searchText, setSearchText] = useState('')

    const search = () => {
        getUsers()
        setSearchText('')
    }

    const getUsers = () => {
        userCollection.onSnapshot(snap => {
            const usersTmp: User[] = []
            snap.docs.forEach(doc => {
                const user: User = doc.data() as User
                user.id = doc.id
                searchEnabled ? user.name.toLowerCase().includes(searchText.toLowerCase()) && usersTmp.push(user) : usersTmp.push(user)
            })
            setUsers(usersTmp)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }

    useEffect(() => {
        getUsers()
      }, [])
    
    return (
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>Users</h1>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {
                            searchEnabled && (
                                <Grid item xs={6}>
                                    <Paper component="form" className={classes.root}>
                                        <InputBase
                                            className={classes.input}
                                            value={searchText}
                                            onChange={e => setSearchText(e.target.value)}
                                            placeholder="Search..."
                                        />
                                        <IconButton className={classes.iconButton} aria-label="search" onClick={search}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            )
                        }
                        <Grid item xs={8}>
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
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}