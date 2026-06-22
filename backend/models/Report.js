import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobileNumber: {
    type: String,
    trim: true,
    default: ''
  },
  calculations: {
    lifePath: { type: Number, required: true },
    destiny: { type: Number, required: true },
    soulUrge: { type: Number, required: true },
    personality: { type: Number, required: true }
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', ReportSchema);
