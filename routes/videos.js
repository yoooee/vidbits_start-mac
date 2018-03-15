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

router.get('/:videoid/edit', async (req, res, next) => {
  const videoId = req.params.videoid;
  const video = await Video.findById(videoId);

  res.render('videos/edit', {video});
});

// PUT /videos/:videoid
router.put('/:videoid', async (req, res, next) => {
  const videoId = req.params.videoid;
  const video = await Video.findById(videoId);

  video.title = req.body.title;
  video.videoUrl = req.body.videoUrl;
  video.description = req.body.description;

  video.validateSync();

  if(video.errors) {
    res.status(400).render('videos/edit', {video: video});
  } else {
    await video.save();
    res.redirect(302, `/videos/${video.id}`);
  }
});

router.get('/:videoid/deletions', async (req, res, next) => {

  const videoId = req.params.videoid;
  const video = await Video.findById(videoId);

  const videoRemoved = await video.remove();

  res.redirect(302, '/videos');
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
    res.redirect(302, `/videos/${video.id}`);
  }
});

module.exports = router;
