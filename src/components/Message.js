import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  margin: 8px 0;
`;

const Message = ({ text, isBot }) => (
  <MessageContainer isBot={isBot}>
    <Bubble isBot={isBot}>{text}</Bubble>
  </MessageContainer>
);

export default Message;
