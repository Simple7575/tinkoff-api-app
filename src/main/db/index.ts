import mongoose, { type Mongoose } from 'mongoose'
import { readJsonAsync } from '../utils/files'
import { initCandlesFromJson } from './initCandles'

mongoose.set('strictQuery', false)
export const connectDB = async (): Promise<Mongoose> => {
  const { dbUri } = await readJsonAsync('credentials')
  const MONGO_URI = dbUri ? dbUri : 'mongodb://127.0.0.1:27017/tinkoff-bot'

  const connect = mongoose
    .connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    })
    .then(() => {
      console.log(`Connected to mongo ${mongoose.connection.name}`)
      initCandlesFromJson()
      return mongoose
    })

  await connect
  return connect
}
