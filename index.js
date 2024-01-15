const Discord = require('discord.js');
const axios = require('axios');
const { prefix, apiKey } = require('./config/botConfig');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Bot está online como ${client.user.tag}`);
});

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'previsao') {
    const cidade = args.join(' ');

    try {
      if (message.member.hasPermission('ADMINISTRATOR')) {
        const resposta = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`);
        const dadosTempo = resposta.data.current;

        const embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Previsão do Tempo para ${cidade}`)
          .addField('Condição', dadosTempo.condition.text)
          .addField('Temperatura', `${dadosTempo.temp_c}°C`)
          .addField('Umidade', `${dadosTempo.humidity}%`)
          .setTimestamp();

        message.channel.send(embed);
      } else {
        message.channel.send('Você não tem permissão para configurar a previsão do tempo.');
      }
    } catch (error) {
      console.error('Erro ao obter a previsão do tempo:', error);
      message.channel.send('Desculpe, não foi possível obter a previsão do tempo.');
    }
  }

  // Restante do código...
});

client.login('TOKEN_DO_BOT');
client.on('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
  });
  
  client.on('message', message => {
    console.log(`Mensagem recebida: ${message.content}`);
    // Restante do código...
  });

// Crie um objeto de intenções
