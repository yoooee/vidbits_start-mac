const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const Video = require('../../models/video');
const app = require('../../app.js');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {parseTextFromHTML, seedVideoToDatabase, generateRandomUrl} = require('../test-utils');

describe('Server path: /videos', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST /videos', () => {

    it('saves the video to the database and redirects to the detail page', async () => {

      const videoToCreate = {
        title: 'A beer video',
        url: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      const dbVideo = await Video.findOne({});

      assert.equal(response.status, 302);
      assert.equal(response.headers['location'], `/videos/${dbVideo.id}`);

      assert.equal(dbVideo.title, videoToCreate.title);
      assert.equal(dbVideo.videoUrl, videoToCreate.url);
      assert.equal(dbVideo.description, videoToCreate.description);
    });

    it('does not save videos if the title is missing', async () => {

      const videoToCreate = {
        url: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      const dbVideo = await Video.find();

      assert.equal(dbVideo.length, 0);
      assert.equal(response.status, 400);
    });

    it('displays the create video form when the title is missing', async () => {

      const videoToCreate = {
        url: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      //TODO: Why does step 22 tell us to look for "could not find title input" in the Hint?
      assert.include(parseTextFromHTML(response.text, 'h3'), 'Save a video');
    });

    it('displasy an error message if title is missing', async () => {

      const errorMessage = 'Video `Title` is required';

      const videoToCreate = {
        title: '',
        url: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      assert.include(parseTextFromHTML(response.text, '.error'), errorMessage);
      //assert.include(response.text, errorMessage);
    });

    it('displays an error message if URL is missing', async () => {

      const errorMessage = 'Video `VideoUrl` is required';

      const videoToCreate = {
        title: 'A video',
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      assert.include(parseTextFromHTML(response.text, '.error'), errorMessage);
      //assert.include(response.text, errorMessage);
    });

    it('loads the create form with data loaded when title is missing', async () => {

      const videoToCreate = {
        title: '',
        url: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(videoToCreate);

      assert.include(response.text, videoToCreate.url);
      assert.include(response.text, videoToCreate.description);
    });
  });
});
