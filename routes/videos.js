const router = require('express').Router();
const Video = require('../models/video');

router.post('/', async (req, res, next) => {
  const video = new Video({
    title: req.body.title,
    description: req.body.description
  });

  // Save to database
  await video.save();

  res.redirect('/');
});

module.exports = router;
