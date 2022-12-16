const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('node:path');
const { createConnection } = require('./connect');
const play = require('play-dl');
const { createReadStream } = require('node:fs');

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
    }
})

//const resource = createAudioResource(join(__dirname, 'sieg_heil.mp3'), { inlineVolume: true });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song')
        .addStringOption(option => 
            option.setName('link').setDescription('The link for the video/song')),
        async execute(interaction) {
            await interaction.deferReply();
            const link = interaction.options.getString('link');
            const source = await play.stream(link);
            const resource = createAudioResource(source.stream, { inputType: source.type });
            let connection = getVoiceConnection(interaction.guild.id);
            if (!connection) {
                createConnection(interaction);
                connection = getVoiceConnection(interaction.guild.id);
            }
            connection.subscribe(player);
            player.play(resource, {seek: 0});
            
            const infodata = await play.video_info(link);
            const title = infodata.video_details.title;

            await interaction.editReply(`Started playing: ${title}`);
        }
};

player.on('stateChange', (oldstate, newstate) => {
	console.log(`The player changed from ${oldstate.status} to ${newstate.status}`);
})