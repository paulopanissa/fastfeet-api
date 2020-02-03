import chalk from 'chalk';
import server from './app';

const hostname = process.env.APP_HOST || '127.0.0.1';
const port = process.env.APP_PORT || 8080;
const baseUrl = process.env.APP_URL;

server.listen(port, hostname, () => {
  console.log(
    `${chalk.blackBright.bold(`⚡️ API - Fastfeet, is running in: ${baseUrl}`)}`
  );
});
