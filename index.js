const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = ''; //add o token do seu bot aqui

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!add_role_to_all') || message.author.bot) return;

  if (!message.member.permissions.has('ADMINISTRATOR')) {
    return message.reply('Você não tem permissão para usar este comando.');
  }

  const roleMention = message.mentions.roles.first();
  if (!roleMention) {
    return message.reply('Por favor mencione um cargo válido.');
  }

  const role = message.guild.roles.cache.get(roleMention.id);

  message.guild.members.fetch().then((members) => {
    members.forEach((member) => {
      if (!member.roles.cache.has(role.id) && !member.user.bot) {
        member.roles.add(role).catch(console.error);
      }
    });
  });

  message.channel.send(`O cargo ${role.name} foi adicionado a todos os membros!`);
});

client.login(TOKEN);


//Bot desenvolvido por Nebulosa. 
//Acesse: https://e-z.bio/neb.ul