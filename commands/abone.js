const Discord = require("discord.js") 
const config = require("../config.json")
const { Database } = require("nukleon")
const db = new Database("./data/aboneSayac.json")
const ytch = require('yt-channel-info');

module.exports = { 
  name: "abone", 
  options: [
    {          
      name: 'user',
      description: 'Abone olan üye',
      type: 'USER',
      required: true
    }
  ], 
  description: 'Abone rolü ver',
  run: async (client, interaction) => {

    const user = interaction.options.getMember('user');

    if (!interaction.member.roles.cache.has(config.aboneYetkiliRol)) return;

    if (user.roles.cache?.has(config.aboneUyeRol)) return interaction.reply({content: "Bu üye zaten abone rolüne sahip.", ephemeral: true})

    const payload = {
      channelId: config.youtubeKanal,
      channelIdType: 0
    }
    
    ytch.getChannelInfo(payload).then((response) => {
      if (!response.alertMessage) {

    const embed = new Discord.MessageEmbed()
    .setTitle("Yeni Abone")
    .setColor("RED")
    .addField("😎 Abone Olan", `${user} \`(${user.id})\``)
    .addField("👔 Yetkili", "<@"+interaction.user.id+">" + ` \`(${interaction.user.id})\`\n\`>\` ${db.get(`aboneSayac-${interaction.user.id}`) + 1} kez abone rol verdi.`)
    .addField("✅ Toplam Verilen Abone Rol", `${db.get("counter") + 1}`)
    .addField("🎏 Abone Sayısı", `${response.subscriberCount}`)

    user.roles.add(config.aboneUyeRol);
    db.add("aboneSayac-"+interaction.user.id, 1)
    db.add("counter", 1)
    interaction.reply({content: `${user} adlı kullanıcıya abone rolü verildi.`, ephemeral: false});
    client.channels.cache.get(config.aboneLogKanal).send({embeds: [embed]})
        
      } else return;
    });

  }
}