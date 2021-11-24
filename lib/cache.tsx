import dbConnect from './dbConnect'
import CacheSchema from '../models/CacheSchema'
import { Cache } from '../ts/types'
const CACHE_KEY = 'KEY_CACHE_V1'

export async function getCache() {
  await dbConnect()
  return CacheSchema.findOne()
}

export async function saveInCache(result, cache: Cache) {
  result = JSON.stringify(result)
  const data = {
    _id: CACHE_KEY,
    result,
    expire: new Date().getTime() + 60 * 1000,
  }
  if (!!cache) {
    return CacheSchema.findOneAndUpdate({}, { ...data })
  }
  return CacheSchema.create({ ...data })
}
