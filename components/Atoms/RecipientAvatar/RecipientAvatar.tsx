import  Avatar  from '@mui/material/Avatar';
import React from 'react'
import { useRecipient } from '../../../hooks/useRecipient';

type Props = ReturnType<typeof useRecipient>


const RecipientAvatar = ({recipient, recipientEmail}: Props) => {
  return recipient?.photoURL ? <Avatar src={recipient.photoURL} /> : <Avatar>
    {recipientEmail && recipientEmail[0].toUpperCase()}
  </Avatar>
}

export default RecipientAvatar;