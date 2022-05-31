const { token } = require('./config.json');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
if (client.login(token)) {
    console.log('minden fasza');
}