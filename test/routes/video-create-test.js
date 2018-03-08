const {assert} = require('chai');
const request = require('supertest');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');
const app = require('../../app.js');

describe('Server path: /videos', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST', () => {
    it('returns a 201 status code', async () => {
      const videoToCreate = {
        title: 'A beer video',
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      assert.equal(response.status, 201);
    });

    describe('submits a video with a title and description', () => {
      it('saves the video to the database', async () => {
        const videoToCreate = {
          title: 'A beer video',
          description: 'A video about delicious beer.'
        };

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(videoToCreate);

        assert.equal(response.status, 201);

        assert.equal(response.body.title, videoToCreate.title);
        assert.equal(response.body.description, videoToCreate.description);

        const dbVideo = await Video.findOne({});

        assert.equal(dbVideo.title, videoToCreate.title);
        assert.equal(dbVideo.description, videoToCreate.description);
      });
    });
  });
});
