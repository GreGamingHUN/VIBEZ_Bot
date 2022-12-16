const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnects the bot'),
        async execute(interaction) {
            await interaction.deferReply();
            connection = getVoiceConnection(interaction.guild.id);
            connection.destroy();
            await interaction.editReply('Disconnected');
        }
};