import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { User } from '../models/user'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { mainMenuItems } from '../menu/menu-items'
import { UserList } from '../../components/users/users-list/user-list'
import { UserChange } from '../../components/users/user-change/user-change'
import { getUserById } from '../../services/user'
import ChatCreateGroup from '../../components/chats/chat-create-group/chat-create-group'
import { ChatType } from '../models/chat'
import { ChatFilter } from '../../components/chats/chat-component/chat-list/chat-list'
import ChatComponent from '../../components/chats/chat-component/chat-component'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 600,
  },
}));

function Principal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [currentUser, setCurrentUser] = useState<User>()

  const {userId} = useParams()

  const navigate = useNavigate()
  useEffect(() => {
    if (userId) {
        getUserById(userId).get().then(doc => {
            const user: User = doc.data() as User
            user.id = doc.id
            setCurrentUser(user)
        }).catch(e => {
            navigate('/')
        })
    }
  }, [navigate, userId])

  useEffect(() => {
    setCurrentUser(currentUser)
  }, [currentUser])

  const updateUser = (user: User) => {
      setCurrentUser(user)
  }
  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            {currentUser && <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Anonymous Chat
            </Typography>
            }
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>{mainMenuItems}</List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={10}>
                <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    <Routes>
                      <Route path="/group-chat" element={<ChatComponent chatType={ChatType.Group} user={currentUser} chatFilter={ChatFilter.byChatType} searchEnabled={true}/>} />
                      <Route path="/private-chat" element={<ChatComponent chatType={ChatType.Private} user={currentUser} chatFilter={ChatFilter.byChatType} searchEnabled={true}/>} />
                      <Route path="/users" element={<UserList userOrigin={currentUser}/>} />
                      <Route path="/my-chats" element={<ChatComponent chatType={ChatType.Group} user={currentUser} chatFilter={ChatFilter.byMyOwnChat}/>} />
                      <Route path="/user-change" element={<UserChange user={currentUser} updateUserProp={updateUser}/>} />
                      <Route path="/create-group-chat" element={<ChatCreateGroup user={currentUser} />} />
                    </Routes>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
    </div>
  )
}

export default Principal
