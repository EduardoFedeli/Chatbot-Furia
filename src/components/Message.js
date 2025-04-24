import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  margin: 8px 0;
`;

const Bubble = styled.div`
  background: ${props => props.isBot ? '#7C3AED' : '#2D2D2D'};
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 60%;
`;

const Message = ({ text, isBot }) => (
  <MessageContainer isBot={isBot}>
    <Bubble isBot={isBot}>{text}</Bubble>
  </MessageContainer>
);

export default Message;
