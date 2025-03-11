import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    formName: { type: String, required: true },
    dateSubmitted: { type: Date, required: true },
    formData: { type: Object },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
});

export const ContactUs = mongoose.model('ContactUs', contactUsSchema);
