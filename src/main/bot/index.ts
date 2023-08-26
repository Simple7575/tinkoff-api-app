import { Bot } from 'grammy'
import { join } from 'path'
import * as fs from 'fs/promises'
import { CHAT_ID } from '../envConstants.js'

export const sendMessage = async (message: string) => {
  try {
    const buffer = await fs.readFile(join(__dirname, '../../configs/credentials.json'))

    const credentials = buffer.toJSON().data

    console.log(credentials)

    // const bot = new Bot(BotToken)

    // if (!CHAT_ID) throw new Error('Chat ID needed.')

    // await bot.api.sendMessage(CHAT_ID, message)
  } catch (error) {
    console.log(error)
  }
}
