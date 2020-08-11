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

export const mainMenuItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <GroupIcon/>
      </ListItemIcon>
      <ListItemText primary="Group Chat" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Private Chat" />
    </ListItem>

    <Link to="users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    
    <ListItem button>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Chats" />
    </ListItem>

    <Link to="user-change">
      <ListItem button>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Change Nick" />
      </ListItem>
    </Link>

  </div>
)