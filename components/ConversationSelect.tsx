import { Conversation } from "../types/Conversation";
import  styled  from 'styled-components'
import { useRecipient } from "../hooks/useRecipient";

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-all;

    :hover {
        background-color: #e9eaeb;
    }
`

const ConversationSelect = ({id, conversationUsers} : {id: string; conversationUsers: Conversation['users']}) => {
  const {recipient, recipientEmail} = useRecipient(conversationUsers)
  return (
    <StyledContainer>
        <span>{recipientEmail}</span>
    </StyledContainer>
  )
}

export default ConversationSelect