const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  username: { type: String, required: true },
  password: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
