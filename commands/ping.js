const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Visszadob egy pongot!'),
        async execute(interaction) {
            await interaction.reply('Visszadobtam a pongot geci!');
        }
};