const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

const express = require('express');
const app = express();

//Discord Stuff
const client = new Client({ intents: [GatewayIntentBits.Guilds, 'GuildVoiceStates'] });


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
    }
}

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setPresence({
        status: 'online',
        game: {
            name: 'Nyomod fasz',
            type: 'WATCHING'
        }
    })
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No commands matching ${interaction.commandName} was found.`);
        return;
    }
    console.log(interaction.commandName);
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: false });
    }
});

client.login(token);

//Express stuff
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index.ejs');
})

app.listen(8080);
console.log('Express server started, listening at 8080 port');

const { generateDependencyReport } = require('@discordjs/voice');

console.log(generateDependencyReport());