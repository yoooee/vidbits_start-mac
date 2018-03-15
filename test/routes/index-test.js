const {assert} = require('chai');
const request = require('supertest');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {seedVideoToDatabase, generateRandomUrl} = require('../test-utils');
const Video = require('../../models/video');
const app = require('../../app.js');

describe('Server path: /', () => {

  let video1;
  let video2;

  beforeEach(async () => {

    connectDatabase();

    video1 = await seedVideoToDatabase({
      title: 'A beer video',
      videoUrl: generateRandomUrl('youtube.com'),
      description: 'A video about delicious beer.'
    });

    video2 = await seedVideoToDatabase({
      title: 'a whiskey video',
      videoUrl: generateRandomUrl('youtube.com'),
      description: 'i love whiskey!'
    });
  });

  afterEach(disconnectDatabase);

  describe('GET /', () => {
    it('renders all videos in database', async () => {

      const dbVideos = await Video.find();

      assert.equal(dbVideos.length, 2);

      assert.equal(dbVideos[0].title, video1.title);
      assert.equal(dbVideos[0].videoUrl, video1.videoUrl);
      assert.equal(dbVideos[0].description, video1.description);

      assert.equal(dbVideos[1].title, video2.title);
      assert.equal(dbVideos[1].videoUrl, video2.videoUrl);
      assert.equal(dbVideos[1].description, video2.description);
    });
  });
});
