import mongoose from 'mongoose'

export interface ICache {
  result: string
  expire: number
}

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
