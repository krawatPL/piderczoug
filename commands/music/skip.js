module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, Nic nie ma w kolejce bo w kolejce stoi stary karskiego. ❌`);

        const success = queue.skip();

        return message.channel.send(success ? `**${queue.current.title}**, Skipnięto jak dzieciństwo oskara ✅` : `${message.author}, Coś się zjebało ❌`);
    },
};