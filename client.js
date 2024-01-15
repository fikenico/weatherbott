// Crie uma instância do cliente Discord.js com as intenções
const client = new Client({ intents });
// Use a variável client em outros lugares do seu código
client.on('message', (message) => {
    // Restante do código...
  });
  