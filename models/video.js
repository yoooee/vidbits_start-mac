const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Video `Title` is required']
    },
    videoUrl: {
      type: String,
      required: [true, 'Video `VideoUrl` is required']
    },
    description: {
      type: String,
      required: [true, 'Video `Description` is required']
    }
  })
);

module.exports = Video;
