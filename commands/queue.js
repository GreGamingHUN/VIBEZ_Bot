const { SlashCommandBuilder } = require('discord.js');

let queue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Visszadob egy pongot!'),
        async execute(interaction) {
            let text = "";
            queue.forEach(element => {
                text = text + `\n${element}`
            });
            await interaction.reply(text);
        },
        queue: queue
};