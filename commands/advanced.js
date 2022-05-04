const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require("discord.js")
const config = require("../config.json")

module.exports = { 
  name: "advanced", 
  options: [
    {
      name: 'action',
      description: 'Yapılacak işlem',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: "Butonlu Kayıt Embed",
          value: "btn_kayit"
        },
        {
          name: "Butonlu Normal Kodlar Embed",
          value: "btn_normal_kodlar"
        }
      ]
    },
    {
      name: "string",
      description: "Yazı değişkeni",
      type: "STRING",
      required: false
    },
    {         
      name: 'number',
      description: 'Sayı değişkeni',
      type: 'NUMBER',
      required: false
    }
  ],
  description: 'Advanced slash command',
  run: async (client, interaction) => {

    if (!config.owners.includes(interaction.user.id)) return;

    const action = interaction.options.getString('action');
    const string = interaction.options.getString('string');
    const number = interaction.options.getNumber('number');

    const kayit_buton = new MessageActionRow()
		.addComponents(
      new MessageButton()
      .setCustomId('kayit_buton')
	    .setLabel('Kayıt Ol / Register')
    	.setStyle('SUCCESS')
    );
    const kayit_embed = new Discord.MessageEmbed()
    .setTitle("Welcome to StormCode")
    .setDescription(`
:flag_tr: Sunucuya kayıt olmak için aşağıdaki butona tıklayın.
:flag_eu: Click the button below to register into server.
`)
    .setColor("GREEN");

    const normalkodlar_buton = new MessageActionRow()
		.addComponents(
      new MessageButton()
      .setCustomId('normalkodlar_buton')
	    .setLabel('Normal Kodlar')
    	.setStyle('PRIMARY')
    );
    const normalkodlar_text = `
📣 **Sunucumuzdaki kod rollerini almak için butonları kullan.**

🎏 __**Roller**__
\`>\` <@&${config.normalKodlar}> rolünü almak için butona tıkla.
\`>\` <@&${config.altinKodlar}> rolü için 3 arkadaşını davet et.
\`>\` <@&${config.elmasKodlar}> rolü için 5 arkadaşını davet et.
\`>\` <@&${config.altyapilar}> rolü için 10 arkadaşını davet et.
`

    if (action == "btn_kayit") {

      interaction.channel.send({embeds: [kayit_embed], components: [kayit_buton]})

    } else if (action == "btn_normal_kodlar") {

      interaction.channel.send({content: normalkodlar_text, components: [normalkodlar_buton]})

    } else return;

  }
}