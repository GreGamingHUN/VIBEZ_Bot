const { token } = require('./config.json');
const { Client, Intents, Interaction } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    interaction.reply('kecske');
})

client.login(token)