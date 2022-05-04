const Discord = require("discord.js") 
const config = require("../config.json")
const moment = require("moment")
moment.locale("tr");

module.exports = { 
  name: "userinfo", 
  options: [
    {          
      name: 'user',
      description: 'Kullanıcı',
      type: 'USER',
      required: true
    }
  ], 
  description: 'Kullanıcı bilgileri',
  run: async (client, interaction) => {

    const member = interaction.options.getMember('user');

    let rolesname;
    let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
    rolesname = roles.join(" ");

    if (member.roles.cache.size < 1) rolesname = "Rol yok"
    if (!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = "Rol yok"

    const embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL({dynamic: true}))
    .setColor("GREEN")
    .setTitle(member.user.username + " Kullanıcı Bilgileri")
    .addField("😀 Kullanıcı", `${member.user.username}#${member.user.discriminator}`)
    .addField("🆔 ID", member.id)
    .addField("📅 Oluşturulma Tarihi", `${moment(member.user.createdAt).format('DD MMMM YYYY (dddd), h:mm:ss')}`)
    .addField("📅 Katılma Tarihi", `${moment(member.joinedAt).format('DD MMMM YYYY (dddd), h:mm:ss')}`)
    .addField("🎎 Roller", rolesname || `Rol yok`)

    interaction.reply({embeds: [embed], ephemeral: true})

  }
}