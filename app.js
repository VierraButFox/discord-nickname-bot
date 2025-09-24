require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const content = message.content;
  if (content.toLowerCase().startsWith("i'm ")) {
    const newNick = content.slice(4).trim();
    if (newNick) {
      try {
        await message.member.setNickname(newNick);
        await message.channel.send(
          `Changed ${message.author.username}'s nickname to **${newNick}**!`
        );
      } catch (error) {
        if (error.code === 50013) { // Missing Permissions
          await message.channel.send("I don't have permission to change your nickname.");
        } else {
          await message.channel.send("Failed to change nickname due to an error.");
        }
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);