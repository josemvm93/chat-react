import React from 'react'
import ChatContainer from './chat-container/chat-container'
import ChatList, { ChatFilter } from './chat-list/chat-list'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { ChatType } from '../../../common/models/chat';
import { User } from '../../../common/models/user';
import { ChatContextProvider } from '../../../common/contexts/chat-context';

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

interface ChatProps {
    chatType: ChatType,
    user?: User,
    chatFilter: ChatFilter,
    searchEnabled?: boolean
}
  
function ChatComponent({chatType, user,  chatFilter, searchEnabled = false}: ChatProps) {
    const classes = useStyles()
    return (
        <ChatContextProvider>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <ChatList chatType={chatType} user={user} chatFilter={chatFilter} searchEnabled={searchEnabled}></ChatList>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <ChatContainer user={user}></ChatContainer>
                    </Paper>
                </Grid> 
            </Grid>
        </ChatContextProvider>
    )
}

export default ChatComponent