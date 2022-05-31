const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Shows the yes\'s version.'),
    async execute(interaction) {
        await interaction.reply('ayoooo');
    }
}