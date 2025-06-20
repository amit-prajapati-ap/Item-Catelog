import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Item name cannot exceed 100 characters']
  },
  coverImage: {
    type: String,
    required: [true, 'Cover Image is required'],
  },
  additionalImages: [
    {
      type: String,
    }
  ],
  type: {
    type: String,
    required: [true, 'Item type is required'],
    trim: true,
    maxlength: [100, 'Item type cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true
});

export const Item = mongoose.model('Item', itemSchema);