module.exports = {
    name: 'stop',
    aliases: ['st'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, **KURWA NIC TU NIE GRA**. ❌`);

        queue.destroy();

        message.channel.send(`**Zatrzymałem się przed bramą branderburską** ✅`);
    },
};