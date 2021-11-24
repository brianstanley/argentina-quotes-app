import mongoose from 'mongoose'
import { ICache } from '../ts/interfaces'

const CacheSchema = new mongoose.Schema<ICache>({
  result: {
    type: String,
  },
  expire: {
    type: Number,
  },
})

export default mongoose.models.Cache ||
  mongoose.model<ICache>('Cache', CacheSchema)
