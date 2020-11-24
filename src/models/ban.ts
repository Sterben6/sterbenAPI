import { Document, Schema, model } from 'mongoose';

export interface BanInterface extends Document {
    userId: string,
    reason: string,
    date: Date,
    expiration?: {
        date: Date,
        processed: boolean
    },
    moderator: string
}

const Ban: Schema = new Schema({
    userId: String,
    reason: String,
    expiration: {
        date: Date,
        processed: Boolean,
      },    
    moderator: String
})

export default model<BanInterface>('Bans', Ban)