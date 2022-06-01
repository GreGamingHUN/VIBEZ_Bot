const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the Music Queue.'),
    async execute(interaction) {
        if (!musicQueue) {
            interaction.reply('The queue is empty!');
        } else {
            var reply = 'The Queue: \n';
            var counter = 1;
            musicQueue.forEach(element => {
                reply.concat(`${counter}: ${element}\n`);
            });
            interaction.reply(reply);
        }
    }
}