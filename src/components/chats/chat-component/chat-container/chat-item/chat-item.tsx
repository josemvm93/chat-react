import React, { useState, useEffect } from 'react'
import { Message } from '../../../../../common/models/message'
import { User } from '../../../../../common/models/user'
import { Grid, makeStyles, Theme, createStyles, Card, CardContent, Typography } from '@material-ui/core'
import { getUserById } from '../../../../../services/user';
import FirebaseApp from '../../../../../services/firebase';

interface ChatItemProps {
    message: Message,
    userOrigin?: User
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    title: {
        fontSize: 14,
        marginBottom: '5px'
    },
    description: {
        color: 'blue',
        marginBottom: '10px',
    },
  }),
);

function ChatItem({message, userOrigin}: ChatItemProps) {
    const classes = useStyles()
    const [userSendBy, setUserSendBy] = useState<User>()
    const [sameUser, setSameUser] = useState(false)

    const getUserByIdFn = () => {
        getUserById(message.sendBy).get().then(doc => {
            const user: User = doc.data() as User
            user.id = doc.id
            setUserSendBy(user)
        })
    }

    const getDate = () => {
        const t = FirebaseApp.firestore.Timestamp.fromDate(new Date())
        const d = t.toDate()
        return d.toLocaleDateString('en', { day: "numeric", month: "numeric", year: "numeric",hour: "2-digit", minute: "2-digit"})
    }

    useEffect(() => {
        setSameUser(userOrigin?.id == message.sendBy)
        getUserByIdFn()
    }, [userOrigin, message])

    return (
        <Grid container spacing={2}
            direction="row"
            justify={sameUser ? 'flex-end' : 'flex-start'}
            alignItems="center"
        >
            <Grid item xs={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {sameUser ? 'You' :userSendBy?.name}
                        </Typography>
                        <Typography className={classes.description} color="textSecondary">
                            {message.description}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {getDate()}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ChatItem