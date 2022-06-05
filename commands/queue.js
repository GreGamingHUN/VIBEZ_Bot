const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the Music Queue.'),
    async execute(interaction) {
        var reply = `Queue: \n`;
        musicQueueInfo.forEach(element => {
            reply = reply.concat(`${element.title}\t\t${element.durationRaw}\n`)
        });
        interaction.reply(reply);
    }
}