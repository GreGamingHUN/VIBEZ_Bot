const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, EmbedAssertions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Shows the website of the page'),
        async execute(interaction) {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Cool ass website')
                .setURL('http://vibezbot.ddns.net:8080')
                .setDescription('Very cool stuff');
            await interaction.reply({ content: 'Check this shit out', embeds: [embed]});
        }
};