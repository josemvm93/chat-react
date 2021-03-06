import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import GroupIcon from '@material-ui/icons/Group'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import BuildIcon from '@material-ui/icons/Build'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

export const mainMenuItems = (
  <div>
    <Link to="group-chat">
      <ListItem button >
        <ListItemIcon>
          <GroupIcon/>
        </ListItemIcon>
        <ListItemText primary="Group Chat" />
      </ListItem>
    </Link>

    <Link to="private-chat">
      <ListItem button>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText primary="Private Chat" />
      </ListItem>
    </Link>

    <Link to="users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    
    <Link to="my-chats">
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="My Chats" />
      </ListItem>
    </Link>

    <Link to="user-change">
      <ListItem button>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Change Nick" />
      </ListItem>
    </Link>

    <Link to="create-group-chat">
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Group Chats" />
      </ListItem>
    </Link>

  </div>
)