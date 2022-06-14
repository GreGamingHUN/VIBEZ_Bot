const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const playdl = require('play-dl');
const path = require('node:path');
const fs = require('fs');

const { joinVoiceChannel,
    voiceConnectionStatus,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    VoiceConnectionStatus,
    AudioPlayerStatus } = require('@discordjs/voice');
const { link } = require('node:fs');


var playing = 0;
var done = 0;
var musicQueue = [];
var musicQueueInfo = [];
var player = createAudioPlayer();
global.player = player;
var channelId;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays Music.')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The link for the song')
                .setRequired(false)),


    async execute(interaction) {
        channelId = interaction.channelId;
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            await interaction.reply('Join a voice channel first');
        } else {
            if (!interaction.options.getString('link')) {
                await interaction.reply('No links');
            } else {
                const linkArg = interaction.options.getString('link');
                musicQueue.push(linkArg);

                var connection;
                if (!connection) {
                    connection = joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: interaction.guild.id,
                        adapterCreator: interaction.guild.voiceAdapterCreator
                    });
                }
                global.connection = connection;

                var musicInfo = (await playdl.video_basic_info(linkArg)).video_details;
                musicQueueInfo.push(musicInfo);
                global.musicQueueInfo = musicQueueInfo;

                console.log('Queue: ')
                musicQueueInfo.forEach(element => {
                    console.log(`${element.title}\n`);
                });
                if (playing == 0) {
                    playMusic(connection, player, musicQueue[0]);
                    writeQueue();
                    interaction.reply(`Now Playing: ${musicQueueInfo[0].title}`);
                    playing = 1;
                } else {
                    interaction.reply(`${musicInfo.title} has been added to the Queue!`);
                }
                player.on('stateChange', (oldState, newState) => {
                    // console.log(`Old: ${oldState.status}, new ${newState.status}`);
                    if (newState.status == 'buffering') {
                        done = 0;
                    }
                    if (done == 0 && newState.status == "idle" && oldState.status == "playing") {
                        console.log('do the funny')
                        nextMusic();
                        done = 1;
                    }
                })
            }
        }
    }
}

async function playMusic(connection, player, link) {
    let stream = await playdl.stream(link);
    let resource = createAudioResource(stream.stream, {
        inputType: stream.type
    });
    await player.play(resource)
    await connection.subscribe(player);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

global.nextMusic = function () {
    musicQueue.splice(0, 1);
    musicQueueInfo.splice(0, 1);
    if (musicQueue.length > 0) {
        playMusic(connection, player, musicQueue[0]);
        console.log('Queue: ')
        musicQueueInfo.forEach(element => {
            console.log(`${element.title}\n`);
        });
        playing = 1;
        done = 1;
        console.log(`now playing ${musicQueueInfo[0].title}`);
        writeQueue
    } else {
        playing = 0;
    }
    writeQueue();
    console.log('Queue: ');
    musicQueueInfo.forEach(element => {
        console.log(`${element.title}\n`);
    });
}

function writeQueue() {
    let queueString = '';
    musicQueueInfo.forEach(element => {
        queueString = queueString.concat(`${element.title}\n`);
    });
    console.log(queueString)
    fs.writeFile('np.txt', queueString, (err) => {
        if (err) console.log(`valami nem jo ${err}`);
      });
}