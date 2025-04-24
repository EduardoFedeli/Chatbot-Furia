import { useState } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  background: black;
  color: white;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Fala, fã da FURIA! O que você quer saber hoje?', isBot: true }
  ]);

  const handleSend = (text) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
    respostaAutomatica(text);
  };

  const respostaAutomatica = (text) => {
    const resposta = text.toLowerCase();
    let botMessage = '';

    if (resposta.includes('jogo')) {
      botMessage = 'O próximo jogo da FURIA é dia 27/04 às 18h (horário de Brasília)!';
    } else if (resposta.includes('estatística')) {
      botMessage = 'KSCERATO: 1.18 rating | yuurih: 1.14 rating | arT: 0.98 rating.';
    } else if (resposta.includes('curiosidade')) {
      botMessage = 'Você sabia que o arT é conhecido por rushar até quando não precisa? 😎';
    } else if (resposta.includes('frase')) {
      botMessage = '“Aqui é FURIA, irmão. Não existe medo, só vontade de ganhar.” 💪';
    } else {
      botMessage = 'Não entendi... mas se for da FURIA, tamo junto! 🖤';
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botMessage, isBot: true }]);
    }, 800);
  };

  return (
    <Container>
      <Messages>
        {messages.map((msg, idx) => <Message key={idx} {...msg} />)}
      </Messages>
      <ChatInput onSend={handleSend} />
    </Container>
  );
};

export default Chat;
