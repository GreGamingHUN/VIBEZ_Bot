const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join your voice channel.'),
    async execute(interaction) {
        let voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply('Join a voice channel first');
        } else {
            await interaction.reply('Joined!');
            await joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })
        }
    }
}