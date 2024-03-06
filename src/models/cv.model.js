import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  education: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  customPanels: {
    type: mongoose.Schema.Types.Array,
    ref: 'CustomPanel',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date,
    default: Date.now
  },
});

const CV = mongoose.model('CV', cvSchema);

export default CV;
