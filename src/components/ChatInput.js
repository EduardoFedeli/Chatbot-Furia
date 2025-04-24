import { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 10px;
  background: #111;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: #222;
  color: white;
`;

const Button = styled.button`
  background: #7C3AED;
  color: white;
  border: none;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 20px;
`;

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const send = () => {
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return (
    <InputContainer>
      <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
      <Button onClick={send}>Enviar</Button>
    </InputContainer>
  );
};

export default ChatInput;
