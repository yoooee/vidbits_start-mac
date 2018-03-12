const {assert} = require('chai');
const request = require('supertest');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');
const app = require('../../app.js');

describe('Server path: /', () => {

  let video1;
  let video2;

  beforeEach(async () => {

    connectDatabase();

    video1 = await Video.create({
      title: 'A beer video',
      description: 'A video about delicious beer.'
    });

    video2 = await Video.create({
      title: 'a whiskey video',
      description: 'i love whiskey!'
    });
  });

  afterEach(disconnectDatabase);

  describe('GET /', () => {
    it('renders all videos in database', async () => {

      const dbVideos = await Video.find();

      assert.equal(dbVideos.length, 2);

      assert.equal(dbVideos[0].title, video1.title);
      assert.equal(dbVideos[0].description, video1.description);

      assert.equal(dbVideos[1].title, video2.title);
      assert.equal(dbVideos[1].description, video2.description);
    });
  });
});
