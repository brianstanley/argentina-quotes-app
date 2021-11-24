import dbConnect from './dbConnect'
import CacheSchema, { ICache } from '../models/CacheSchema'
import { Cache } from '../ts/types'

export async function getCache() {
  await dbConnect()
  return CacheSchema.findOne()
}

export async function saveInCache(result, cache: Cache) {
  result = JSON.stringify(result)
  const data = {
    result,
    expire: new Date().getTime() + 60 * 1000,
  }
  if (!!cache) {
    return CacheSchema.findOneAndUpdate({}, { ...data })
  }
  return CacheSchema.create({ ...data })
}
