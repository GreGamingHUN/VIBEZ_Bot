const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const playdl = require('play-dl');
const path = require('node:path');

const { joinVoiceChannel,
        voiceConnectionStatus,
        createAudioPlayer, 
        createAudioResource, 
        getVoiceConnection,
        VoiceConnectionStatus} = require('@discordjs/voice');
const { link } = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays Music.')
        .addStringOption(option => 
            option.setName('link')
            .setDescription('The link for the song')
            .setRequired(false)),


    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            await interaction.reply('Join a voice channel first');
        } else {         
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            });
            if (!interaction.options.getString('link')) {
                await interaction.reply('no links');
            } else {
                const linkArg = interaction.options.getString('link');
                let stream = await playdl.stream(linkArg);

                let resource = createAudioResource(stream.stream, {
                    inputType: stream.type
                })
        
                let player = createAudioPlayer({
                   
                })
                
                player.play(resource)
        
                connection.subscribe(player)
            }
            
        }
    }
}