const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the currently playing song.'),
    async execute(interaction) {
        nextMusic();
        interaction.reply('Song skipped.');
    }
}