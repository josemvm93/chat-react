import React, { useEffect, useState } from 'react'
import { userCollection } from '../../../services/user'
import { User } from '../../../common/models/user'
import { ListItem, ListItemText, CircularProgress } from '@material-ui/core'
import { UserItem } from './user-item/user-item'

export function UserList () {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
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
        <div>
            <h1>Users</h1>
            {
                loading ? <CircularProgress /> : 
                users.length > 0 ? 
                    users.map( user => (
                        <UserItem key={user.id} user={user}/>
                    ))
                : (
                    <ListItem>
                        <ListItemText primary="'No users'"/>
                    </ListItem>)
            }
        </div>
    )
}