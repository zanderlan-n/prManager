const TOKEN_KEY = 'token';
const DISCORD_TOKEN_KEY = 'discordToken';

export default {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: token => localStorage.setItem(TOKEN_KEY, token),
  setDiscordTnk: discordToken =>
    localStorage.setItem(DISCORD_TOKEN_KEY, discordToken),
};
