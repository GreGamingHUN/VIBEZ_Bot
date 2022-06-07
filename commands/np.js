const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('np')
        .setDescription('Shows the currently playing song.'),
    async execute(interaction) {
        var npMusic = musicQueueInfo[0];
        await interaction.reply(`Currently Playing: ${npMusic.title}\t\t ${npMusic.durationRaw}`)
    }
}