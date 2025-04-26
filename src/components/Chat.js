// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css'; // Atualizado para pasta components

const mainMenu = [
  "1 - Datas",
  "2 - Estatísticas",
  "3 - Informações Gerais",
];

const statisticsMenu = [
  "1 - Fulano",
  "2 - Ciclano",
  "3 - Bicicletano",
  "4 - Voltar ao menu principal",
];

const datesMenu = [
  "1 - Janeiro",
  "2 - Fevereiro",
  "3 - Março",
  "4 - Abril",
  "5 - Maio",
  "6 - Junho",
  "7 - Julho",
  "8 - Agosto",
  "9 - Setembro",
  "10 - Outubro",
  "11 - Novembro",
  "12 - Dezembro",
  "13 - Voltar ao menu principal",
];

function Chat() {
  const [messages, setMessages] = useState([
    { text: "Olá Furioso! Seja bem-vindo(a) ao canal de atendimento da FURIA.", sender: "bot" },
    { text: "Como podemos ajudar? Digite uma das opções abaixo para continuar:", sender: "bot" },
    { text: mainMenu.join("\n"), sender: "bot" }
  ]);
  const [menuLevel, setMenuLevel] = useState("main");
  const [input, setInput] = useState("");
  const [currentMonth, setCurrentMonth] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setTimeout(() => {
      handleBotResponse(input.trim());
    }, 500);
  };

  const handleBotResponse = (userInput) => {
    if (menuLevel === "main") {
      switch (userInput) {
        case "1":
          setMenuLevel("dates");
          setMessages((prev) => [
            ...prev,
            { text: "Você escolheu Datas. Escolha um mês:", sender: "bot" },
            { text: datesMenu.join("\n"), sender: "bot" },
          ]);
          break;
        case "2":
          setMenuLevel("statistics");
          setMessages((prev) => [
            ...prev,
            { text: "Você escolheu Estatísticas. Escolha um jogador:", sender: "bot" },
            { text: statisticsMenu.join("\n"), sender: "bot" },
          ]);
          break;
        case "3":
          setMessages((prev) => [
            ...prev,
            { text: "Informações Gerais da FURIA: Somos uma organização de eSports brasileira fundada em 2017!", sender: "bot" },
          ]);
          break;
        default:
          setMessages((prev) => [
            ...prev,
            { text: "Opção inválida. Por favor, digite um número válido.", sender: "bot" },
          ]);
      }
    } else if (menuLevel === "statistics") {
      if (userInput === "4") {
        backToMainMenu();
      } else {
        setMessages((prev) => [
          ...prev,
          { text: `Exibindo estatísticas para o jogador ${userInput}.`, sender: "bot" },
        ]);
      }
    } else if (menuLevel === "dates") {
      if (userInput === "13") {
        backToMainMenu();
      } else {
        const monthName = datesMenu[parseInt(userInput) - 1]?.split(" - ")[1];
        if (monthName) {
          setCurrentMonth(monthName);
          setMenuLevel("monthInfo");
          setMessages((prev) => [
            ...prev,
            { text: `Você selecionou ${monthName}. Aqui estão as datas da FURIA para ${monthName}:`, sender: "bot" },
            { text: `- 01/${userInput}/2024: Torneio ABC\n- 15/${userInput}/2024: Campeonato XYZ`, sender: "bot" },
            { text: "Digite:\n1 - Voltar para seleção de meses\n2 - Voltar ao menu principal", sender: "bot" },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { text: "Opção inválida. Por favor, escolha um mês válido.", sender: "bot" },
          ]);
        }
      }
    } else if (menuLevel === "monthInfo") {
      if (userInput === "1") {
        setMenuLevel("dates");
        setMessages((prev) => [
          ...prev,
          { text: "Escolha um mês:", sender: "bot" },
          { text: datesMenu.join("\n"), sender: "bot" },
        ]);
      } else if (userInput === "2") {
        backToMainMenu();
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Opção inválida. Digite 1 ou 2.", sender: "bot" },
        ]);
      }
    }
  };

  const backToMainMenu = () => {
    setMenuLevel("main");
    setMessages((prev) => [
      ...prev,
      { text: "Voltando ao menu principal...", sender: "bot" },
      { text: mainMenu.join("\n"), sender: "bot" },
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#121212' }}>
      <div className="chat-container" style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite o número..."
        />
        <button onClick={handleSend} className="send-button">Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
