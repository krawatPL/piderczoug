const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pomoc',
    aliases: ['help',"pomocy"],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setTitle(client.user.username);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Telefon zaufania - 116111') ;
        embed.addField(`Dostępne - ${commands.size} Dostępne komendy`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter('To personalnie do oskara, problemów z tatą nikt nie naprawi', message.author.avatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    },
};
