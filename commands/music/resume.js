module.exports = {
    name: 'wznow',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`${message.author}, Nic nie zrobiłeś ~każdy poseł w sejmie po 4 latach kadencji. ❌`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `**${queue.current.title}**, Muzyka jedzie dalej jak T-34 ✅` : `${message.author}, Opona mi jebła... Wait ja mam gąsienice ❌`);
    },
};