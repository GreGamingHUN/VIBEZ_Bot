const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

async function createConnection(interaction) {
    const member = interaction.member;
    const guild = interaction.guild;
    const channel = member.voice.channel;
    
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
    });
    await interaction.editReply('Connected to voice channel!');
    return connection;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('The Bot connects to the voice channel you\'re in'),
        async execute(interaction) {
            await interaction.deferReply();
            await createConnection(interaction);
        }
, createConnection };