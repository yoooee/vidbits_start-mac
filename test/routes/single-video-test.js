const {assert} = require('chai');
const request = require('supertest');
const Video = require('../../models/video');
const app = require('../../app');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase} = require('../test-utils');

describe('Server path: /vidoes/:id', () => {

  let video1;

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET /videos/:videoid', () => {
    it('renders a single video', async () => {

      const video = await seedVideoToDatabase();
      const response = await request(app)
        .get(`/videos/${video._id}`);

      assert.include(parseTextFromHTML(response.text, 'body'), video.title);
    });
  });
});
