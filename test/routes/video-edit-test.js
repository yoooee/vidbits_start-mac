const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const Video = require('../../models/video');
const app = require('../../app.js');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase, generateRandomUrl, findElement} = require('../test-utils');

describe('Server path: /videos/:id/edit', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET /videos/:id/edit', () => {
    it('renders an edit page with an update button', async () => {

      const video = await seedVideoToDatabase();

      const response = await request(app)
        .get(`/videos/${video._id}/edit`);

      const titleInput = findElement(response.text, '#title-input');
      const videoUrlInput = findElement(response.text, '#videoUrl-input');
      const descriptionInput = findElement(response.text, '#description-input');

      assert.equal(titleInput.value, video.title);
      assert.equal(videoUrlInput.value, video.videoUrl);
      assert.equal(descriptionInput.value, video.description);

    });
  });

  describe('PUT /videos/:id', () => {
    it('saves the updated information to the database and shows updated information on detail page', async () => {

      const existingVideo = await seedVideoToDatabase();

      const updateVideoParams = {
        title: 'new video title',
        description: 'updated video title',
        videoUrl: 'http://new-video-url.com'
      };

      const response = await request(app)
        .put(`/videos/${existingVideo._id}`)
        .type('form')
        .send(updateVideoParams);

      const updatedVideo = await Video.findOne();

      assert.equal(updatedVideo.id, existingVideo.id);
      assert.equal(updatedVideo.title, updateVideoParams.title);
      assert.equal(updatedVideo.description, updateVideoParams.description);
      assert.equal(updatedVideo.videoUrl, updateVideoParams.videoUrl);

      assert.equal(response.status, 302);
    });
  });
});
