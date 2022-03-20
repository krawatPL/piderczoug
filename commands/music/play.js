const { QueryType } = require('discord-player');

module.exports = {
    name: 'graj',
    aliases: ['g'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
if (!args[0]) return message.channel.send(`${message.author}, Write the name of the music you want to search. ❌`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${message.author}, Pusto... Nic nie znalazłem... Najwyraźniej to co wpisałeś nie istnieje tak jak ojciec karskiego❌`);

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send(`${message.author}, Nmg dołączyć na VC ❌`);
        }

        await message.channel.send(`Your ${res.playlist ? 'Your Playlist' : 'Your Track'} Loading... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};