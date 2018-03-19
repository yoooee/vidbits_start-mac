const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res) => {
  const videos = await Video.find();
  res.render('videos/index', { videos });
});

router.get('/create', (req, res) => {
  res.render('videos/create');
});

router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  res.render('videos/show', {video});
});

router.get('/:videoId/edit', async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  res.render('videos/edit', {video});
});

router.post('/:videoId/updates', async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  video.title = req.body.title;
  video.videoUrl = req.body.url;
  video.description = req.body.description;

  video.validateSync();

  if(video.errors) {
    res.status(400).render('videos/edit', { video });
  } else {
    await video.save();
    res.redirect(302, `/videos/${video.id}`);
  }
});

router.get('/:videoId/deletions', async (req, res) => {

  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  const videoRemoved = await video.remove();

  res.redirect(302, '/videos');
});


router.post('/', async (req, res) => {

  const video = new Video({
    title: req.body.title,
    videoUrl: req.body.url,
    description: req.body.description
  });

  video.validateSync();

  if(video.errors) {
    res.status(400).render('videos/create', { video });
  } else {
    // Save to database
    await video.save();
    res.redirect(302, `/videos/${video.id}`);
  }
});

module.exports = router;
