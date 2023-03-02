const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String, 
    required: true
  },
  date: {
    type: Date, 
    required: true
  }
});

postSchema.index({ date: -1 }); // date 필드를 내림차순으로 인덱싱

module.exports = mongoose.model("Post", postSchema);
