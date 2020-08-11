
import React, { FunctionComponent } from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { User } from '../../../../common/models/user'

interface UserItemProps {
    user: User
}

export const UserItem: FunctionComponent<UserItemProps> = ({user}) => {
    return (
        <ListItem>
            <ListItemText primary={user.name} />
        </ListItem>
     )
}

