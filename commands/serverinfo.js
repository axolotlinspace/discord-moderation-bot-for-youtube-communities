const Discord = require("discord.js") 
const config = require("../config.json")
const moment = require("moment")
moment.locale("tr")

module.exports = { 
  name: "serverinfo", 
  options: [], 
  description: 'Sunucu detayları',
  run: async (client, interaction) => {

  const filterLevels = {
    DISABLED: "Kapalı",
    MEMBERS_WITHOUT_ROLES: "Rolsüz Üyeler",
    ALL_MEMBERS: "Herkes"
  };

  const boostLevels = {
    NONE: "Seviye Yok",
    TIER_1: "1. Seviye",
    TIER_2: "2. Seviye",
    TIER_3: "3. Seviye"
  };

  const verificationLevels = {
    NONE: "Yok",
    LOW: "Düşük",
    MEDIUM: "Orta",
    HIGH: "(╯°□°）╯︵ ┻━┻",
    VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
  };

  /*const regions = {
    brazil: ":flag_br: Brazil",
    europe: ":flag_eu: Europe",
    hongkong: ":flag_hk: Hong Kong",
    india: ":flag_in: India",
    japan: ":flag_jp: Japan",
    russia: ":flag_ru: Russia",
    singapore: ":flag_sg: Singapore",
    southafrica: ":flag_za: South Africa",
    sydeny: ":flag_au: Sydeny",
    "us-central": ":flag_us: US Central",
    "us-east": ":flag_us: US East",
    "us-west": ":flag_us: US West",
    "us-south": ":flag_us: US South"
  };*/

  const roles = interaction.guild.roles.cache;
  const members = interaction.guild.members.cache;
  const channels = interaction.guild.channels.cache;
  const emojis = interaction.guild.emojis.cache;

  const embed = new Discord.MessageEmbed()
    .setColor("#5865F2")
    .setThumbnail(interaction.guild.iconURL({dynamic: true}))
    .setTitle("Sunucu Detayları")
    .addField("🆔 İsim ve ID", interaction.guild.name + " `(" + interaction.guild.id +")`")
    .addField("📑 Sunucu Açıklaması", interaction.guild.description || "Açıklama yok")
    .addField("👑 Kurucu", "<@" + interaction.guild.ownerId +">")
    //.addField("Bölge", `${regions[interaction.guild.region]}`)
    .addField("🚀 Boost Seviyesi", `${boostLevels[interaction.guild.premiumTier]} (${interaction.guild.premiumSubscriptionCount || 0} takviye)`)
    .addField("🤬 Sansürsüz İçerik Filtresi", filterLevels[interaction.guild.explicitContentFilter] || "Yok")
    .addField("🛡 Güvenlik Seviyesi", verificationLevels[interaction.guild.verificationLevel] || "Yok")
    .addField("📅 Oluşturulma Tarihi", moment(interaction.guild.createdAt).format('DD MMMM YYYY (dddd), h:mm:ss'))
    .addField("✨ Özellikler", interaction.guild.features.join(", ") || "Özellik yok")
    .addField("🎎 Rol Sayısı", `${interaction.guild.roles.cache.size}` || "0")
    .addField("😀 Emoji Sayısı", `${(emojis.size || 0) + ` (${emojis.filter(emoji => emoji.animated).size || 0} hareketli, ${emojis.filter(emoji => !emoji.animated).size || 0} normal)`}`)
    .addField("📺 Kanal Sayısı", `${(channels.filter(channel => channel.type === "GUILD_TEXT").size + channels.filter(channel => channel.type === "GUILD_VOICE").size) + ` (${channels.filter(channel => channel.type === "GUILD_CATEGORY").size} kategori, ${channels.filter(channel => channel.type === "GUILD_TEXT").size} metin, ${channels.filter(channel => channel.type === "GUILD_VOICE").size} ses)`}`)
    .addField("👪 Üye Sayısı", `${interaction.guild.memberCount} (${members.filter(member => !member.user.bot).size} insan, ${members.filter(member => member.user.bot).size} bot)`)
    .addField("👀 Üyeler", `${members.filter(member => member.presence?.status !== "offline").size} çevrim içi, ${interaction.guild.memberCount - members.filter(member => member.presence?.status !== "offline").size} çevrim dışı`)
    
    interaction.reply({embeds: [embed], ephemeral: true})
    
  }
}