import { Conversation } from "../../../types/Conversation";
import { useRecipient } from "../../../hooks/useRecipient";
import RecipientAvatar from "../../Atoms/RecipientAvatar/RecipientAvatar";
import {StyledContainer} from "./conversation-select.styles"



const ConversationSelect = ({id, conversationUsers} : {id: string; conversationUsers: Conversation['users']}) => {
  const {recipient, recipientEmail} = useRecipient(conversationUsers)
  return (
    <StyledContainer>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
        <span>{recipientEmail}</span>
    </StyledContainer>
  )
}

export default ConversationSelect