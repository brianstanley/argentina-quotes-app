import * as mongoose from 'mongoose'
import { Provider } from '../ts/enums'

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: Provider,
    unique: true,
  },
})

export default mongoose.models.Provider ||
  mongoose.model('Provider', ProviderSchema)
