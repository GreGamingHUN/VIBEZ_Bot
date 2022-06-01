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

var musicQueue = new Array();
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
                var musicInfo = (await playdl.video_basic_info(linkArg)).video_details;


                
                if (musicQueue[0]) {
                    musicQueue.push(linkArg);
                    global.musicQueue = musicQueue;
                    interaction.reply(`${musicInfo.title} has been added to the Queue!`);
                } else {
                    musicQueue.push(linkArg);
                    global.musicQueue = musicQueue;

                    let stream = await playdl.stream(musicQueue[0]);
                    
                    let resource = createAudioResource(stream.stream, {
                        inputType: stream.type
                    })
            
                    let player = createAudioPlayer({
                    
                    })
                    await player.play(resource)
                    await connection.subscribe(player)
                    global.musicInfo = musicInfo;
                    await interaction.reply(`Now Playing: ${musicInfo.title}`)


                    player.addListener("stateChange", (oldOne, newOne) => {
                        if (newOne.status == "idle") {
                            console.log("The song finished");
                            musicQueue.splice(0, 1);
                            var reply = '';
                            musicQueue.forEach(element => {
                                reply.concat(`${element}\n`);
                            });
                            console.log(reply);
                            global.musicQueue = musicQueue;
                        }
                    });
                }
            }
        }
    }
}