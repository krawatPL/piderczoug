module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member.roles.cache.has(roleDJ.id)) {
            return message.channel.send(`${message.author}, Tylko dla ${DJ.roleName}. ❌`);
        }
    }

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.channel.send(`${message.author}, Nie ma cie na VC ❌`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author}, Pojebały ci się głosowe choć do mnie. ❌`);
    }

    if (cmd) cmd.execute(client, message, args);
};
