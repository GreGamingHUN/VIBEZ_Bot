const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('node:path');
const { createConnection } = require('./connect');
const play = require('play-dl');
let { queue } = require('./queue');

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
    }
})

let songTitle = "semmi";

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
            songTitle = infodata.video_details.title;
            queue.push(songTitle);
            await interaction.editReply({ embeds: [makeEmbed(songTitle, link, infodata.video_details)] });
        },
    title: songTitle
};


function makeEmbed(songTitle, url, infodata) {
    let description;
    if (infodata.description == undefined) {
        description = "No Description";
    } else {
        description = infodata.description;
    }
    const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(songTitle)
    .setURL(url)
    .setDescription(description)
    .setThumbnail(infodata.thumbnails[0].url)
    .addFields(
        { name: 'Uploaded by', value: infodata.channel.name }
    )
    .setFooter({ text: `${infodata.views} views`, iconURL: 'https://cdn.discordapp.com/app-icons/981221093601845270/6627eba8252d548330ed76575d545e0a.png?size=256' });
    return embed;
}

player.on('stateChange', (oldstate, newstate) => {
    if (newstate.status == 'idle') {
        songTitle = "semmi";
        console.log(songTitle);
        queue = queue.slice(0, -1);
    } else {
        console.log(songTitle);
    }
	console.log(`The player changed from ${oldstate.status} to ${newstate.status}`);
})