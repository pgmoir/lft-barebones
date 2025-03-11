import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
    commentType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    comments: {
      type: String,
      required: true
    }
});

export const UserComment = mongoose.model('UserComment', userCommentSchema);
