import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userActivitySchema = new Schema({
    activity: { type: String, required: true },
    referenceId: { type: Schema.Types.ObjectId },
    activityDate: { type: Date, required: true },
    description: { type: String },
    forUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    byUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
});

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);
