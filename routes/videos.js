const router = require('express').Router();
const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/videos/create', (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res, next) => {
  const video = new Video({
    title: req.body.title,
    description: req.body.description
  });

  // Save to database
  await video.save();

  res.status(201).render('videos/show', { video });
});

module.exports = router;
