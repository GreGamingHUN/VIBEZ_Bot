const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('np')
        .setDescription('Shows the currently playing song.'),
    async execute(interaction) {
        var kecske = musicInfo;
        await interaction.reply(`Currently Playing: ${kecske.title}\t\t ${kecske.durationRaw}`)
    }
}