import { useState } from 'react';

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
