import React, { useState } from 'react';
import './chatbot.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Olá Furioso! Seja bem-vindo(a) ao canal de atendimento da FURIA.", sender: "bot" },
    { text: "Como podemos ajudar?\n\nDigite uma das opções abaixo para continuar:\n\n1 - Sobre a FURIA\n2 - Estatísticas de Jogadores\n3 - Calendário de Jogos\n4 - Line-ups históricos\n5 - Curiosidades\n6 - Sair", sender: "bot" }
  ]);
  const [currentMenu, setCurrentMenu] = useState('main');

  const handleUserInput = (input) => {
    const newMessages = [...messages, { text: input, sender: "user" }];
    const choice = parseInt(input);

    if (currentMenu === 'main') {
      switch (choice) {
        case 1:
          newMessages.push({ text: "Sobre a FURIA:\n\n1 - História\n2 - Títulos\n3 - Jogadores Famosos\n4 - Voltar ao Menu Principal", sender: "bot" });
          setCurrentMenu('about');
          break;
        case 2:
          newMessages.push({ text: "Estatísticas de Jogadores:\n\n1 - K/D\n2 - Headshot %\n3 - ADR\n4 - Voltar ao Menu Principal", sender: "bot" });
          setCurrentMenu('stats');
          break;
        case 3:
          newMessages.push({ text: "Escolha um mês:\n\n1 - Janeiro\n2 - Fevereiro\n3 - Março\n4 - Abril\n5 - Maio\n6 - Junho\n7 - Julho\n8 - Agosto\n9 - Setembro\n10 - Outubro\n11 - Novembro\n12 - Dezembro\n13 - Voltar ao Menu Principal", sender: "bot" });
          setCurrentMenu('calendar');
          break;
        case 4:
          newMessages.push({ text: "Line-ups históricos:\n\n1 - Line-up 2018\n2 - Line-up 2020\n3 - Line-up 2024\n4 - Voltar ao Menu Principal", sender: "bot" });
          setCurrentMenu('lineups');
          break;
        case 5:
          newMessages.push({ text: "Curiosidades:\n\n1 - Recordes\n2 - Melhores Partidas\n3 - Fatos Engraçados\n4 - Voltar ao Menu Principal", sender: "bot" });
          setCurrentMenu('curiosities');
          break;
        case 6:
          newMessages.push({ text: "Obrigado por visitar o canal da FURIA! Até mais, Furioso!", sender: "bot" });
          break;
        default:
          invalidOption(newMessages);
      }
    } 
    else if (['about', 'stats', 'calendar', 'lineups', 'curiosities'].includes(currentMenu)) {
      handleSubMenu(choice, newMessages);
    }
    else if (['aboutInfo', 'statsInfo', 'calendarInfo', 'lineupsInfo', 'curiositiesInfo'].includes(currentMenu)) {
      handleInfoOptions(choice, newMessages);
    }

    setMessages(newMessages);
  };

  const handleSubMenu = (choice, newMessages) => {
    switch (currentMenu) {
      case 'about':
        handleAbout(choice, newMessages);
        break;
      case 'stats':
        handleStats(choice, newMessages);
        break;
      case 'calendar':
        handleCalendar(choice, newMessages);
        break;
      case 'lineups':
        handleLineups(choice, newMessages);
        break;
      case 'curiosities':
        handleCuriosities(choice, newMessages);
        break;
      default:
        break;
    }
  };

  const handleInfoOptions = (choice, newMessages) => {
    if (choice === 1) {
      switchBackSubmenu(newMessages);
    } else if (choice === 2) {
      returnToMain(newMessages);
    } else {
      invalidOption(newMessages);
    }
  };

  const handleAbout = (choice, newMessages) => {
    switch (choice) {
      case 1:
        newMessages.push({ text: "A FURIA foi fundada em 2017 e é uma das maiores organizações de esports da América Latina.\n\n1 - Voltar Sobre a FURIA\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('aboutInfo');
        break;
      case 2:
        newMessages.push({ text: "Títulos conquistados incluem torneios como ECS, DreamHack e ESL Brasil.\n\n1 - Voltar Sobre a FURIA\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('aboutInfo');
        break;
      case 3:
        newMessages.push({ text: "Jogadores famosos incluem KSCERATO, yuurih e arT.\n\n1 - Voltar Sobre a FURIA\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('aboutInfo');
        break;
      case 4:
        returnToMain(newMessages);
        break;
      default:
        invalidOption(newMessages);
    }
  };

  const handleStats = (choice, newMessages) => {
    switch (choice) {
      case 1:
        newMessages.push({ text: "K/D: KSCERATO 1.25 - yuurih 1.22 - arT 1.00\n\n1 - Voltar Estatísticas\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('statsInfo');
        break;
      case 2:
        newMessages.push({ text: "Headshot %: yuurih 55% - KSCERATO 52% - saffee 48%\n\n1 - Voltar Estatísticas\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('statsInfo');
        break;
      case 3:
        newMessages.push({ text: "ADR: KSCERATO 80.5 - yuurih 78.3\n\n1 - Voltar Estatísticas\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('statsInfo');
        break;
      case 4:
        returnToMain(newMessages);
        break;
      default:
        invalidOption(newMessages);
    }
  };

  const handleCalendar = (choice, newMessages) => {
    if (choice >= 1 && choice <= 12) {
      newMessages.push({ text: `Jogos de ${getMonthName(choice)}:\n- Campeonato X dia 10\n- Campeonato Y dia 20\n\n1 - Voltar Calendário\n2 - Voltar Menu Principal`, sender: "bot" });
      setCurrentMenu('calendarInfo');
    } else if (choice === 13) {
      returnToMain(newMessages);
    } else {
      invalidOption(newMessages);
    }
  };

  const handleLineups = (choice, newMessages) => {
    switch (choice) {
      case 1:
        newMessages.push({ text: "Line-up 2018: yuurih, arT, ableJ, VINI, KSCERATO\n\n1 - Voltar Line-ups\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('lineupsInfo');
        break;
      case 2:
        newMessages.push({ text: "Line-up 2020: yuurih, arT, HEN1, VINI, KSCERATO\n\n1 - Voltar Line-ups\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('lineupsInfo');
        break;
      case 3:
        newMessages.push({ text: "Line-up 2024: KSCERATO, yuurih, arT, chelo, saffee\n\n1 - Voltar Line-ups\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('lineupsInfo');
        break;
      case 4:
        returnToMain(newMessages);
        break;
      default:
        invalidOption(newMessages);
    }
  };

  const handleCuriosities = (choice, newMessages) => {
    switch (choice) {
      case 1:
        newMessages.push({ text: "Recordes: FURIA foi a primeira equipe brasileira a atingir semifinais da ECS Season 7.\n\n1 - Voltar Curiosidades\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('curiositiesInfo');
        break;
      case 2:
        newMessages.push({ text: "Melhores partidas: vitória épica contra Astralis na ESL Pro League!\n\n1 - Voltar Curiosidades\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('curiositiesInfo');
        break;
      case 3:
        newMessages.push({ text: "Fatos Engraçados: arT já jogou uma partida inteira de CS usando apenas pistola!\n\n1 - Voltar Curiosidades\n2 - Voltar Menu Principal", sender: "bot" });
        setCurrentMenu('curiositiesInfo');
        break;
      case 4:
        returnToMain(newMessages);
        break;
      default:
        invalidOption(newMessages);
    }
  };

  const returnToMain = (newMessages) => {
    newMessages.push({ text: "Voltando ao Menu Principal...\n\n1 - Sobre a FURIA\n2 - Estatísticas de Jogadores\n3 - Calendário de Jogos\n4 - Line-ups históricos\n5 - Curiosidades\n6 - Sair", sender: "bot" });
    setCurrentMenu('main');
  };

  const switchBackSubmenu = (newMessages) => {
    let submenuText = "";
    switch (currentMenu) {
      case 'aboutInfo':
        submenuText = "Sobre a FURIA:\n\n1 - História\n2 - Títulos\n3 - Jogadores Famosos\n4 - Voltar ao Menu Principal";
        setCurrentMenu('about');
        break;
      case 'statsInfo':
        submenuText = "Estatísticas de Jogadores:\n\n1 - K/D\n2 - Headshot %\n3 - ADR\n4 - Voltar ao Menu Principal";
        setCurrentMenu('stats');
        break;
      case 'calendarInfo':
        submenuText = "Escolha um mês:\n\n1 - Janeiro\n2 - Fevereiro\n3 - Março\n4 - Abril\n5 - Maio\n6 - Junho\n7 - Julho\n8 - Agosto\n9 - Setembro\n10 - Outubro\n11 - Novembro\n12 - Dezembro\n13 - Voltar ao Menu Principal";
        setCurrentMenu('calendar');
        break;
      case 'lineupsInfo':
        submenuText = "Line-ups históricos:\n\n1 - Line-up 2018\n2 - Line-up 2020\n3 - Line-up 2024\n4 - Voltar ao Menu Principal";
        setCurrentMenu('lineups');
        break;
      case 'curiositiesInfo':
        submenuText = "Curiosidades:\n\n1 - Recordes\n2 - Melhores Partidas\n3 - Fatos Engraçados\n4 - Voltar ao Menu Principal";
        setCurrentMenu('curiosities');
        break;
      default:
        setCurrentMenu('main');
    }
    newMessages.push({ text: submenuText, sender: "bot" });
  };

  const invalidOption = (newMessages) => {
    newMessages.push({ text: "Opção inválida. Por favor, escolha uma opção válida.", sender: "bot" });
  };

  const getMonthName = (monthNumber) => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return months[monthNumber - 1];
  };

  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      handleUserInput(userInput.trim());
      setUserInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Digite o número da opção..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
