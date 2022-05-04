const Discord = require("discord.js") 
const { MessageActionRow, MessageButton } = require("discord.js")
const config = require("../config.json")

module.exports = { 
  name: "öneri", 
  options: [
    {          
      name: 'mesaj',
      description: 'Öneri mesajın',
      type: 'STRING',
      required: true
    }
  ], 
  description: 'Öneride bulun',
  run: async (client, interaction) => {

    const msj = interaction.options.getString('mesaj');

    const embed = new Discord.MessageEmbed()
    .setTitle("Yeni Öneri")
    .addField("Öneren", `<@${interaction.user.id}> (${interaction.user.id})`)
    .addField("Öneri", "> "+msj)
    .setThumbnail(interaction.user.avatarURL({size: 512}) || "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ")
    .setColor("WHITE");

    const embed_kabul = new Discord.MessageEmbed()
    .setTitle("Öneri Kabul Edildi")
    .addField("Öneren", `<@${interaction.user.id}> (${interaction.user.id})`)
    .addField("Öneri", "> "+msj)
    .setThumbnail(interaction.user.avatarURL({size: 512}) || "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ")
    .setColor("GREEN");

    const embed_ret = new Discord.MessageEmbed()
    .setTitle("Öneri Reddedildi")
    .addField("Öneren", `<@${interaction.user.id}> (${interaction.user.id})`)
    .addField("Öneri", "> "+msj)
    .setThumbnail(interaction.user.avatarURL({size: 512}) || "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ")
    .setColor("RED");

    const row = new MessageActionRow()
		.addComponents(
      new MessageButton()
      .setCustomId('oneri_kabul')
	    .setLabel('Kabul Et')
    	.setStyle('SUCCESS'),
      new MessageButton()
      .setCustomId('oneri_ret')
	    .setLabel('Reddet')
    	.setStyle('DANGER')
    );

    interaction.reply({embeds: [embed], components: [row], ephemeral: false});

    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 24 * 3600000 });

    collector.on('collect', i => {

      if (!config.owners.includes(i.user.id)) return

      if (i.customId == "oneri_kabul") {
      
	      interaction.editReply({embeds: [embed_kabul], components: []});

      } else if (i.customId == "oneri_ret") {

        interaction.editReply({embeds: [embed_ret], components: []});
        
      }

    });

    collector.on('end', collected => {
      
    	interaction.editReply({content: "Bu öneri zaman aşımına uğradı.", components: []})
      
    });
    
  }
}