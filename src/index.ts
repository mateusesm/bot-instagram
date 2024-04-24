import dotenv from 'dotenv';
dotenv.config();

import { runBot } from './run-bot';

const user = String(process.env.USER_INSTA);
const password = String(process.env.PASS_INSTA);

runBot(user, password);
