import mongoose, {Schema, Document} from "mongoose";

interface Video extends Document{
    user: Schema.Types.ObjectId;
    title: string;
    videoUrl: string;
    language?: string;
    transcription?: string;
    status: 'Uploaded' | 'Processing' | 'Completed'
}

const videoSchema: Schema<Video> = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    language:{
        type: String,
    },
    transcription: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Uploaded', 'Processing', 'Completed'],
        default: 'Uploaded'
    }
})

interface User extends Document{
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
}

const userSchema: Schema<User> = new Schema({
    username:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        length: 8
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, {timestamps:true})

interface Subtitle extends Document {
    video: Schema.Types.ObjectId;
    language: string;
    content: string;
}

const subtitleSchema: Schema = new Schema({
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  });

const Video = mongoose.model<Video>('Video', videoSchema)
const Subtitle = mongoose.model<Subtitle>('Subtitle', subtitleSchema);
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema)

export default { UserModel, Video, Subtitle}