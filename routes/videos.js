const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  const videos = await Video.find();
  res.render('videos/index', { videos });
});

router.get('/create', (req, res, next) => {
  res.render('videos/create');
});

router.get('/:videoid', async (req, res, next) => {
  const videoId = req.params.videoid;
  const video = await Video.findById(videoId);

  res.render('videos/show', {video});
});

router.post('/', async (req, res, next) => {

  const video = new Video({
    title: req.body.title,
    videoUrl: req.body.videoUrl,
    description: req.body.description
  });

  video.validateSync();

  if(video.errors) {
    res.status(400).render('videos/create', {video: video});
  } else {
    // Save to database
    await video.save();
    res.redirect(302, `videos/${video._id}`);
  }
});

module.exports = router;
